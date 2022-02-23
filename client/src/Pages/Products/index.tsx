import React, { useCallback, useEffect, useState } from "react";
import { DataGrid, GridSelectionModel } from '@mui/x-data-grid';
import ProductModal from "../../components/ProductModal";
import { useProductActions } from "../../hooks/productActions.hook";
import { Button } from "@mui/material";
import ButtonLine from "../../components/ButtonLine";
import PageBase from "../../components/PageBase";
import AppMenu from "../../components/Menu";
import columns from "./columns";

const ProductsPage: React.FC = () => {
  const { getAll, products } = useProductActions();
  const [selectedRows, setSelectedRows] = useState<number[]>([]);
  const [modalMode, setModalMode] = useState<'edit' | 'create'>('edit');

  const rowsSelectionHandler = (e: GridSelectionModel) => {
    const newRows = e.map(id => Number(id));
    setSelectedRows([...newRows]);
  }

  const closeModal = useCallback(() => {
    setSelectedRows([]);
  }, [setSelectedRows])

  const createClickHandler = () => {
    setModalMode('create');
    setSelectedRows([-1]);
  }

  const rowClickHandler = () => {
    setModalMode('edit');
  }

  useEffect(() => {
    getAll();
  }, [getAll]);

  return (
    <PageBase>
      <AppMenu title="Управление продуктами" />
      <DataGrid
        columns={columns}
        rows={products}
        pageSize={15}
        rowsPerPageOptions={[15]}
        onSelectionModelChange={rowsSelectionHandler}
        onRowClick={rowClickHandler}
      />

      <ProductModal
        open={!!selectedRows.length}
        selectedRow={selectedRows[0] || 0}
        close={closeModal}
        mode={modalMode}
      />
      <ButtonLine>
        <Button
          variant="contained"
          size="large"
          onClick={createClickHandler}
        >
          Добавить
        </Button>
      </ButtonLine>
    </PageBase>
  );
}

export default ProductsPage;
