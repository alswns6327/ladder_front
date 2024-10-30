import apiClient from "./apiClient";

export const searchArticleGroupList = () => 
    apiClient.get("/article/category/list");