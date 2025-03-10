import { useState, useEffect, useRef } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import StepsInput from "./StepsInput";
import SaveLoading from "../reports/SaveLoading";
import SaveSaved from "../reports/SaveSaved";
import SaveError from "../reports/SaveError";
import SaveErrorMissing from "../reports/SaveErrorMissing";
import Lightbox from "./Lightbox";
import style from "./NewFood.module.css";
import IngredientInput from "./IngredientInput";
import LeftPanelFilter from "./LeftPanelFilter";
import React, { Component } from "react";
import Image from "./Image";
import UrlInput from "./Url";
import Modal from "../reports/Modal";
import ModalPreview from "../reports/ModalPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faBackward, faCartPlus } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";

import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQueriesItems } from "../hooks/Queries/useQueriesItems";

import { usePostFood } from "../hooks/Mutations/usePostFood";
import { usePostImage } from "../hooks/Mutations/usePostImage";
import { usePostTag } from "../hooks/Mutations/usePostTag";
import { usePostStep } from "../hooks/Mutations/usePostStep";
import { usePostIngredients } from "../hooks/Mutations/usePostIngredients";
import { usePostIngredient } from "../hooks/Mutations/usePostIngredient";
import { usePostUnit } from "../hooks/Mutations/usePostUnit";
import { usePostUrl } from "../hooks/Mutations/usePostUrl";

function NewFood() {
    const { auth } = useAuth();
    const axiosPrivate = useAxiosPrivate()
    const controller = new AbortController();
    const component = "newcomponent"
    const navigate = useNavigate()

    const location = useLocation();
    const foods = location.state?.foods.pathname + location.state?.foods.search || "/";

    const goBack = () => navigate(foods);

    const postFood = usePostFood(handlerSetModalSave)
    // const deleteFood = useDeleteFood(setModalLoadingFlag, handlerSetModalError, handlerFoodDeleteConfirmed)
    const postImage = usePostImage()
    const postFoodTag = usePostTag(addTagTofoodTagSet, handlerSetModalError)
    const postStep = usePostStep()
    const postIngredients = usePostIngredients()
    const postIngredient = usePostIngredient()
    const postUnit = usePostUnit()
    const postUrl = usePostUrl()

    const [name, setName] = useState("")
    const [ingredientsList, setIngredientsList] = useState([]);
    const [urlList, setUrlList] = useState([])
    const [stepsList, setStepsList] = useState([]);
    const [foodTagSet, setFoodTagSet] = useState(new Set());

    const [images, setImages] = useState("");
    const [imageURLsList, setImageURLsList] = useState([])

    const [modalLoadingFlag, setModalLoadingFlag] = useState(false);
    const [modalSavedFlag, setModalSavedFlag] = useState(false);
    const [modalErrorFlag, setModalErrorFlag] = useState(false);
    const [modalSaveErrorMissingFlag, setModalSaveErrorMissingFlag] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalImageDeleteErrorFlag, setModalImageDeleteErrorFlag] = useState(false);
    const [modalLightboxFlag, setModalLightboxFlag] = useState(false);
    const [isVisibleEdit, setIsVisibleEdit] = useState(false)
    const [imgLoader, setImgLoader] = useState(0)


    const id = useParams()
    let ID = parseInt(id.id)

    const [usersQf, foodQf, ingredientQf, unitsQf, urlsQf, tagsQf] = useQueriesItems(ID, axiosPrivate, controller)

    const nameRef = useRef();
    const urlRef = useRef();
    const stepRef = useRef();
    const qtRef = useRef();
    const unitRef = useRef();
    const ingrRef = useRef();

    useEffect(() => {
        if (!ingredientQf.isLoading &&
            !unitsQf.isLoading &&
            !tagsQf.isLoading) { nameRef.current.focus(); }
    }, [ingredientQf.data, unitsQf.data, tagsQf.data])

    function nameKeyDown(event) {
        if (event.key === "Enter") {
            urlRef.current.focus();
        }
    }
    function urlKeyDown(event) {
        if (event.key === "Enter") {
            stepRef.current.focus();
        }
    }
    function stepKeyDown(event) {
        if (event.key === "Enter") {
            qtRef.current.focus();
        }
    }

    function qrKeyDown(event) {
        if (event.key === "Enter") {
            unitRef.current.focus();
        }
    }

    function unitKeyDown(event) {
        if (event.key === "Enter") {
            ingrRef.current.focus();
        }
    }
    function ingKeyDown(event) {
        if (event.key === "Enter") {
            nameRef.current.focus();
        }
    }




    function handleFoodSave() {

        const filterIngredients = ingredientsList.filter((ingre) => ingre.position != "delete")
        if (
            name == "" &&
            filterIngredients.length === 0 &&
            foodTagSet.size === 0 &&
            stepsList.length === 0
        ) {

            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov jedla, Suroviny, Druj jedla, Postup")

        }
        else if (
            filterIngredients.length === 0 &&
            foodTagSet.size === 0 &&
            stepsList.length === 0
        ) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: , Suroviny, Druj jedla, Postup");
        } else if (name === "" && foodTagSet.size === 0 && stepsList.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov , Druj jedla, Postup");
        } else if (name === "" && filterIngredients.length === 0 && stepsList.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov, Suroviny, Postup");
        } else if (name === "" && filterIngredients.length === 0 && foodTagSet.size === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov, Suroviny, Druj jedla");
        } else if (name === "" && filterIngredients.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov,Suroviny");
        } else if (name === "" && foodTagSet.size === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: ,Nazov, Druj jedla");
        } else if (name === "" && stepsList.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov, Postup");
        } else if (filterIngredients.length === 0 && foodTagSet.size === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Suroviny,Druj jedla");
        } else if (filterIngredients.length === 0 && stepsList.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Suroviny,Postup");
        } else if (name === "") {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov");
        } else if (filterIngredients.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Suroviny");
        } else if (foodTagSet.size === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Druj jedla");
        } else if (stepsList.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Postup");
        }
        else {
            makeFoodRecord({
                name: name,
                date: new Date().toISOString().substring(0, 10),
                foodTags: ([...foodTagSet]).map((tag) => tag.id),
                user: [auth?.userRes?.id],
            })
        }
        ;
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }

    function foodTagListCheck(tag) {
        let filter = Array.from(foodTagSet).filter((f) => f.foodTag === tag)
        if (filter != "") {
            removeFromFoodTagList(filter[0]);
        } else {
            handleAddToFoodTagList(tag);
        }
    }

    function ingredientsCheckPost(ing) {

        let unitFilter = unitsQf?.data?.find((element) => (element.unit == ing.units[0].unit))
        if (unitFilter == null) {
            return postUnit.mutateAsync({ unit: ing.units[0].unit })
                .then((unit) => {
                    let ingredientFilter = ingredientQf?.data?.find((element) => element.ingredient == ing.ingredientName[0].ingredient)
                    if (ingredientFilter == null) {
                        return postIngredient.mutateAsync({ ingredient: ing.ingredientName[0].ingredient })
                            .then((ingre) => {
                                return postIngredients.mutateAsync({
                                    units: [unit.data.id],
                                    quantity: ing.quantity,
                                    ingredientName: [ingre.data.id],
                                    position: ing.position
                                })
                            })
                            .catch((err) => {
                                handlerSetModalErrorMissing(err.message)
                            })
                    }
                    else {

                        return (postIngredients.mutateAsync({
                            units: [unit.data.id],
                            quantity: ing.quantity,
                            ingredientName: [ingredientFilter.id],
                            position: ing.position
                        }))
                    }
                })
                .catch((err) => {
                    handlerSetModalErrorMissing(err)

                })
        }
        else {
            let ingredientFilter = ingredientQf?.data?.find((element) => element.ingredient == ing.ingredientName[0].ingredient)
            if (ingredientFilter == null) {
                return postIngredient.mutateAsync({ ingredient: ing.ingredientName[0].ingredient })
                    .then((ingre) => {
                        if (ingre.status == 201) {
                            return (postIngredients.mutateAsync({
                                units: [unitFilter.id],
                                quantity: ing.quantity,
                                ingredientName: [ingre.data.id],
                                position: ing.position
                            }))
                        }
                    })
                    .catch((err) => {
                        handlerSetModalErrorMissing(err.message)
                    })
            }
            else {
                return (postIngredients.mutateAsync({
                    quantity: ing.quantity,
                    units: [unitFilter.id],
                    ingredientName: [ingredientFilter.id],
                    position: ing.position
                }
                ))
            }
        }
    }

    function addTagTofoodTagSet(foodTag) {
        let newFoodTagSet = new Set(foodTagSet);
        newFoodTagSet.add(foodTag);
        setFoodTagSet(newFoodTagSet);
    }

    function addToIngredientList(id, quantity, unit, ing) {
        if (ing === "") {
            return;
        }
        let newIngredientsList = ingredientsList.slice()
        newIngredientsList.push({ id: id, quantity: quantity, unit: [{ id: id, unit: unit }], ingredient: [{ id: id, ingredient: ing }], statusDelete: false }
        );
        setIngredientsList(newIngredientsList);
    }

    function makeIngredientsDelete(ingre) {
        setIngredientsList(makeItemDelete(ingre, ingredientsList))
    }

    function makeSteptoDelete(step) {
        setStepsList(makeItemDelete(step, stepsList))
    }

    function makeUrlToDelete(url) {
        setUrlList(makeItemDelete(url, urlList))
    }

    function makeItemDelete(item, array) {
        let itemIDPosition = getPosition(item.id, array);
        let newArray = array.slice();
        newArray.splice(itemIDPosition, 1, { ...item, position: "delete" })
        return newArray;
    }

    function updateStepList(oldID, newID, step) {
        setStepsList(updateItemList(oldID, newID, { i: oldID, step: step }, { i: newID, step: step }, stepsList))
    }

    function updateUrlList(oldID, newID, url) {
        setUrlList(updateItemList(oldID, newID, { i: oldID, url: url }, { i: newID, url: url }, urlList))
    }

    function updateItemList(oldID, newID, itemOldObj, itemNewObj, array) {
        let position = getPosition(oldID, array);
        console.log(itemOldObj, itemNewObj)
        let newArray = array.slice();
        if (Number.isInteger(oldID)) {
            newArray.splice(position, 1, itemOldObj)
        }
        if (!Number.isInteger(oldID)) {
            if (newID == "") {
                newArray.splice(position, 1, itemOldObj)
            } if (newID) {
                newArray.splice(position, 1, itemNewObj)
            }
        }
        return (newArray);
    }

    function handleAddUrl(url, urlList) {
        if (url.url == "") return
        setUrlList(addItem(url, urlList))
    }

    function handleAddStep(step, stepsList) {
        if (step.step == "") return
        setStepsList(addItem(step, stepsList))
    }

    function addItem(itemObj, array) {
        let newArray = array.slice();
        newArray.push(itemObj)
        return newArray;
    }

    function handleAddToFoodTagList(foodTag) {
        let filterFoodTag = tagsQf?.data?.filter((element) => element.foodTag == foodTag);
        if (filterFoodTag == "") {
            postFoodTag.mutate({ foodTag: foodTag })
        } else { addTagTofoodTagSet(filterFoodTag[0]) }
    }

    function removeFromFoodTagList(tag) {
        let newFoodTagSet = new Set(foodTagSet);
        newFoodTagSet.delete(tag);
        setFoodTagSet(newFoodTagSet);
    }

    function handleDataID(res) {
        let array = []
        res.map(r => { if (r.status !== 204) { array.push(r.data.id) } })
        return array
    }
    async function urlForPostHandler() {

        return Promise.all(
            urlList?.map((res, index) => {
                const urlVar = {
                    id: res.id,
                    url: res.url,
                }

                // if (res.position === "delete" && Number.isInteger(res.id)) {
                //     return deleteUrl.mutateAsync(urlVar)
                // }
                // if (Number.isInteger(res.id)) {
                //     return putUrl.mutateAsync(urlVar)
                // }
                if (!Number.isInteger(res.id) && res.position === "delete") { return { status: 204 } }
                else {
                    return postUrl.mutateAsync(urlVar)
                }

            })
        ).then(res => {
            console.log("res URL", res); return {
                status: "fullfilled",
                value: handleDataID(res)
            }
        }).catch((err) => {
            console.log("Error URL", err);
            handlerSetModalErrorMissing("Error URL");
            setModalLoadingFlag(false);
            handlerSetModalError()
        })

    }

    async function stepsForPostHandler() {

        return Promise.all(
            stepsList?.map((res, index) => {
                const stepVar = {
                    id: res.id,
                    step: res.step,
                    position: index + 1,
                }

                // if (res.position === "delete" && Number.isInteger(res.id)) {
                //     return deleteStep.mutateAsync(stepVar)
                // }
                // if (Number.isInteger(res.id)) {
                //     return putStep.mutateAsync(stepVar)
                // }
                if (!Number.isInteger(res.id) && res.position === "delete") { return { status: 204 } }
                else {
                    return postStep.mutateAsync(stepVar)
                }

            })
        ).then(res => {
            console.log("res Steps", res); return {
                status: "fullfilled",
                value: handleDataID(res)
            }
        }).catch((err) => {
            console.log("Error Steps", err);
            handlerSetModalErrorMissing("Error Steps");
            setModalLoadingFlag(false);
            handlerSetModalError()
        })

    }

    async function ingredientsForPostHandler() {

        return Promise.all(
            ingredientsList?.map((res, index) => {
                // console.log("res :", res, "index", index)
                const ingreVar = {
                    id: res.id,
                    units: [res.unit[0]],
                    quantity: res.quantity,
                    ingredientName: [res.ingredient[0]],
                    position: index + 1,
                }
                // if (res.position === "delete" && Number.isInteger(res.id)) {
                //     return (deleteIngredients.mutateAsync(ingreVar.id))
                // }
                // if (Number.isInteger(res.id)) {
                //     return putIngredients.mutateAsync(ingreVar)
                // }
                if (!Number.isInteger(res.id) && res.statusDelete === true) { return { status: 204 } }
                else {
                    return ingredientsCheckPost(ingreVar)
                }
            })
        ).then(res => {
            return {
                status: "fullfilled",
                value: handleDataID(res)
            }
        }).catch((err) => {
            console.log("Error Ingredients", err);
            handlerSetModalErrorMissing("Error Ingredients");
            setModalLoadingFlag(false);
            handlerSetModalError()
        })

    }

    async function imagiesForPostHandler(food) {

        const date = new Date(food.date).toISOString().substring(0, 10)
        const seconds = new Date(food.date).getUTCMilliseconds()

        return Promise.all(
            imageURLsList?.map((res, index) => {

                const imageID = res.id
                let form = new FormData();
                form.append("upload_folder", `${food.name}-${date}-${seconds}`);
                form.append("position", index + 1);

                let formdata = new FormData();
                formdata.append("upload_folder", `${food.name}-${date}-${seconds}`);
                formdata.append("image", res.imageForBackEnd);
                formdata.append("position", index + 1);

                const formdataPut = {
                    id: imageID,
                    imageForm: form
                }

                // if (Number.isInteger(res.id) && res.position === "delete") {
                //     return deleteImagefood.mutateAsync(formdataPut)
                // }
                if (!Number.isInteger(res.id) && res.statusDelete === false) {
                    return postImage.mutateAsync({ formdata })
                }
                if (!Number.isInteger(res.id) && res.statusDelete === true) { return { status: 204 } }
                // if (Number.isInteger(res.id)) {
                //     return putImagefood.mutateAsync(formdataPut)
                // }

            })
        ).then(res => {
            return {
                status: "fullfilled",
                value: handleDataID(res)
            }
        }).catch((err) => {
            console.log("Error Imagies", err); handlerSetModalErrorMissing("Error Imagies");
            setModalLoadingFlag(false);
            handlerSetModalError()
        })

    }

    async function makeFoodRecord(food) {
        setModalLoadingFlag(true)
        const stepsRun = stepsForPostHandler()
        const ingredientsRun = ingredientsForPostHandler()
        const imagiesRun = imagiesForPostHandler(food)
        const urlRun = urlForPostHandler()

        const stepsRes = await stepsRun
        const ingredientsRes = await ingredientsRun
        const imagiesRes = await imagiesRun
        const urlRes = await urlRun

        Promise.all([stepsRes, ingredientsRes, imagiesRes, urlRes])
            .catch(err => {
                console.log("ERROR putFood can not be executed! Posssible Error in the following post function: Steps, Ingredients or Imagies", err);
                setModalLoadingFlag(false)
                handlerSetModalError()
            })
            .then(() => {
                postFood.mutate({
                    ...food,
                    steps: stepsRes.value,
                    ingredients: ingredientsRes.value,
                    images: imagiesRes.value,
                    urls: urlRes.value
                })
            })
    }

    function imageURLsUpdater(imageURLsList) {
        setImageURLsList(imageURLsList);
    }

    function stepMove(move, step) {
        setStepsList(itemMove(move, step, stepsList))
    }

    function ingredientMove(move, ing) {
        setIngredientsList(itemMove(move, ing, ingredientsList))
    }

    function itemMove(move, item, array) {
        let position = getPosition(item.id, array)

        let newArray = array.slice()
        if (move > 0) {
            if (position < (-1 + array.length)) {
                newArray.splice(position, 1);
                newArray.splice(position + move, 0, item);
                return newArray
            }
        }
        if (move < 0) {
            if (position > 0) {
                newArray.splice(position, 1);
                newArray.splice(position - 1, 0, item);
                return newArray
            }
        }
    }


    function handlerSetModalSave() {
        setModalSavedFlag(true)
        setTimeout(() => {
            setModalSavedFlag(false); navigate(`/recepty/?page_size=${20}`);
        }, 1000)
    }
    function handlerSetModalError() {
        setModalErrorFlag(true)
        setTimeout(() => {
            setModalErrorFlag(false)
        }, 3000)
    }
    function handlerSetModalErrorMissing(message) {
        setModalMessage(message)
        setTimeout(() => {
            setModalMessage("")
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
        setImagePosition(imagePosition)
    }

    function makeImageDelete(image) {
        let imageIDPosition = getPosition(image.id, imageURLsList);
        let newImageURLsList = imageURLsList.slice();
        newImageURLsList.splice(imageIDPosition, 1, { ...image, statusDelete: true })
        setImageURLsList(newImageURLsList);
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
                    statusDelete: false
                }); position++
            }, setImageURLsList(newImageUrlsPost)
        )

    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    if (tagsQf.isLoading || ingredientQf.isLoading || unitsQf.isLoading)
        return <label htmlFor="inpFile">
            <div className={style.loadingContainer}>
                <FontAwesomeIcon
                    className={style.loadingIcon}
                    icon={faSpinner}
                    id="inpFileIcon"
                    spin ></FontAwesomeIcon>
            </div>
        </label>//<h1>Loading...</h1> 

    return (<>

        <form className={style.main}>
            <div className={style.boxcontainer}>
                <div className={style.messagebox}>
                    {modalMessage}</div>
                <div className={style.buttonBox} >
                    <div className={style.foodButton} id={style.foodButtonSave}
                    // datatooltip="Uloziť"
                    >
                        <FontAwesomeIcon
                            onClick={handleFoodSave}
                            icon={faCartPlus}

                        />
                    </div>
                    <div className={style.foodButton}
                    // datatooltip="Spať"
                    >
                        <FontAwesomeIcon
                            onClick={() => goBack()}
                            icon={faBackward}
                        />
                    </div>
                </div>
            </div>
            <div className={style.fooodbox} >
                <div className={style.fooodboxMidpanel} >
                    <LeftPanelFilter
                        onFoodTagSet={foodTagSet}
                        handleAddTagToFoodTagsList={foodTagListCheck}
                        foodTagsBox={null}
                        component={component}
                    />

                    {/* <div className={style.ingreProcedureBox}> */}
                    <div className={style.secondColumn}>
                        <div className={style.ingredients}>
                            <p>Suroviny:</p>
                            <IngredientInput
                                addToIngredientList={addToIngredientList}
                                ingredientsList={ingredientsList}
                                handlerSetModalErrorMissing={handlerSetModalErrorMissing}
                                ingredientMove={ingredientMove}
                                removeFromIngredientList={makeIngredientsDelete}
                                component={component}
                                qtRef={qtRef}
                                unitRef={unitRef}
                                ingrRef={ingrRef}
                                qrKeyDown={qrKeyDown}
                                unitKeyDown={unitKeyDown}
                                ingKeyDown={ingKeyDown}
                            ></IngredientInput>
                        </div>

                        <input

                            className={style.imageinput}
                            type="file"
                            multiple
                            accept="image/jpeg,image/png,image/gif"
                            id="inpFile"
                            onChange={onImageChange}
                            display="none"
                        />
                        <div className={style.imageIconBox}>
                            <label htmlFor="inpFile" className={style.imageIcon}
                                datatooltip="Pridať fotografiu">
                                <FontAwesomeIcon

                                    icon={faCircleArrowUp}
                                    // onClick={props.onTagDelete}
                                    id="inpFileIcon"
                                ></FontAwesomeIcon>
                            </label>
                        </div>
                        {!imageURLsList && <p className={style.numOfFiles} id="numOfFiles">
                            No Files chosen
                        </p>}
                        <div className={style.imagebox}>
                            <Image onImgLoader={[imgLoader, setImgLoader]} imageURLs={imageURLsList} setModalFlag={setModalLightboxFlag} handlerImage={handlerImage} makeImageDelete={makeImageDelete}></Image>
                        </div>
                    </div>
                    <div className={style.thirdColumn}>

                        <div className={style.urlName}>
                            <p>URL :</p>
                        </div>
                        <UrlInput
                            urlList={urlList}
                            component={component}
                            deleteUrl={makeUrlToDelete}
                            updateUrlList={updateUrlList}
                            handleAddUrl={handleAddUrl}
                            urlRef={urlRef}
                            urlKeyDown={urlKeyDown}
                        >

                        </UrlInput>
                        <div className={style.urlName}>
                            <p>Postup:</p>
                        </div>
                        <StepsInput
                            stepMove={stepMove}
                            handleAddStep={handleAddStep}
                            updateStepList={updateStepList}
                            stepsList={stepsList}
                            deleteStep={makeSteptoDelete}
                            component={component}
                            stepRef={stepRef}
                            stepKeyDown={stepKeyDown}
                        ></StepsInput>

                    </div>
                    <div className={style.fooodnamebox} >
                        <div className={style.name}>
                            Nazov:
                        </div>

                        <input
                            className={style.foodname}
                            ref={nameRef}
                            value={name}
                            onKeyDown={nameKeyDown}
                            type="text"
                            maxLength="25"
                            onChange={handleNameChange}
                        />
                    </div>
                    <div className={style.date}>
                    </div>
                </div>
            </div>

        </form>
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
        <Modal visible={modalSaveErrorMissingFlag} setModalFlag={setModalSaveErrorMissingFlag}>
            <SaveErrorMissing
                modalMessage={modalMessage} />

        </Modal>
        <ModalPreview visible={modalLightboxFlag} setModalFlag={setModalLightboxFlag}>
            <Lightbox
                imageURLsList={imageURLsList}
                closeModal={closeModal}
                handlerImage={handlerImage}
                getPosition={getPosition}
                modalImageDeleteErrorFlag={modalImageDeleteErrorFlag}
                isVisibleEdit={[isVisibleEdit, setIsVisibleEdit]}
                imagePosition={[imagePosition, setImagePosition]}
                imageURLsUpdater={imageURLsUpdater}

            >
            </Lightbox>
        </ModalPreview>

    </>
    )
}
export default NewFood;
