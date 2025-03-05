import style from "../reports/ModalPreview.module.css";

//props.visible -> says if modal should appear
export default function ModalPreview(props) {
  function onModalClose() {
    console.log("click")
    props.setModalFlag(false);
  }

  function onModalContentClick(event) {
    event.stopPropagation();
  }

  if (props.visible) {
    return (
      <div className={style.modalWrapper} onClick={onModalClose}>
        <div className={style.modal} onClick={onModalContentClick}>{props.children}</div>
      </div>
    );
  } else {
    return null;
  }
}
