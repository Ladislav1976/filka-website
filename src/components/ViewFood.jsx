import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StepsInput from "./StepsInput";
import SaveLoading from "../reports/SaveLoading";
import SaveSaved from "../reports/SaveSaved";
import ImageDeleteError from "../reports/ImageDeleteError";
import SaveError from "../reports/SaveError";
import Lightbox from "./Lightbox";
import style from "./NewFood.module.css";
import IngredientInput from "./IngredientInput";
import LeftPanelFilter from "./LeftPanelFilter";
import React, { Component } from "react";
import Image from "./Image";
import UrlInput from "./Url";
import Modal from "../reports/Modal";
import ModalPreview from "../reports/ModalPreview";
import { useGet, useMutate } from "restful-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faFloppyDisk, faPenToSquare, faBackward } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useQueries, useQuery, useQueryClient, useMutation, } from "@tanstack/react-query"
import { createPostStep, createPutStep, createDeleteStep, createPostUnit, createPostIngredient, createPostIngredients, createPostFoodTag, createPostFood, createPutFood, createPostImagefood, createDeleteImagefood, createPutImagefood } from "../hooks/use-post";
// import { postStepMutation } from "../hooks/use-mutate";
import PostStepMutation from "../hooks/use-mutate";
import { getUrl, getFood, getIngredients, getIngredient, getUnit, getImageFood, getImage, getSteps, getStep, getFoodTags, queryFnFoodTagName, queryFnFoodTagId, queryFnFoodTagToId, queryFnFoodStep } from "../hooks/use-get";
import { checkUrlImage } from "../hooks/checkUrlImage";




function ViewFood(props) {
    // const queryClient = useQueryClient();
    const component = "viewcomponent"
    const navigate = useNavigate()
    const [foodID, setFoodID] = useState()
    const [name, setName] = useState("")
    const [nameTagSet, setNameTagSet] = useState()
    const [ingredientsSet, setIngredientsSet] = useState([]);
    const [ingredientsSetID, setIngredientsSetID] = useState(new Set());
    const [stepsList, setStepsList] = useState([]);
    const [stepsSetID, setStepsSetID] = useState([]);

    const [foodTagSet, setFoodTagSet] = useState(new Set());
    const [foodTagSetID, setFoodTagSetID] = useState(new Set())

    const [date, setDate] = useState("")
    const newdate = new Date(date).toLocaleDateString('sk-SK')






    const [images, setImages] = useState("");
    const [imagePreview, setImagePreview] = useState([]);
    const [imageURLs, setImageURLs] = useState([])
    const [imageURLsList, setImageURLsList] = useState([])
    const [urlList, setUrlList] = useState([])
    const [imageFlag, setImageFlag] = useState(true);
    const [imageURLsPost, setImageURLsPost] = useState([])


    const [modalLoadingFlag, setModalLoadingFlag] = useState(false);
    const [modalSavedFlag, setModalSavedFlag] = useState(false);
    const [modalErrorFlag, setModalErrorFlag] = useState(false);
    const [modalImageDeleteErrorFlag, setModalImageDeleteErrorFlag] = useState(false);
    const [modalLightboxFlag, setModalLightboxFlag] = useState(false);
    const [imageDispley, setImageDispley] = useState([])
    const [imageToDelete, setImageToDelete] = useState([])
    const [currentImageID, setCurrentImageID] = useState("")
    const [isVisibleEdit, setIsVisibleEdit] = useState(false)


    const id = useParams()

    let ID = parseInt(id.id)

    const dataFoods = useQuery({
        queryKey: ["foods", ID],
        enabled: !!id,
        queryFn: () => getFood(ID),

    })

    const dataFoodsImage = useQueries({
        queries: dataFoods.isLoading == false
            // && dataFoodsStIngre.data.ingredients.ingredientName!=undefined
            ? dataFoods?.data?.images?.map((id) => ({
                queryKey: ["imagefood", id],
                queryFn: () => getImage(id),
                staleTime: Infinity,
            })
            ) : [],

        combine: (results) => {
            if (!results) return
            return {
                data: results.map((result) => result.data),
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
                fetchStatus: results.some((result) => result.fetchStatus),
            }
        },
    })

    const dataFoodTags = useQuery({
        queryKey: ["foodTags"],
        // enabled: !!dataImagefood,
        queryFn: getFoodTags,
    })

    const dataSteps = useQueries({

        queries: dataFoods.isLoading == false

            ? dataFoods?.data?.steps?.map((id) => ({
                queryKey: ["steps", id],
                queryFn: () => getStep(id),
                staleTime: Infinity,

            })) : [],
        combine: (results) => {
            if (!results) return
            return {
                data: results?.map((result) => result.data)
                    .sort(function (a, b) {
                        return a.position - b.position;
                    })
                ,
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
            }
        },
    })

    const dataUrl = useQueries({

        queries: dataFoods.isLoading == false

            ? dataFoods?.data?.urls?.map((id) => ({
                queryKey: ["url", id],
                queryFn: () => getUrl(id),
                staleTime: Infinity,

            })) : [],
        combine: (results) => {
            if (!results) return
            return {
                data: results?.map((result) => result.data),
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
            }
        },
    })


    const dataIngredients = useQuery({
        queryKey: ["ingredients"],
        // enabled: !!dataSteps.data,
        queryFn: getIngredients,
    })

    const dataIngredient = useQuery({
        queryKey: ["ingredient"],
        // enabled: !!dataIngredients,
        queryFn: getIngredient,
    })

    const dataUnit = useQuery({
        queryKey: ["unit"],
        // enabled: !!dataIngredient,
        queryFn: getUnit,
    })

    useEffect(() => {
        let food = ""
        if (dataFoods.isLoading == false) {
            if (dataFoodsImage.isLoading == false) {
                if (dataFoodTags.isLoading == false) {
                    if (dataSteps.isLoading == false) {
                        if (dataIngredients.isLoading == false) {
                            if (dataIngredient.isLoading == false) {
                                if (dataUnit.isLoading == false) {
                                    if (dataUrl.isLoading == false) {

                                        food = handleFood()
                                        setFoodID(food.id);
                                        setName(food.name);
                                        setFoodTagSet(food.foodTags);
                                        setStepsList(food.steps);
                                        setIngredientsSet(food.ingredients);
                                        setUrlList(food.urls)
                                        setDate(food.date);
                                        setImageURLsList(food.images);
                                    } else {
                                    }
                                } else {
                                }
                            } else {
                            }
                        } else {
                        }
                    } else {
                    }
                } else {
                }

            } else {
            }
        } else {
        }

    }, [dataFoods.data, dataFoodsImage.data, dataFoodTags.data, dataSteps.data, dataIngredients.data, dataIngredient.data, dataUnit.data, dataUrl.data
    ])


    const backEndFood = dataFoods.data ?? [];
    const backEndFoodTags = dataFoodTags.data ?? [];
    const backEndSteps = dataSteps.data ?? [];
    const backEndUrls = dataUrl.data ?? [];
    const backEndImagefood = dataFoodsImage.data ?? [];
    const backEndIngredients = dataIngredients.data ?? [];
    const backEndIngredient = dataIngredient.data ?? [];
    const backEndUnit = dataUnit.data ?? [];


    function handleFood() {



        function itemListDownl(backEndFood, backEndItems, sorting) {
            let returnList = []
            backEndFood?.forEach((f) => {
                backEndItems?.map((e) => {
                    if (e.id === f) {
                        returnList.push({
                            ...e,
                            statusDelete: false
                        });
                        ;
                    }
                });
            });
            //sorting of items from 1 to 999
            if (sorting) {
                returnList.sort(function (a, b) {
                    return a.position - b.position;
                }
                )
            };
            return returnList
        }

        function ingredientsListDownl() {
            let ingredients = []
            backEndFood.ingredients.map((datatags) => {
                backEndIngredients.map((e) => {
                    if (e.id == datatags) {
                        backEndUnit.map((u) => {
                            if (u.id == e.units) {
                                backEndIngredient?.map((i) => {
                                    if (i.id == e.ingredientName) {
                                        ingredients.push({
                                            id: e.id,
                                            quantity: e.quantity,
                                            unit: [u],
                                            ingredient: [i],
                                            position: e.position,
                                            statusDelete: false
                                        })
                                    }
                                })
                            }
                        })
                    }
                }
                )
            })
            ingredients.sort(function (a, b) {
                return a.position - b.position;
            })

            return ingredients
        }

        return ({
            id: backEndFood.id,
            name: backEndFood.name,
            images: itemListDownl(backEndFood.images, backEndImagefood, "yes"),
            ingredients: ingredientsListDownl(),
            steps: itemListDownl(backEndFood.steps, backEndSteps, "yes"),
            urls: itemListDownl(backEndFood.urls, backEndUrls, "no"),
            foodTags: itemListDownl(backEndFood.foodTags, backEndFoodTags, "no"),
            date: backEndFood.date,
        })
    }


    function handleNavigateToFoodEdit() {
        navigate(`/recepty/uprava/${id.id}/`)
    }

    // function handleAddToNameTagList() {
    //     let nameSplit = name?.split(" ");
    //     addToNameTagList(nameSplit);
    // }

    // function handleNameChange(event) {
    //     setName(event.target.value);
    // }


    function foodTagListCheck(tag) {
        // if (foodTagSetArray.includes(tag)) {
        //     removeFromFoodTagList(tag);
        // } else {
        //     handleAddToFoodTagList(tag);
        // }
    }


    // function ingredientsCheckPost(times, unit, ingredient) {
    //     let unitFilter = dataUnit.find((element) => (element.unit == unit))
    //     if (unitFilter == null) {
    //         postUnit({ unit: unit, times: times, ingredient: ingredient })
    //     } else {
    //         ingredientCheckPost(times, unitFilter, ingredient)
    //     }
    // }

    // function ingredientCheckPost(times, unit, ingredient) {
    //     let ingredientFilter = dataIngredient.find((element) => element.ingredient == ingredient)
    //     if (ingredientFilter == null) {
    //         postIngredient({ unit, times: times, ingredient: ingredient })
    //     } else {
    //         ingredientsPost(times, unit, ingredientFilter)
    //     }
    // }

    function addTofoodTagList(foodTag) {
        let newfoodTagIDList = new Set(foodTagSetID);
        newfoodTagIDList.add(foodTag.id);
        setFoodTagSetID(newfoodTagIDList);
        let newFoodTagSet = new Set(foodTagSet);
        newFoodTagSet.add(foodTag.foodTag);
        setFoodTagSet(newFoodTagSet);
    }

    function addToIngredientsIDList(ing) {
        let newIngredientsIDList = new Set(ingredientsSetID);
        newIngredientsIDList.add(ing.id);
        setIngredientsSetID(newIngredientsIDList);
    }


    // function ingredientsPost(times, unitChecked, ingredientChecked) {
    //     let ingredientFilter = dataIngredients.find(
    //         (element) =>
    //             element.volume == times &&
    //             element.units[0] == unitChecked.id &&
    //             element.ingredientName[0] == ingredientChecked.id
    //     )

    //     if (ingredientFilter == null) {
    //         postIngredients({
    //             volume: times,
    //             units: [unitChecked.id],
    //             ingredientName: [ingredientChecked.id],
    //         })
    //     }
    //     else { addToIngredientsIDList(ingredientFilter) }
    // }


    // function makeSteptoDelete(oldID, step, stposition) {
    //     let stepIDPosition = getPosition(oldID, stepsSet);
    //     let newStepsList = stepsSet.slice();
    //     let newStepsIDList = stepsSetID.slice();
    //     newStepsList.splice(stepIDPosition, 1, { id: oldID, step: step, stposition: "delete" })
    //     newStepsIDList.splice(stepIDPosition, 1, { id: oldID })
    //     setStepsSet(newStepsList);
    //     setStepsSetID(newStepsIDList)
    // }
    function updateStepInTagList(oldID, newID, step) {
        let stepIDPosition = getPosition(oldID, stepsList);

        let newStepsList = stepsList.slice();
        let newStepsIDList = stepsSetID.slice();
        if (Number.isInteger(oldID)) {
            newStepsList.splice(stepIDPosition, 1, { id: oldID, step: step })
            newStepsIDList.splice(stepIDPosition, 1, oldID)
        }
        if (!Number.isInteger(oldID)) {
            if (newID == "") {
                newStepsList.splice(stepIDPosition, 1, { id: oldID, step: step })
                newStepsIDList.splice(stepIDPosition, 1, oldID)
            } if (newID) {
                newStepsList.splice(stepIDPosition, 1, { id: newID, step: step })
                newStepsIDList.splice(stepIDPosition, 1, newID)
            }
        }
        setStepsList(newStepsList);
        setStepsSetID(newStepsIDList)
    }
    function addStepToTagList(id, step) {
        if (step == "") return
        let newStepsList = stepsList.slice();
        let newStepsIDList = stepsSetID.slice();
        newStepsList.push({ id: id, step: step })
        setStepsList(newStepsList);
        newStepsIDList.push(id)
        setStepsSetID(newStepsIDList)
    }

    function removeFromStepsList(step) {
        let stepsSetPosition = getPosition(step.id, stepsList)
        let stepsSetIDPosition = getPosition(step.id, stepsSetID)
        let newStepsSet = stepsList.slice();
        let newStepsIDSet = stepsSetID.slice();
        newStepsSet.splice(stepsSetPosition, 1);
        newStepsIDSet.splice(stepsSetIDPosition, 1);
        setStepsSetID(newStepsIDSet);
        setStepsList(newStepsSet);
    }

    // function handleAddToFoodTagList(foodTag) {
    //     let filterFoodTag = dataFoodTags.filter((element) => element.foodTag == foodTag);
    //     if (filterFoodTag == "") {
    //         postFoodTag({ foodTag: foodTag })
    //     } else { addTofoodTagList(filterFoodTag[0]) }
    // }

    // function removeFromFoodTagList(tag) {
    //     let newFoodTagSet = new Set(foodTagSet);
    //     let newFoodTagIDSet = new Set(foodTagSetID);
    //     let filterfoodTag = dataFoodTags.filter(
    //         (element) => element.foodTag == tag
    //     );
    //     newFoodTagIDSet.delete(filterfoodTag[0].id);
    //     newFoodTagSet.delete(filterfoodTag[0].foodTag);
    //     setFoodTagSetID(newFoodTagIDSet);
    //     setFoodTagSet(newFoodTagSet);
    // }




    // function handleEditFoodSave(food) {
    //     const stepsForPost = stepsSet?.map((res, index) => {
    //         let newStep = {
    //             id: res.id,
    //             step: res.step,
    //             stposition: index + 1,
    //         }
    //         let stepDelete = {
    //             id: res.id,
    //             step: res.step,
    //             stposition: res.stposition,
    //         }
    //         if (res.stposition == "delete") {
    //             return deleteStep(stepDelete)
    //         }
    //         if (Number.isInteger(res.id)) {
    //             return putStepAsync(newStep)
    //         }
    //         else {
    //             return postStepAsync(newStep,)
    //         }

    //     });
    //     Promise.allSettled(stepsForPost).then((results) => {
    //         let array = []
    //         results.map((result) => { if (result.value !== undefined) { array.push(result.value.id) } })
    //         putFood({
    //             ...food,
    //             steps: array
    //         })
    //     })
    // }

    // function stepMove(move, step) {
    //     let position = getPosition(step.id, stepsSet)
    //     let newStepsSet = stepsSet.slice()
    //     if (move > 0) {
    //         if (position < (-1 + stepsSet.length)) {
    //             newStepsSet.splice(position, 1);
    //             newStepsSet.splice(position + move, 0, step);
    //             setStepsSet(newStepsSet)
    //         }
    //     }
    //     if (move < 0) {
    //         if (position > 0) {
    //             newStepsSet.splice(position, 1);
    //             newStepsSet.splice(position - 1, 0, step);
    //             setStepsSet(newStepsSet)
    //         }
    //     }
    // }

    function handlerFoodSaveClose() {
        navigate(`/recepty/?page_size=${20}`);
    }

    function handlerSetModalSave() {
        setModalSavedFlag(true)
        setTimeout(() => {
            setModalSavedFlag(false); navigate(`/recepty/?page_size=${2}`);
        }, 1000)
    }
    function handlerSetModalError() {
        setModalErrorFlag(true)
        setTimeout(() => {
            setModalErrorFlag(false)
        }, 3000)
    }
    function handlerSetModalImageDeleteError() {
        setModalImageDeleteErrorFlag(true)
        setTimeout(() => {
            setModalImageDeleteErrorFlag(false)
        }, 3000)
    }
    function closeModal(e) {
        setModalLightboxFlag(false)
        setIsVisibleEdit(false)
    }

    function pageReload() {
        window.location.reload();
    }

    function getPosition(elementToFind, arrayElements) {
        var i;
        for (i = 0; i < arrayElements.length; i += 1) {
            if (arrayElements[i].id === elementToFind) {
                return i;
            }
        }
        return null;
    }

    const [imagePosition, setImagePosition] = useState()
    function handlerImage(imageToAdd) {
        let imagePosition = (getPosition(imageToAdd.id, imageURLsList))
        console.log("imagePosition 1: ", imagePosition)
        setImagePosition(imagePosition)
    }

    // images for Posting
    useEffect(() => {
        let newImageUrlsPost = imageURLsList.slice()
        let uniqueID = new Date().toISOString()

        if (images.length < 1) return;
        let position = imageURLsList.length + 1
        images.forEach(
            (image, index) => {
                newImageUrlsPost.push({
                    id: `${uniqueID}${index}`,
                    image: URL.createObjectURL(image),
                    imageForBackEnd: image,
                    position: position,
                }); position++
            }, setImageURLsList(newImageUrlsPost)
        )

    }, [images]);


    function onImageChange(e) {
        setImages([...e.target.files]);
    }


    if (dataFoods.isLoading || dataFoodTags.isLoading || dataSteps.isLoading || dataIngredients.isLoading || dataIngredient.isLoading || dataUnit.isLoading || dataFoodsImage.isLoading)
        return <label htmlFor="inpFile">
            <div className={style.loadingContainer}>
                <FontAwesomeIcon
                    className={style.loadingIcon}
                    icon={faSpinner}
                    id="inpFileIcon"
                    spin ></FontAwesomeIcon>
            </div>
        </label>//<h1>Loading...</h1> 
    if (dataFoods.status === 'error' || dataFoodsImage.status === 'error' || dataFoodTags.status === 'error' || dataSteps.status === 'error' || dataIngredients.status === 'error' || dataIngredient.status === 'error' || dataUnit.status === 'error') navigate("/recepty/?page_size=30");
    // if (statusFood === 'error') return <h1>{JSON.stringify(errorFoods)}</h1>
    // if (statusImagefood === 'error') return <h1>{JSON.stringify(errorImagefood)}</h1>
    // if (statusFoodTags === 'error') return <h1>{JSON.stringify(errorFoodTags)}</h1>
    // if (statusSteps === 'error') return <h1>{JSON.stringify(errorSteps)}</h1>
    // if (statusIngredients === 'error') return <h1>{JSON.stringify(errorIngredients)}</h1>
    // if (statusIngredient === 'error') return <h1>{JSON.stringify(errorIngredient)}</h1>
    // if (statusUnit === 'error') return <h1>{JSON.stringify(errorUnit)}</h1>
    // if (loadingFood || loadingFoodTags || loadingSteps || loadingIngredients || loadingIngredient || loadingUnit || loadingImageFood) return <h1>return Loading...</h1>
    return (<>

        <div className={style.main}>
            <div className={style.header}>RECEPT</div>
            <div className={style.boxcontainer}>
        <div className={style.messagebox}>
          </div>
            <div className={style.buttonBox} >
                <div className={style.foodButton}>
                    {/* datatooltip="Upraviť" */}
                    <FontAwesomeIcon
                        onClick={handleNavigateToFoodEdit}
                        icon={faPenToSquare}

                    />
                </div>
                {/* <div className={style.foodButton} onClick={handleNavigateToFoodEdit}>
                    UPRAVIŤ
                </div> */}
                <div className={style.foodButton} >
                    {/* datatooltip="Upraviť" */}
                    <FontAwesomeIcon
                        onClick={handlerFoodSaveClose}
                        icon={faBackward}

                    />
                </div>
                {/* <div className={style.foodButton} onClick={handlerFoodSaveClose}>
                    SPÄŤ
                </div> */}
            </div>
            </div>
            <div className={style.fooodbox} >
                <LeftPanelFilter
                    onFoodTagSet={foodTagSet}
                    handleAddTagToFoodTagsList={foodTagListCheck}
                    foodTagsBox={null}
                    component={component}

                />

                <div className={style.secondColumn}>
                    <div className={style.ingredients}>
                        <p>Suroviny:</p>
                        <IngredientInput

                            ingredientsList={ingredientsSet}
                            ingredientsIDList={ingredientsSetID}

                            component={component}
                        ></IngredientInput>
                    </div>
                    {/* <div className={style.images} id="imagePreview">
            {imagePreview}
            <span className={style.imagePreview__defaultText}>
              Image Preview
            </span>
          </div> */}

                    {component === "editcomponent" && <input
                        // className={style.imageinput}
                        className={style.imageinput}
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/gif"
                        id="inpFile"
                        // id="image-input"
                        onChange={onImageChange}
                        display="none"
                    />}
                    {component === "editcomponent" && <label htmlFor="inpFile" className={style.imageIcon}
                        datatooltip="Pridať fotografiu">
                        <FontAwesomeIcon

                            icon={faCircleArrowUp}
                            // onClick={props.onTagDelete}
                            id="inpFileIcon"
                        ></FontAwesomeIcon>
                    </label>}
                    {!imageURLsList && <p className={style.numOfFiles} id="numOfFiles">
                        No Files chosen
                    </p>}
                    <div className={style.imagebox}>
                        <Image visible={imageFlag} imageURLs={imageURLsList} setModalFlag={setModalLightboxFlag} handlerImage={handlerImage} ></Image>
                    </div>
                </div>
                <div className={style.thirdColumn}>
                    {/* <div>
                        <p>Nazov:</p>
                    </div> */}
                    {/* <div className={style.foodnameView}>{name}</div> */}
                    {/* <input
                        className={style.foodname}
                        value={name}
                        type="text"
                        maxlength="25"
                        onChange={handleNameChange}
                        onClick={handleAddToNameTagList}
                    /> */}

                    <div className={style.date}></div>

                    <div className={style.urlName}>
                        <p>URL :</p>
                    </div>

                    <UrlInput
                        urlList={urlList}
                        component={component}
                    >
                    </UrlInput>
                    {/* URL: 
                    </div>
                    <div><a className={style.foodurlView}  href="https://www.w3schools.com/cssref/atrule_import.php" target="_blank">
                     {"Link 1"}
                    </a> */}

                    <div className={style.urlName}>
                        <p>Postup :</p>
                    </div>
                    <StepsInput
                        // stepMove={stepMove}
                        // addStepToTagList={addStepToTagList}
                        // updateStepInTagList={updateStepInTagList}
                        stepsList={stepsList}
                        stepsSetIDState={stepsSetID}
                        // deleteStep={makeSteptoDelete}
                        component={component}
                    ></StepsInput>
                </div>
                <div className={style.foodnameView}>{name}</div>
                <div className={style.date}>
                    Vytvorené: {newdate}
                </div>
            </div>

        </div>
        <Modal visible={modalLoadingFlag} setModalFlag={setModalLoadingFlag}>
            <SaveLoading
            ></SaveLoading>
        </Modal>
        <Modal visible={modalSavedFlag} setModalFlag={setModalSavedFlag}>
            <SaveSaved
            ></SaveSaved>
        </Modal>
        <Modal visible={modalErrorFlag} setModalFlag={setModalErrorFlag}>
            <SaveError
            ></SaveError>
        </Modal>
        <ModalPreview visible={modalLightboxFlag} setModalFlag={setModalLightboxFlag}>
            <Lightbox
                imageURLsList={[imageURLsList, setImageURLsList]}
                closeModal={closeModal}
                handlerImage={handlerImage}
                getPosition={getPosition}
                imageDispley={imageDispley}
                currentImageID={currentImageID}

                imageToDelete={imageToDelete}
                modalImageDeleteErrorFlag={modalImageDeleteErrorFlag}
                isVisibleEdit={[isVisibleEdit, setIsVisibleEdit]}
                imagePosition={[imagePosition, setImagePosition]}
                // putImagefood={putImagefood}
                pageReload={pageReload}
                component={component}
            >
            </Lightbox>
        </ModalPreview>

    </>
    )
}
export default ViewFood;
