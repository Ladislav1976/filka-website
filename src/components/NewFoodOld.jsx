import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import StepsInput from "./StepsInput";
import SaveLoading from "../reports/SaveLoading";
import SaveSaved from "../reports/SaveSaved";
import ImageDeleteError from "../reports/ImageDeleteError";
import SaveError from "../reports/SaveError";
import SaveErrorMissing from "../reports/SaveErrorMissing";
import Lightbox from "./Lightbox";
import style from "./NewFood.module.css";
import IngredientInput from "./IngredientInput";
import LeftPanelFilter from "./LeftPanelFilter";
import React, { Component } from "react";
import Image from "./Image";
import Modal from "../reports/Modal";
import ModalPreview from "../reports/ModalPreview";
import { useGet, useMutate } from "restful-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faPenToSquare, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useQueries, useQuery, useQueryClient, useMutation, } from "@tanstack/react-query"
import { createPostStep, createPutStep, createDeleteStep, createPostUnit, createPostIngredient, createPostIngredients, createPostFoodTag, createPostFood, createPutFood, createPostImagefood, createDeleteImagefood, createPutImagefood } from "../hooks/use-post";
// import { postStepMutation } from "../hooks/use-mutate";
import PostStepMutation from "../hooks/use-mutate";
import { defaultQueryFn, queryFnFoodTagName, queryFnFoodTagId, queryFnFoodTagToId, queryFnFoodStep } from "../hooks/use-get";
import axios from "axios";
import useFetch from "use-fetch-hook";



function NewFood(props) {
    const queryClient = useQueryClient();
    const component = "editcomponent"
    const navigate = useNavigate()
    const [foodID, setFoodID] = useState()
    const [name, setName] = useState("")
    const [nameTagSet, setNameTagSet] = useState()
    const [ingredientsSet, setIngredientsSet] = useState(new Set());
    const [ingredientsSetID, setIngredientsSetID] = useState(new Set());
    const [stepsList, setStepsList] = useState([]);
    const [stepsListID, setStepsListID] = useState([]);

    const [foodTagSet, setFoodTagSet] = useState(new Set());
    const [foodTagSetID, setFoodTagSetID] = useState(new Set())

    const [date, setDate] = useState("")
    const newdate = new Date(date).toLocaleDateString('sk-SK')






    const [images, setImages] = useState("");
    const [imagePreview, setImagePreview] = useState([]);
    const [imageURLs, setImageURLs] = useState([])
    const [imageURLsList, setImageURLsList] = useState([])
    const [imageFlag, setImageFlag] = useState(true);
    const [imageURLsPost, setImageURLsPost] = useState([])
    const [modalLoadingFlag, setModalLoadingFlag] = useState(false);
    const [modalSavedFlag, setModalSavedFlag] = useState(false);
    const [modalErrorFlag, setModalErrorFlag] = useState(false);
    const [modalSaveErrorMissingFlag, setModalSaveErrorMissingFlag] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [modalImageDeleteErrorFlag, setModalImageDeleteErrorFlag] = useState(false);
    const [modalLightboxFlag, setModalLightboxFlag] = useState(false);
    const [imageDispley, setImageDispley] = useState([])
    const [imageToDelete, setImageToDelete] = useState([])
    const [currentImageID, setCurrentImageID] = useState("")
    const [isVisibleEdit, setIsVisibleEdit] = useState(false)

    let foodTagSetArray = [...foodTagSet];
    let ingredientSetArray = [...ingredientsSet];
    let foodTagsList = [];


    const id = useParams()
    let ID = parseInt(id.id)

    // const { status: statusFood, data: dataFoods, refetch: refetchFood, isLoading: loadingFood, error: errorFoods } = useQuery({
    //     queryKey: [`/foods/${id.id}/`],
    //     enabled: !!id,
    //     queryFn: defaultQueryFn,
    // })

    const { status: statusPostFood, error: errorPostFood, mutate: postFood } = useMutation({
        mutationFn: createPostFood,
        onError: error => { console.log("Error Post Food :", error) },
        onSuccess: (foodCreated, image) => {
            console.log("Food :", foodCreated, "sucsesfully created!")
            //   queryClient.invalidateQueries([`/foods/${foodCreated.id}/`], foodCreated)//"/steps/",newPost.id],newPost)
            const imageFoodPosted = image?.image.map((res, index) => {
                if (res.id == 0) {
                    let formdata = new FormData();
                    formdata.append("name", res.name);
                    formdata.append("image", res.image);
                    formdata.append("date", res.date);
                    formdata.append("food", res.food);
                    formdata.append("imgposition", index + 1);
                    postImagefood({ formdata })
                }
            })
            Promise.allSettled(imageFoodPosted).then(() => {
                handlerSetModalSave()
            })
        }
    })

    const { data: DataPutFood, status: statusPutFood, error: errorPutFood, mutate: putFood } = useMutation({
        // queryKey: (id) => [`/steps/${id}/`],
        mutationFn: createPutFood,
        onError: error => { console.log("Error Put Food :", error); handlerSetModalError() },
        onSuccess: (foodUpdated, image) => {
            console.log("Food :", foodUpdated, "sucsesfully updated!");
            // queryClient.invalidateQueries([`/foods/${foodUpdated.id}/`], foodUpdated).then();

            const imageFoodPosted = image?.image.map((res, index) => {
                if (res.id == 0) {
                    let formdata = new FormData();
                    formdata.append("name", res.name);
                    formdata.append("image", res.image);
                    formdata.append("date", res.date);
                    formdata.append("food", res.food);
                    formdata.append("imgposition", index + 1);
                    postImagefood({ formdata })
                }
            })
            Promise.allSettled(imageFoodPosted).then(() => {
                handlerSetModalSave()
            })
        }
    })


    const { status: statusImagefood, data: dataImagefood, refetch: refetchImagefood, isLoading: loadingImageFood, error: errorImagefood } = useQuery({
        queryKey: ["/imagefood/"],
        // enabled: !!dataFoods,
        queryFn: defaultQueryFn,
    })

    const { status: statusPostImagefood, error: errorPostImagefood, mutate: postImagefood } = useMutation({
        mutationFn: createPostImagefood,
        onError: error => { console.log("Error Post Imagefood :", error); handlerSetModalError() },
        onSuccess: (ImagefoodCreated, oldImagefood) => {
            console.log("Imagefood :", ImagefoodCreated, "sucsesfully created!")
            queryClient.invalidateQueries([`/imagefood/${ImagefoodCreated.id}/`], ImagefoodCreated)//"/steps/",newPost.id],newPost)
        }
    })

    const { status: statusPutImagefood, error: errorPutImagefood, mutate: putImagefood } = useMutation({
        mutationFn: createPutImagefood,
        onError: error => { console.log("Error Put Imagefood :", error); handlerSetModalError(); return },
        onSuccess: (ImagefoodUpdated, oldImagefood) => {
            console.log("Imagefood :", ImagefoodUpdated, "sucsesfully updated!")
            queryClient.invalidateQueries([`/imagefood/${ImagefoodUpdated.id}/`], ImagefoodUpdated)//"/steps/",newPost.id],newPost)
        }
    })

    const { status: statusDeleteImagefood, error: errorDeleteImagefood, mutate: deleteImagefood } = useMutation({
        mutationFn: createDeleteImagefood,
        onError: error => { console.log("Error Delete Imagefood :", error); handlerSetModalImageDeleteError() },
        onSuccess: (response) => {
            console.log("Imagefood :", response, "sucsesfully deleted!")
            if (response == 204) {

                pageReload()
                closeModal();

            }
            else {
                handlerSetModalImageDeleteError()
            }
            // queryClient.invalidateQueries([`/imagefood/${ImagefoodCreated.id}/`], ImagefoodCreated)//"/steps/",newPost.id],newPost)
        }
    })

    const { status: statusFoodTags, data: dataFoodTags, refetch: refetchFoodTags, isLoading: loadingFoodTags, error: errorFoodTags } = useQuery({
        queryKey: ["/foodTags/"],
        enabled: !!dataImagefood,
        queryFn: defaultQueryFn,
    })
    const { status: statusPostFoodTag, error: errorPostFoodTag, mutate: postFoodTag } = useMutation({
        mutationFn: createPostFoodTag,
        onError: error => { console.log("Error Post FoodTag :", error) },
        onSuccess: (foodTagCreated, oldFoodTag) => {
            console.log("FoodTag :", foodTagCreated, "sucsesfully created!")
            queryClient.invalidateQueries([`/foodTags/${foodTagCreated.id}/`], foodTagCreated)//"/steps/",newPost.id],newPost)
            addTofoodTagList(foodTagCreated)

        }
    })

    const { status: statusSteps, data: dataSteps, refetch, refetch: refetchSteps, isLoading: loadingSteps, error: errorSteps } = useQuery({
        queryKey: ["/steps/"],
        enabled: !!dataFoodTags,
        queryFn: defaultQueryFn,
    })

    const { status: statusPostStep, error: errorPostStep, mutate: postStep, mutateAsync: postStepAsync } = useMutation({
        mutationFn: createPostStep,
        onError: error => { console.log("Error Post Step :", error) },
        onSuccess: (stepCreated, oldStep) => {
            console.log("Step :", stepCreated, "sucsesfully created!", oldStep)
            queryClient.invalidateQueries([`/steps/${stepCreated.id}/`], stepCreated)
            // return oldStep.id
            // queryClient.setQueryData(["/steps/"], oldPost => [...oldPost, newPost])
            // updateStepInTagList(oldStep.id, stepCreated.id, stepCreated.step)

        }
    })


    const { status: statusPutStep, error: errorPutStep, mutate: putStep, mutateAsync: putStepAsync } = useMutation({
        // queryKey: (id) => [`/steps/${id}/`],
        mutationFn: createPutStep,
        onError: error => { console.log("Error Put Step :", error) },
        onSuccess: (StepUpdated) => {
            console.log("Step :", StepUpdated, "sucsesfully updated!",)
            queryClient.invalidateQueries([`/steps/${StepUpdated.id}/`], StepUpdated)
            // return StepUpdated
            // updateStepInTagList(oldID, StepUpdated.id, StepUpdated.step)
        }
    })

    const { status: statusDeleteStep, error: errorDeleteStep, mutate: deleteStep } = useMutation({
        // queryKey: (id) => [`/steps/${id}/`],
        mutationFn: (step) => createDeleteStep(step),
        onError: error => { console.log("Error Delete Step :", error) },
        onSuccess: (id, step) => {
            console.log("Step :", step, "sucsesfully deleted!")
            // queryClient.removeQueries({ queryKey: [`/steps/${id.id}/`], exact: true })//, oldPost => [...oldPost, newPost])
            // queryClient.invalidateQueries([`/steps/${id.id}/`], id)//, oldPost => [...oldPost, newPost])
            removeFromStepsList(step)
        }
    })



    const { status: statusIngredients, data: dataIngredients, refetch: refetchIngredients, isLoading: loadingIngredients, error: errorIngredients } = useQuery({
        queryKey: ["/ingredients/"],
        enabled: !!dataSteps,
        queryFn: defaultQueryFn,
    })

    const { status: statusPostIngredients, error: errorPostIngredients, mutate: postIngredients } = useMutation({
        mutationFn: createPostIngredients,
        onError: error => { console.log("Error Post Ingredients :", error) },
        onSuccess: (ingredientsCreated, ingredient) => {
            console.log("Ingredients :", ingredientsCreated, "sucsesfully created!")
            queryClient.invalidateQueries([`/ingredients/${ingredientsCreated.id}/`], ingredientsCreated)
            addToIngredientsIDList(ingredientsCreated)
        }
    })


    const { status: statusIngredient, data: dataIngredient, refetch: refetchIngredient, isLoading: loadingIngredient, error: errorIngredient } = useQuery({
        queryKey: ["/ingredient/"],
        enabled: !!dataIngredients,
        queryFn: defaultQueryFn,
    })

    const { status: statusPostIngredient, error: errorPostIngredient, mutate: postIngredient } = useMutation({
        mutationFn: createPostIngredient,
        onError: error => { console.log("Error Post Ingredient :", error) },
        onSuccess: (ingredientCreated, ingredient) => {
            console.log("Ingredient :", ingredientCreated, "sucsesfully created!")
            queryClient.invalidateQueries([`/ingredient/${ingredientCreated.id}/`], ingredientCreated)
            ingredientsPost(ingredient.times, ingredient.unit, ingredientCreated)
        }
    })

    const { status: statusUnit, data: dataUnit, refetch: refetchUnit, isLoading: loadingUnit, error: errorUnit } = useQuery({
        queryKey: ["/unit/"],
        enabled: !!dataIngredient,
        queryFn: defaultQueryFn,
    })

    const { status: statusPostUnit, error: errorPostUnit, mutate: postUnit } = useMutation({
        mutationFn: createPostUnit,
        onError: error => { console.log("Error Post Unit :", error) },
        onSuccess: (unitCreated, unit) => {
            console.log("Unit :", unitCreated, "sucsesfully created!")
            queryClient.invalidateQueries([`/unit/${unitCreated.id}/`], unitCreated)
            ingredientCheckPost(unit.times, unitCreated, unit.ingredient)
        }
    })


    function handleFoodSave() {
        handleNewFoodSave(makeFoodRecord());
    }

    function handleAddToNameTagList() {
        let nameSplit = name?.split(" ");
        addToNameTagList(nameSplit);
    }

    function handleNameChange(event) {
        setName(event.target.value);
    }


    function foodTagListCheck(tag) {
        if (foodTagSetArray.includes(tag)) {
            removeFromFoodTagList(tag);
        } else {
            handleAddToFoodTagList(tag);
        }
    }


    function ingredientsCheckPost(times, unit, ingredient) {
        let unitFilter = dataUnit.find((element) => (element.unit == unit))
        if (unitFilter == null) {
            postUnit({ unit: unit, times: times, ingredient: ingredient })
        } else {
            ingredientCheckPost(times, unitFilter, ingredient)
        }
    }

    function ingredientCheckPost(times, unit, ingredient) {
        let ingredientFilter = dataIngredient.find((element) => element.ingredient == ingredient)
        if (ingredientFilter == null) {
            postIngredient({ unit, times: times, ingredient: ingredient })
        } else {
            ingredientsPost(times, unit, ingredientFilter)
        }
    }

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


    function ingredientsPost(times, unitChecked, ingredientChecked) {
        let ingredientFilter = dataIngredients.find(
            (element) =>
                element.volume == times &&
                element.units[0] == unitChecked.id &&
                element.ingredientName[0] == ingredientChecked.id
        )

        if (ingredientFilter == null) {
            postIngredients({
                volume: times,
                units: [unitChecked.id],
                ingredientName: [ingredientChecked.id],
            })
        }
        else { addToIngredientsIDList(ingredientFilter) }
    }


    function addToIngredientList(times, unit, ing) {
        let IDtimes = 0;
        let IDunit = 100;
        let IDingredient = 1000;
        let newIngredientList = [...ingredientsSet];
        if (ing === "") {
            return;
        }
        newIngredientList.push({ times: times,unit: unit, ing:ing}
        );
        IDtimes++;
        IDunit++;
        IDingredient++;
        ingredientsCheckPost(times, unit, ing);
        setIngredientsSet(newIngredientList);
    }

    function removeFromIngredientList(ingID, ing) {
        let newIngredientsSet = new Set(ingredientsSet); // slice for sets
        let newIngredientsIDSet = new Set(ingredientsSetID); // slice for sets
        newIngredientsSet.delete(ing); // push for set
        newIngredientsIDSet.delete(ingID);
        setIngredientsSetID(newIngredientsIDSet);
        setIngredientsSet(newIngredientsSet);
    }

    function makeSteptoDelete(oldID, step, stposition) {
        let stepIDPosition = getPosition(oldID, stepsList);
        let newStepsList = stepsList.slice();
        let newStepsIDList = stepsListID.slice();
        newStepsList.splice(stepIDPosition, 1, { id: oldID, step: step, stposition: "delete" })
        newStepsIDList.splice(stepIDPosition, 1, { id: oldID })
        setStepsList(newStepsList);
        setStepsListID(newStepsIDList)
    }
    function updateStepInTagList(oldID, newID, step) {
        let stepIDPosition = getPosition(oldID, stepsList);

        let newStepsList = stepsList.slice();
        let newStepsIDList = stepsListID.slice();
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
        setStepsListID(newStepsIDList)
    }
    function addStepToTagList(id, step) {
        if (step == "") return
        let newStepsList = stepsList.slice();
        let newStepsIDList = stepsListID.slice();
        newStepsList.push({ id: id, step: step })
        setStepsList(newStepsList);
        newStepsIDList.push(id)
        setStepsListID(newStepsIDList)
    }

    function removeFromStepsList(step) {
        let stepsSetPosition = getPosition(step.id, stepsList)
        let stepsSetIDPosition = getPosition(step.id, stepsListID)
        let newStepsSet = stepsList.slice();
        let newStepsIDSet = stepsListID.slice();
        newStepsSet.splice(stepsSetPosition, 1);
        newStepsIDSet.splice(stepsSetIDPosition, 1);
        setStepsListID(newStepsIDSet);
        setStepsList(newStepsSet);
    }

    function handleAddToFoodTagList(foodTag) {
        let filterFoodTag = dataFoodTags.filter((element) => element.foodTag == foodTag);
        if (filterFoodTag == "") {
            postFoodTag({ foodTag: foodTag })
        } else { addTofoodTagList(filterFoodTag[0]) }
    }

    function removeFromFoodTagList(tag) {
        let newFoodTagSet = new Set(foodTagSet);
        let newFoodTagIDSet = new Set(foodTagSetID);
        let filterfoodTag = dataFoodTags.filter(
            (element) => element.foodTag == tag
        );
        newFoodTagIDSet.delete(filterfoodTag[0].id);
        newFoodTagSet.delete(filterfoodTag[0].foodTag);
        setFoodTagSetID(newFoodTagIDSet);
        setFoodTagSet(newFoodTagSet);
    }

    function addToNameTagList(tag) {
        let newNameTagSet = new Set(nameTagSet);
        newNameTagSet.add(tag);
        setNameTagSet(newNameTagSet);
    }

    function makeFoodRecord() {
        if (
            name == "" &&
            ingredientSetArray.length === 0 &&
            foodTagSetArray.length === 0 &&
            stepsList.length === 0
        ) {
            // handlerSetModalErrorMissing(["Doplň chýbajúce informácie:", "Nazov jedla", "Suroviny", "Druj jedla", "Postup"])
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov jedla, Suroviny, Druj jedla, Postup")

        }
        else if (
            ingredientSetArray.length === 0 &&
            foodTagSetArray.length === 0 &&
            stepsList.length === 0
        ) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: , Suroviny, Druj jedla, Postup");
        } else if (name === "" && foodTagSetArray.length === 0 && stepsList.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov , Druj jedla, Postup");
        } else if (name === "" && ingredientSetArray.length === 0 && stepsList.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov, Suroviny, Postup");
        } else if (name === "" && ingredientSetArray.length === 0 && foodTagSetArray.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov, Suroviny, Druj jedla");
        } else if (name === "" && ingredientSetArray.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov,Suroviny");
        } else if (name === "" && foodTagSetArray.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: ,Nazov, Druj jedla");
        } else if (name === "" && stepsList.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov, Postup");
        } else if (ingredientSetArray.length === 0 && foodTagSetArray.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Suroviny,Druj jedla");
        } else if (ingredientSetArray.length === 0 && stepsList.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Suroviny,Postup");
        } else if (name === "") {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Nazov");
        } else if (ingredientSetArray.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Suroviny");
        } else if (foodTagSetArray.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Druj jedla");
        } else if (stepsList.length === 0) {
            handlerSetModalErrorMissing("Doplň chýbajúce informácie: Postup");
        }
        else return ({
            //   id: foodID,
            name: name,
            date: new Date().toISOString().substring(0, 10),
            ingredients: [...ingredientsSetID],
            // steps: [...stepsSetID],
            foodTags: [...foodTagSetID],
            image: [...imageURLsPost]

        })
    }

    function handleNewFoodSave(food) {
        const stepsForPost = stepsList?.map((res, index) => {
            let newStep = {
                id: res.id,
                step: res.step,
                stposition: index + 1,
            }
            let stepDelete = {
                id: res.id,
                step: res.step,
                stposition: res.stposition,
            }
            if (res.stposition == "delete") {
                return deleteStep(stepDelete)
            }
            if (Number.isInteger(res.id)) {
                return putStepAsync(newStep)
            }
            else {
                return postStepAsync(newStep,)
            }

        });
        Promise.allSettled(stepsForPost).then((results) => {
            let array = []
            results.map((result) => { if (result.value !== undefined) { array.push(result.value.id) } })
            postFood({
                ...food,
                steps: array
            })
        })
    }

    function stepMove(move, step) {
        let position = getPosition(step.id, stepsList)
        let newStepsSet = stepsList.slice()
        if (move > 0) {
            if (position < (-1 + stepsList.length)) {
                newStepsSet.splice(position, 1);
                newStepsSet.splice(position + move, 0, step);
                setStepsList(newStepsSet)
            }
        }
        if (move < 0) {
            if (position > 0) {
                newStepsSet.splice(position, 1);
                newStepsSet.splice(position - 1, 0, step);
                setStepsList(newStepsSet)
            }
        }
    }

    function handlerFoodSaveClose() {
        navigate(`/recepty/?page_size=${2}`);
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
    function handlerSetModalErrorMissing(message) {
        setModalMessage(message)
        // setModalSaveErrorMissingFlag(true)
        // setTimeout(() => {
        //     setModalSaveErrorMissingFlag(false)
        // }, 3000)
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

        setImagePosition(imagePosition)
    }

    // images for Posting
    useEffect(() => {
        let newImageUrlsPost = imageURLsPost.slice()
        let ID = 0;
        let newImageURL = [];
        let newImagePreview = [];
        let newImageUrls = imageURLs;

        if (images.length < 1) return;
        let pisitionPost = imageURLsPost.length + 1
        let pisitionUrls = imageURLsPost.length + 1

        images.forEach(
            (image) => {

                newImageUrlsPost.push({
                    id: 0,
                    name: name,
                    image: image,
                    date: date,
                    food: foodID,
                    position: pisitionPost,
                }); pisitionPost++
            }, setImageURLsPost(newImageUrlsPost)
        )

        images.forEach(
            (image) => {
                newImageUrls.push({
                    id: 0,
                    name: name,
                    image: URL.createObjectURL(image),
                    date: date,
                    food: foodID,
                    position: pisitionUrls,
                }); pisitionUrls++
            },
            setImageURLsList(newImageUrls)
        );
        ID++;

    }, [images]);


    function onImageChange(e) {
        setImages([...e.target.files]);
    }


    if (loadingFoodTags || loadingSteps || loadingIngredients || loadingIngredient || loadingUnit || loadingImageFood)
        return <label htmlFor="inpFile">
            <div className={style.loadingContainer}>
                <FontAwesomeIcon
                    className={style.loadingIcon}
                    icon={faSpinner}
                    id="inpFileIcon"
                    spin ></FontAwesomeIcon>
            </div>
        </label>//<h1>Loading...</h1> 
    //   if (statusFood === 'error') return <h1>{JSON.stringify(errorFoods)}</h1>
    //   if (statusImagefood === 'error') return <h1>{JSON.stringify(errorImagefood)}</h1>
    if (statusFoodTags === 'error') return <h1>{JSON.stringify(errorFoodTags)}</h1>
    if (statusSteps === 'error') return <h1>{JSON.stringify(errorSteps)}</h1>
    if (statusIngredients === 'error') return <h1>{JSON.stringify(errorIngredients)}</h1>
    if (statusIngredient === 'error') return <h1>{JSON.stringify(errorIngredient)}</h1>
    if (statusUnit === 'error') return <h1>{JSON.stringify(errorUnit)}</h1>
    // if (loadingFood || loadingFoodTags || loadingSteps || loadingIngredients || loadingIngredient || loadingUnit || loadingImageFood) return <h1>return Loading...</h1>
    return (<>

        <div className={style.main}>
            <div className={style.header}>RECEPT</div>
            <div className={style.buttonBox} >
                <div className={style.foodButton} onClick={handleFoodSave}>
                    ULOŽIŤ
                </div>
                <div className={style.foodButton} onClick={handlerFoodSaveClose}>
                    ZRUŠIŤ
                </div>
            </div>
            <div className={style.fooodbox} id="fooodbox">
                <LeftPanelFilter
                    filterTagListArray={foodTagSetArray}
                    handleAddToTagList={foodTagListCheck}
                    foodTagsBox={null}
                    component={component}
                />

                <div class={style.Content_Flex}>
                    <div className={style.messagebox}>
                        {modalMessage} </div>

                    <div className={style.ingreProcedureBox}>
                        <div className={style.ingredientsImageBox}>
                            <div>
                                <p>Suroviny:</p>
                                <IngredientInput
                                    addToIngredientList={addToIngredientList}
                                    ingredientsList={ingredientsSet}
                                    ingredientsIDList={ingredientsSetID}
                                    removeFromIngredientList={removeFromIngredientList}
                                    component={component}
                                ></IngredientInput>
                            </div>
                            {/* <div className={style.images} id="imagePreview">
                        {imagePreview}
                        <span className={style.imagePreview__defaultText}>
                        Image Preview
                        </span>
                     </div> */}

                            <input
                                // className={style.imageinput}
                                className={style.imageinput}
                                type="file"
                                multiple
                                accept="image/jpeg,image/png,image/gif"
                                id="inpFile"
                                // id="image-input"
                                onChange={onImageChange}
                                display="none"
                            />
                            <label htmlFor="inpFile" className={style.imageIcon}
                                datatooltip="Pridať fotografiu">
                                <FontAwesomeIcon

                                    icon={faCircleArrowUp}
                                    // onClick={props.onTagDelete}
                                    id="inpFileIcon"
                                ></FontAwesomeIcon>
                            </label>
                            {!imageURLsList && <p className={style.numOfFiles} id="numOfFiles">
                                No Files chosen
                            </p>}
                            <Image visible={imageFlag} imageURLs={imageURLsList} setModalFlag={setModalLightboxFlag} handlerImage={handlerImage}></Image>

                        </div>
                        <div className={style.procedureBox}>
                            <div>
                                <p>Nazov:</p>
                            </div>
                            <input
                                className={style.foodname}
                                value={name}
                                type="text"
                                maxLength="25"
                                onChange={handleNameChange}
                                onClick={handleAddToNameTagList}
                            />
                            <div className={style.date}>
                                {/* Vytvoreny:{newdate} */}
                            </div>
                            <div>
                                <p>Postup:</p>
                            </div>
                            <StepsInput
                                stepMove={stepMove}
                                addStepToTagList={addStepToTagList}
                                updateStepInTagList={updateStepInTagList}
                                stepsSet={stepsList}
                                stepsSetIDState={stepsListID}
                                deleteStep={makeSteptoDelete}
                                component={component}
                            ></StepsInput>

                        </div>
                    </div>
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
                imageDispley={imageDispley}
                currentImageID={currentImageID}
                deleteImagefood={deleteImagefood}
                imageToDelete={imageToDelete}
                modalImageDeleteErrorFlag={modalImageDeleteErrorFlag}
                isVisibleEdit={[isVisibleEdit, setIsVisibleEdit]}
                imagePosition={[imagePosition, setImagePosition]}
                putImagefood={putImagefood}
                pageReload={pageReload}
            >
            </Lightbox>
        </ModalPreview>

    </>
    )
}
export default NewFood;
