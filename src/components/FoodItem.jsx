import style from "./FoodItem.module.css";
import { useState } from "react";

export default function FoodItem(props) {
  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;


  // console.log("image:", props.food.image);
  function handlePushFoodToEditRender() {
    // console.log("handlePushFoodToEditRender", props.food);
    setFoodItemEditRender(props.food);
    // console.log("props.food.tags: ", props.food.tags);
    props.setModalEditFlagTrue();
  }
  return (
    <>
      <div className={style.food}>
        <img
          className={style.image}
          src={props.food.image}
          alt="Food image"
          onClick={handlePushFoodToEditRender}
        />
        <div className={style.foodName}>{props.food.name}</div>
      </div>
    </>
  );
}
