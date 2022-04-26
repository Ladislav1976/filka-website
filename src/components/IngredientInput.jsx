import { useState } from "react";
import style from "./IngredientInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function Ing(props) {
  return (
    <>
      <div className={style.ingredient}>
        {" "}
        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={props.onTagDelete}
        ></FontAwesomeIcon>{" "}
        {props.ing}
      </div>
    </>
  );
}

export default function IngredientInput(props) {
  const [addedTimes, setAddedTimes] = useState(1);
  const [addedUnit, setAddedUnit] = useState("ks");
  const [addedIngredient, setAddedIngredient] = useState("");

  const ingredientList = props.ingredientList;

  function addIngredientToTagList() {
    props.addToIngredientList(addedTimes, addedUnit, addedIngredient);
    setAddedIngredient("");
    setAddedTimes(1);
    setAddedUnit("ks");
  }

  function handleChangeTimes(event) {
    setAddedTimes(event.target.value);
  }

  function handleChangeUnit(event) {
    setAddedUnit(event.target.value);
  }

  function handleChangeIngredient(event) {
    setAddedIngredient(event.target.value);
  }
  function handleIngredientDelete(ing) {
    props.removeFromIngredientList(ing);
  }

  let ingredientListArray = [...ingredientList];
  const ingredientListRender = [];
  for (const ingre of ingredientListArray) {
    ingredientListRender.push(
      <Ing
        ing={ingre}
        key={ingre}
        onTagDelete={() => handleIngredientDelete(ingre)}
      />
    );
  }

  return (
    <>
      <div className={style.ingredientMain}>
        <div className={style.ingredientBox}>
          <input
            type="number"
            className={style.times}
            value={addedTimes}
            onChange={handleChangeTimes}
          />
          <select
            className={style.unit}
            onChange={handleChangeUnit}
            value={addedUnit}
          >
            <option>-</option>
            <option>ks</option>
            <option>kg</option>
            <option>g</option>
            <option>dg</option>
            <option>ml</option>
            <option>dl</option>
            <option>liter</option>
            <option>pl</option>
            <option>čl</option>
            <option>kl</option>
            <option>štipka</option>
          </select>

          <input
            type="text"
            className={style.ingredientInput}
            placeholder="Napiste nazov suroviny"
            value={addedIngredient}
            onChange={handleChangeIngredient}
          />
          <div
            className={style.ingredientButton}
            onClick={addIngredientToTagList}
          >
            Pridať
          </div>
        </div>
        <div className={style.firstline}></div>
        <div className={style.ingredientsList}>{ingredientListRender}</div>
      </div>
    </>
  );
}
