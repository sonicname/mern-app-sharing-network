export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IExtentAuthRequest extends IAuthRequest {
  username: string;
}
