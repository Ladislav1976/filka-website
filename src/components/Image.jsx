import style from "./Image.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";



function Img(props) {

  return <>
    <div className={style.imageContainer}  >
      <img
        className={style.foodimage}
        src={props.image.image}
        loading="lazy"
        onLoad={() => props.setImgLoader(prev => prev + 1)}

        alt="Image Preview"
      />
      <div className={style.imageclicker}
        onClick={() => props.uploader(props.image)}>
        <div className={style.imagecross}>
          <FontAwesomeIcon
            icon={faXmark} />
        </div>
      </div>
      <input
        type="checkbox"
        className={style.checkboxInput}
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

  const [imgLoader, setImgLoader] = useState(0)
  const [load, setLoad] = useState(false);
  let imageURLs = props.imageURLs.filter((e => e.statusDelete != true))


  useEffect(() => {
    if (imgLoader === props.imageURLs.length) {
      setLoad(true);
    }
  }, [imgLoader, props.imageURLs.length]);

  function uploader(image) {
    props.handlerImage(image)
    openModal()
  }

  function openModal(e) {
    props.setModalFlag(true)
  }
  if (imageURLs.length < 1) { return } else {



    imageURLs.forEach((image, index) => {

      if (image.statusDelete === false) {

        newImageUrlsRender.push(
          <Img
            setImgLoader={setImgLoader}
            key={image.id}
            image={image}
            uploader={uploader}
            component={props.component}
            makeImageDelete={props.makeImageDelete}
          />
        )

      };

    })
  }
  let id = 1000
  return (<>
    {!load ? (<p>Loading images...</p>) : (<div className={style.imagebox}
    >{newImageUrlsRender}</div>)}

  </>
  )

}

