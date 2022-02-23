import React, { useState } from "react";
import { useAuth } from "../../hooks/auth.hook";
import { TextField, Button } from '@mui/material';
import { CentredPaper } from "../../components/CentredPaper";
import { CentredTypography } from "../../components/CentredTypography";
import { Link } from "react-router-dom";

const RegisterPage: React.FC = () => {
  const [inputData, setInputData] = useState({
    login: '',
    password: ''
  });

  const { error, register } = useAuth();

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    setInputData({...inputData, [target.id]: target.value});
  }

  const logInHandler = () => {
    register(inputData.login, inputData.password)
  }

  return (
    <CentredPaper error={!!error}>
      <CentredTypography
        variant="h4"
      >
        Вход
      </CentredTypography>
      <TextField
        size="small"
        className="control"
        id="login"
        onChange={changeHandler}
        required
      />
      <TextField
        size="small"
        className="control"
        id="password"
        type="password"
        onChange={changeHandler}
        required
      />
      <Button
        size="large"
        className="control"
        variant="contained"
        onClick={logInHandler}
      >
        Войти
      </Button>
      <Link
        to="/login"
      >
        <CentredTypography
          variant="button"
        >
          Вход
        </CentredTypography>
      </Link>
    </CentredPaper>
  );
};

export default RegisterPage;
