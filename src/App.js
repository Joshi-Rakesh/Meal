import "./App.css";
import React from "react";
import { ThemeProvider } from "styled-components";
import { DarkTheme, GlobalStyles, LightTheme } from "./theme/theme";
import { HashRouter, Routes, Route } from "react-router-dom";
import Home from "./component/Home";
import Error from "./component/Error";
import Header from "./component/Header";
import Footer from "./component/Footer";
import MealListing from "./component/MealListing";
import { useState } from "react";
import Cart from "./component/Cart";

function App() {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeProvider theme={theme === "light" ? LightTheme : DarkTheme}>
      <div style={{ height: "100vh" }}>
        <GlobalStyles />
        <HashRouter>
          <Routes>
            <Route
              path="/"
              element={<Home theme={theme} setTheme={setTheme} />}
            />
            <Route
              path="/Cart"
              element={<Cart theme={theme} setTheme={setTheme} />}
            />
            <Route path="*" element={<Error />} />
          </Routes>
        </HashRouter>
      </div>
    </ThemeProvider>
  );
}

export default App;
