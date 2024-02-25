import { IAttributesCommonsRes, IDataCheque, ILiveChatClient } from ".";
import { IFile } from "./entities/file";

export interface IUser {
  "id": number,
  "username": string,
  "email": string,
  "provider": string,
  "password": null | string,
  "resetPasswordToken": null | string,
  "confirmationToken": null | string,
  "confirmed": boolean,
  "blocked": boolean,
  "createdAt": string,
  "updatedAt": string,
  "phone": string,
  "code": string,
  "name": string,
  "role": null | string,
  "lc_form_id": null | string
}

export interface IRegDataUser {
  name: string;
  phone: string
}

export interface IEditDataUser {
  name: string;
}

export interface IEditUserResSuccess {
  status: "success";
}

export interface ICreateUserResSuccess {
  name: string,
  username: string,
  phone: string
}

export interface IConfirmDataLogin {
  code: string,
  phone: string
}

export interface IConfirmLoginResSuccess {
  jwt: string,
  user: IUser
}

export interface ISetLcData {
  lcFormId: number;
}

export interface ISetLcResSuccess {
  lcFormId: number;
}

export interface IGetMeResUser extends  Omit<IUser, 'password' | 'resetPasswordToken' | 'confirmationToken' | 'role'> {
  "lc_form_id": string,
};

export interface IGetMeResLcForm extends Omit<ILiveChatClient, 'cheques'>, IAttributesCommonsRes {
  id: number;
  cheques: Array<IFile> | null,
}

export interface IGetMeResSuccess extends IGetMeResUser {
  "lc_form"?: IGetMeResLcForm
}