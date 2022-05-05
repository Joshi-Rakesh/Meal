import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bolder;
  font-size: 1.5rem;
  height: 10vh;
  background-color: black;
  border-top: 1px solid rgb(201, 201, 201);
  color: rgb(201, 201, 201);
`;

const footer = () => {
  return (
    <Container className="footer">
      Made with ❣️ by &nbsp;
      <a
        style={{
          textDecoration: "underline",
          cursor: "pointer",
          color: "inherit",
        }}
        href={"mailto:joshi201195@gmail.com"}
        target="_blank"
      >
        Rakesh
      </a>
    </Container>
  );
};

export default footer;
