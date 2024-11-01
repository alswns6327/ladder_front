import apiClient from "./apiClient";
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";

export const searchArticleGroupList = () => 
    apiClient.get("/article/category/list");

export const saveCategory = (category : commonTypes.categoryType) => 
    apiClient.post("/article/category", category);

export const updateCategory = (category : commonTypes.categoryType) => 
    apiClient.put("/article/category", category);

export const saveSubCategory = (subCategory : commonTypes.subCategoryType) => 
    apiClient.post("/article/sub-category", subCategory);

export const updateSubCategory = (subCategory : commonTypes.subCategoryType) => 
    apiClient.put("/article/sub-category", subCategory);