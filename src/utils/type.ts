import {Dispatch, SetStateAction} from "react";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>;

export type SubCategoryType = {
  id: string,
  parentId: string,
  title: string,
  description: string
}

export type ChoseCategoryCreateSelectType = {
  parent: string,
  subCategory: string
}

export type ChooseCategorySelectBlockType = {
  parent: string,
  subTypeTwo: string,
  subTypeThree: string
}