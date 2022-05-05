import React from "react";
import styled from "styled-components";
import ShoppingCartOutlined from "@mui/icons-material/ShoppingCartOutlined";
import LightMode from "@mui/icons-material/LightMode";
import DarkMode from "@mui/icons-material/DarkMode";
import { Badge } from "@mui/material";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { Mobile } from "../responsive";

const Container = styled.div`
  position: fixed;
  width: 100%;
  z-index: 9;
  box-shadow: 0px 1px 8px 0px black;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 8vh;
  background-color: ${({ theme }) => theme.body};
  color: ${({ theme }) => theme.text};
  padding: 0px 60px;
  transition: 0.7s all ease-in-out;
  ${Mobile({ padding: "0 10px" })}
`;

const Logo = styled.h1`
  cursor: pointer;
  ${Mobile({ fontSize: "1.5rem" })}
`;

const Right = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  width: 120px;
  ${Mobile({ width: "100px" })}
`;

const Cart = styled.div`
  cursor: pointer;
`;

const ToggleContainer = styled.div`
  display: flex;
  align-items: center;
  width: 50px;
  height: 30px;
  border-radius: 10px;
  background-color: lightgray;
  position: relative;
  background-color: ${({ theme }) => (theme === "light" ? "#1976D2" : "gray")};
  transition: 0.7s all ease-in-out;
  border: 2px solid lightgray;
  cursor: pointer;
`;

const ToggleButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  transform: ${({ theme }) =>
    theme === "light" ? "translateX(5px)" : "translateX(20px)"};
  transition: 0.7s all ease-in-out;
`;

const Header = ({ theme, setTheme }) => {
  let navigate = useNavigate();
  const cart = useSelector((state) => state.cart.cart);
  const themetoggler = () => {
    theme === "light" ? setTheme("dark") : setTheme("light");
  };

  return (
    <Container>
      <Logo
        onClick={() => {
          navigate("/");
        }}
      >
        MeaLicious
      </Logo>
      <Right>
        <Cart
          onClick={() => {
            navigate("/cart");
          }}
        >
          <Badge badgeContent={cart.length} color="primary">
            <ShoppingCartOutlined style={{ fontSize: "30px" }} />
          </Badge>
        </Cart>
        <ToggleContainer onClick={themetoggler} theme={theme}>
          <ToggleButton theme={theme}>
            {theme === "light" ? (
              <LightMode style={{ color: "yellow", fontSize: "22px" }} />
            ) : (
              <DarkMode style={{ color: "white", fontSize: "22px" }} />
            )}
          </ToggleButton>
        </ToggleContainer>
      </Right>
    </Container>
  );
};

export default Header;
