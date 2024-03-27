import style from "./Lightbox.modal.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faPenToSquare, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";


export default function Lightbox(props) {
    const [isVisibleEdit, setIsVisibleEdit] = useState(false)
    const newImageUrlsRender = [];
    const imageURLs = props.imageURLs;
    // const [imageDispley, setImageDispley] = useState(props.imageDispley)
    const imageDispley = props.imageDispley
    // const [currentImageID, setCurrentImageID] = useState(props.currentImageID)
    let currentImageID = props.currentImageID
    console.log("currentImageID 3", currentImageID)
    // const [currentImageID, setCurrentImageID] = useState(props.currentImageID)

    // const imagePreview=[]
    function closeModal(e) {
        console.log("close")
        props.setModalFlag(false)
    }

    // function imageUploader(imageToAdd) {
    //     // console.log("image ID",imageToAdd.id)
    //     // console.log("imageURLs",imageURLs)
    //     if (imageURLs.length < 1) { return; } else {
    //         let lenght = imageURLs.length
    //         let IDs = 100
    //         imageURLs.forEach((image) => {
    //             if (image.id === imageToAdd.id) {
    //                let newImagePreview = []
    //                 newImagePreview.push(
    //                     <img

    //                         key={image.id}
    //                         src={imageToAdd.image}
    //                         //   onClick={() =>props.deleteImage (image)}
    //                         alt="Image Preview"
    //                         id="imagePreviewed"
    //                     />
    //                 )
    //                 setImageDispley(newImagePreview)
    //             };
    //             IDs++
    //         })
    //     }
    // }
    // function currentSlide(n) {
    //     showSlides(slideIndex = n);
    //   }
    //   var slideIndex = 1;
    //   showSlides(slideIndex);
    //   function showSlides(n) {
    //     var i;
    //     var slides = imageURLs;
    //     var dots = document.getElementsByClassName("demo");
    //     var captionText = document.getElementById("caption");
    //     if (n > slides.length) {slideIndex = 1}
    //     if (n < 1) {slideIndex = slides.length}
    //     for (i = 0; i < slides.length; i++) {
    //         slides[i].style.display = "none";
    //     }
    //     for (i = 0; i < dots.length; i++) {
    //         dots[i].className = dots[i].className.replace(" active", "");
    //     }
    //     slides[slideIndex-1].style.display = "block";
    //     dots[slideIndex-1].className += " active";
    //     captionText.innerHTML = dots[slideIndex-1].alt;
    //   }
    if (imageURLs.length < 1) { return; } else {
        let lenght = imageURLs.length
        let IDs = 0

        imageURLs.forEach((image, index) => {
            let position = props.getPosition(image.id,imageURLs)
console.log("imageURLs[index]",imageURLs[index],"currentImageID",currentImageID)
console.log("position",position)
            newImageUrlsRender.push(


                <img
                    className={style.imageadded}
                    key={IDs}
                    src={image.image}
                    onClick={() => props.handlerImage(image)}
                    alt="Image Preview"
                    id={position === currentImageID ? "imagedisplayed": "imageadded" }


                />


            );
            IDs++
        })
    }
    return (<>
        <div className={style.mainbox} >
            <div className={style.first_column} ></div>
            <div id="second_column">
                <div className={style.imagePreviewBox} key={1} >
                    {imageDispley}
                </div>

                <div className={style.imageListBox}  key={2}
                >{newImageUrlsRender}
                </div>
            </div>
            <div className={style.imageSetingBox} >
                {isVisibleEdit && <FontAwesomeIcon className={style.saveIcon} icon={faFloppyDisk} />}
                {isVisibleEdit && <FontAwesomeIcon className={style.trashIcon} icon={faTrash} />}
                <FontAwesomeIcon className={style.editIcon} icon={faPenToSquare} onClick={()=>setIsVisibleEdit(true)}/>
                <span className={style.close} onClick={closeModal} id="close">          <b>&times;</b> </span>
            </div>
        </div>

    </>
    )
}
