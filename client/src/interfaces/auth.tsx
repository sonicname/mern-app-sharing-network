export interface IAuthInfoBase {
  email: string;
  password: string;
}

export interface IExtentAuthInfo extends IAuthInfoBase {
  username: string;
}

export interface IUserToken {
  email: string;
  username: string;
  token: string;
}
