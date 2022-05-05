import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Header from "./Header";
import Footer from "./Footer";
import CloseOutlined from "@mui/icons-material/CloseOutlined";
import { decquantity, incquantity, remove } from "../features/meal/cartslice";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mobile } from "../responsive";

const CartHeader = styled.h1`
  width: 100%;
  text-align: center;
  border-bottom: 3px solid;
  padding-top: 10vh;
`;

const RightBillSection = styled.div`
  position: sticky;
  top: 8vh;
  border: 2px solid crimson;
  /* border-top: none; */
  height: 47vh;
  flex: 1;
  ${Mobile({ position: "static" })}
`;

const RightHeading = styled.h2`
  width: 100%;
  text-align: center;
  padding: 10px;
`;

const RightBox = styled.div`
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2%;
`;

const ItemTotal = styled.div`
  border-top: 2px solid crimson;
  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;
const ItemTotalOne = styled.p``;
const ItemTotalTwo = styled.p``;

const DeliveryFee = styled.div`
  border-top: 2px solid crimson;

  font-size: 1.1rem;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const DeliveryFeeOne = styled.p``;
const DeliveryFeeTwo = styled.p``;

const Topay = styled.div`
  border-top: 2px solid;
  font-size: 1.1rem;
  font-weight: bold;
  display: flex;
  justify-content: space-between;
  padding: 15px;
`;

const TopayOne = styled.p``;
const TopayTwo = styled.p``;

const Checkout = styled.button`
  margin-top: 3%;
  align-self: center;
  display: flex;
  justify-content: center;
  cursor: pointer;
  padding: 18px;
  width: 150px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #1976d2;
  color: #ffffffce;
  font-size: 1.05rem;
  font-weight: bold;
`;

const Boss = styled.div`
  width: 100%;
  min-height: 74vh;
  display: flex;
  ${Mobile({ flexDirection: "column" })}
`;

const Container = styled.div`
  flex: 4;
  padding: 10px 50px;
  display: flex;
  flex-wrap: wrap;
  ${Mobile({
    justifyContent: "center",
    padding: "0px",
  })}
`;

const Image = styled.img`
  border-radius: 15px 15px 0px 0px;
  object-fit: cover;
  display: block;
  width: 230px;
  height: 80%;
  ${Mobile({ height: "150px", width: "150px" })}
`;

const CartItem = styled.div`
  height: 300px;
  margin: 26px;
  position: relative;
  color: #ffffffce;
  font-size: 1.001rem;
  font-weight: bold;
  ${Mobile({ margin: "4.5%", height: "100%" })}
`;

const Span = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: crimson;
  height: 40px;
  width: 50px;
  border-radius: 15px 0px 15px 0px;
`;

const Span2 = styled.span`
  display: Flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: #1976d2;
  cursor: pointer;
  top: 0;
  right: 0;
  height: 40px;
  width: 50px;
  border-radius: 0px 15px 0px 15px;
  opacity: 0;
  transition: 0.3s all ease-in-out;

  ${CartItem}:hover & {
    opacity: 1;
  }
  ${Mobile({ opacity: "1" })}
`;

const Title = styled.p`
  width: 70%;
`;

const Bottom = styled.div`
  min-height: 20%;
  border-radius: 0px 0px 15px 15px;
  padding: 0px 10px;
  background-color: crimson;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 230px;
  ${Mobile({ height: "80px", width: "150px" })}
`;

const BottomRight = styled.div`
  ${Mobile({ width: "50%" })}
`;

const Button = styled.button`
  font-size: 1.01rem;
  color: #ffffffce;
  padding: 0px 5px;
  cursor: pointer;
  border: none;
  background-color: #1976d2;
  &:disabled,
  &[disabled] {
    background-color: #95b1ce;
    color: black;
  }
`;

const EmptyCart = styled.div`
  min-height: 58vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  ${Mobile({ height: "50vh", justifyContent: "center", gap: "10%" })}
`;

const EmptyCartImage = styled.img`
  height: 300px;
  /* background-color: cyan; */
  ${Mobile({ height: "200px" })}
`;

const EmptyCartDetails = styled.div`
  /* color: #ffffffce; */
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  /* background-color: green; */
`;

const EmptyCartTitle = styled.h2`
  padding-bottom: 5px;
`;

const EmptyCartP = styled.p`
  font-size: 1.07rem;
  padding-bottom: 25px;
`;

const BottomButton = styled.button`
  transition: 0.5s all ease-in-out;
  cursor: pointer;
  padding: 18px;
  width: 150px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: #1976d2;
  color: #ffffffce;
  font-size: 1.05rem;
  font-weight: bold;
`;

const Quantity = styled.span`
  padding: 0px 5px;
`;

const Cart = ({ theme, setTheme }) => {
  const cartItems = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const decQuantityHandler = (e) => {
    dispatch(decquantity(e));
  };

  const incQuantityHandler = (e) => {
    dispatch(incquantity(e));
  };

  const removeHandler = (e) => {
    toast(`${e.strMeal || e.recipe.label} removed from cart`);
    dispatch(remove(e));
  };

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <CartHeader>Cart</CartHeader>
      <Boss>
        <Container>
          {cartItems.length > 0 ? (
            cartItems.map((e) => (
              <CartItem key={e.idMeal || e.recipe.url}>
                <Span>₹{e.price * e.qty}</Span>
                <Span2 onClick={() => removeHandler(e)}>
                  <CloseOutlined />
                </Span2>
                <Image src={e.strMealThumb || e.recipe.image} />
                <Bottom>
                  <Title>
                    {(e?.strMeal || e?.recipe.label).substring(0, 20)}
                  </Title>
                  <BottomRight>
                    <Button onClick={() => incQuantityHandler(e)}>+</Button>
                    <Quantity>{e.qty}</Quantity>
                    <Button
                      onClick={() => decQuantityHandler(e)}
                      disabled={e.qty < 2 ? true : false}
                    >
                      -
                    </Button>
                  </BottomRight>
                </Bottom>
              </CartItem>
            ))
          ) : (
            <EmptyCart>
              <EmptyCartImage src="https://snackwijdan.com/assets/images/cart-empty.png" />
              <EmptyCartDetails>
                <EmptyCartTitle>Your cart is empty</EmptyCartTitle>
                <EmptyCartP>
                  You can go to home page to order a meal.
                </EmptyCartP>
                <BottomButton
                  onClick={() => {
                    navigate("/");
                  }}
                >
                  Homepage
                </BottomButton>
              </EmptyCartDetails>
            </EmptyCart>
          )}
        </Container>
        {cartItems.length > 0 && (
          <RightBillSection>
            <RightHeading>Cart Items</RightHeading>
            <RightBox>
              <ItemTotal>
                <ItemTotalOne>Item Total</ItemTotalOne>
                <ItemTotalTwo>
                  ₹
                  {cartItems.reduce((total, Item) => {
                    return total + parseInt(Item.price * Item.qty);
                  }, 0)}
                </ItemTotalTwo>
              </ItemTotal>
              <DeliveryFee>
                <DeliveryFeeOne>Delivery Fee</DeliveryFeeOne>
                <DeliveryFeeTwo>₹50</DeliveryFeeTwo>
              </DeliveryFee>
              <Topay>
                <TopayOne>To Pay</TopayOne>
                <TopayTwo>
                  {cartItems.reduce((total, Item) => {
                    return total + parseInt(Item.price * Item.qty);
                  }, 0) + 50}
                </TopayTwo>
              </Topay>
              <Checkout
                onClick={() => {
                  toast("Order placed! Your MeaLicious will be arrived soon", {
                    position: "top-center",
                    autoClose: 1000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                }}
              >
                Checkout
              </Checkout>
            </RightBox>
          </RightBillSection>
        )}
      </Boss>
      <Footer />
      <ToastContainer
        theme={"dark"}
        position="top-right"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
};

export default Cart;
