import apiClient, { httpMethods } from "./apiClient";
import * as eduTypes from "../../types/eduTypes";
import * as commonTypes from "../../types/commonTypes";

export const searchEduGroupList = (userId : string) : commonTypes.apiRequestInfo<void> => 
    ({uri : `/edu/category/list?userId=${userId}`, httpMethod : httpMethods.GET});

export const saveCategory = (category : commonTypes.categoryType) : commonTypes.apiRequestInfo<commonTypes.categoryType> => 
    ({uri : "/edu/category", httpMethod : httpMethods.POST, param : category});

export const updateCategory = (category : commonTypes.categoryType) : commonTypes.apiRequestInfo<commonTypes.categoryType> => 
    ({uri : "/edu/category", httpMethod : httpMethods.PUT , param :  category});

export const deleteCategory = (categorySeq : number) : commonTypes.apiRequestInfo<void> =>
    ({uri : `/edu/category/${categorySeq}`, httpMethod : httpMethods.DELETE});

export const saveSubCategory = (subCategory : commonTypes.subCategoryType) : commonTypes.apiRequestInfo<commonTypes.subCategoryType> => 
    ({uri : "/edu/sub-category", httpMethod : httpMethods.POST, param : subCategory});

export const updateSubCategory = (subCategory : commonTypes.subCategoryType) : commonTypes.apiRequestInfo<commonTypes.subCategoryType> => 
    ({uri : "/edu/sub-category", httpMethod : httpMethods.PUT, param : subCategory});

export const deleteSubCategory = (subCategorySeq : number) : commonTypes.apiRequestInfo<void> =>
    ({uri : `/edu/sub-category/${subCategorySeq}`, httpMethod : httpMethods.DELETE});

export const saveEdu = (edu : commonTypes.edu) : commonTypes.apiRequestInfo<commonTypes.edu> =>
    ({uri : "/edu", httpMethod : httpMethods.POST, param : edu});

export const searchEduList = (searchParam : string) : commonTypes.apiRequestInfo<void> =>
    ({uri : `/edu?searchParam=${searchParam}`, httpMethod : httpMethods.GET});

export const searchEdu = (eduSeq : number) : commonTypes.apiRequestInfo<void> =>
    ({uri : `/edu/${eduSeq}`, httpMethod : httpMethods.GET});

export const updateEdu = (edu : commonTypes.edu) : commonTypes.apiRequestInfo<commonTypes.edu> =>
    ({uri : "/edu", httpMethod : httpMethods.PUT, param : edu});

export const deleteEdu = (eduSeq : number) : commonTypes.apiRequestInfo<void> =>
    ({uri : `/edu/${eduSeq}`, httpMethod : httpMethods.DELETE});