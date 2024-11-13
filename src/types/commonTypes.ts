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
    categorySeq : number | string | null;
    subCategorySeq : number | string | null;
    title : string;
    content : string;
    categoryName? : string;
    subCategoryName? : string;
    firstSaveUser? : string;
}

export type edu = {
    eduSeq? : number | string;
    categorySeq : number | string | null;
    subCategorySeq : number | string | null;
    title : string;
    content : string;
    categoryName? : string;
    subCategoryName? : string;
    firstSaveUser? : string;
}

export interface apiReturnType<RT> {
    msg : string;
    code : string;
    data : RT;
}

export type apiRequestHeadersType = {
  "Content-Type" : string
}

export type apiRequestInfo<T> = {
    uri : string,
    httpMethod : string,
    param? : T
    headers? : apiRequestHeadersType
}