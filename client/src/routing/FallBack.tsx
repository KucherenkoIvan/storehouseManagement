import { LinearProgress } from "@mui/material";
import React from "react";
import { CentredPaper } from "../components/CentredPaper";
import { CentredTypography } from "../components/CentredTypography";


const FallBack: React.FC = () => {
  return (
    <CentredPaper>
      <CentredTypography>Загрузка...</CentredTypography>
      <LinearProgress  sx={ { bgcolor: '#3996f2' } } />
    </CentredPaper>
  )
}

export default FallBack;
