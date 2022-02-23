import { Dispatch } from 'redux';
import { AuthActionTypes, AuthAction } from '../actionTypes/authActionTypes';
import { AuthInfo } from '../reducers/authReducer';

export const logIn = (login: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.AUTH_LOADING
    });

    try {
      const res = await fetch(`api/user/auth/`, {
        credentials: 'same-origin',
        method: 'POST',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          login, password
        })
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const payload: AuthInfo = {
        id: data.id,
        login: data.login,
        role: data.role,
        token: data.authToken
      }

      dispatch({
        type: AuthActionTypes.AUTH_LOGIN,
        payload
      });

    } catch(error) {
      dispatch({
        type: AuthActionTypes.AUTH_ERROR,
        payload: {
          error: (error as Error).message
        }
      });
    }
  }
}

export const logOut = () => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.AUTH_LOGOUT
    });
  }
} 

export const register = (login: string, password: string) => {
  return async (dispatch: Dispatch<AuthAction>) => {
    dispatch({
      type: AuthActionTypes.AUTH_LOADING
    });

    try {
      const res = await fetch(`/api/user/register/`, {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          login, password, role: 1
        })
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const payload: AuthInfo = {
        id: data.id,
        login: data.login,
        role: data.role,
        token: data.authToken
      }

      dispatch({
        type: AuthActionTypes.AUTH_LOGIN,
        payload
      });

    } catch(error) {
      dispatch({
        type: AuthActionTypes.AUTH_ERROR,
        payload: {
          error: (error as Error).message
        }
      });
    }
  }
} 
