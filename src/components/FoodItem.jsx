import style from "./FoodItem.module.css";
import { useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

export default function FoodItem(props) {
  const navigate = useNavigate()
  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;

  const food = props.food
  const id = props.food.id

  // console.log("image:", props.food.image);
  function handleNavigateToFoodEdit() {
    navigate(`/foods/${id}/`)
  }
let foodRender = []
  for (let f of food.image){ 
    // for(let d of f.image){
      // console.log("props.food", f)
      // console.log("f.image", f.image)
      foodRender.push(f.image)}

  return (
    <>
      <div className={style.food} onClick={()=>handleNavigateToFoodEdit()}>
        <img
          className={style.image}
          src={foodRender[0]}
          alt="Food image"
          // onClick={handlePushFoodToEditRender}
      
          onClick={() => { <Link to={`/foods/${id}/`}>NewProfile</Link> }}
        />
        <div className={style.foodName}>{props.food.name}</div>
        {/* <Link to={`/foods/${id}/`}>NewProfile</Link> */}
        {/* <Link to="/EditFood">NewProfile</Link> */}
      </div>
    </>
  );
}

