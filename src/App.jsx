import PropTypes from "prop-types";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Foods from "./components/Foods";
import NewFood from "./components/NewFood";
import EditFood from "./components/EditFood";
import Home from "./components/Home";

function App() {
  
  return (
    <Router>
      <nav>
          <Link to="/">Home</Link>
          <Link to="/foods/">Recepty</Link>

        </nav>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/foods/" element={<Foods  />}></Route>
        <Route path="/foods/:id/" element={<EditFood />}></Route>
        <Route path="/foods/new/" element={<NewFood />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
