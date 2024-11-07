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


export type article = {
    articleSeq? : number | string;
    categorySeq : number | string;
    subCategorySeq : number | string;
    title : string;
    content : string;
    categoryName? : string;
    subCategoryName? : string;
}

export type edu = {
    eduSeq? : number | string;
    categorySeq : number | string;
    subCategorySeq : number | string;
    title : string;
    content : string;
    categoryName? : string;
    subCategoryName? : string;
}