import React, {FC, MouseEvent, useMemo, useState} from "react";
import * as yup from "yup";
import styles from "./create-category.module.scss"
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {CategoriesInterface, CreateCategoryInterface} from "../../../utils/interface";
import {ChoseCategoryCreateSelectType} from "../../../utils/type";

type TCreateCategoryForm = {
    visible: boolean,
    setVisible: (visible: boolean) => void
    createCategory: (data: CreateCategoryInterface, choseCategoryCreateSelect?: ChoseCategoryCreateSelectType) => void,
    categoryList: CategoriesInterface[]
}


const CreateCategoryFrom: FC<TCreateCategoryForm> = ({visible, setVisible, createCategory, categoryList}) => {
    const [choseCategoryCreateSelect, setChoseCategorySelect] = useState<ChoseCategoryCreateSelectType>({
        parent: "",
        subCategory: ""
    });

    const memoSelectCategory = useMemo(() => {
        if (choseCategoryCreateSelect) {
            return categoryList?.find(item => item.id === choseCategoryCreateSelect.parent)
        }
        return null;
    }, [choseCategoryCreateSelect, categoryList])

    const examinationLoginFields = yup.object({
        title: yup.string().required("This field ca not be empty").min(6, "This field must be more 5 symbol").max(15, "This field can not be more than 15 symbol"),
        description: yup.string().required("This field ca not be empty").min(6, "This field must be more 5 symbol").max(256, "This field can not be more than 256 symbol")
    })

    const {register, handleSubmit, formState: {errors, isValid}, reset} = useForm<CreateCategoryInterface>({
        mode: "all",
        resolver: yupResolver(examinationLoginFields)
    })

    const createCategoryHandler: SubmitHandler<CreateCategoryInterface> = (data) => {
        if(choseCategoryCreateSelect.parent) {
            createCategory(data, choseCategoryCreateSelect)
        }else {
            createCategory(data)
        }

    }

    const handleClose = (e: MouseEvent<HTMLDivElement>) => {
        //@ts-ignore
        if (!e.target.closest("#form")) {
            setVisible(false);
            setChoseCategorySelect({
                parent: "",
                subCategory: ""
            })
        }
    }

    return (
        <div className={visible ? styles.createFormWrapper : styles.createFormWrapperHidden} onClick={handleClose}>
            <div className={styles.card}>
                <div className={styles.card2}>
                    <form id="form" className={styles.form} onSubmit={handleSubmit(createCategoryHandler)}>
                        <p className={styles.heading}>Create category</p>
                        {categoryList.length > 0 &&
                          <div className="select">
                            <select
                              value={choseCategoryCreateSelect?.parent}
                              onChange={
                                  (event) => setChoseCategorySelect(prev => ({...prev, parent: event.target.value}))
                              }
                            >
                              <option value="">Choose main category</option>
                                {categoryList.map(category => (
                                    <option value={category.id}>{category.title}</option>
                                ))}
                            </select>
                          </div>}

                        {memoSelectCategory && memoSelectCategory.subCategory.length > 0 &&
                          <div className="select">
                            <select
                              value={choseCategoryCreateSelect?.subCategory} onChange={
                                (event) => setChoseCategorySelect(prev => ({...prev, subCategory: event.target.value}))
                            }
                            >
                              <option value="">Choose sub category</option>
                                {memoSelectCategory.subCategory.map(category => (
                                    <option value={category.id}>{category.title}</option>
                                ))}
                            </select>
                          </div>}

                        <div className={styles.field}>
                            <input type="text" {...register("title")} className={styles.inputField} placeholder="Title" autoComplete="off" />
                            {(errors && errors.title) && <span className={styles.error}>{errors.title.message}</span>}
                        </div>
                        <div className={styles.field}>
                            <textarea {...register("description")} className={styles.inputField} placeholder="Description" rows={6} />
                            {(errors && errors.description) &&
                              <span className={styles.error}>{errors.description.message}</span>}
                        </div>
                        <div className={styles.btn}>
                            <button className={styles.button1}>Create</button>
                            <button className={styles.button2} onClick={() => reset()}>Clear fields</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreateCategoryFrom