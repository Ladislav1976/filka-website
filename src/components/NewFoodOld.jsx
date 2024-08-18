import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Tooltip from '../modules/tooltips/Tooltip'
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
import Modal from "../reports/Modal";
import ModalPreview from "../reports/ModalPreview";
import { useGet, useMutate } from "restful-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faPenToSquare, faFloppyDisk, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useQueries, useQuery, useQueryClient, useMutation, } from "@tanstack/react-query"
import { createPostStep, createPutStep, createDeleteStep, createPostUnit, createPostIngredient, createPostIngredients, createPostFoodTag, createPostFood, createPutFood, createPostImagefood, createDeleteImagefood, createPutImagefood } from "../hooks/use-post";
import { defaultQueryFn, queryFnFoodTagName, queryFnFoodTagId, queryFnFoodTagToId, queryFnFoodStep } from "../hooks/use-get";
import axios from "axios";
import useFetch from "use-fetch-hook";

// import { useGetFood } from "./useGet"
import UseSOmarina from "./UseSOmarina";

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'

function IngrID(props) {
  return (
    <>
      <div className="dd" id="dd"></div>
    </>
  );
}

function Times(props) {
  return (
    <>
      <div className={style.timesIngredient}>{props.times}</div>
    </>
  );
}

function Unit(props) {
  return (
    <>
      <div className={style.unitIngredient}>{props.unit}</div>
    </>
  );
}

function Ingredient(props) {
  return <div className={style.ingIngredient}>{props.ing}</div>;
}

function Step(props) {
  return (
    <>
      <textarea
        className={style.step}
        rows="5"
        value={props.step}
      // onChange={handleUpdateStep}
      />
      <div
        className={style.ingredientButton}
      // onClick={() => props.addStepToTagList(step, stepID)}
      >
        Pridať
      </div>
    </>
  );
}
// function Image(props) {
//   return (
//     <>
//       <div className={style.image}>{props.image}</div>
//     </>
//   );
// }
function EditFood(props) {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const [foodID, setFoodID] = useState()//{ id: foodsRaw.id});
  const [name, setName] = useState("")//{name: foodsRaw.name});
  const [nameTagSet, setNameTagSet] = useState()
  const [ingredientsSet, setIngredientsSet] = useState(new Set());
  const [ingredientsSetID, setIngredientsSetID] = useState(new Set());
  const [stepsSet, setStepsSet] = useState(new Set());
  const [stepsSetID, setStepsSetID] = useState(new Set());
  //   new Set([foodItemEditRender.nameTags]));
  // const [foodTagSet, setFoodTagSet] = useState(foods_FoodTagsName);
  const [foodTagSet, setFoodTagSet] = useState(new Set());
  const [foodTagSetID, setFoodTagSetID] = useState(new Set());



  // const [ingredientSetNotDiv, setIngredientSetNotDiv] = useState(
  //   new Set(foodItemEditRender.ingredientsNotDiv)
  // );

  const [date, setDate] = useState("")//{date: foodsRaw.date});
  const [images, setImages] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [imageURLs, setImageURLs] = useState([])//{image: imageFoodList});
  const [imageURLsList, setImageURLsList] = useState([])//{image: imageFoodList});

  const [imageFlag, setImageFlag] = useState(true);
  const [imageURLsPost, setImageURLsPost] = useState([])//{image: imageFoodList});
  const [filterTagList, setFilterTagList] = useState(new Set([]));

  const [modalLoadingFlag, setModalLoadingFlag] = useState(false);
  const [modalSavedFlag, setModalSavedFlag] = useState(false);
  const [modalErrorFlag, setModalErrorFlag] = useState(false);
  const [modalImageDeleteErrorFlag, setModalImageDeleteErrorFlag] = useState(false);
  const [modalLightboxFlag, setModalLightboxFlag] = useState(false);
  const [imageDispley, setImageDispley] = useState([])
  const [imageToDelete, setImageToDelete] = useState([])
  const [currentImageID, setCurrentImageID] = useState("")
  const [isVisibleEdit, setIsVisibleEdit] = useState(false)
  // let currentImageID = "";
  let foodTagSetArray = [...foodTagSet];
  let ingredientSetArray = [...ingredientsSet];
  let foodTagsList = [];
  // const [stepIDPosition, setStepIDPosition] = useState("")

  const id = useParams()
  // console.log(`/foods/${id.id}/`)
  // console.log (typeof (id.id))
  let ID = parseInt(id.id)

  // async function defaultQueryFn({ queryKey }) {
  //   const { data } = await axios.get(
  //     `http://127.0.0.1:8000${queryKey[0]}`,
  //   )
  //   // .then((users) => users.map((user) => user.id))
  //   return data
  // }

  // console.log ("ID",ID,typeof (ID))
  //   async function HandleGet(url){
  //     return useQuery({queryKey:[url]})
  // }
  // let b = parseInt(id.id)
  // console.log(b)
  // let stepObj = { id: id.id };
  // console.log ("stepObj",stepObj)
  // const useGetFood = props => {

  //   const { data: rawFoods,
  //     refetch: refetchFood,
  //     loading: loadingFoods,
  //   } = useGet({

  //     path: (id) => `/foods/${id}/`,
  //     // path: `/foods/${b}/`,
  //     // debounce: true,
  //     debounce: { wait: 500, options: { leading: true, maxWait: 500, trailing: false } } /* ms */,
  //   })
  // let rawFoods=[]
  // useEffect(()=>{
  // const {data,refetch: refetchFood,} = HandleGet(`/foods/${b}/`)
  // rawFoods=data
  // },[])
  // setTimeout(() => {


  // const queryClient = useQueryClient()
  // const [rawFoods,setRawFoods]= useState("")


  // 
  // const { status: statusFood, data: dataFoods, refetch: refetchFood, isLoading: loadingFood, error: errorFoods } = useQuery({
  //   // queryKey: ["/foods/",ID],
  //   queryKey: [`/foods/${id.id}/`],
  //   enabled: !!id,
  //   queryFn: defaultQueryFn,
  // })

  const { status: statusPostFood, error: errorPostFood, mutate: postFood } = useMutation({
    mutationFn: createPostFood,
    onError: error => { console.log("Error Post Food :", error) },
    onSuccess: (foodCreated, image) => {
      console.log("Food :", foodCreated, "sucsesfully created!")
      queryClient.invalidateQueries([`/foods/${foodCreated.id}/`], foodCreated)//"/steps/",newPost.id],newPost)
      
      image.image.map(res => {
          if (res.id == 0) {
          let formdata = new FormData();
          formdata.append("name", res.name);
          formdata.append("image", res.image);
          formdata.append("date", res.date);
          formdata.append("food", foodCreated.id);
          formdata.append("position", res.position);
          postImagefood({ formdata })
        }
      })
      handlerSetModalSave();
    }
  })

  const { data: DataPutFood, status: statusPutFood, error: errorPutFood, mutate: putFood } = useMutation({
    // queryKey: (id) => [`/steps/${id}/`],
    mutationFn: createPutFood,
    onError: error => { console.log("Error Put Food :", error); handlerSetModalError() },
    onSuccess: (foodUpdated, image) => {
      console.log("Food :", foodUpdated, "sucsesfully updated!");
      queryClient.invalidateQueries([`/foods/${foodUpdated.id}/`], foodUpdated);
      
      image.image.map(res => {
        // if (!res.id == 0) {
        //   let newImage = {
        //     id: res.id,
        //     name: res.name,
        //     date: res.date,
        //     food: res.food,
        //     position: res.position,
        //   }
        //   putImagefood({ newImage })
        // }
        if (res.id == 0) {
          let formdata = new FormData();
          formdata.append("name", res.name);
          formdata.append("image", res.image);
          formdata.append("date", res.date);
          formdata.append("food", res.food);
          formdata.append("position", res.position);
          postImagefood({ formdata })
        }
        
        // else {
        //   console.log("res not new",res)
        //   // let formdata = new FormData();
        //   // formdata.append("id", res.id);
        //   // formdata.append("name", res.name);
        //   // formdata.append("image", res.image);
        //   // formdata.append("date", res.date);
        //   // formdata.append("food", res.food);
        //   // formdata.append('_method', 'patch');
        //   // console.log("formdata : ", formdata);
        //   let newImage = {
        //     id: res.id,
        //     name: res.name,
        //     date: res.date,
        //     food: res.food
        //   }
        //   console.log("newImage : ", newImage);
        //   putImagefood({ newImage } )
        // }
      })
      handlerSetModalSave();

    }
  })

  // const { status: statusImagefood, data: dataImagefood, refetch: refetchImagefood, isLoading: loadingImageFood, error: errorImagefood } = useQuery({
  //   queryKey: ["/imagefood/"],
  //   enabled: !!dataFoods,
  //   queryFn: defaultQueryFn,
  // })

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
        console.log("response:", response)
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
    // enabled: !!dataImagefood,
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

  const { status: statusPostStep, error: errorPostStep, mutate: postStep } = useMutation({
    mutationFn: createPostStep,
    onError: error => { console.log("Error Post Step :", error) },
    onSuccess: (stepCreated, oldStep) => {
      console.log("Step :", stepCreated, "sucsesfully created!")
      queryClient.invalidateQueries([`/steps/${stepCreated.id}/`], stepCreated)
      // queryClient.setQueryData(["/steps/"], oldPost => [...oldPost, newPost])
      addToSetStepsSet(oldStep.position, stepCreated)

    }
  })


  const { status: statusPutStep, error: errorPutStep, mutate: putStep } = useMutation({
    // queryKey: (id) => [`/steps/${id}/`],
    mutationFn: createPutStep,
    onError: error => { console.log("Error Put Step :", error) },
    onSuccess: (StepUpdated, olsStep) => {
      console.log("Step :", StepUpdated, "sucsesfully updated!", olsStep)
      queryClient.invalidateQueries([`/steps/${StepUpdated.id}/`], StepUpdated)
      addToSetStepsSet(olsStep.position, StepUpdated)
    }
  })

  const { status: statusDeleteStep, error: errorDeleteStep, mutate: deleteStep } = useMutation({
    // queryKey: (id) => [`/steps/${id}/`],
    mutationFn: (step) => createDeleteStep(step),
    onError: error => { console.log("Error Delete Step :", error) },
    onSuccess: (id, step) => {
      console.log("Step :", step, "sucsesfully deleted!")
      queryClient.invalidateQueries([`/steps/${id.id}/`], id)//, oldPost => [...oldPost, newPost])
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



  const foodItemEditRender = []

  let foodTagsIDList = [];


  function handleFoodSave() {
    // handleAddToNameTagList();
    handleEditFoodSave(makeFoodRecord());
  }

  function handleAddToNameTagList() {
    let nameSplit = name?.split(" ");
    addToNameTagList(nameSplit);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  // function addToTagList(tag) {
  //   let tagListArray = [...tagSet];
  //   let tagListLowerCase = tagListArray.map((str) => str.toLowerCase());
  //   let newTagListSet = new Set(tagListLowerCase);
  //   if (tag === "") {
  //     return;
  //   } else if (newTagListSet.has(tag.toLowerCase())) {
  //     return;
  //   }

  //   let newTagList = new Set(tagSet); // slice for sets
  //   newTagList.add(tag); // push for set
  //   setTagSet(newTagList);
  // }

  function foodTagListCheck(tag) {
    console.log("tag", tag)
    if (foodTagSetArray.includes(tag)) {
      console.log("yes")
      removeFromFoodTagList(tag);
    } else {
      console.log("no")
      handleAddToFoodTagList(tag);
    }
  }


  function ingredientsCheckPost(times, unit, ingredient) {

    let unitFilter = dataUnit.find((element) => (element.unit == unit))

    if (unitFilter == null) {
      console.log("Unit NULL", unitFilter);
      postUnit({ unit: unit, times: times, ingredient: ingredient })
    } else {
      console.log("Unit NOT NULL", unitFilter);
      ingredientCheckPost(times, unitFilter, ingredient)
    }
  }


  function ingredientCheckPost(times, unit, ingredient) {
    console.log("times, unit, ingredient", times, unit, ingredient);

    let ingredientFilter = dataIngredient.find((element) => element.ingredient == ingredient)

    if (ingredientFilter == null) {
      console.log("Ingre NULL", times, unit, ingredientFilter);
      postIngredient({ unit, times: times, ingredient: ingredient })
      // .then((response) => {
      //   ingredientsPost(t, u, response)
      // })
    } else {
      console.log("Ingre NOT NULL", times, unit, ingredientFilter);
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

  function addToStepIDList(step) {
    let newStepsIDList = new Set(stepsSetID);
    setTimeout(() => {
      let steps = refetchSteps();
      console.log("stepsssssss", steps);
      steps.then((s) => {
        let filterStep = s.filter((element) => element.step == step);
        console.log("filterStep AAAAA", filterStep);
        console.log("filterStep id", filterStep[0].id);
        newStepsIDList.add(filterStep[0].id);
        setStepsSetID(newStepsIDList);
      });
    }, 100);
  }

  function addToIngredientsIDList(ing) {

    let newIngredientsIDList = new Set(ingredientsSetID);
    newIngredientsIDList.add(ing.id);
    setIngredientsSetID(newIngredientsIDList);
    // let filter = [];
    // setTimeout(() => {
    //   let ingre = refetchIngredients();
    //   ingre.then((ingreback) => {
    //     filter = ingredientsBackEndFilter(times, unitID, ingID, ingreback);
    //     newIngredientsIDList.add(filter[0].id);
    //     setIngredientSetID(newIngredientsIDList);
    //   });
    // }, 100);
  }

  function handleUnitToID(unit, unitB) {
    let unitID = "";
    unitB.forEach((u) => {
      if (u.unit == unit) {
        unitID = u.id;
      }
    });
    return unitID;
  }

  function handleIngredientToID(ing, ingredientB) {
    let ingID = "";
    ingredientB.forEach((i) => {
      if (i.ingredient == ing) {
        ingID = i.id;
      }
    });
    return ingID;
  }

  // function ingredientsBackEndFilter(times, unitID, ingID, currentIngreBackEnd) {
  //   let filter = "";
  //   filter = currentIngreBackEnd.filter(
  //     (element) =>
  //       element.volume == times &&
  //       element.units == unitID &&
  //       element.ingredientName == ingID
  //   );
  //   return filter;
  // }

  function ingredientsPost(times, unitChecked, ingredientChecked) {
    console.log("times, filterUnit, filterIngredient", times, unitChecked, ingredientChecked)

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
    console.log("ingredientsSet before", ingredientsSet);
    newIngredientList.push(
      <>
        <Times times={times} key={IDtimes} />
        <Unit unit={unit} key={IDunit} />
        {"   "}
        <Ingredient ing={ing} key={IDingredient} />
      </>
    );
    console.log("newIngredientList after", newIngredientList);
    IDtimes++;
    IDunit++;
    IDingredient++;
    ingredientsCheckPost(times, unit, ing);
    setIngredientsSet(newIngredientList);
  }

  function removeFromIngredientList(ingID, ing) {
    // let ings = [];
    // let ings = ing.includes(ing);
    // let inputVal = document.getElementsByClassName("dd");
    console.log("delete ingID", ingID);
    console.log("delete  ing", ing);
    let newIngredientsSet = new Set(ingredientsSet); // slice for sets
    let newIngredientsIDSet = new Set(ingredientsSetID); // slice for sets
    console.log("newIngredientsSet before", newIngredientsSet);
    console.log("newIngredientsIDSet before", newIngredientsIDSet);
    newIngredientsSet.delete(ing); // push for set
    console.log("newIngredientsSet after", newIngredientsSet);
    // let filterStep = ingredientsBackEnd.filter((element) => element.step == step);
    // let ingre = ing.map((element) => element[0]);
    // console.log("ingre", ingre);
    // console.log("ings.id", ingre.id);
    // console.log("ings[0].id", ings[0].id);
    newIngredientsIDSet.delete(ingID);

    console.log("newIngredientsIDSet after", newIngredientsIDSet);
    setIngredientsSetID(newIngredientsIDSet);
    setIngredientsSet(newIngredientsSet);
  }
  let newStepsList = [...stepsSet];
  let newStepsIDList = [...stepsSetID];



  function stepsCheckPost(stepID, step, stepIDPosition) {
    console.log("step :", step)
    if (step != "") {
      let stepObj = ({ id: stepID, step: step, position: stepIDPosition });
      if (stepID == "newStep") {
        postStep({ step: step, position: stepIDPosition })
      }
      else {
        putStep(stepObj)
      }
    }
  }

  function addToSetStepsSet(stepIDPosition, stepToAdd) {
    // console.log("stepIDPosition :", stepIDPosition)
    if (stepIDPosition != "newposition") {
      // console.log("stepToAdd 1", stepToAdd, "stepPosition", stepIDPosition)
      // console.log("newStepsIDList 1", newStepsIDList)
      // console.log("newStepsList 1", newStepsList)
      newStepsList.splice(stepIDPosition, 1, stepToAdd)
      newStepsIDList.splice(stepIDPosition, 1, stepToAdd.id)
      // console.log("newStepsIDList 2", newStepsIDList)
      // console.log("newStepsList 2", newStepsList)
    } else {
      let index = newStepsList.length;
      // console.log("index", index);
      let newStepPosition = index;
      newStepsList.splice(newStepPosition, 0, stepToAdd);
      newStepsIDList.splice(newStepPosition, 0, stepToAdd.id);
    }
    setStepsSet(newStepsList);
    setStepsSetID(newStepsIDList)
  }


  function removeFromStepsList(step) {
    console.log("step delete", step);
    console.log("stepID delete", step.id);
    let newStepsSet = new Set(stepsSet);
    let newStepsIDSet = new Set(stepsSetID);
    console.log("newStepsSet before", newStepsSet);
    console.log("dataSteps", dataSteps);

    let filterStep = dataSteps.find((element) => element.id == step.id);
    console.log("filterStep to delete", filterStep);
    newStepsSet.forEach(obj => {
      if (obj.id == filterStep.id) {
        newStepsSet.delete(obj);
      }
    })

    console.log("newStepsSet after", newStepsSet);
    console.log("filterStep.id", filterStep);
    console.log("newStepsIDSet before", newStepsIDSet);
    newStepsIDSet.delete(filterStep.id);
    console.log("newStepsIDSet after", newStepsIDSet);
    setStepsSetID(newStepsIDSet);
    setStepsSet(newStepsSet);
  }

  function handleAddToFoodTagList(foodTag) {
    console.log("tag", foodTag)
    let filterFoodTag = dataFoodTags.filter((element) => element.foodTag == foodTag);
    if (filterFoodTag == "") {
      postFoodTag({ foodTag: foodTag })
    } else { addTofoodTagList(filterFoodTag[0]) }

  }

  function removeFromFoodTagList(tag) {

    let newFoodTagSet = new Set(foodTagSet);
    let newFoodTagIDSet = new Set(foodTagSetID);
    // console.log("foodTagSet :", foodTagSet)
    // console.log("foodTagSetID :", foodTagSetID)
    // console.log("dataFoodTags :", dataFoodTags)
    // console.log("Remove tag :", tag)
    let filterfoodTag = dataFoodTags.filter(
      (element) => element.foodTag == tag
    );

    console.log("Remove foodTag :", filterfoodTag)
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

  // function imgageFoodCheckPost(image) {
  //   // console.log("imgageFoodCheckPost image", image);
  //   // console.log("imgageFoodCheckPost image", image.name);

  //   //  let a = dataImagefood.filter((element) => element.id == image.id);
  //   //   if (a == "") {

  //   let formdata = new FormData();
  //   formdata.append("name", image.name);
  //   formdata.append("image", image.image);
  //   formdata.append("date", image.date);
  //   formdata.append("food", image.food);

  //   postImagefood({ formdata })

  // }


  function makeFoodRecord() {
    if (
      name === "" &&
      ingredientSetArray === "" &&
      foodTagSet === "" &&
      stepsSet === ""
    ) {
      alert("Nazov , Suroviny, Druj jedla, Postup nie se uvedene");
    } else if (
      ingredientSetArray === "" &&
      foodTagSet === "" &&
      stepsSet === ""
    ) {
      alert("Suroviny, Druj jedla, Postup nie se uvedene");
    } else if (name === "" && foodTagSet === "" && stepsSet === "") {
      alert("Nazov , Druj jedla, Postup nie se uvedene");
    } else if (name === "" && ingredientSetArray === "" && stepsSet === "") {
      alert("Nazov , Suroviny, Postup nie se uvedene");
    } else if (name === "" && ingredientSetArray === "" && foodTagSet === "") {
      alert("Nazov , Suroviny, Druj jedla nie se uvedene");
    } else if (name === "" && ingredientSetArray === "") {
      alert("Nazov, Suroviny nie se uvedene");
    } else if (name === "" && foodTagSet === "") {
      alert("Nazov, Druj jedla nie se uvedene");
    } else if (name === "" && stepsSet === "") {
      alert("Nazov, Postup nie se uvedene");
    } else if (ingredientSetArray === "" && foodTagSet === "") {
      alert("Suroviny, Druj jedla nie se uvedene");
    } else if (ingredientSetArray === "" && stepsSet === "") {
      alert("Suroviny, Postup nie se uvedene");
    } else if (name === "") {
      alert("Nazov nie je uvedeny");
    } else if (ingredientSetArray === "") {
      alert("Suroviny nie je uvedeny");
    } else if (foodTagSet === "") {
      alert("Druj jedla, Postup nie je uvedeny");
    } else if (foodTagSet === "") {
      alert("Druj jedla nie je uvedeny");
    } else if (foodTagSet === "") {
      alert("Postup nie je uvedeny");

      // } else return ({ foodItem, imageFoodItem })
    } else return ({
      
      name: name,
      date: new Date().toISOString().substring(0, 10),
      ingredients: [...ingredientsSetID],
      steps: [...stepsSetID],
      foodTags: [...foodTagSetID],
      image: [...imageURLsPost]
      // nameTags: [...nameTagSet],
    })
  }

  function handleEditFoodSave(
    food
    // id,
    // name,
    // date,
    // ingredients,
    // steps,
    // foodTags,
    // image
    // foodItem, imageFoodItem
  ) {
    console.log(
      "food: ", food,
      // "id: ", id,
      // "name: ", name,
      // "date: ", date,
      // "ingredients: ", ingredients,
      // "steps: ", steps,
      // "foodTags: ", foodTags,
      // "image: ", image
    );
    postFood(
      food
      // id,
      // name,
      // date,
      // ingredients,
      // steps,
      // foodTags,
      // image
    )



    // const [food, imagefood] = useQueries(

    //    {
    //     queries: foodItem,
    //     queryFn: createPutFood,
    //     onError: error => { console.log("Error Put Food :", error); handlerSetModalError() },
    //     onSuccess: (foodUpdated) => {
    //       console.log("Food :", foodUpdated, "sucsesfully updated!")
    //       queryClient.invalidateQueries([`/foods/${foodUpdated.id}/`], foodUpdated)//"/steps/",newPost.id],newPost)
    //     }
    //   },
    //   {
    //     enabled: !!food,
    //     queries: imagefood
    //       ? imagefood.map((image) => {
    //         if (image.id == 0) {
    //           return {
    //             queryFn: createPostImagefood,
    //             onError: error => { console.log("Error Post Imagefood :", error); handlerSetModalError() },
    //             onSuccess: (foodImageUpdated) => {
    //               console.log("Foodimage :", foodImageUpdated, "sucsesfully updated!")
    //               queryClient.invalidateQueries([`/imagefood/${foodImageUpdated.id}/`], foodImageUpdated)//"/steps/",newPost.id],newPost)
    //             }
    //           }

    //         } else {
    //           return { queryFn: createPutImagefood }
    //         }

    //     }) : [],

    // ? dataFoods.foodTags.map((id) => {
    //   return {
    //     queryKey: [`/foodTags/${id}/`],
    //     queryFn: queryFnFoodTagName
    //   }
    // }) : [],
    // })
    //   putFood(id,
    //     name,
    //     date,
    //     ingredients,
    //     steps,
    //     foodTags,)
    // postImagefood(id,
    //   name,
    //   date,
    //   ingredients,
    //   steps,
    //   foodTags, image)





    // put(
    //   foodItem.foodItem,
    //   { pathParams: foodItem.foodItem.id }
    // {
    //   headers: {
    //     "content-type": "multipart/form-data",
    //   },
    // ).then(refetchFood);
    // ).then(res=>console.log("res",res)).then(refetchFood).then(imgageFoodCheckPost(foodItem.imageFoodItem)).then(
    // setModalEditFlag(false))

  }

  function handlerSetModalSave() {

    setModalSavedFlag(true)
    setTimeout(() => {
      setModalSavedFlag(false); navigate("/foods/");
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
    return null; //not found
  }
//   function imageDisplayChange(move, image) {
//     let position = getPosition(image.id, imageURLsList)
//     if (isVisibleEdit){imageDisplayMove(move, image,position)}if(!isVisibleEdit){imgageDisplayStep(move, position)}
// }
//   function imageDisplayMove(move, image,position) {
//     console.log("move")
//     let newImageURLsList = imageURLsList.slice()
//     if (move > 0) {

//       if (position < (-1 + imageURLsList.length)) {

//         newImageURLsList.splice(position, 1);
//         newImageURLsList.splice(position + move, 0, image);

//         setImageURLsList(newImageURLsList)
//       }
//     }
//     if (move < 0) {
//       if (position > 0) {
//         newImageURLsList.splice(position, 1);
//         newImageURLsList.splice(position + move, 0, image);
//         setImageURLsList(newImageURLsList)
//       }
//     }
//   }

//   function imgageDisplayStep(move, position) {
//     console.log("step")
//     if (move > 0) {
//       if (position < (-1 + imageURLsList.length)) {
//         let newPosition = position + move
//         imageUploader(newPosition)
//       }
//     }
//     if (move < 0) {
//       if (position > 0) {
//         let newPosition = position + move
//         imageUploader(newPosition)
//       }
//     }
//   }
const [imagePosition, setImagePosition] = useState()
  function handlerImage(imageToAdd ) {
    let imagePosition = (getPosition(imageToAdd.id, imageURLsList))
    console.log("imagePosition 1: ",imagePosition)
    setImagePosition(imagePosition)
  }

  // function imageUploader(position) {
  //   // console.log("position 2", position)
  //   setCurrentImageID(position)
  //   // console.log("imageURLs[position].id :", imageURLs[position].id);

  //   // console.log("INsite 10", currentImageID)
  //   let newImagePreview = []
  //   let newImageToDelete = []
  //   let IDs = 0
  //   newImagePreview.push(
  //     <>
  //       <div className={style.imageblock}>
  //         <a className={style.prev} onClick={() => {  imageDisplayChange(-1, imageURLsList[position]) } }>&#10094;</a>
  //         <a className={style.next} onClick={() => {  imageDisplayChange(+1, imageURLsList[position]) } } >&#10095;</a>
  //         <img
  //           className={style.imagePreviewed}
  //           key={imageURLsList[position].id}
  //           // key={IDs}
  //           image={imageURLsList[position]}
  //           src={imageURLsList[position].image}
  //           // onClick={() => console.log("haha")}
  //           alt="Image Preview"
  //         // id="imagePreviewed"
  //         />

  //       </div>
  //       {/* </div> */}
  //     </>

  //   )
  //   newImageToDelete = (imageURLsList[position])
  //   IDs++
  //   setImageDispley(newImagePreview);
  //   setImageToDelete(newImageToDelete)

  // }


  function objectLength(obj) {
    var result = 0;
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) {
        // or Object.prototype.hasOwnProperty.call(obj, prop)
        result++;
      }
    }
    return result;
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
    console.log("imageURLsPost.length", imageURLsPost.length)
    console.log("pisition", pisitionPost)
    console.log("pisition", typeof (pisitionPost))
    images.forEach(
      (image) => {
        console.log("pisition", pisitionPost);
        newImageUrlsPost.push({
          id: 0,
          name: name,
          image: image,
          date: new Date().toISOString().substring(0, 10),
          // food: foodID,
          position: pisitionPost,
        }); pisitionPost++
      }, setImageURLsPost(newImageUrlsPost)
    )

    images.forEach(
      (image) => {

        // let res = imgageFoodCheckPost({
        //   id: 0,
        //   name: name,
        //   image: image,
        //   date: date,
        //   food: foodID
        // })
        // if (res == true) {
        //   console.log("posting OK pushing to ImageUrls");
        newImageUrls.push({
          id: 0,
          name: name,
          image: URL.createObjectURL(image),
          date: date,
          // food: foodID,
          position: pisitionUrls,
        }); pisitionUrls++
        // } else {
        //   handlerSetModalError()
        // }
      },
      setImageURLsList(newImageUrls)
    );

    //     images.forEach((image) => 
    // // console.log(
    // //   {    
    // //       id: 0,
    // //       name: name,
    // //       image: image,
    // //       date: date,
    // //       food: foodID,}
    // // )
    //     // imgageFoodCheckPost({
    //     //   id: 0,
    //     //   name: name,
    //     //   image: image,
    //     //   date: date,
    //     //   food: foodID,
    //     // })
    //     );
    ID++;

  }, [images]);


  function onImageChange(e) {
    setImages([...e.target.files]);
  }
  // useEffect(() => {
  function onInputChange() {
    setImageFlag(false);
    const image_input = document.getElementById("inpFile");
    const imageContainer = document.getElementById("imagePreview");
    const numOfFiles = document.getElementById("numOfFiles");

    imageContainer.classList.remove(`.${style.imagePrevieww}`);
    imageContainer.classList.add(`.${style.imagePreview}`);

    console.log("image_input.type", image_input.type);
    imageContainer.innerHTML = "";
    numOfFiles.textContent = `${image_input.files.length}Files selected`;
    if (image_input.files.length > 0) {
      console.log("image_input YES");

      for (let i of image_input.files) {
        // image_input.files.forEach((i) => {
        console.log("i", i);
        let reader = new FileReader();
        let figure = document.createElement("figure");
        let figCap = document.createElement("figcaption");

        // figCap.innerText = i.name;
        figure.setAttribute("src", reader.result);
        figure.appendChild(figCap);
        reader.onload = () => {
          let img = document.createElement("img");
          img.setAttribute("src", reader.result);
          figure.insertBefore(img, figCap);
        };
        imageContainer.appendChild(figure);
        reader.readAsDataURL(i);
      }
    } else {
      setImageFlag(true);
    }
  }

  // if (loadingFood || loadingFoodTags || loadingSteps || loadingIngredients || loadingIngredient || loadingUnit || loadingImageFood)
  //   return <label htmlFor="inpFile">
  //     <div className={style.loadingContainer}>
  //       <FontAwesomeIcon
  //         className={style.loadingIcon}
  //         icon={faSpinner}
  //         // onClick={props.onTagDelete}
  //         id="inpFileIcon"
  //         spin ></FontAwesomeIcon>
  //     </div>
  //   </label>//<h1>Loading...</h1> 
  // if (statusFood === 'error') return <h1>{JSON.stringify(errorFoods)}</h1>
  // if (statusImagefood === 'error') return <h1>{JSON.stringify(errorImagefood)}</h1>
  if (statusFoodTags === 'error') return <h1>{JSON.stringify(errorFoodTags)}</h1>
  if (statusSteps === 'error') return <h1>{JSON.stringify(errorSteps)}</h1>
  if (statusIngredients === 'error') return <h1>{JSON.stringify(errorIngredients)}</h1>
  if (statusIngredient === 'error') return <h1>{JSON.stringify(errorIngredient)}</h1>
  if (statusUnit === 'error') return <h1>{JSON.stringify(errorUnit)}</h1>
  // if (loadingFood || loadingFoodTags || loadingSteps || loadingIngredients || loadingIngredient || loadingUnit || loadingImageFood) return <h1>return Loading...</h1>
  return (<>

    <div className={style.main}>
      <div className={style.header}>RECEPT</div>
      <div className={style.fooodbox} id="fooodbox">
        <LeftPanelFilter
          filterTagListArray={foodTagSetArray}
          handleAddToTagList={foodTagListCheck}
          foodTagsBox={null}
        />
        <div className={style.ingredientsImageBox}>
        <input
        type="button"
        value="Save"
        onClick={handleFoodSave}
      // onClick={() => props.onFoodSave(makeFoodRecord())}
      />
          <div>
            <div>Suroviny:</div>
            <IngredientInput
              addToIngredientList={addToIngredientList}
              ingredientsList={ingredientsSet}
              ingredientsIDList={ingredientsSetID}
              removeFromIngredientList={removeFromIngredientList}
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
          <label htmlFor="inpFile">
            <FontAwesomeIcon
              className={style.stepIcon}
              icon={faCircleArrowUp}
              // onClick={props.onTagDelete}
              id="inpFileIcon"
            ></FontAwesomeIcon>
          </label>
          <p className={style.numOfFiles} id="numOfFiles">
            No Files chosen
          </p>
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
            onChange={handleNameChange}
            onClick={handleAddToNameTagList}
          />
          <div>
            <p>Postup:</p>
          </div>
          <StepsInput
            stepsCheckPost={stepsCheckPost}
            stepsSetState={stepsSet}
            stepsSetIDState={stepsSetID}
            deleteStep={deleteStep}
          ></StepsInput>
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
  // }, 1000)

}
export default EditFood;
