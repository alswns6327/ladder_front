import { AxiosInstance } from "axios";
import apiClient from "./apiClient";

interface registParam {
  ladderAccountId: string;
  ladderAccountPassword: string;
  ladderAccountName: string;
  ladderAccountEmail: string;
}

export const regist = ({
  ladderAccountId,
  ladderAccountPassword,
  ladderAccountName,
  ladderAccountEmail,
}: registParam) =>
  apiClient.post("/account", {
    ladderAccountId,
    ladderAccountPassword,
    ladderAccountName,
    ladderAccountEmail,
  });
