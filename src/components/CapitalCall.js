import React from "react";
import { Route, NavLink, Link } from "react-router-dom";
import styled from "styled-components";
import logo from "../logo.jpg";
import { Header } from "../styled/header";
import Dashboard from "./Dashboard";
import NewCall from "./NewCall";

const H1 = styled.h1`
  color: #395d73;
`;

const NavLinkButton = styled.button`
  margin: 20px;
  cursor: pointer;
  background-color: transparent;
  border: none;
  color: #395d73;
  font-size: large;
`;

const Main = styled.main`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 20px;
`;

const CapitalCall = () => {
  return (
    <div>
      <Header>
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
        <H1>Capital Call</H1>
        <div>
          <NavLink to="/capitalcall/" exact>
            <NavLinkButton>Dashboard</NavLinkButton>
          </NavLink>
          <NavLink to="/capitalcall/newcall">
            <NavLinkButton>New Call</NavLinkButton>
          </NavLink>
        </div>
      </Header>
      <Main>
        <Route path="/capitalcall/" exact component={Dashboard} />
        <Route path="/capitalcall/newcall" component={NewCall} />
      </Main>
    </div>
  );
};

export default CapitalCall;
