import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import PageBase from "../../components/PageBase";
import AppMenu from "../../components/Menu";
import columns from "./columns";
import OrderModal from "../../components/OrderModal";
import { useOrders } from "../../hooks/orderActions.hook";
import { useAuth } from "../../hooks/auth.hook";
import { Container, Paper, Typography } from "@mui/material";
import styled from "styled-components";
import { CentredTypography } from "../../components/CentredTypography";

const CustomPaper = styled(Paper)`
  margin: 40px auto;

  padding: 25px;

  & > .row {
    display: flex;
    padding: 10px;
    justify-content: space-between;
  }
`

const Divider = styled.hr`
  margin: 50px 0;
`

const LKPage: React.FC = () => {
  const { loadOrders, orders } = useOrders();
  const { userInfo: { id, ...rest } } = useAuth();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const rowsSelectionHandler = (e: GridSelectionModel) => {
    const newRows = e.map(id => Number(id));
    setSelectedRows([...newRows]);
  }

  const closeModal = useCallback(() => {
    setSelectedRows([]);
  }, [setSelectedRows])

  useEffect(() => {
    loadOrders(id);
  }, [loadOrders, id]);

  return (
    <PageBase>
      <AppMenu title="Личный кабинет" />
      <CustomPaper>
        <CentredTypography
          variant="h4"
        >
          Ваши данные
          <hr/>
        </CentredTypography>
        <Container className="row">
          <Typography variant="h6">
            Логин:
          </Typography>
          <Typography variant="h5">
            {rest.login}
          </Typography>
        </Container>
        <Container className="row">
          <Typography variant="h6">
            Роль:
          </Typography>
          <Typography variant="h5">
            {rest.role}
          </Typography>
        </Container>
      </CustomPaper>

      <Divider />

      <Typography textAlign="center" variant="h4" marginBottom="40px">
        Ваши заказы
      </Typography>
      <DataGrid
        columns={columns}
        rows={orders}
        pageSize={15}
        rowsPerPageOptions={[15]}
        onSelectionModelChange={rowsSelectionHandler}
      />

      <OrderModal
        open={!!selectedRows.length}
        selectedRow={selectedRows[0] || 0}
        close={closeModal}
      />
    </PageBase>
  );
}

export default LKPage;
