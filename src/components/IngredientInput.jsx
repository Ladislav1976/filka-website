import { useState } from "react";
import style from "./IngredientInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faCartPlus } from "@fortawesome/free-solid-svg-icons";

function Ing(props) {
  return (
    <>
      <div id="c" className={style.ingredient}>
        {" "}
        <FontAwesomeIcon
          className={style.ingredientIcon}
          icon={faTrash}
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

  const ingredientsSet = props.ingredientsList;
  const ingredientSetID = props.ingredientsIDList;

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
    // let tt = b.document.getElementsByClassName("ingredientsList");
    // let inputVal = tt.document.getElementsByClassName("ingredient");
    // let c = b.getElementsByClassName("ingredientsList");
    // let inputVal = c.getElementsByClassName("dd");
    let b = document.getElementsByClassName("ingredient");
    console.log("inputVal", b);
    // let inputVal = document.getElementsByClassName("dd");
    // let b = (document.getElementById("demo").innerHTML = inputVal[0].id);
    // console.log("ingrs", b);
    props.removeFromIngredientList(ing);
  }

  let ingredientListArray = [...ingredientsSet];
  const ingredientListRender = [];
  let ingreId = 100;

  // const obj = Object.assign({}, ingredientListArray, ingredientSetID);
  // console.log("obj", obj);

  for (const ingre of ingredientListArray) {
    ingredientListRender.push(
      <Ing
        ing={ingre}
        key={ingreId}
        onTagDelete={() => handleIngredientDelete(ingre)}
      />
    );
    ingreId++;
  }

  return (
    <>
      <div className={style.ingredientMain}>
        <div className={style.ingredientBox}>
          <input
            type="number"
            className={style.times}
            id="tm"
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
          {/* <div
            className={style.ingredientButton}
            onClick={addIngredientToTagList}
          >
            Pridať
          </div> */}
          <FontAwesomeIcon
            className={style.ingredientIcon}
            icon={faCartPlus}
            onClick={addIngredientToTagList}
          ></FontAwesomeIcon>
          <FontAwesomeIcon icon="fa-solid fa-cart-plus" />
        </div>
        <div className={style.firstline}></div>
        <div className={style.ingredientsList}>{ingredientListRender}</div>
      </div>
    </>
  );
}
