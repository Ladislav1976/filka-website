import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import style from "./Save.module.css";

export default function DeleteConfirm(props) {




  return (<>
    <div></div>
    <div className={style.box}>
  
      <h3>Vymazať ? </h3>
      <div>
        <button id={style.yes_button13} className={style.button13}  onClick={() => props.foodDelete()}>ANO</button>
        <button id={style.nobutton13} className={style.button13}  onClick={() => props.handlerFoodDeleteCancel()}>NIE</button>

      </div></div>
  </>
  )
}
