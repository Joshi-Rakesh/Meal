import { createGlobalStyle } from "styled-components";

export const LightTheme = {
  globalbody: "#f8f8f8",
  globaltext: "#04111D",
  body: "crimson",
  text: "#ffffffce",
};

export const DarkTheme = {
  globalbody: "#202225",
  globaltext: "#ffffffce",
  body: "#04111D",
  text: "#ffffffce",
};

export const GlobalStyles = createGlobalStyle`
  body{
    background-color: ${({ theme }) => theme.globalbody};
    color: ${({ theme }) => theme.globaltext};
    transition: 0.5s all ease-in-out; 
    }`;
