export type eduCategoryType = {
    categorySeq : number | string;
    categoryName : string;
    subCategories: eduSubCategoryType[];
}

export type eduSubCategoryType = {
    subCategorySeq : number | string;
    categorySeq : number | string;
    subCategoryName : string;
}