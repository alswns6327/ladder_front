import axios, { AxiosError, AxiosHeaders, AxiosResponse } from "axios";
import * as commonTypes from "../../types/commonTypes";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    Authorization: "Bearer ".concat(
      localStorage.getItem("accessToken") as string
    ),
  },
  withCredentials: true
});

export const httpMethods = {
  GET : "GET",
  POST : "POST",
  PUT : "PUT",
  DELETE : "DELETE",
  PATCH : "PATCH",
}

export const requestApiFn = async <T, RT> (
  apiRequestInfo : commonTypes.apiRequestInfo<T>
) : Promise<commonTypes.apiReturnType<RT>>  => {
  const {uri, httpMethod, param, headers} : commonTypes.apiRequestInfo<T> = apiRequestInfo;
  let result : commonTypes.apiReturnType<RT> = {
    msg : "",
    code : "400",
    data : {} as RT
  }
  let response : AxiosResponse | null = null;
  try{
    const config =  headers ? {headers : headers} : {};
    switch(httpMethod){
      case "GET" : 
        response = await apiClient.get(uri, config);
        break;
      case "POST" : 
        response = await apiClient.post(uri, param, config);
        break;
      case "PUT" : 
        response = await apiClient.put(uri, param, config);
        break;
      case "DELETE" : 
        response = await apiClient.delete(uri, config);
        break;
      case "PATCH" : 
        response = await apiClient.patch(uri, param, config);
        break;
    }
    if(response){
      const responseHeaders : AxiosHeaders = response.headers as AxiosHeaders;
      const newAccessToken : string | undefined = responseHeaders.get("new-access-token") as string | undefined;

      if(newAccessToken){
        localStorage.setItem("accessToken", newAccessToken);
        apiClient.defaults.headers.Authorization = "Bearer ".concat(newAccessToken);
      }

      const data = response.data as commonTypes.apiReturnType<RT>;
      if(response.status === 204) {
        result.code = "200";
        result.msg = "success";
      } else result = data;
    }
  }catch(e){
    const error : AxiosError = e as AxiosError;
    const status = error.status;
    result = {
      msg : "실행 오류",
      code : "400",
      data : {} as RT
    }
    if(status === 403) result.msg = "권한 없음";
    else if(status === 401) result.msg = "재로그인 필요";
  }
  return result;
}

export default apiClient;
