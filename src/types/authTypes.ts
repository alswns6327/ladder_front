export type authInitialStateType = {
    ladderAccountId: string;
    ladderAccountName: string;
    ladderAccountEmail: string;
    ladderAccountAuth: string;
  };
  
export type ladderUserType = {
    ladderAccountId: string;
    ladderAccountPassword: string;
    ladderAccountName?: string;
    ladderAccountEmail?: string;
    ladderAccountAuth?: string;
    accessToken?: string;
};

export type ladderUserSelectType = {
  ladderAccountSeq : number;
  ladderAccountId : string;
}