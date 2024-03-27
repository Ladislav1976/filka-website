import { useState, useEffect } from "react";
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
  const ingredientsSetID = props.ingredientsIDList;

  let ingredientsList = [...ingredientsSet];

  let ingredientsListID = [...ingredientsSetID];

  let ingredientSetBulk = [];
  for (let i = 0; i < ingredientsList.length; i++) {
    for (let u = 0; u < ingredientsListID.length; u++) {
      if (i == u) {
        ingredientSetBulk.push({
          ing: ingredientsList[i],
          ingID: ingredientsListID[u],
        });
      }
    }
  }

  // const merge = (ingredientsList, ingredientListID) => {
  //   return {ingre:{
  //     ing:ingredientsList,
  //     ingID: ingredientListID
  //   }};
  // }

  // let ingredientTemp = merge(ingredientsList, ingredientListID)
  // console.log("ingredientSetBulk",ingredientSetBulk)
  // setIngredientSetBulk(ingredientTemp)

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
  function handleIngredientDelete(ingID, ing) {
    // let tt = b.document.getElementsByClassName("ingredientsList");
    // let inputVal = tt.document.getElementsByClassName("ingredient");
    // let c = b.getElementsByClassName("ingredientsList");
    // let inputVal = c.getElementsByClassName("dd");
    // let b = document.getElementsByClassName("ingredient");
    // console.log("ingredietn ingID", ingID);
    // console.log("ingredietn ing", ing);
    // let inputVal = document.getElementsByClassName("dd");
    // let b = (document.getElementById("demo").innerHTML = inputVal[0].id);
    // console.log("ingrs", b);
    props.removeFromIngredientList(ingID, ing);
  }

  // let ingredientListArray = [...ingredientSetBulk];
  const ingredientListRender = [];
  let ingreId = 100;
  // console.log("ingredientSetBulk", ingredientSetBulk.ingre);

  //   for(const [index,value] of ingredientSetBulk){
  //     console.log(index,value);
  // }
  for (const ingre of ingredientSetBulk) {
    // console.log("ingre.ing", ingre.ing);console.log("ingre.ID", ingre.ingID);
    ingredientListRender.push(
      <Ing
        ing={ingre.ing}
        ingID={ingre.ingID}
        key={ingreId}
        onTagDelete={() => handleIngredientDelete(ingre.ingID, ingre.ing)}
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
        </div>
        <div className={style.firstline}></div>
        <div className={style.ingredientsList}>{ingredientListRender}</div>
      </div>
    </>
  );
}
