import { AxiosInstance } from "axios";
import apiClient from "./apiClient";

type ladderUserType = {
  ladderAccountId: string;
  ladderAccountPassword: string;
  ladderAccountName?: string;
  ladderAccountEmail?: string;
  ladderAccountAuth?: string;
};

export const regist = ({
  ladderAccountId,
  ladderAccountPassword,
  ladderAccountName,
  ladderAccountEmail,
}: ladderUserType) =>
  apiClient.post("/account", {
    ladderAccountId,
    ladderAccountPassword,
    ladderAccountName,
    ladderAccountEmail,
  });

export const login = ({
  ladderAccountId,
  ladderAccountPassword,
}: ladderUserType) =>
  apiClient.post("/login", {
    ladderAccountId,
    ladderAccountPassword,
  });

export const logout = () => apiClient.post("/logout");
