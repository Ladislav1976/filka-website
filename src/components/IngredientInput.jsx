import { useState, useEffect } from "react";
import style from "./IngredientInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faCartPlus } from "@fortawesome/free-solid-svg-icons";
function IngrID(props) {
  return (
    <>
      <div className="dd" id="dd"></div>
    </>
  );
}
function Times(props) {
  return (
    <>
      <div className={style.timesIngredient}>{props.times}</div>
    </>
  );
}

function Unit(props) {
  return (
    <>
      <div className={style.unitIngredient}>{props.unit}</div>
    </>
  );
}

function Ingredient(props) {
  return <div className={style.ingIngredient}>{props.ing}</div>;
}
function Ing(props) {
  const component = props.component
  
  function handleIngredientMove(move, ing) {
    props.ingredientMove(move, ing)
  }

  return (
    <>
      <div id="c" className={style.ingredient}>
        {component == "editcomponent" && <>
          <div className={style.upddownbox} ><FontAwesomeIcon
            className={style.ingredientIcon}
            icon={faTrash}
            onClick={props.onTagDelete}
          ></FontAwesomeIcon>
          </div>
          <div>
            <div className={style.up} onClick={() => handleIngredientMove(-1,  props.ing )} >&#10095;</div>
            <div className={style.down} onClick={() => handleIngredientMove(1,  props.ing )} >&#10094;</div>
          </div>
        </>
        }

        <IngrID id={props.ing.id} key={props.IDid} />
        <Times times={props.ing.times} key={props.IDtimes} />
        <Unit unit={props.ing.unit} key={props.IDunit} />
        <Ingredient ing={props.ing.ing} key={props.IDingredient} />

      </div>
    </>
  );
}

export default function IngredientInput(props) {
  const [addedTimes, setAddedTimes] = useState(1);
  const [addedUnit, setAddedUnit] = useState("ks");
  const [addedIngredient, setAddedIngredient] = useState("");
  const component = props.component
  const ingredientsSet = props.ingredientsList;
  const ingredientsSetID = props.ingredientsIDList;
  // let ingredientsList = [...ingredientsSet];
  // let ingredientsListID = [...ingredientsSetID];
  // let ingredientSetBulk = [];
  // for (let i = 0; i < ingredientsList.length; i++) {
  //   for (let u = 0; u < ingredientsListID.length; u++) {

  //     if (i == u) {

  //       ingredientSetBulk.push({
  //         ing: ingredientsList[i],
  //         ingID: ingredientsListID[u],
  //       });
  //     }
  //   }
  // }


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
    props.removeFromIngredientList(ingID, ing);
  }

  // let ingredientListArray = [...ingredientSetBulk];
  const ingredientListRender = [];
  let ingreId = 100;
  let IDid = 1;
  let IDtimes = 10;
  let IDunit = 100;
  let IDingredient = 1000;

  // console.log("ingredientSetBulk", ingredientSetBulk.ingre);

  //   for(const [index,value] of ingredientSetBulk){
  //     console.log(index,value);
  // }
  for (const ingre of ingredientsSet) {
    // console.log("ingre.ing", ingre.ing); console.log("ingre.ID", ingre.ingID);
    //console.log("ingre.ing", ingre.ing);

    ingredientListRender.push(

      <Ing
        ing={ingre}
       // ingID={ingre.ingID}
        key={ingreId}
        IDid={IDid}
        IDtimes={IDtimes}
        IDunit={IDunit}
        IDingredient={IDingredient}
        onTagDelete={() => handleIngredientDelete(ingre.ingID, ingre.ing)}
        component={component}
        ingredientMove={props.ingredientMove}
      />

    );
    ingreId++;
    IDid++;
    IDtimes++;
    IDunit++;
    IDingredient++;
  }

  return (
    <>
      <div className={style.ingredientMain}>
        {component == "editcomponent" && <div className={style.ingredientBox}>
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
            <option>bal.</option>
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
        </div>}
        <div className={style.firstline}></div>
        <div className={style.ingredientsList}>
          {ingredientListRender}
        </div>
      </div>
    </>
  );
}
