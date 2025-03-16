import FoodItem from "./FoodItem";
import style from "./FoodItemList.module.css";
import styla from "./Foods.module.css";
import PageButton from "./PageButton"
import { useState,useEffect } from "react";

export default function FoodItemList(props) {
  const foodItemListRender = []
  const [imgLoader, setImgLoader] = props.onImgLoader
 
  if (props.foods) {
    for (const food of props.foods) {
        foodItemListRender.push(
          <FoodItem
            food={food}
            key={food.id}
            setImgLoader={ setImgLoader}
            location={props.location}
          />

        );
      }
    }
  // }


  const page = props.page
  const foodsQf = props.foodsQf
  const pagesArray = Array(foodsQf?.data?.TotalNumOfPages).fill().map((_, index) => index + 1)
  return <>
    {/* <div className={imgLoader > 0 ? style.unvisible : style.foodItemBox}> */}
    <div className={style.foodItemBox}>
    {!props.load ? (
        <p>Loading images...</p>
      ) : ( <div className={style.foodItemList} >
        {foodItemListRender}
      </div>)}
      <div className={styla.paginationBox}>
        <nav className={styla.navigationbar}>
          <button className={styla.button} onClick={() => props.pageChange(page - 1)} disabled={!foodsQf?.data?.previous || page === 1} id={!foodsQf?.data?.previous || page === 1 ? styla["buttondisabled"] : styla["buttonenabled"]}>&lt;&lt;</button>
          {pagesArray.map(pg => <PageButton key={pg} pg={pg} page={page} pageChange={props.pageChange} />)}
          <button className={styla.button} onClick={() => props.pageChange(page + 1)} disabled={page === foodsQf?.data?.TotalNumOfPages} id={page === foodsQf?.data?.TotalNumOfPages ? styla["buttondisabled"] : styla["buttonenabled"]}>&gt;&gt;</button>
        </nav>
        <div className={styla.navdisplay}>({foodsQf?.data?.FirstItemsOnPage} - {foodsQf?.data?.LastItemsOnPage})  z  {foodsQf?.data?.TotalItems}

          <select
            className={styla.pageSize}
            onChange={(e) => props.pageSizeChange(e)}
            value={props.pageSize}
          >
            <option>2</option>
            <option>4</option>
            <option>6</option>
            <option>8</option>
            <option>20</option>
            <option>30</option>
            <option>40</option>

          </select>
        </div>
      </div>
    </div>
  </>
}
