import style from "./Image.module.css";
import { useState, useEffect } from "react";

//props.visible -> says if modal should appear
export default function Image(props) {
  const newImageUrlsRender = [];
  // const imageURLs = props.imageURLs;
  const imageURLs = props.imageURLs.filter((e=>e.position !="delete"))
  

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
      if(image.statusDelete ===false){
      newImageUrlsRender.push(<div><img
        className={style.foodimage}
        key={IDs}
        src={image.image}
        // onClick={()=> openModal()}
        onClick={() => uploader(image)}
        alt="Image Preview"
      /></div>)};
      IDs++
    })
  }

  return (

    <div className={style.imagebox}

    >{newImageUrlsRender}</div>
  )
}

