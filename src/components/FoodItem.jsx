import style from "./FoodItem.module.css";
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import default_image from "../image/default_image1.jpg"


export default function FoodItem(props) {
  const navigate = useNavigate()

  const [imgLoader, setImgLoader] = props.onImgLoader
  const food = props.food
  const id = props.food.id

  let foodRender = []

  for (let f of food.images) {

    foodRender.push(f.image)
  }
  return (
    <>
      {<div className={style.food} onClick={() => navigate(`/recepty/${id}/`, { state: { foods: props.foodsURL } })}>
        <img
          className={style.image}
          loading="lazy"
          src={foodRender[0] ? foodRender[0] : default_image}

          alt="Food image"
          onLoad={() => setImgLoader(prev => prev - 1)}
          key={food.images}
        />
        <div className={style.foodName}>{props.food.name}</div>
      </div>}
    </>
  );
}

