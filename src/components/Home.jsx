import React, { useState } from "react";
import style from "./Home.module.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export function Home() {

    return (
        <>
            <header className={style.Appheader}>HOME</header>
            <div className={style.droplist}>
                <div className={style.newFoodButton} >
                    {/* <div
        className={style.newFoodButton}
        onClick={() => {
          navigate("/newfood");
        }}
      > */}
            
                </div>

            </div>
        </>
    );
}

export default Home;
