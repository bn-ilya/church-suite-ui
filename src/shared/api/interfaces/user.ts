import { IError } from ".";

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
  "role": null | string
}

export interface IRegDataUser {
  name: string;
  phone: string
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