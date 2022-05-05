import React from "react";
import { useSelector } from "react-redux";
import { getallmeals } from "../features/meal/mealSlice";
import styled from "styled-components";
import "swiper/css";
import { Navigation } from "swiper";
import "swiper/css/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import { Oval } from "react-loader-spinner";
import { Mobile } from "../responsive";

const Container = styled.div`
  margin-bottom: 30px;
  & .swiper {
    border-radius: 15px;
    width: 95%;
    height: 100%;
  }

  & .swiper-slide {
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;
    border-radius: 15px;
  }
  & .swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin-bottom: 10px;
    border-radius: 15px;
  }
`;
const Title = styled.h1`
  font-weight: 600;
  padding: 20px 50px;
  ${Mobile({ paddingTop: "10px", textAlign: "center" })}
`;

const Spinner = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ImgTitle = styled.h3``;
const Img = styled.img``;

const MealListing = ({ theme }) => {
  const meals = useSelector(getallmeals);

  return (
    <Container theme={theme}>
      <Title>Menu</Title>
      <Swiper
        style={{
          "--swiper-navigation-color": "crimson",
        }}
        slidesPerView={1}
        spaceBetween={20}
        navigation={true}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          "@0.00": {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          "@0.75": {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          "@1.00": {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          "@1.50": {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
        modules={[Navigation]}
        className="mySwiper"
      >
        {meals.categories === undefined ? (
          <Spinner>
            <Oval color="crimson" secondaryColor="gray" height="30vh" />
          </Spinner>
        ) : (
          meals.categories?.map((meal) => (
            <SwiperSlide key={meal.idCategory}>
              <Img src={`${meal.strCategoryThumb}`} alt={meal.strCategory} />
              <ImgTitle>{meal.strCategory}</ImgTitle>
            </SwiperSlide>
          ))
        )}
      </Swiper>
    </Container>
  );
};

export default MealListing;
