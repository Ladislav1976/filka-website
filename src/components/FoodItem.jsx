import style from "./FoodItem.module.css";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function FoodItem(props) {

  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;

  const food = props.food
  const id = props.food.id
console.log("id",id)
  // console.log("image:", props.food.image);
  function handlePushFoodToEditRender() {
  
    setFoodItemEditRender(food);
    // console.log("props.food.tags: ", props.food.tags);
    // setTimeout(() => { 
    //   window.location.href = `/foods/${id}/`
    // },100)

    // <Link to={`/recepty/:${foodID}`} />
    // props.setModalEditFlagTrue();
  }
let foodRender = []
  for (let f of food.image){ 
    // for(let d of f.image){
      // console.log("props.food", f)
      // console.log("f.image", f.image)
      foodRender.push(f.image)}

  return (
    <>
      <div className={style.food}>
        <img
          className={style.image}
          src={foodRender[0]}
          alt="Food image"
          // onClick={handlePushFoodToEditRender}
      
          onClick={() => { <Link to={`/foods/${id.id}/`}>NewProfile</Link> }}
        />
        <div className={style.foodName}>{props.food.name}</div>
        <Link to={`/foods/${id}/`}>NewProfile</Link>
        {/* <Link to="/EditFood">NewProfile</Link> */}
      </div>
    </>
  );
}

