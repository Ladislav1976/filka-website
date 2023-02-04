import PropTypes from "prop-types";
import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Foods from "./components/Foods";
import NewFood from "./components/NewFood";

function App() {
  return (
    <Router>
      {/* <nav>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/newprofile">NewProfile</Link>
        </nav> */}
      <Routes>
        <Route path="/" element={<Foods />}></Route>
        <Route path="/newfood" element={<NewFood />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
