interface IEmail {
  email: string;
}

interface IPassword {
  password: string;
}

interface IUsername {
  username: string;
}

export interface IUser extends IEmail, IUsername, IPassword {
  role: "user" | "admin";
}

export interface ILoginRequest extends IEmail, IPassword {}

export interface IRegisterRequest extends IEmail, IPassword, IUsername {}

export interface IUpdateRequest extends IEmail, IPassword, IUsername {
  confirmPassword: string;
}
