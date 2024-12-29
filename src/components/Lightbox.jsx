import style from "./Lightbox.module.css";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faPenToSquare, faFloppyDisk, faTrash, faXmark } from "@fortawesome/free-solid-svg-icons";
import ImageDeleteError from "../reports/ImageDeleteError";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

export default function Lightbox(props) {
    const [isVisibleEdit, setIsVisibleEdit] = props.isVisibleEdit
    const [imagePosition, setImagePosition] = props.imagePosition
    const component = props.component
    // console.log("isVisibleEdit: ", isVisibleEdit)
    // console.log("imagePosition 2: ", imagePosition)

    const [imageURLsList, setImageURLsList] = props.imageURLsList;
    console.log("imageURLsList[imagePosition]: ", imageURLsList)
    // const [imageDispley, setImageDispley] = useState(props.imageDispley)
    // const imageDispley = props.imageDispley

    // const [currentImageID, setCurrentImageID] = useState(props.currentImageID)
    // let currentImageID = props.currentImageID



    //   function getPosition(elementToFind, arrayElements) {
    //     var i;
    //     for (i = 0; i < arrayElements.length; i += 1) {
    //       if (arrayElements[i].id === elementToFind) {
    //         return i;
    //       }
    //     }
    //     return null; //not found
    //   }

    function makeImagesSave() {
        props.imageURLsUpdater(imageURLsList)
        props.closeModal();
    }

    // function handlerImage(imageToAdd) {
    //     console.log("imageToAdd  :" ,imageToAdd)
    //     let position = props.getPosition(imageToAdd.id, imageURLsList)
    //     console.log("position  :" ,position)
    //     console.log("imagePosition  :" ,imagePosition)
    //     setImagePosition(position)
    // }

    function imageDisplaydelete(newImageURLsList) {
        let i = imagePosition;
        while (newImageURLsList[i].statusDelete === true) {
            if (newImageURLsList.length > 1) {
                if (imagePosition > 0) { i = i - 1 }
                if (imagePosition === 0) { i++ }
            }
            if (newImageURLsList.length === 1) { i = "" }
        }
        return i
    }
    function makeImageDelete(image) {
        console.log("Image :",image, "imageURLsList :",imageURLsList)
        let imageIDPosition = props.getPosition(image.id, imageURLsList);
        let newImageURLsList = imageURLsList.slice();
        newImageURLsList.splice(imageIDPosition, 1, { ...image, statusDelete : true })
        console.log("newImageURLsList :",newImageURLsList)
        setImageURLsList(newImageURLsList);
        setImagePosition(imageDisplaydelete(newImageURLsList))

    }


      function imageDisplayChange(move, image) {
        let position = props.getPosition(image.id, imageURLsList)
        if (isVisibleEdit) {
            imageDisplayMove(move, image, position)
        }
        if (!isVisibleEdit) { imgageDisplayStep(move, position) }
    }

    function moveImage(array, from, to) {
        return array.map((item, index) => {
            if (index === to) return array[from];
            if (index === from) return array[to];
            return item;
        });
    }
    function imageDisplayMove(move, image, position) {
        console.log("move", move)
        console.log("position", position)
        // console.log("image", image)
        const newPosition = position + move
        console.log("newPosition", newPosition)
        let newImageURLsList = imageURLsList.slice()
        if (move > 0) {
    
            if (position < (-1 + imageURLsList.length)) {
                const  newImageURLsList = moveImage(imageURLsList,position,newPosition)
                console.log("newImageURLsList :",newImageURLsList)
                // newImageURLsList.splice(position, 1);
                // newImageURLsList.splice(position + move, 0, image);
    
                setImageURLsList(newImageURLsList)
                setImagePosition(newPosition)
                // setImagePosition((old)=> console.log("old",old))
            }
        }
        if (move < 0) {
            if (position > 0) {
                const  newImageURLsList = moveImage(imageURLsList,position,newPosition)
                console.log("newImageURLsList :",newImageURLsList)
                // newImageURLsList.splice(position, 1);
                // newImageURLsList.splice(position + move, 0, image);
                setImageURLsList(newImageURLsList)
                setImagePosition(newPosition)
                // setImageURLsList(newImageURLsList)
                // setImagePosition(position + move )
            }
        }
        console.log("imagePosition :",imagePosition,
            "imageURLsList :",imageURLsList
        )
    }
    
    function imgageDisplayStep(move, position) {
    
        if (move > 0) {
            if (position < (-1 + imageURLsList.length)) {
                let newPosition = position + move
                setImagePosition(newPosition)
            }
        }
        if (move < 0) {
            if (position > 0) {
                let newPosition = position + move
                setImagePosition(newPosition)
            }
        }
    }
    
    //   function handlerImage(imageToAdd, currentImageID) {
    //     let position = getPosition(imageToAdd.id, imageURLsList)
    //     console.log("positionnnnn", position)
    //     imageUploader(position)
    //   }

    //   function imageUploader(position) {
    // console.log("position 2", position)
    // setCurrentImageID(position)
    // console.log("imageURLs[position].id :", imageURLs[position].id);

    // console.log("INsite 10", currentImageID)
    let imageDispley = []
    let newImageToDelete = []

    imageDispley.push(
        <>
            <div className={style.imageblock}>
                {/* <a className={style.prev} onClick={() => { imageDisplayChange(-1, imageURLsList[imagePosition]) }}>&#10094;</a>
                <a className={style.next} onClick={() => { imageDisplayChange(+1, imageURLsList[imagePosition]) }} >&#10095;</a> */}
                <TransformWrapper
                    defaultScale={1}
                    defaultPositionX={100}
                    defaultPositionY={200}
                >
                    <TransformComponent>
                        <img
                            className={style.imagePreviewed}
                            key={imageURLsList[imagePosition].id}
                            // key={IDs}
                            image={imageURLsList[imagePosition]}
                            src={imageURLsList[imagePosition].image}
                            // onClick={() => console.log("haha")}
                            // alt={imageURLsList[imagePosition].name}
                        // id="imagePreviewed"
                        />
                    </TransformComponent>
                </TransformWrapper>
            </div>
            {/* </div> */}
        </>

    )


    let clicker = false
    function click() {
        clicker = true
    }


    const newImageUrlsRender1 = [];
    const newImageUrlsRender2 = [];
console.log(imageURLsList.map((a)=>a.id))
console.log("newImageUrlsRender2 :",newImageUrlsRender2.map((a)=>a.id))
    if (imageURLsList.length < 1) { return; } else {
        let filterImageURLsList = imageURLsList.filter((e => e.statusDelete === false))
        let IDs = 0

        filterImageURLsList.forEach((image, index) => {
            let pos = props.getPosition(image.id, filterImageURLsList)
            if (pos === imagePosition) { click() }
            // console.log("imageURLs[index]", imageURLs[index], "currentImageID", currentImageID)
            // console.log("position", pos, "imagePosition", imagePosition, pos === imagePosition ? "imagedisplayed" : "")
            // console.log("clicker : ", clicker)
            if (clicker) {
                newImageUrlsRender2.push(<>
                    <img
                        className={style.imageadded}
                        key={image.id}
                        src={image.image}
                        onClick={() => props.handlerImage(image)}
                        alt="Image Preview"
                        id={pos === imagePosition ? style["imagedisplayed"] : style[""]}
                    // id={style["imagedisplayed"]} 
                    />
                </>
                );
            } if (!clicker) {
                newImageUrlsRender1.push(<>
                    <img
                        className={style.imageadded}
                        key={image.id}
                        src={image.image}
                        onClick={() => props.handlerImage(image)}
                        alt="Image Preview"
                        id={pos === imagePosition ? style["imagedisplayed"] : style[""]}
                    // id={style["imagedisplayed"]} 
                    />
                </>
                );
            }
            IDs++
        })
    }
    return (<>

        <div className={style.mainbox} >
            {isVisibleEdit && <div className={style.saveIcon} datatooltip="Uložiť" onClick={makeImagesSave} ><FontAwesomeIcon icon={faFloppyDisk} /></div>}
            {isVisibleEdit && <div className={style.trashIcon} datatooltip="Zmazať fotografiu" onClick={() => makeImageDelete(imageURLsList[imagePosition])} ><FontAwesomeIcon icon={faTrash} /></div>}
            {!isVisibleEdit && (component == "editcomponent"||component == "newcomponent"  )&& <div className={style.editIcon} datatooltip="Upraviť"><FontAwesomeIcon icon={faPenToSquare} onClick={() => setIsVisibleEdit(true)} /></div>}
            <div className={style.headbox}>
                <a className={style.prev} onClick={() => { imageDisplayChange(-1, imageURLsList[imagePosition]) }} >&#10094;</a>
                <a className={style.next} onClick={() => { imageDisplayChange(+1, imageURLsList[imagePosition]) }} >&#10095;</a>
                <div className={style.first_column} ></div>
                <div className={style.second_column} >
                    <div className={style.imagePreviewBox} datatooltip="Zavrieť"
                        key={1}>
                        <div className={style.imagedeleteerror}  > <ImageDeleteError visible={props.modalImageDeleteErrorFlag}
                        ></ImageDeleteError></div>
                        <div className={style.imageDispley}>{imageDispley}</div>

                    </div>
                </div>
                <div className={style.third_column} >

                    <div className={style.cancel} datatooltip="Zavrieť" ><FontAwesomeIcon icon={faXmark} onClick={props.closeModal} /></div>
                </div>
            </div>
            <div className={style.imageListBox}
            >
                <div className={style.imageListBox1} >{newImageUrlsRender1}</div>
                <div className={style.imageListBox2}>{newImageUrlsRender2}</div>
            </div>
        </div>

    </>
    )
}
