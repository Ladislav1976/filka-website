import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faCheck } from "@fortawesome/free-solid-svg-icons";
import style from "./Save.module.css";

export default  function SaveSaved(props) {


    return(   <>
    <div></div>
   <div className={style.loadingBox}>
    <div className={style.loadingIcon}>
    <FontAwesomeIcon
      className={style.saveIcon}
      icon={faCheck}

      id="inpFileIcon"
      />
  </div>
  <h3>Uložené!</h3>
  </div>
    </>
    )
}
