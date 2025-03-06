import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSpinner } from "@fortawesome/free-solid-svg-icons";
import style from "../reports/Save.module.css";

export default  function SaveLoading(props) {


    return(   <>
    <div></div>
   {/* <div className={style.loadingBox}> */}
    <div className={style.loadingIcon}>
    <FontAwesomeIcon
      className={style.loadingIcon}
      icon={faSpinner}

      id="inpFileIcon"
      spin />
  </div>
  {/* <h3>Ukladá sa . . .</h3> */}
  {/* </div> */}
    </>
    )
}
