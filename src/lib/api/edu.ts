import apiClient from "./apiClient";
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";

export const searchEduGroupList = (userId : string) => 
    apiClient.get(`/edu/category/list?userId=${userId}`);

export const saveCategory = (category : commonTypes.categoryType) => 
    apiClient.post("/edu/category", category);

export const updateCategory = (category : commonTypes.categoryType) => 
    apiClient.put("/edu/category", category);

export const deleteCategory = (categorySeq : number) =>
    apiClient.delete(`/edu/category/${categorySeq}`);

export const saveSubCategory = (subCategory : commonTypes.subCategoryType) => 
    apiClient.post("/edu/sub-category", subCategory);

export const updateSubCategory = (subCategory : commonTypes.subCategoryType) => 
    apiClient.put("/edu/sub-category", subCategory);

export const deleteSubCategory = (subCategorySeq : number) =>
    apiClient.delete(`/edu/sub-category/${subCategorySeq}`);

export const saveEdu = (edu : commonTypes.edu) =>
    apiClient.post("/edu", edu);

export const searchEduList = (searchParam : string) =>
    apiClient.get(`/edu?searchParam=${searchParam}`);

export const searchEdu = (eduSeq : number) =>
    apiClient.get(`/edu/${eduSeq}`);

export const updateEdu = (edu : commonTypes.edu) =>
    apiClient.put("/edu", edu);