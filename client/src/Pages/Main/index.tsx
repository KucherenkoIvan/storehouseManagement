import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import { useProductActions } from "../../hooks/productActions.hook";
import PageBase from "../../components/PageBase";
import AppMenu from "../../components/Menu";
import columns from "./columns";
import OrderModal from "../../components/OrderModal";

const MainPage: React.FC = () => {
  const { getAll, products } = useProductActions();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);

  const rowsSelectionHandler = (e: GridSelectionModel) => {
    const newRows = e.map(id => Number(id));
    setSelectedRows([...newRows]);
  }

  const closeModal = useCallback(() => {
    setSelectedRows([]);
  }, [setSelectedRows])

  useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <PageBase>
      <AppMenu title="Главная" />
      <DataGrid
        columns={columns}
        rows={products}
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

export default MainPage;
