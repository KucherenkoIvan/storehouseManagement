import { logIn, logOut, register as Reg } from '../redux/actionCreators/authActionCreators';
import { useSelector, useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { RootState } from '../redux/reducers';

export const useAuth = () => {
  const userInfo = useSelector((state: RootState) => state.auth.authInfo);
  const error = useSelector((state: RootState) => state.auth.error);
  const isLoading = useSelector((state: RootState) => state.auth.isLoading);
  
  const dispatch = useDispatch();

  const login = useCallback((login, password) => {
    dispatch(logIn(login, password));
  }, [dispatch]);

  const register = useCallback((login, password) => {
    dispatch(Reg(login, password));
  }, [dispatch]);

  const logout = useCallback(() => {
    dispatch(logOut());
  }, [dispatch]);

  return { userInfo, error, isLoading, register, login, logout };
}