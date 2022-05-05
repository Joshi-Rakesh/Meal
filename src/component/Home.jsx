import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MealListing from "./MealListing";
import api from "../api/api";
import { useDispatch, useSelector } from "react-redux";
import {
  addmealscat,
  addmealsMOTD,
  addmealsArea,
} from "../features/meal/mealSlice";
import Banner from "./Banner";
import Motd from "./Motd";
import Variety from "./Variety";

const Home = ({ theme, setTheme }) => {
  const locationData = useSelector((state) => state.location.location);
  const cat = "/api/json/v1/1/categories.php";
  const MOTD = "/api/json/v1/1/random.php";
  const Area = `/api/json/v1/1/filter.php?a=${locationData}`;

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchmeal = async () => {
      const responsecat = await api.get(`${cat}`).catch((err) => {
        console.log(err);
      });
      const responseMOTD = await api.get(`${MOTD}`).catch((err) => {
        console.log(err);
      });

      const responseArea = await api.get(`${Area}`).catch((err) => {
        console.log(err);
      });

      dispatch(addmealsArea(responseArea.data));
      dispatch(addmealsMOTD(responseMOTD.data));
      dispatch(addmealscat(responsecat.data));
    };
    fetchmeal();
  }, [locationData]);

  return (
    <div>
      <Header theme={theme} setTheme={setTheme} />
      <Banner theme={theme} />
      <Motd theme={theme} />
      <MealListing theme={theme} />
      <Variety theme={theme} />
      <Footer />
    </div>
  );
};

export default Home;
