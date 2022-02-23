import { GridColDef } from '@mui/x-data-grid';

const columnsDefenition: GridColDef[] = [
  {
    field: 'product',
    headerName: 'ID продукта',
    flex: 1
  },
  {
    field: 'amount',
    headerName: 'Кол-во',
    flex: 1,
  },
  {
    field: 'createdAt',
    headerName: 'Время заказа',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  }
];

export default columnsDefenition;
