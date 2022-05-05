import React, { useEffect, useState } from "react";
import styled from "styled-components";
// import ReactPlayer from "react-player/youtube";
import Plyr from "plyr-react";
import "plyr-react/dist/plyr.css";
import { useSelector } from "react-redux";
import { Oval } from "react-loader-spinner";
import { Mobile } from "../responsive";

const Container = styled.div`
  padding: 25px 0px;
  margin: 0px 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: 0.5s all ease-in-out;
  border-top: 3px solid
    ${({ theme }) => (theme === "light" ? "crimson" : "#ffeff2")};
  border-bottom: 3px solid
    ${({ theme }) => (theme === "light" ? "crimson" : "#ffeff2")};
`;

const Title = styled.h1`
  font-weight: 600;
  padding: 20px 50px;
`;

const Meal = styled.div`
  padding: 15px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 9%;
  flex-wrap: wrap;

  & .hover {
    height: 100%;
    overflow: hidden;
    border-radius: 10px;
    transition: 0.3s all ease-in-out;
    &:hover {
      transform: scale(1.01);
      box-shadow: 0px 1px 5px 2px gray;
    }
  }

  & .video {
    width: 620px;
    border: none;
    @media screen and (max-width: 1360px) {
      display: none;
    }
  }

  ${Mobile({ flexDirection: "column" })}
`;

const Spinner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Image = styled.img`
  height: 300px;
  width: 500px;
  object-fit: cover;
  display: block;
  border-radius: 10px 10px 0px 0px;
  ${Mobile({ width: "100%" })}
`;

const ImgTitle = styled.h3`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
  background-color: crimson;
  border-radius: 0px 0px 10px 10px;
  color: white;
  width: 500px;
  ${Mobile({ width: "auto" })}
`;

const Motd = ({ theme }) => {
  const random = useSelector((state) => state.meals.mealsMOTD.meals);
  const [data, setdata] = useState([]);

  const check = () => {
    if (random !== undefined && random.length > 0) {
      setdata(random);
    }
  };

  const src =
    data !== [] &&
    data[0]?.strYoutube.substring(data[0].strYoutube.indexOf("=") + 1);

  const videoSrc = {
    type: "video",
    sources: [
      {
        src: `${src}`,
        provider: "youtube",
      },
    ],
  };

  useEffect(() => {
    check();
  }, [random]);

  return (
    <>
      <Title>Meal of the day</Title>
      <Container theme={theme}>
        <Meal>
          {data === [] ? (
            <Spinner>
              <Oval color="crimson" secondaryColor="gray" height="40vh" />
            </Spinner>
          ) : (
            <>
              <div className="hover">
                <Image src={data !== [] && data[0]?.strMealThumb} />
                <ImgTitle>{data !== [] && data[0]?.strMeal}</ImgTitle>
              </div>
              <div className="hover video">
                <Plyr source={videoSrc} />
              </div>
            </>
          )}
        </Meal>
      </Container>
    </>
  );
};

export default Motd;
