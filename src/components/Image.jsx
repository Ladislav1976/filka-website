import style from "./Modal.module.css";

//props.visible -> says if modal should appear
export default function Image(props) {
  //   function onModalClose(e) {
  //     props.setModalFlag(false);
  //   }

  //   function onModalContentClick(event) {
  //     event.stopPropagation();
  //   }

  console.log("props.imageURLs", props.imageURLs);
  console.log("props.visible", props.visible);
  if (props.visible == true) {
    return (
      <>
        {props.imageURLs.map((imageSrc) => (
          <img
            className={style.foodimage}
            // className={style.imagePreview__image}
            key={imageSrc}
            src={imageSrc}
            alt="Image Preview"
          />
        ))}
      </>
    );
  } else {
    <img
      className={style.foodimage}
      // className={style.imagePreview__image}
      key=""
      src=""
      alt="Image Preview"
    />;
  }
}
