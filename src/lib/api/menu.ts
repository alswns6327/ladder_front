import { httpMethods } from "./apiClient";
import * as commonTypes from "../../types/commonTypes";

export const searchMenuList = () : commonTypes.apiRequestInfo<void> =>
  ({uri : "/menu", httpMethod : httpMethods.GET});