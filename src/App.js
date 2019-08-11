import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./components/Home";
import CapitalCall from "./components/CapitalCall";

function App() {
  return (
    <Router>
      <Route path="/" exact component={Home} />
      <Route path="/capitalcall/" component={CapitalCall} />
    </Router>
  );
}

export default App;
