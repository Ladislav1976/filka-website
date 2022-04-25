import { useState } from "react";
import style from "./IngredientInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

//just a component
function Ingredient(props) {
  return (
    <>
      <div className={style.ing}>
        <FontAwesomeIcon
          icon={faTimesCircle}
          onClick={props.onTagDelete}
        ></FontAwesomeIcon>{" "}
        {props.ing}
      </div>
    </>
  );
}

//also a component
// TODO: style everytnig
export default function IngredientInput(props) {
  const [inputedIngredient, setInputedIngredient] = useState("");
  const ingredientList = props.ingredientList;

  function addIngredientToTagList() {
    props.addToIngredientList(inputedIngredient);
    setInputedIngredient("");
  }

  function handleChange(event) {
    setInputedIngredient(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addIngredientToTagList();
    }
  }

  function handleIngredientDelete(ing) {
    props.removeFromIngredientList(ing);
  }

  const ingredientListRender = [];

  for (const ing of ingredientList) {
    ingredientListRender.push(
      <Ingredient
        ing={ing}
        key={ing}
        onTagDelete={() => handleIngredientDelete(ing)}
      />
    );
  }

  return (
    <>
      <div className={style.ingredientMain}>
        <div className={style.ingredientBox}>
          <input type="number" className={style.times} defaultValue={1} />
          <select className={style.ks}>
            <option>ks</option>
            <option>kg</option>
            <option>g</option>
            <option>dg</option>
            <option>ml</option>
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
            value={inputedIngredient}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <div className={style.ingredientButton}>Pridať</div>
        </div>
        <div className={style.firstline}></div>
        <div className={style.ingredientsList}>{ingredientListRender}</div>
      </div>
    </>
  );
}
