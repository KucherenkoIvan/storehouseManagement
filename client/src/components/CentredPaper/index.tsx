import React from "react";
import styled, { css } from "styled-components";
import { Paper } from "@mui/material";

interface PropTypes {
  error?: boolean;
  children?: any,
}

const ExtendedPaper: React.FC<PropTypes> = ({ error, children, ...rest }) => {
  return (
    <Paper {...rest}>{children}</Paper>
  )
}

export const CentredPaper = styled(ExtendedPaper)`
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  min-width: 250px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 15px;

  ${(props => props.error && css`box-shadow: 0px 0px 20px rgba(255, 0, 0, 0.3) !important;`)}
`;
