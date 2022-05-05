import React from "react";
import styled from "styled-components";

const Container = styled.div`
  text-shadow: 5px 5px 5px teal;
  font-size: 2rem;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Error = () => {
  return (
    <Container>
      <h1>Error 404: Page Not Found</h1>
    </Container>
  );
};

export default Error;
