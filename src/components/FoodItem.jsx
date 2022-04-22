import style from "./FoodItem.module.css";
import { useState } from "react";

export default function FoodItem(props) {
  return (
    <>
      <img className={style.image} src={props.food.image} alt="Food image" />
      <div className={style.item}>
        {props.food.id}
        {props.food.name}
      </div>
    </>
  );
}
