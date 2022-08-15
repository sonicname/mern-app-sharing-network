interface IUsername {
  username: string;
}

interface IEmail {
  email: string;
}

interface IPassword {
  password: string;
}

export interface IRequestSignIn extends IEmail, IPassword {}

export interface IRequestSignUp extends IRequestSignIn, IUsername {}

export interface IRequestUpdateUser extends IRequestSignIn, IUsername {
  confirmPassword: string;
}

export interface IUserToken extends IEmail, IUsername {
  token: string;
}
