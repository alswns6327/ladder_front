import { AxiosInstance } from "axios";
import apiClient, { httpMethods } from "./apiClient";
import * as authTypes from "../../types/authTypes"
import * as commonTypes from "../../types/commonTypes"

export const regist = (userInfo: authTypes.ladderUserType) : commonTypes.apiRequestInfo<authTypes.ladderUserType>=>
  ({uri : "/account", httpMethod : httpMethods.POST, param : userInfo});

export const login = (loginInfo: authTypes.ladderUserType) : commonTypes.apiRequestInfo<authTypes.ladderUserType> =>
  ({uri : "/login", httpMethod : httpMethods.POST, param : loginInfo});

export const searchUsers = () : commonTypes.apiRequestInfo<void> => 
  ({uri : "/account/list", httpMethod : httpMethods.GET});

export const logout = () : commonTypes.apiRequestInfo<void> => 
  ({uri : "/logout", httpMethod : httpMethods.DELETE});

export const idDuplicationCheck = (userId : string) : commonTypes.apiRequestInfo<string> =>
  ({uri : `/account/${userId}`, httpMethod : httpMethods.GET});

export const withdrawAccount = (userId : string) : commonTypes.apiRequestInfo<string> =>
  ({uri : `/account/${userId}`, httpMethod : httpMethods.DELETE});