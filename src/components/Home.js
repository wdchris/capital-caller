import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import logo from "../logo.jpg";
import { Header } from "../styled/header";

const Main = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const LinkButton = styled.button`
  min-width: 300px;
  min-height: 150px;
  border-color: #000000;
  border-radius: 3px;
  border-width: 1px;
  border-style: solid;
  background-color: #61c1e7;
  font-size: x-large;
  cursor: pointer;
  color: #395d73;
`;

const Home = () => {
  return (
    <div>
      <Header>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </Header>
      <Main>
        <Link to="/capitalcall/">
          <LinkButton>Captial Call</LinkButton>
        </Link>
      </Main>
    </div>
  );
};

export default Home;
