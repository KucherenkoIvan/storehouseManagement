import { GridColDef } from '@mui/x-data-grid';

const columnsDefenition: GridColDef[] = [
  {
    field: 'id',
    headerName: 'ID',
    headerAlign: 'center',
    align: 'center',
    flex: 0.2
  },
  {
    field: 'name',
    headerName: 'Название',
    flex: 2
  },
  {
    field: 'description',
    headerName: 'Описание',
    flex: 6,
  },
  {
    field: 'price',
    headerName: 'Цена',
    type: 'number',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
  {
    field: 'amount',
    headerName: 'Кол-во на складе',
    flex: 1,
    headerAlign: 'center',
    align: 'center'
  },
];

export default columnsDefenition;
