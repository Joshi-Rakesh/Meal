import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import AddShoppingCartOutlined from "@mui/icons-material/AddShoppingCartOutlined";
import { addlocation } from "../features/meal/varietySlice";
import { Oval } from "react-loader-spinner";
import { addtocart } from "../features/meal/cartslice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mobile } from "../responsive";

const Title = styled.h1`
  font-weight: 600;
  margin: 30px 20px;
  padding-left: 25px;
  padding-top: 30px;
  transition: 0.5s border ease-in-out;
  border-top: 3px solid
    ${({ theme }) => (theme === "light" ? "crimson" : "#ffeff2")};
  ${Mobile({ paddingTop: "10px", textAlign: "center", paddingLeft: "0" })}
`;

const Filters = styled.div`
  margin-bottom: 30px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8%;
  & .bgclass {
    background-color: crimson;
    color: #ffffffce;
  }
  ${Mobile({
    flexWrap: "wrap",
    gap: "3%",
    height: "20vh",
    alignItems: "Center",
  })}
`;

const Filter = styled.button`
  background-color: #5491ce;
  color: #ffffffce;
  font-size: 1.02rem;
  font-weight: bolder;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  padding: 15px 25px;

  transition: 0.3s transform ease-out;

  &:hover {
    transform: scale(1.06);
  }

  ${Mobile({ padding: "0px", height: "60px", width: "100px" })}
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const FullData = styled.div`
  width: 95%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Spinner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Data = styled.div`
  /* background-color: yellow; */
  color: #ffffffce;
  margin: 2%;
  position: relative;
  border-radius: 15px;
  transition: 0.3s all ease-in-out;
  &:hover {
    box-shadow: 1px 1px 5px 2px gray;
  }
  ${Mobile({ margin: "4.5%" })}
`;

const Image = styled.img`
  width: 230px;
  max-height: 230px;
  object-fit: cover;
  border-radius: 15px 15px 0px 0px;
  display: block;
  ${Mobile({ height: "150px", width: "150px" })}
`;

const ImageDetails = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0px 10px;
  width: 230px;
  min-height: 55px;
  background-color: crimson;
  border-radius: 0px 0px 15px 15px;
  ${Mobile({ height: "80px", width: "150px" })}
`;

const ImageTitle = styled.p`
  width: 75%;
  font-weight: bold;
`;

const AddIcons = styled.div`
  position: absolute;
  right: 0;
  background-color: #1976d2;
  height: 100%;
  width: 25%;
  border-radius: 0px 0px 15px 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-left: 1px solid crimson;
  ${Mobile({ width: "30%", backgroundColor: "crimson" })}
`;

const Price = styled.h3`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 55px;
  height: 50px;
  border-radius: 0 15px 0px 15px;
  background-color: crimson;
  position: absolute;
  top: 0px;
  right: 0;
`;

const Variety = ({ theme }) => {
  const dispatch = useDispatch();
  const areaApi = useSelector((state) => state.meals.mealsArea.meals);
  const [active, setActive] = useState("Indian");
  const [finaldata, setFinalData] = useState([]);

  const check = () => {
    if (areaApi !== undefined) {
      setFinalData(
        areaApi.map((e) => ({
          ...e,
          price: Math.floor(Math.random() * (150 - 100 + 1)) + 100,
        }))
      );
    }
  };
  useEffect(() => {
    check();
  }, [areaApi]);

  const filterHandler = (e) => {
    setActive(e);
    setFinalData([]);
    dispatch(addlocation(e));
  };

  const AddCartHandler = (e) => {
    toast(`${e.strMeal} added to cart`);
    dispatch(addtocart(e));
  };

  return (
    <>
      <Title theme={theme}>Taste the world</Title>

      <Filters>
        <Filter
          onClick={() => filterHandler("Indian")}
          className={active === "Indian" ? "bgclass" : ""}
        >
          Indian
        </Filter>
        <Filter
          onClick={() => filterHandler("Chinese")}
          className={active === "Chinese" ? "bgclass" : ""}
        >
          Chinese
        </Filter>
        <Filter
          onClick={() => filterHandler("American")}
          className={active === "American" ? "bgclass" : ""}
        >
          American
        </Filter>
        <Filter
          onClick={() => filterHandler("French")}
          className={active === "French" ? "bgclass" : ""}
        >
          French
        </Filter>
        <Filter
          onClick={() => filterHandler("Italian")}
          className={active === "Italian" ? "bgclass" : ""}
        >
          Italian
        </Filter>
        <Filter
          onClick={() => filterHandler("canadian")}
          className={active === "canadian" ? "bgclass" : ""}
        >
          canadian
        </Filter>
      </Filters>
      <Container>
        <FullData>
          {finaldata.length === 0 ? (
            <Spinner>
              <Oval color="crimson" secondaryColor="gray" height="45vh" />
            </Spinner>
          ) : (
            finaldata.map((e) => (
              <Data key={e.idMeal}>
                <Image src={e?.strMealThumb} />
                <Price>₹{e?.price}</Price>
                <ImageDetails>
                  <ImageTitle>{e?.strMeal.substring(0, 20)}</ImageTitle>
                  <AddIcons onClick={() => AddCartHandler(e)}>
                    <AddShoppingCartOutlined />
                  </AddIcons>
                </ImageDetails>
              </Data>
            ))
          )}
        </FullData>
      </Container>
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

export default Variety;
