import style from "./FoodItem.module.css";
import { useState } from "react";

export default function FoodItem(props) {
  return (
    <><div className={style.food}>
      <img className={style.image} src={props.food.image} alt="Food image" />
      <div className={style.foodName}>
        {props.food.name}
      </div>
      </div>
    </>
  );
}
