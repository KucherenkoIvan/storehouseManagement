import { AuthAction, AuthActionTypes, AuthErrorAction, AuthLoginAction } from "../actionTypes/authActionTypes"

export interface AuthInfo {
  id: number,
  login: string,
  role: number,
  token: string
}

interface AuthInfoState {
  authInfo: AuthInfo,
  isLoading: boolean,
  error: string | null
}

const initialState: AuthInfoState = {
  authInfo: {
    id: -1,
    login: '',
    role: 0,
    token: ''
  },
  isLoading: false,
  error: null
}

function loading(): AuthInfoState {
  return { ...initialState, isLoading: true };
}

function login(state: AuthInfoState, action: AuthLoginAction): AuthInfoState {
  return { ...state, authInfo: action.payload,  isLoading: false, error: null };
}

function error(action: AuthErrorAction): AuthInfoState {
  return { ...initialState, ...action.payload };
}

function logout(): AuthInfoState {
  try {
    document.cookie?.replace(/(auth=(.)*(;){0,1})/, '');
  } catch (error) {
    console.error(error);
  }

  return initialState;
}

const authInfoReducer = (state: AuthInfoState = initialState, action: AuthAction) => {
  switch (action.type) {
    case AuthActionTypes.AUTH_LOGIN:
      return login(state, action);
    case AuthActionTypes.AUTH_LOGOUT:
      return logout();
    case AuthActionTypes.AUTH_LOADING:
      return loading();
    case AuthActionTypes.AUTH_ERROR:
      return error(action);
    default: return state;
  }
}

export default authInfoReducer;
