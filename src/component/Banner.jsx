import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { SearchOutlined } from "@mui/icons-material";
import AddShoppingCartOutlined from "@mui/icons-material/AddShoppingCartOutlined";
import { addtocart } from "../features/meal/cartslice";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mobile } from "../responsive";
import { useNavigate } from "react-router";

const Container = styled.div`
  padding: 0px 40px;
  display: flex;
  height: 90vh;
  width: 100%;
  background: url("https://images.pexels.com/photos/1600727/pexels-photo-1600727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  ${Mobile({ height: "60vh" })}
`;

const Left = styled.div`
  width: 40%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 6%;
  ${Mobile({ width: "100%", textShadow: "2px 2px 2px black" })}
`;

const Button = styled.button`
  transition: 0.5s all ease-in-out;
  cursor: pointer;
  padding: 18px;
  width: 150px;
  border-radius: 15px;
  outline: none;
  border: none;
  background: ${({ theme }) => (theme === "light" ? "#1976D2" : "gray")};
  color: #ffffffce;
  font-size: 1.05rem;
  font-weight: bold;
`;

const Text = styled.h1`
  text-align: center;
  font-size: 3rem;
  width: 100%;
  ${Mobile({ fontSize: "2rem" })}
`;

const Form = styled.form`
  width: 75%;
  height: 6vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f8f8;
  border-radius: 10px;
  color: gray;
`;

const Input = styled.input`
  height: 100%;
  width: 80%;
  border-radius: 10px 0px 0px 10px;
  border: none;
  outline: none;
  background: #f8f8f8;
  font-size: 1.01rem;
  padding: 0px 10px;
  color: #6d6d6d;
  ::placeholder {
    color: #0000005a;
  }
`;

const ButtonSearch = styled.button`
  transition: 0.5s all ease-in-out;
  cursor: pointer;
  height: 100%;
  width: 20%;
  border-radius: 0 10px 10px 0px;
  border: none;
  background: ${({ theme }) => (theme === "light" ? "#1976D2" : "gray")};
  color: #ffffffce;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const FullData = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Data = styled.div`
  /* background-color: yellow; */
  color: #ffffffce;
  margin: 2% 2%;
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

const Banner = ({ theme }) => {
  const navigate = useNavigate();
  const app_id = "f6a1edb4";
  const app_key = "b0b1df2d1c483dba3ea66140717cac19";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getRecipes();
  }, [query]);

  const querySearch = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);
    if (e.target.value.length < 2 || e.target.value === "") {
      setRecipes([]);
    } else {
      setSearch(e.target.value);
    }
  };

  const Submit = (e) => {
    e.preventDefault();
    setQuery(search);
  };

  const getRecipes = async () => {
    const recipes = await fetch(
      `https://api.edamam.com/search?q=${query}&app_id=${app_id}&app_key=${app_key}`
    );
    const data = await recipes.json();

    const addedData = data.hits.map((e) => ({
      ...e,
      qty: 1,
      price: Math.floor(Math.random() * (150 - 100 + 1)) + 100,
    }));
    setRecipes(addedData);
  };

  const AddTocart = (e) => {
    toast(`${e.recipe.label} added to cart`);
    dispatch(addtocart(e));
    console.log(e);
  };

  return (
    <>
      <Container>
        <Left>
          <Text>
            Discover restaurants that deliver{" "}
            <span style={{ color: "crimson", fontWeight: "bolder" }}>
              near you.
            </span>
          </Text>
          <Form onSubmit={Submit} theme={theme}>
            <Input
              placeholder="Search the taste!"
              theme={theme}
              type="text"
              value={search}
              onChange={querySearch}
            />
            <ButtonSearch theme={theme}>
              <SearchOutlined />
            </ButtonSearch>
          </Form>
          <Button
            theme={theme}
            onClick={() => {
              navigate("/Cart");
            }}
          >
            Order now
          </Button>
        </Left>
      </Container>

      {recipes.length > 0 && (
        <h2
          style={{
            width: "100%",
            textAlign: "center",
            padding: "20px",
            textDecoration: "underline",
          }}
        >
          Search results for ''{query}''
        </h2>
      )}

      <FullData>
        {recipes.length > 0
          ? recipes.map((e) => (
              <Data key={e.recipe.url}>
                <Image src={e?.recipe.image} />
                <Price>₹{e?.price}</Price>
                <ImageDetails>
                  <ImageTitle>{e?.recipe.label.substring(0, 20)}</ImageTitle>
                  <AddIcons onClick={() => AddTocart(e)}>
                    <AddShoppingCartOutlined />
                  </AddIcons>
                </ImageDetails>
              </Data>
            ))
          : null}
      </FullData>
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

export default Banner;
