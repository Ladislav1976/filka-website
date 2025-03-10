import style from "./Save.module.css";
import { useRef,useEffect } from "react";

export default function DeleteConfirm(props) {

  const deleteRef = useRef()
  const cancelRef = useRef()

  useEffect(()=>{
    cancelRef.current.focus();
  },[])


  function delKeyDown(event) {
    if (event.key === "ArrowRight") {
      cancelRef.current.focus();
    }
    if (event.key === "Enter") {
      props.foodDelete();
    }
  }

  function canKeyDown(event) {
    console.log(event.key)
    if (event.key === "ArrowLeft") {
      deleteRef.current.focus();
    }
    if (event.key === "Enter") {
      props.handlerFoodDeleteCancel();
    }
  }
  return (<>
    <div></div>
    <div className={style.box}>
  
      <h3>Vymazať ? </h3>
      <div>
        <button ref={deleteRef} onKeyDown={delKeyDown} id={style.yes_button13} className={style.button13}  onClick={props.foodDelete}>ANO</button>
        <button ref={cancelRef} onKeyDown={canKeyDown} id={style.nobutton13} className={style.button13}  onClick={props.handlerFoodDeleteCancel}>NIE</button>

      </div></div>
  </>
  )
}
