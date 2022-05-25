import { Action } from "@ngrx/store";
import { User } from "../../models/user.model";

export enum AuthActionTypes {
  SIGNUP = "[Auth] SIGNUP",
  SIGNUP_COMPLETE = "[Auth] SIGNUP_COMPLETE",
  SIGNUP_ERROR = "[Auth] SIGNUP_ERROR",

  LOGIN = "[Auth] LOGIN",
  LOGIN_COMPLETE = "[Auth] LOGIN_COMPLETE",
  LOGIN_ERROR = "[Auth] LOGIN_ERROR",

  LOGOUT = "[Auth] LOGOUT",
  LOGOUT_COMPLETE = "[Auth] LOGOUT_COMPLETE",
  LOGOUT_ERROR = "[Auth] LOGOUT_ERROR",
}

export class Signup implements Action {
  readonly type = AuthActionTypes.SIGNUP;
  constructor(public formData: User) {}
}

export class SignupComplete implements Action {
  readonly type = AuthActionTypes.SIGNUP_COMPLETE;
  constructor(public payload: any) {}
}

export class SignupError implements Action {
  readonly type = AuthActionTypes.SIGNUP_ERROR;
  constructor(public payload: string) {}
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;
  constructor(public formData: User) {}
}

export class LoginComplete implements Action {
  readonly type = AuthActionTypes.LOGIN_COMPLETE;
  constructor(public payload: any) {}
}

export class LoginError implements Action {
  readonly type = AuthActionTypes.LOGIN_ERROR;
  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class LogoutComplete implements Action {
  readonly type = AuthActionTypes.LOGOUT_COMPLETE;
}

export class LogoutError implements Action {
  readonly type = AuthActionTypes.LOGOUT_ERROR;
  constructor(public payload: string) {}
}

export type AuthActions =
  | Signup
  | SignupComplete
  | SignupError
  | Login
  | LoginComplete
  | LoginError
  | Logout
  | LogoutComplete
  | LogoutError;
