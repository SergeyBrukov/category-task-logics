import styles from "./category-list.module.scss"
import {CategoriesInterface} from "../../../utils/interface";
import React, {FC, useMemo, useState} from "react";
import ChooseCategorySelectBlock from "./ChooseSelectCategoryBlock";
import {ChooseCategorySelectBlockType, TypeSetState} from "../../../utils/type";
import CategoryItem from "./CategoryItem";

interface ICategoryList {
    categoryList: CategoriesInterface[],
    setCategoryList: TypeSetState<CategoriesInterface[]>
}

const CategoryList: FC<ICategoryList> = ({categoryList, setCategoryList}) => {

    const [choseCategory, setChooseCategory] = useState<ChooseCategorySelectBlockType>({
        parent: "",
        subTypeTwo: "",
        subTypeThree: ""
    })

    const subCategoryParentMemo = useMemo(() => {
        if (choseCategory.parent) {
            return categoryList?.find(item => item.id === choseCategory.parent)
        }
        return null;
    }, [choseCategory.parent, categoryList])

    const subCategoryTypeTwoMemo = useMemo(() => {
        if (choseCategory.subTypeTwo) {
            return subCategoryParentMemo?.subCategory?.find(item => item.id === choseCategory.subTypeTwo)
        }
        return null;
    }, [choseCategory.subTypeTwo, categoryList])

    const subCategoryTypeThreeMemo = useMemo(() => {
        if (choseCategory.subTypeThree) {
            return subCategoryTypeTwoMemo?.subCategory?.find(item => item.id === choseCategory.subTypeThree)
        }
        return null;
    }, [choseCategory.subTypeThree, categoryList])

    if (!categoryList.length) {
        return (
            <div className="alert-info">
                Category empty
            </div>
        )
    }

    const handleDeleteCategory = (id: string, type: string) => {
        switch (type) {
            case "parent" : {

                setCategoryList(prev => prev.filter(item => item.id !== id))
                setChooseCategory({
                    parent: "",
                    subTypeTwo: "",
                    subTypeThree: ""
                })

                return
            }
            case "subTypeTwo" : {
                const filterNewSubCategoryArray = subCategoryParentMemo?.subCategory?.filter(item => item.id !== id);
                setCategoryList(prev => prev.map(categoryParent => {
                    if (categoryParent.id === subCategoryParentMemo?.id) {
                        return {
                            ...categoryParent,
                            subCategory: filterNewSubCategoryArray || []
                        }
                    }
                    return categoryParent
                }))
                setChooseCategory(prev => ({...prev, subTypeTwo: "", subTypeThree: ""}))

                return
            }
            case "subTypeThree" : {
                const filterNewSubCategoryArray = subCategoryTypeTwoMemo?.subCategory?.filter(item => item.id !== id);

                setCategoryList(prev => prev.map(categoryParent => {
                    if (categoryParent.id === subCategoryParentMemo?.id) {
                        return {
                            ...categoryParent,
                            subCategory: categoryParent.subCategory.map(item => {
                                if (item.id === subCategoryTypeTwoMemo?.id) {
                                    return {
                                        ...item,
                                        subCategory: filterNewSubCategoryArray || []
                                    }
                                }
                                return item
                            })
                        }
                    }
                    return categoryParent
                }))

                setChooseCategory(prev => ({...prev, subTypeThree: ""}))

                return
            }
        }
    }

    return (
        <div className={styles.categoryListWrapper}>
            <ChooseCategorySelectBlock
                setChooseCategory={setChooseCategory}
                categoryList={categoryList}
                choseCategory={choseCategory}
                subCategoryParentMemo={subCategoryParentMemo}
                subCategoryTypeTwoMemo={subCategoryTypeTwoMemo}
            />
            <div className={styles.listItems}>
                {subCategoryParentMemo &&
                  <CategoryItem className="firstItem" type="parent" categoryData={subCategoryParentMemo} handleDeleteCategory={handleDeleteCategory} />}
                {subCategoryTypeTwoMemo &&
                  <CategoryItem className="secondItem" type="subTypeTwo" categoryData={subCategoryTypeTwoMemo} handleDeleteCategory={handleDeleteCategory} />}
                {subCategoryTypeThreeMemo &&
                  <CategoryItem className="thirdItem" type="subTypeThree" categoryData={subCategoryTypeThreeMemo} handleDeleteCategory={handleDeleteCategory} />}
            </div>
            <p>{subCategoryParentMemo?.id} {subCategoryTypeTwoMemo?.id} {subCategoryTypeThreeMemo?.id}</p>
        </div>

    )
}

export default CategoryList