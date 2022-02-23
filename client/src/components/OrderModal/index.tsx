import { Box, Button, Container, Modal, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useAuth } from "../../hooks/auth.hook";
import { useOrders } from "../../hooks/orderActions.hook";
import { useProductActions } from "../../hooks/productActions.hook";

interface PropTypes extends Omit<React.ComponentProps<typeof Modal>, 'children'> {
  selectedRow: number;
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

const Nowrap = styled(Container)`
  display: flex !important;
  flex-flow: raw nowrap;
  justify-content: space-between;
`


const OrderModal: React.FC<PropTypes> = (props: PropTypes) => {
  const { products } = useProductActions();

  const { userInfo: { id } } = useAuth();

  const { makeOrder } = useOrders();

  const product = products.find(product => product.id === props.selectedRow);

  const [inputData, setInputData] = useState({
    amount: 0,
  });

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.currentTarget;
    const value  = Number(target.value);

    if (value > Number(product?.amount)) {
      target.value = (product?.amount || '').toString();
      setInputData({...inputData, [target.id]: product?.amount});
    } else if (value <= 0) {
      setInputData({...inputData, [target.id]: 0});
    } else {
      setInputData({...inputData, [target.id]: value});
    }
  }

  const confirmHandler = () => {
    makeOrder(id, Number(product?.id), inputData.amount);
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
          Заказ со склада
        </Typography>
        <Box>
          <Nowrap>
            <Typography variant="button">
              Название:
            </Typography>
            <Typography variant="h6">
              { product?.name }
            </Typography>
          </Nowrap>

          <Nowrap>
            <Typography variant="button">
              Описание:
            </Typography>
            <Typography variant="h6">
              { product?.description }
            </Typography>
          </Nowrap>
          <Nowrap>
            <Typography variant="button">
              Цена:
            </Typography>
            <Typography variant="h6">
              { product?.price }
            </Typography>
          </Nowrap>
          <Nowrap>
            <Typography variant="button">
              Кол-во на складе:
            </Typography>
            <Typography variant="h6">
              { product?.amount }
            </Typography>
          </Nowrap>
          <hr/>
          {product && inputData.amount && (
            <>
              <Nowrap>
                <Typography
                  variant="body2"
                >
                  Общая стоимость: 
                </Typography>
                <Typography
                  variant="body1"
                >
                  {inputData.amount * product?.price}
                </Typography>
              </Nowrap>

              <Nowrap>
                <Typography
                  variant="body2"
                >
                  Остаток на складе: 
                </Typography>
                <Typography
                  variant="body1"
                >
                  {product?.amount - inputData.amount}
                </Typography>
              </Nowrap>
            </>
          )}

        </Box>
        <TextField
          id="amount"
          size="small"
          placeholder="Кол-во в заказе"
          type="number"
          onChange={changeHandler}
        />
        <Button
          variant="contained"
          size="large"
          onClick={confirmHandler}
          disabled={inputData.amount > Number(product?.amount) || inputData.amount <= 0}
        >
          Заказать
        </Button>
      </ModalBody>
    </Modal>
  );
};

export default OrderModal;
