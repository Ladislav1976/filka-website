import FoodItem from "./FoodItem";
import style from "./FoodItemList.module.css";

export default function FoodItemList(props) {
  const foodItemListRender = [];


  for (const food of props.data) {
    const filterTagsListRender = [];
    for (const filterTag of props.tagFilter) {
      if (!food.tags.includes(filterTag)) {
        filterTagsListRender.push(filterTag);
      }
    }
 
    if (filterTagsListRender.length === 0) {
      foodItemListRender.push(<FoodItem key={food.id} food={food}  />);
    }}
  

  return <div className={style.foodItemList}>{foodItemListRender}</div>;
}
