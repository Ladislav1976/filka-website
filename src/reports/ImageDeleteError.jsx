import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faCheck,faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import style from "../reports/ImageDeleteError.module.css";

export default  function ImageDeleteError(props) {

  if (props.visible) {
    return (<>
      <div></div>
      <div className={style.loadingBox}>
        <div className={style.loadingIcon}>
          <FontAwesomeIcon className={style.errorIcon} icon={faCircleExclamation} id="inpFileIcon" />
        </div>
        <h3>Fotografiu sa nepodarilo vymazat!</h3>
      </div>
    </>
    )
  }
}
