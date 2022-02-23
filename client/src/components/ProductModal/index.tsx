import { Button, Modal, OutlinedInput, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useProductActions } from "../../hooks/productActions.hook";
import { ProductInfo } from "../../redux/reducers/productsReducer";

interface PropTypes extends Omit<React.ComponentProps<typeof Modal>, 'children'> {
  selectedRow: number;
  mode: 'edit' | 'create';
  close: () => void;
}

const ModalBody = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-flow: column nowrap;
  padding: 25px;
  box-sizing: border-box;
  background-color: white;
  border-radius: 20px;
  min-width: 255px;
  max-width: 400px;
  width: 25%;
  gap: 10px;
`;


const ProductModal: React.FC<PropTypes> = (props: PropTypes) => {
  const { products, create, remove, update } = useProductActions();

  const [inputData, setInputData] = useState({
    id: -1,
    name: '',
    description: '',
    price: -1,
    amount: -1
  });

  useEffect(() => {
    if (props.mode === 'edit') {
      const toEdit = products.find((product: ProductInfo) => product.id === props.selectedRow) as ProductInfo;
      setInputData({...toEdit});
    }
  }, [products, props.mode, props.selectedRow, setInputData])

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;

    setInputData({...inputData, [target.id]: target.value});
  }

  const removeHandler = () => {
    remove(props.selectedRow);
  }

  const confirmHandler = () => {
    const { id, name, description, price, amount } = inputData;
    if (props.mode === 'edit') {
      update(id, name, description, price, amount);
    } else {
      create(name, description, price, amount);
    }
  }

  return (
    <Modal
      open={props.open}
      onBackdropClick={props.close}
    >
      <ModalBody>
        <Typography
          variant="h5"
        >
          {props.mode === 'edit' ? "Редактирование" : "Добавление"}
        </Typography>
        <OutlinedInput
          id="name"
          size="small"
          placeholder="Название"
          type="text"
          onChange={changeHandler}
          value={inputData.name}
        />
        <OutlinedInput
          id="description"
          size="small"
          placeholder="Описание"
          type="text"
          onChange={changeHandler}
          value={inputData.description}
        />
        <OutlinedInput
          id="price"
          size="small"
          placeholder="Цена"
          type="number"
          onChange={changeHandler}
          value={inputData.price}
        />
        <OutlinedInput
          id="amount"
          size="small"
          placeholder="Кол-во на складе"
          type="number"
          onChange={changeHandler}
          value={inputData.amount}
        />
        <Button
          variant="contained"
            size="large"
            onClick={confirmHandler}
        >
          Сохранить
        </Button>
        {props.mode === 'edit' &&
          <Button
            color="error"
            size="large"
            variant="contained"
            onClick={removeHandler}
          >
            Удалить
          </Button>
        }
      </ModalBody>
    </Modal>
  );
};

export default ProductModal;
