export interface IUser {
  username: string;
  email: string;
  password: string;
  role: "user" | "admin";
}

export interface IAuthRequest {
  email: string;
  password: string;
}

export interface IExtentAuthRequest extends IAuthRequest {
  username: string;
}
