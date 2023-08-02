import CreateCategoryBlock from "./createCategory/CreateCategoryBlock";
import CategoryList from "./categoryList/CategoryList";
import {useEffect, useRef, useState} from "react";
import {CategoriesInterface, CreateCategoryInterface} from "../../utils/interface";
import {ChoseCategoryCreateSelectType} from "../../utils/type";
import {examinationExistTitle} from "../../utils/getAllTitle";

const CategoryWrapper = () => {

  const didMount = useRef(true);

  const [categoryList, setCategoryList] = useState<CategoriesInterface[]>([]);
  const id = String(Math.floor(Math.random() * 100) + 1);

  useEffect(() => {
    const categoryListStorage = localStorage.getItem("categoryList");

    if (!categoryListStorage) {
      localStorage.setItem("categoryList", JSON.stringify(categoryList));
    }

    setCategoryList(JSON.parse(categoryListStorage as string));

  }, []);

  useEffect(() => {
    if (didMount.current) {
      didMount.current = false;
      return;
    }
    localStorage.removeItem("categoryList");

    localStorage.setItem("categoryList", JSON.stringify(categoryList));

  }, [categoryList]);


  const handleCreateSubCategory = (dataCategory: CreateCategoryInterface, choseCategoryCreateSelect: ChoseCategoryCreateSelectType) => {

    if (examinationExistTitle(categoryList, dataCategory.title)) {
      return alert(`This ${dataCategory.title} already exist`);
    }

    if (choseCategoryCreateSelect.parent && !choseCategoryCreateSelect.subCategory) {
      const newCategory = {
        id,
        parentId: choseCategoryCreateSelect.parent,
        subCategory: [],
        ...dataCategory
      };

      setCategoryList(prev => prev?.map(item => {
        if (item.id === choseCategoryCreateSelect.parent) {
          return {
            ...item,
            subCategory: [...item.subCategory, newCategory]
          };
        }

        return item;
      }));
    }

    if (choseCategoryCreateSelect.subCategory) {
      const newCategory = {
        id,
        parentId: choseCategoryCreateSelect.subCategory,
        ...dataCategory
      };

      setCategoryList(prev => prev?.map(item => {
        if (item.id === choseCategoryCreateSelect.parent) {
          return {
            ...item,
            subCategory: item.subCategory.map(subCategoryItem => {
              if (subCategoryItem.id === choseCategoryCreateSelect.subCategory) {
                return {
                  ...subCategoryItem,
                  subCategory: [...subCategoryItem.subCategory, newCategory]
                };
              }

              return subCategoryItem;
            })
          };
        }

        return item;
      }));
    }

    alert(`Successfuly create ${dataCategory.title}`);
  };

  const createCategory = (dataCategory: any, choseCategoryCreateSelect?: ChoseCategoryCreateSelectType) => {
    if (choseCategoryCreateSelect) {
      return handleCreateSubCategory(dataCategory, choseCategoryCreateSelect);
    }

    const newData: CategoriesInterface = {
      id,
      subCategory: [],
      ...dataCategory
    };
    setCategoryList(prev => [...prev, newData]);
  };

  return (
    <>
      <CreateCategoryBlock categoryList={categoryList} createCategory={createCategory} />
      <CategoryList categoryList={categoryList} setCategoryList={setCategoryList} />
    </>
  );
};

export default CategoryWrapper;