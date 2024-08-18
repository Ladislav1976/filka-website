import style from "./Image.module.css";
import { useState, useEffect } from "react";

//props.visible -> says if modal should appear
export default function Image(props) {
  const newImageUrlsRender = [];
  const imageURLs = props.imageURLs;

  function uploader(image) {
    props.handlerImage(image)
    openModal()
  }

  function openModal(e) {
    props.setModalFlag(true)
  }
  if (imageURLs.length < 1) { return; } else {

    let IDs = 0

    imageURLs.forEach((image) => {
      newImageUrlsRender.push(<img
        className={style.foodimage}
        key={IDs}
        src={image.image}
        // onClick={()=> openModal()}
        onClick={() => uploader(image)}
        alt="Image Preview"
      />);
      IDs++
    })
  }

  return (

    <div className={style.imagebox}

    >{newImageUrlsRender}</div>
  )
}

