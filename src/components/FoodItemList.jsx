import { useEffect } from "react";
import FoodItem from "./FoodItem";
import style from "./FoodItemList.module.css";
import PageButton from "./PageButton"

export default function FoodItemList(props) {
  const foodItemListRender = []
  const [page, setPage] = props.page
  let pageSize = props.pageSize
  const isPreviousDataFoods = props.isPreviousDataFoods
  const backEndFoodFull = props.backEndFoodFull



  let filterTagListArray = [...props.filterTagList];
  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;



  function checkWidth() {
    const elemWidth = document.getElementById("foodItemList").clientWidth;
    console.log("Width of the div: " + elemWidth + " pixels");
  }

  function checkHeight() {
    const elemHeight = document.getElementById("foodItemList").clientHeight;
    console.log("Width of the div: " + elemHeight + " pixels");
  }
  // const contentNext = rawFoods.next;
  // console.log('contentprevious', (rawFoods.previous));
  // console.log('contentNext', (rawFoods.next));

  // const ra = /(\?.+)/
  // const re = /(\W?page=)(\d+)/
  // console.log('re', re);
  // console.log('ra', ra);
  // let match; 
  // if (match = ra.exec(contentNext)) { 
  //   console.log('Match : ', match);
  // }
  // if (  match = re.exec(contentNext)) {
  //   console.log(`Found word character "${match[2]}" 
  //         at index ${match.index}`);
  //   console.log('match 0: ', match[0],'match 1: ', match[1],'match 2: ', match[2]);
  //   console.log('page', page);
  //   let aa = contentNext.replace(match[0], `?page=${page}`)
  //   console.log("aa",aa)
  // }


  function handlePageSize(event) {
    pageSize = event.target.value;
    props.handleSetPage(page)
  }

  const pagesArray = Array(backEndFoodFull.TotalNumOfPages).fill().map((_, index) => index + 1)
  const nav = (<>
    <nav className="nav-ex2">
      <button className={style.button} onClick={() => props.handleSetPage(page - 1)} disabled={isPreviousDataFoods || page === 1} id={isPreviousDataFoods || page === 1 ? style["buttondisabled"] : style["buttonenabled"]}>&lt;&lt;</button>
      {/* Removed isPreviousData from PageButton to keep button focus color instead */}
      {pagesArray.map(pg => <PageButton key={pg} pg={pg} page={page} handleSetPage={props.handleSetPage} />)}
      <button className={style.button} onClick={() => props.handleSetPage(page + 1)} disabled={isPreviousDataFoods || page === backEndFoodFull.TotalNumOfPages} id={isPreviousDataFoods || page === backEndFoodFull.TotalNumOfPages ? style["buttondisabled"] : style["buttonenabled"]}>&gt;&gt;</button>


    </nav>
    <div className={style.navdisplay}>({backEndFoodFull.FirstItemsOnPage} - {backEndFoodFull.LastItemsOnPage})  z  {backEndFoodFull.TotalItems}</div>

    <select
      className={style.unit}
      onChange={handlePageSize}
      value={pageSize}
    >
      <option>2</option>
      <option>4</option>
      <option>6</option>
      <option>8</option>
      <option>10</option>

    </select>
  </>)
  if (props.foods) {

    for (const food of props.foods) {

      const filterTagsListRender = [];
      for (const filterTag of filterTagListArray) {
        // console.log("food.foodTags :",food.foodTags)
        // console.log("filterTag :",filterTag,"filterTag.foodTag :",filterTag.foodTag)
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
            setModalEditFlagTrue={props.setModalEditFlagTrue}
            foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]}
          />

        );
      }
    }
  }

  return <>
      <div className={style.foodItemBox}>
    <div className={style.foodItemList} id={"foodItemList"}>   {foodItemListRender}</div>

     
    </div>
    {/* <button onClick={() => checkWidth()}>hi</button> */}
  </>
}
