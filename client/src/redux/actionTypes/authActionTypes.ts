import { AuthInfo } from "../reducers/authReducer";

export enum AuthActionTypes {
  AUTH_LOGIN = 'AUTH/LOGIN',
  AUTH_LOGOUT = 'AUTH/LOGOUT',
  AUTH_LOADING = 'AUTH/LOADING',  
  AUTH_ERROR = 'AUTH/ERROR',  
}

export interface AuthErrorActionPayload {
  error: string;
}

export interface AuthLoadingAction {
  type: AuthActionTypes.AUTH_LOADING;
}

export interface AuthErrorAction {
  type: AuthActionTypes.AUTH_ERROR;
  payload: AuthErrorActionPayload;
}

export interface AuthLoginAction {
  type: AuthActionTypes.AUTH_LOGIN;
  payload: AuthInfo;
}

export interface AuthLogoutAction {
  type: AuthActionTypes.AUTH_LOGOUT;
}

export type AuthAction = AuthLoginAction | AuthLogoutAction | AuthLoadingAction | AuthErrorAction;
