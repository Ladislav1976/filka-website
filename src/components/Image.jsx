import style from "./Image.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";



function Img(props) {

  return <>
    <div className={style.imageContainer}  >
      <img
        className={style.foodimage}
        src={props.image.image}
        loading="lazy"
        onLoad={() => style.displayNone}
        onClick={() => props.uploader(props.image)}
        alt="Image Preview"
      />
      <input
        type="checkbox"
        // checked={handleFilterTagListArray(tag.tagName)}
        // name={tag.tagName}
        className={style.checkboxInput}
      // id={tag.tagName}

      // onChange={() => props.handleAddTagToFoodTagsList(tag.tagName)}
      />
      <div className={props.component == "editcomponent" || props.component == "newcomponent" ? style.deleteIcon
        : style.displayNone}
      >
        <FontAwesomeIcon

          icon={faTrash}
          onClick={() => {
            props.makeImageDelete(props.image)
          }}
        /></div>
    </div>
  </>
}
export default function Image(props) {
  const newImageUrlsRender = [];

  const [imgLoader, setImgLoader] = useState(props.imageURLs.length)
  let imageURLs = props.imageURLs.filter((e => e.statusDelete != true))


  function uploader(image) {
    props.handlerImage(image)
    openModal()
  }

  function openModal(e) {
    props.setModalFlag(true)
  }
  if (imageURLs.length < 1) { return } else {

    let IDs = 0

    imageURLs.forEach((image, index) => {

      if (image.statusDelete === false) {

        newImageUrlsRender.push(
          <Img
            onLoad={() => setImgLoader(prev => prev - 1)}
            key={image.id}
            image={image}
            uploader={uploader}
            component={props.component}
            makeImageDelete={props.makeImageDelete}


          />
        )

      };
      IDs++
    })
  }
  let id = 1000
  return (
    // <div className={imgLoader > 0 ? style.unvisible : style.imagebox}
<div className={style.imagebox}
    >{newImageUrlsRender}</div>

  )

}

