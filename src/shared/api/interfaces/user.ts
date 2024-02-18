import { IError } from ".";

export interface IRegDataUser {
  name: string;
  phone: string
}

export interface ICreateUserResSuccess {
  name: string,
  username: string,
  phone: string
}

interface ICreateUserResError {
  data: null,
  error: IError
}
