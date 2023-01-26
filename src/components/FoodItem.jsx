import style from "./FoodItem.module.css";
import { useState } from "react";

export default function FoodItem(props) {
  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;

 const food=props.food

  // console.log("image:", props.food.image);
  function handlePushFoodToEditRender() {
  
    setFoodItemEditRender(food);
    // console.log("props.food.tags: ", props.food.tags);
    props.setModalEditFlagTrue();
  }
let fooddrender = []
  for (let f of food.image){ 
    // for(let d of f.image){
      // console.log("props.food", f)
      // console.log("f.image", f.image)
      fooddrender.push(f.image)}

  return (
    <>
      <div className={style.food}>
        <img
          className={style.image}
          src={fooddrender[0]}
          alt="Food image"
          onClick={handlePushFoodToEditRender}
        />
        <div className={style.foodName}>{props.food.name}</div>
      </div>
    </>
  );
}
