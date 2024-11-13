import apiClient, { httpMethods } from "./apiClient";
import * as articleTypes from "../../types/articleTypes";
import * as commonTypes from "../../types/commonTypes";

export const searchArticleGroupList = (userId : string) : commonTypes.apiRequestInfo<void> => 
    ({uri : `/article/category/list?userId=${userId}`, httpMethod : httpMethods.GET});

export const saveCategory = (category : commonTypes.categoryType) : commonTypes.apiRequestInfo<commonTypes.categoryType> => 
    ({uri : "/article/category", httpMethod : httpMethods.POST, param : category});

export const updateCategory = (category : commonTypes.categoryType) : commonTypes.apiRequestInfo<commonTypes.categoryType> => 
    ({uri : "/article/category", httpMethod : httpMethods.GET, param : category});

export const deleteCategory = (categorySeq : number) : commonTypes.apiRequestInfo<void> => 
    ({uri : `/article/category/${categorySeq}`, httpMethod : httpMethods.PUT});

export const saveSubCategory = (subCategory : commonTypes.subCategoryType) : commonTypes.apiRequestInfo<commonTypes.subCategoryType> => 
    ({uri : "/article/sub-category", httpMethod : httpMethods.POST, param: subCategory});

export const updateSubCategory = (subCategory : commonTypes.subCategoryType) : commonTypes.apiRequestInfo<commonTypes.subCategoryType> => 
    ({uri : "/article/sub-category", httpMethod : httpMethods.PUT, param : subCategory});

export const deleteSubCategory = (subCategorySeq : number) : commonTypes.apiRequestInfo<void> => 
    ({uri : `/article/sub-category/${subCategorySeq}`, httpMethod : httpMethods.PUT});

export const saveArticle = (article : commonTypes.article) : commonTypes.apiRequestInfo<commonTypes.article> => 
    ({uri : "/article", httpMethod : httpMethods.POST, param: article});

export const searchArticleList = (searchParam : string) : commonTypes.apiRequestInfo<void> => 
    ({uri : `/article?searchParam=${searchParam}`, httpMethod : httpMethods.GET});

export const searchArticle = (articleSeq : number) : commonTypes.apiRequestInfo<void> => 
    ({uri : `/article/${articleSeq}`, httpMethod : httpMethods.GET});

export const updateArticle = (article : commonTypes.article) : commonTypes.apiRequestInfo<commonTypes.article> => 
    ({uri : "/article", httpMethod : httpMethods.PUT, param : article});

export const deleteArticle = (articleSeq : number) : commonTypes.apiRequestInfo<void>=>
    ({uri : `/article/${articleSeq}`, httpMethod : httpMethods.DELETE});