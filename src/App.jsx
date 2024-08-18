import PropTypes from "prop-types";
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import Foods from "./components/Foods";
import FoodsSearch from "./components/FoodsSearch";
import NewFood from "./components/NewFood";
import EditFood from "./components/EditFood";
import ViewFood from "./components/ViewFood";

import Home from "./components/Home";

function App() {

  return (
    <>
      <Router>
        <nav>
          <Link to="/">Home</Link>
          <Link to="/recepty/?page_size=2">Recepty</Link>


        </nav>
        <Routes>

          <Route path="/" element={<Home />}></Route>
          <Route path="/recepty/" element={<Foods />}></Route>
          <Route path="/recepty/search/:search/" element={<Foods />}></Route>
          <Route path="/recepty/:id/" element={< ViewFood />}></Route>
          <Route path="/recepty/uprava/:id/" element={<EditFood />}></Route>

          <Route path="/recepty/novy_recept/" element={<NewFood />}></Route>
        </Routes>
      </Router>
  
    </>
  );
}

export default App;
