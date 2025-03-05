import { useEffect, useState } from "react";
import FoodItem from "./FoodItem";
import style from "./FoodItemList.module.css";
import PageButton from "./PageButton"

export default function FoodItemList(props) {
  const foodItemListRender = []


  const [imgLoader,setImgLoader] = props.imgLoader



  let filterTagListArray = [...props.filterTagList];


  if (props.foods) { 
    for (const food of props.foods) {
      const filterTagsListRender = [];
      for (const filterTag of filterTagListArray) {
        if (
          !food.foodTags
            .map((str) => str.foodTag.toLowerCase())
            .includes(filterTag.foodTag.toLowerCase()) &&
          !food.name.toLowerCase().includes(filterTag.foodTag.toLowerCase())
        ) {

          filterTagsListRender.push(filterTag);
        } else {

        }
      }

      if (filterTagsListRender.length === 0) {

        foodItemListRender.push(

          <FoodItem
            food={food}
            key={food.id}
            onImgLoader = {[imgLoader,setImgLoader]}
            foodsURL={props.foodsURL}

          />

        );
      }
    }
  }

  return <>
        {/* <div className={imgLoader > 0 ? style.unvisible : style.foodItemBox}> */}
        <div className={style.foodItemBox}>
    <div className={style.foodItemList} >  
      
       {foodItemListRender}
       </div>

     
    </div>
    {/* <button onClick={() => checkWidth()}>hi</button> */}
  </>
}
