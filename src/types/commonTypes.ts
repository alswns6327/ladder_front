export type categoryType = {
    categorySeq : number | string;
    categoryName : string;
    subCategories: subCategoryType[];
}

export type subCategoryType = {
    subCategorySeq : number | string;
    categorySeq : number | string;
    subCategoryName : string;
}