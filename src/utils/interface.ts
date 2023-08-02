import {SubCategoryType} from "./type";

export interface CreateCategoryInterface {
  title: string,
  description: string
}

export interface SubCategoryTypeTwoInterface extends CreateCategoryInterface {
  id: string;
  parentId: string;
  subCategory: SubCategoryType[];
}

export interface CategoriesInterface extends CreateCategoryInterface {
  id: string;
  subCategory: SubCategoryTypeTwoInterface[];
}