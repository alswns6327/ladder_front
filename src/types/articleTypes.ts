export type articleCategoryType = {
    categorySeq : number | string;
    categoryName : string;
    subCategories: articleSubCategoryType[];
}

export type articleSubCategoryType = {
    subCategorySeq : number | string;
    categorySeq : number | string;
    subCategoryName : string;
}
