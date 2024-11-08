import apiClient from "./apiClient";
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";

export const searchArticleGroupList = (userId : string) => 
    apiClient.get(`/article/category/list?userId=${userId}`);

export const saveCategory = (category : commonTypes.categoryType) => 
    apiClient.post("/article/category", category);

export const updateCategory = (category : commonTypes.categoryType) => 
    apiClient.put("/article/category", category);

export const deleteCategory = (categorySeq : number) =>
    apiClient.delete(`/article/category/${categorySeq}`);

export const saveSubCategory = (subCategory : commonTypes.subCategoryType) => 
    apiClient.post("/article/sub-category", subCategory);

export const updateSubCategory = (subCategory : commonTypes.subCategoryType) => 
    apiClient.put("/article/sub-category", subCategory);

export const deleteSubCategory = (subCategorySeq : number) =>
    apiClient.delete(`/article/sub-category/${subCategorySeq}`);

export const saveArticle = (article : commonTypes.article) =>
    apiClient.post("/article", article);

export const searchArticleList = (searchParam : string) =>
    apiClient.get(`/article?searchParam=${searchParam}`);

export const searchArticle = (articleSeq : number) =>
    apiClient.get(`/article/${articleSeq}`);

export const updateArticle = (article : commonTypes.article) =>
    apiClient.put("/article", article);

export const deleteArticle = (articleSeq : number) =>
    apiClient.delete(`/article/${articleSeq}`);