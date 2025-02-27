import { useState, useEffect } from "react";
import style from "./IngredientInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrash, faCartPlus, faBasketShopping } from "@fortawesome/free-solid-svg-icons";


// function IngrID(props) {
//   return (
//     <>
//       <div className="dd" id="dd" ></div>
//     </>
//   );
// }
function Quantity(props) {
  return (
    <>
      <div className={style.quantityIngredient} >{props.quantity}</div>
    </>
  );
}

function Unit(props) {
  return (
    <>
      <div className={style.unitIngredient} >{props.unit}</div>
    </>
  );
}

function Ingredient(props) {
  return <div className={style.ingIngredient} >{props.ing}</div>;
}
function Ing(props) {
  const component = props.component


  function handleIngredientMove(move, ing) {
    props.ingredientMove(move, ing)
  }

  return (
    <>
      <div className={style.ingredientContent} >
        {(component === "editcomponent" || component === "newcomponent") && <>
          <div className={style.upddownbox} >
            <FontAwesomeIcon
              className={style.iconDelete}
              icon={faTrash}
              onClick={() => {
                 props.handleIngredientDelete()
              }}

            ></FontAwesomeIcon>
          </div>
          <div >
            <div className={style.up} onClick={() => {
               handleIngredientMove(-1, props.ing)
            }} >&#10095;</div>
            <div className={style.down} onClick={() => {
               handleIngredientMove(1, props.ing)
            }} >&#10094;</div>
          </div>
        </>
        }


        <Quantity quantity={props.ing.quantity} />
        <Unit unit={props.ing.unit[0].unit} />
        <Ingredient ing={props.ing.ingredient[0].ingredient} />

      </div>
    </>
  );
}

export default function IngredientInput(props) {
  const [addedQuantity, setAddedQuantity] = useState(1);
  const [addedUnit, setAddedUnit] = useState("ks");
  const [addedIngredient, setAddedIngredient] = useState("");
  const component = props.component
  let ingredientsSet = props.ingredientsList;



  let uniqueID = new Date().toISOString()

  function handleAddIngredients() {
    const VerNum = Number(addedQuantity) * 1;
    const isFloat = /\d+\.\d+/.test(
      addedQuantity
    );
    if (Number.isInteger(VerNum) || isFloat) {
       props.addToIngredientList(uniqueID, addedQuantity, addedUnit, addedIngredient)
    } else {
      props.handlerSetModalErrorMissing("Vložene množstvo nie je číslo")
    }

    setAddedIngredient("");
    setAddedQuantity(1);
    setAddedUnit("ks");
  }

  function handleChangeQuantity(event) {


    setAddedQuantity(event.target.value)
  }

  function handleChangeUnit(event) {
    setAddedUnit(event.target.value);
  }

  function handleChangeIngredient(event) {
    setAddedIngredient(event.target.value);
  }
  function handleIngredientDelete(ingre) {
    props.removeFromIngredientList(ingre);
  }

  // let ingredientListArray = [...ingredientSetBulk];
  const ingredientListRender = [];


  ingredientsSet.map((ingre, index) => {
    if (ingre.statusDelete === false) {


      ingredientListRender.push(

        <Ing
          ing={ingre}
          key={ingre.id}
          index={index}
          handleIngredientDelete={() => handleIngredientDelete(ingre)}
          component={component}
          ingredientMove={props.ingredientMove}
    
        />

      )
    };

  })

  return (
    <>
      <div className={style.ingredientMain}>
        {(component == "editcomponent" || component == "newcomponent") && <div className={style.ingredientBox}>
          <input
            type="text"
            className={style.quantity}
            ref={props.qtRef}
            onKeyDown={props.qrKeyDown}
            id="tm"
            value={addedQuantity}
            onChange={handleChangeQuantity}

          />
          {/* <input
            type="text"
            className={style.unit}
            id="tm"
            value={addedUnit}
            onChange={handleChangeUnit}
          /> */}
          <select
            className={style.unit}
            onChange={handleChangeUnit}
            value={addedUnit}
            ref={props.unitRef}
            onKeyDown={props.unitKeyDown}

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
            ref={props.ingrRef}
            onKeyDown={props.ingKeyDown}
            onChange={handleChangeIngredient}

          />
          {/* <div
            className={style.ingredientButton}
            onClick={addIngredientToTagList}
          >
            Pridať
          </div> */}
          <div className={style.iconAdd}>
            <FontAwesomeIcon
              icon={faBasketShopping}
              onClick={handleAddIngredients}
            ></FontAwesomeIcon>
          </div>
        </div>}
        <div className={style.ingredientsList}>
          {ingredientListRender}
        </div>
      </div>
    </>
  );
}
