import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faCheck,faCircleExclamation } from "@fortawesome/free-solid-svg-icons";
import style from "../reports/Save.module.css";
function Message(props) {
    return (<div>{props.mess }</div>)
}
export default  function SaveErrorMissing(props) {
    const modalMessage = props.modalMessage
    let messageRender = []
    let ID = 0
    for (let mess of modalMessage) {
        messageRender.push(<Message mess={mess } key={ID} />

        )
        ID++
     }
    return(   <>
    <div></div>
   <div className={style.loadingBox}>
    <div className={style.loadingIcon}>
    <FontAwesomeIcon className={style.errorIcon} icon={faCircleExclamation}  id="inpFileIcon"/>
  </div>
            <h3>{messageRender }</h3>
  </div>
    </>
    )
}
