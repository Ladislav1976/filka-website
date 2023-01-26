import FoodItem from "./FoodItem";
import style from "./FoodItemList.module.css";

export default function FoodItemList(props) {
  const foodItemListRender = [];
  const filterTagList = props.filterTagList;
  let filterTagListArray = [...filterTagList];
  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;


  for (const food of props.food) {
    
    const filterTagsListRender = [];
    for (const filterTag of filterTagListArray) {
      if (
        !food.foodTags
          .map((str) => str.toLowerCase())
          .includes(filterTag.toLowerCase()) &&
        !food.name.toLowerCase().includes(filterTag.toLowerCase())
      ) {
        console.log("filterrag added:");
        filterTagsListRender.push(filterTag);
      } else {
        console.log("filterrag NOT added:");
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

  return <div className={style.foodItemList}>{foodItemListRender}</div>;
}
