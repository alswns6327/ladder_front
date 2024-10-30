export type articleCategoryType = {
    articleCategorySeq : number | string;
    categoryName : string;
    articleSubCategories: articleSubCategoryType[];
}

export type articleSubCategoryType = {
    articleSubCategorySeq : number | string;
    articleCategorySeq : number | string;
    subCategoryName : string;
}