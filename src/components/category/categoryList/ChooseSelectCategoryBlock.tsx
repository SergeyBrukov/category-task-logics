import styles from "./category-list.module.scss"

import React, {FC} from "react";
import {CategoriesInterface, SubCategoryTypeTwoInterface} from "../../../utils/interface";
import {ChooseCategorySelectBlockType, TypeSetState} from "../../../utils/type";

interface IChooseCategorySelectBlock {
    choseCategory: ChooseCategorySelectBlockType
    setChooseCategory: TypeSetState<ChooseCategorySelectBlockType>
    categoryList: CategoriesInterface[],
    subCategoryParentMemo: CategoriesInterface | null | undefined
    subCategoryTypeTwoMemo: SubCategoryTypeTwoInterface | null | undefined,
}

const ChooseCategorySelectBlock: FC<IChooseCategorySelectBlock> = ({
                                                                       choseCategory,
                                                                       subCategoryParentMemo,
                                                                       subCategoryTypeTwoMemo,
                                                                       categoryList,
                                                                       setChooseCategory
                                                                   }) => {


    return (
        <div className={styles.selectCategoryBlock}>
            <div className="select">
                <select
                    value={choseCategory?.parent}
                    onChange={(event) => setChooseCategory({
                        parent: event.target.value,
                        subTypeThree: "",
                        subTypeTwo: ""
                    })}
                >
                    <option value="">Choose main category</option>
                    {categoryList.map(category => (
                        <option value={category.id}>{category.title}</option>
                    ))}
                </select>
            </div>
            {subCategoryParentMemo && subCategoryParentMemo.subCategory.length > 0 && <div className="select">
              <select
                value={choseCategory?.subTypeTwo}
                onChange={
                    (event) => setChooseCategory(prev => ({...prev, subTypeTwo: event.target.value, subTypeThree: ""}))
                }
              >
                <option value="">Choose main category</option>
                  {subCategoryParentMemo.subCategory.map(category => (
                      <option value={category.id}>{category.title}</option>
                  ))}
              </select>
            </div>}
            {subCategoryTypeTwoMemo && subCategoryTypeTwoMemo.subCategory.length > 0 && <div className="select">
              <select
                value={choseCategory?.subTypeThree}
                onChange={
                    (event) => setChooseCategory(prev => ({...prev, subTypeThree: event.target.value}))
                }
              >
                <option value="">Choose main category</option>
                  {subCategoryTypeTwoMemo.subCategory.map(category => (
                      <option value={category.id}>{category.title}</option>
                  ))}
              </select>
            </div>}
        </div>
    )
}

export default ChooseCategorySelectBlock