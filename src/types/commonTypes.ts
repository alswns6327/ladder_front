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

export type modalInitialType = {
    toast : toastModalType,
    alert : alertModalType,
    confirm : confirmModalType
}

export type toastModalType = {
    display : boolean;
    messageType : "success" | "warning" | "error";
    text : string;
}

export type alertModalType = {
    display : boolean;
    text : string;
    width : number;
    height : number;
}

export type confirmModalType = {
    display : boolean;
    text : string;
    width : number;
    height : number;
    confirmFn : () => void;
}

export type menu = {
    menuSeq : number;
    menuPath : string;
    menuName : string;
}