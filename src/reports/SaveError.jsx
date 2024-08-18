import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faCheck,faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import style from "../reports/Save.module.css";

export default  function SaveError(props) {


    return(   <>
    <div></div>
   <div className={style.loadingBox}>
    <div className={style.loadingIcon}>
    <FontAwesomeIcon className={style.errorIcon} icon={faCircleExclamation}  id="inpFileIcon"/>
  </div>
  <h3>Chyba pri ukladani!</h3>
  </div>
    </>
    )
}
