import { useState, useEffect, useRef } from "react";
import { BrowserRouter as Router, Route, Routes, Link, Navigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Tooltip from '../modules/tooltips/Tooltip'
import StepsInput from "./StepsInput";
import SaveLoading from "./SaveLoading";
import SaveSaved from "./SaveSaved";
import SaveError from "./SaveError";
import Lightbox from "./Lightbox";
import style from "./NewFood.module.css";
import IngredientInput from "./IngredientInput";
import LeftPanelFilter from "./LeftPanelFilter";
import React, { Component } from "react";
import Image from "./Image";
import Modal from "./Modal";
import ModalPreview from "./ModalPreview";
import { useGet, useMutate } from "restful-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp, faSpinner, faPenToSquare, faFloppyDisk ,faTrash} from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import { useQueries, useQuery, useQueryClient, useMutation, } from "@tanstack/react-query"
import { createPostStep, createPutStep, createDeleteStep, createPostUnit, createPostIngredient, createPostIngredients, createPostFoodTag, createPostFood, createPutFood, createPostImagefood, createDeleteImagefood } from "../hooks/use-post";
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
  const [modalLightboxFlag, setModalLightboxFlag] = useState(false);
  const [imageDispley, setImageDispley] = useState([])
  const [currentImageID, setCurrentImageID] = useState("")
  const [isVisibleEdit, setIsVisibleEdit] = useState(true)
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
  const { status: statusFood, data: dataFoods, refetch: refetchFood, isLoading: loadingFood, error: errorFoods } = useQuery({
    // queryKey: ["/foods/",ID],
    queryKey: [`/foods/${id.id}/`],
    enabled: !!id,
    queryFn: defaultQueryFn,
  })

  const { status: statusPostFood, error: errorPostFood, mutate: postFood } = useMutation({
    mutationFn: createPostFood,
    onError: error => { console.log("Error Post Food :", error) },
    onSuccess: (foodCreated, oldFoodTag) => {
      console.log("Food :", foodCreated, "sucsesfully created!")
      queryClient.invalidateQueries([`/foods/${foodCreated.id}/`], foodCreated)//"/steps/",newPost.id],newPost)
      // addTofoodTagList(foodCreated)
    }
  })

  const { status: statusPutFood, error: errorPutFood, mutate: putFood } = useMutation({
    // queryKey: (id) => [`/steps/${id}/`],
    mutationFn: createPutFood,
    onError: error => { console.log("Error Put Food :", error); handlerSetModalError() },
    onSuccess: (foodUpdated, oldFood) => {
      console.log("Food :", foodUpdated, "sucsesfully updated!");
      queryClient.invalidateQueries([`/foods/${foodUpdated.id}/`], foodUpdated);
      handlerSetModalSave();
    }
  })

  const { status: statusImagefood, data: dataImagefood, refetch: refetchImagefood, isLoading: loadingImageFood, error: errorImagefood } = useQuery({
    queryKey: ["/imagefood/"],
    enabled: !!dataFoods,
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

  const { status: statusDeleteImagefood, error: errorDeleteImagefood, mutate: deleteImagefood } = useMutation({
    mutationFn: createDeleteImagefood,
    onError: error => { console.log("Error Delete Imagefood :", error); handlerSetModalError() },
    onSuccess: (ImagefoodCreated, oldImagefood) => {
      console.log("Imagefood :", ImagefoodCreated, "sucsesfully deleted!")
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

  useEffect(() => {
    // function FriendStatus() {
    let food = ""
    if (statusFood === 'success') {
      // console.log("statusFood", statusFood)
      if (statusImagefood === 'success') {
        // console.log("statusImagefood", statusImagefood)
        if (statusFoodTags === 'success') {
          // console.log("statusFoodTags", statusFoodTags)
          if (statusSteps === 'success') {
            // console.log("statusSteps", statusSteps)
            if (statusIngredients === 'success') {
              // console.log("statusIngredients", statusIngredients)
              if (statusIngredient === 'success') {
                // console.log("statusIngredient", statusIngredient)
                if (statusUnit === 'success') {
                  // console.log("YEEEEES statusUnit", statusUnit)
                  food = handleFood()

                  setFoodID(food.id);
                  setName(food.name);
                  setNameTagSet(food.nameTags);
                  setFoodTagSet(food.foodTags);
                  setFoodTagSetID(food.foodTagsID);
                  setStepsSet(food.steps);
                  setStepsSetID(food.stepsID);
                  setIngredientsSet(food.ingredients);
                  setIngredientsSetID(food.ingredientsID);
                  setDate(food.date);
                  setImageURLs(food.image);
                  setImageURLsList(food.image);
                  setImageURLsPost(food.image);
                } else {
                  // console.log("YEEEEES statusUnit", statusUnit) 
                }
              } else {
                // console.log("statusIngredient", statusIngredient) 
              }
            } else {
              // console.log("statusIngredients", statusIngredients) 
            }
          } else {
            // console.log("statusSteps", statusSteps) 
          }
        } else {
          // console.log("statusFoodTags", statusFoodTags) 
        }

      } else {
        // console.log("statusImagefood", statusImagefood) 
      }
    } else {
      // console.log("statusFood", statusFood) 
    }
    // ?dataFoods 
    // ?dataImagefood 
    // ?dataFoodTags 
    // ?dataSteps 
    // ?dataIngredients
    // ?dataIngredient 
    // ?dataUnit
    // if (dataFoods &&
    //   dataImagefood &&
    //   dataFoodTags &&
    //   dataSteps &&
    //   dataIngredients &&
    //   dataIngredient &&
    //   dataUnit) {
    //   console.log("YES")
    //   // food = handleFood()
    // }


    // }
    // let newFood = FriendStatus()
    // setFood(newFood)

  }, [statusFood, statusImagefood, statusFoodTags, statusSteps, statusIngredients, statusIngredient, statusUnit,
    dataFoods])//, dataImagefood, dataFoodTags, dataSteps, dataIngredients, dataIngredient, dataUnit])

  // console.log(dataSteps

  //   // foodID,
  //   // name,
  //   // ingredientsSet,
  //   // ingredientsSetID,
  //   // stepsSet,
  //   // stepsSetID,
  //   // date,
  //   imageURLs,
  //   imageURLsList,
  //   imageURLsPost,
  // )

  // let dataFoods = dataFoods ?? []



  async function defaultQueryFnFoodTagId({ queryKey }) {
    const { data } = await axios.get(
      `http://127.0.0.1:8000${queryKey[0]}`,
    )
    // .then((users) => users.map((user) => user.id))
    return data.id
  }
  // function getFood ({ queryKey }) {
  //   console.log(`http://127.0.0.1:8000${queryKey[0]}`)
  //   const { data } = fetch(
  //     `http://127.0.0.1:8000${queryKey[0]}`,
  //   ).then(res=>res.json()).then((res=>res.foodTag))
  //   return data
  // }

  // const foods_FoodTagsName = useQueries({
  //   enabled: !!dataFoods,
  //   queries: dataFoods
  //     ? dataFoods.foodTags.map((id) => {
  //       return {
  //         queryKey: [`/foodTags/${id}/`],
  //         queryFn: queryFnFoodTagName,
  //       }
  //     }) : [],
  // })

  const foods_FoodTagsName = useQueries({
    enabled: !!dataFoods,
    queries: dataFoods
      ? dataFoods.foodTags.map((id) => {
        return {
          queryKey: [`/foodTags/${id}/`],
          queryFn: queryFnFoodTagName
        }
      }) : [],
  })



  const foods_Steps = useQueries({
    enabled: !!dataFoods,
    queries: dataFoods
      ? dataFoods.steps.map((id) => {
        return {
          queryKey: [`/steps/${id}/`],
          queryFn: queryFnFoodStep
        }
      }) : [],
  })

  const foods_Ingredients = useQueries({
    enabled: !!dataFoods,
    queries: dataFoods
      ? dataFoods.ingredients.map((id) => {
        return {
          queryKey: [`/ingredients/${id}/`],
          queryFn: defaultQueryFn
        }
      }) : [],
  })

  // const foods_IngredientsName = useQueries({
  //   enabled: foods_Ingredients?.data !=null,
  //   queries: foods_Ingredients
  //     ? foods_Ingredients.ingredientName.map((id) => {
  //       return {
  //         queryKey: [`/ingredient/${id}/`],
  //         queryFn:queryFnFoodIngredient
  //       }
  //     }) : [],
  // })

  // console.log("foods_Ingredient",foods_IngredientsName)
  // useEffect(() => {
  //   // put the fetchData inside the effect
  //   async function fetchData() {
  //     // setLoading(true);
  //     const foods_FoodTagsId = useQueries({
  //       enabled: !!rawFoods,
  //       queries: rawFoods
  //         ? rawFoods.foodTags.map((id) => {
  //           return {
  //             queryKey: [`/foodTags/${id}/`],
  //             queryFn: defaultQueryFnFoodTagId,
  //           }
  //         }) : [],
  //     })

  //     console.log(foods_FoodTagsId);
  //     setFoodTagSet(foods_FoodTagsId);
  //     console.log(foodTagSet); // may not be the same as tmp, but you will see the updated state in the next render
  //     // setLoading(false);
  //   }
  //   fetchData();
  // }, [])

  // const foods_FoodTagsId = useQueries({
  //   enabled: !!rawFoods,
  //   queries: rawFoods
  //     ? rawFoods.foodTags.map((id) => {
  //       return {
  //         queryKey: [`/foodTags/${id}/`],
  //         queryFn: defaultQueryFnFoodTagId,
  //       }
  //     }) : [],
  // })


  // console.log("foods_FoodTagsName", foods_FoodTagsName)

  // console.log("foods_FoodTagsId", foods_FoodTagsId)
  // async function getFoodTagsByTagsName ({ queryKey }) {
  //   console.log(`http://127.0.0.1:8000${queryKey[0]}`)
  //   const { data } = await axios.get(
  //     `http://127.0.0.1:8000${queryKey[0]}`,
  //   ).then(a=>console.log("a",a)).then((res=>res.foodTag))
  //   return data
  // }
  // console.log("foods_FoodTagsName",foods_FoodTagsName)
  // const userId = rawFoods?.foodTags
  // console.log("userId",userId)
  // if (errorUnit)
  //   return console.log("errorUnit")
  // if (loadingRawUnit)
  //   return console.log("loadingRawUnit")
  // if (errorFoods || errorFoodTags || errorSteps || errorIngredients || errorIngredient || errorUnit || errorImagefood)
  //   return <div>There was an error!</div>


  // if (loadingRawFoods || loadingRawFoodTags || loadingRawSteps || loadingRawIngredients || loadingRawIngredient || loadingRawUnit || loadingImageFood)
  //   return <div>Data is loading</div>




  // console.log("foodsRaw", foodsRaw)
  //   let foodTagsIDList = [];

  //   rawFoods.foodTags.forEach(async(datatags) => {
  //     foodTagsBackEnd.map((e) => {
  //       if (e.id === datatags) {
  //         foodTagsList.push(e.foodTag);
  //         foodTagsIDList.push(e.id);
  //       }
  //     });
  //   });
  // }
  // printFiles () 


  // rawFoods=data
  // }, 1000);
  //   console.log("foodsRaw",rawFoods,"loadingFoods",loadingFoods)
  //   // return(rawFoods,refetchFood,loadingFoods)

  // }

  // // useEffect(()=>{
  // const { foodsRaw, refetchFood, loadingFoods } = refetchFood(stepObj, { pathParams: stepObj.id })

  // if(foodsRaw.length<1) return;


  // },[]
  // )

  // useEffect(() => {

  // },[])

  // console.log("useGetFood", JSON.stringify(rawFoods), "loadingFoods", loadingFoods)

  // const { mutate: postFood } = useMutate({
  //   verb: "POST",
  //   path: "/foods/",
  // });
  // let foodsRaw = rawFoods??[]

  // const { data: rawImagefood,
  //   refetch: refetchImagefood,
  //   loading: loadingImageFood
  // } = useGet({
  //   path: "/imagefood/",
  // });

  // const { mutate: postImageFood } = useMutate({
  //   verb: "POST",
  //   path: "/imagefood/",
  // });

  // console.log("loadingImageFood", loadingImageFood )
  // let dataImagefood = dataImagefood ?? [];

  // const { data: rawFoodTags,
  //   refetch: refetchFoodTags,
  //   loading: loadingFoodTags,
  // } = useGet({
  //   path: "/foodTags/",
  // });


  // const { mutate: postFoodTag } = useMutate({
  //   verb: "POST",
  //   path: "/foodTags/",
  // });
  // let dataFoodTags = dataFoodTags ?? [];
  // const [rawFoodTags, refetchFoodTags, postFoodTag, loadingFoodTags] = props.foodTags;
  // const [ postFoodTag] = props.foodTags;
  // console.log("loadingFoodTags",loadingFoodTags)
  // let foodTagsBackEnd = rawFoodTags ?? [];
  // const { data: rawSteps,
  //   refetch: refetchSteps,
  //   loading: loadingSteps } = useGet({
  //     path: "/steps/",
  //   });


  // const { mutate: postStep } = useMutate({
  //   verb: "POST",
  //   path: "/steps/",
  // });
  // const { mutate: putStep } = useMutate({
  //   verb: "PUT",
  //   path: (id) => `/steps/${id}/`,
  // });
  // let dataSteps = dataSteps ?? [];
  // const [rawSteps, refetchSteps, postStep, putStep] = props.steps;
  // let stepsBackEnd = rawSteps ?? [];

  // const { data: rawIngredients,
  //   refetch: refetchIngredients,
  //   loading: loadingIngredients } = useGet({
  //     path: "/ingredients/",
  //   });


  // const { mutate: postIngredients } = useMutate({
  //   verb: "POST",
  //   path: "/ingredients/",
  // });

  // const [rawIngredients, refetchIngredients, postIngredients] =
  //   props.ingredients;
  // let dataIngredients = dataIngredients ?? [];
  // const {
  //   data: rawIngredient,
  //   refetch: refetchIngredient,
  //   loading: loadingIngredient,
  //   error,
  // } = useGet({
  //   path: "/ingredient/",
  // })

  // let ingredientLengh = 0;
  // const { mutate: postIngredient } = useMutate({
  //   verb: "POST",
  //   path: "/ingredient/",
  // });

  // let dataIngredient = dataIngredient ?? [];

  // let ingredientLengh = props.ingredientLengh;
  // const { data: rawUnit,
  //   refetch: refetchUnit,
  //   loading: loadingUnit,
  //   error: errorUnit,
  // } = useGet({
  //   path: "/unit/",
  // });

  // const { mutate: postUnit } = useMutate({
  //   verb: "POST",
  //   path: "/unit/",
  // });
  // const [rawUnit, refetchUnit, postUnit] = props.unit;
  // let dataUnit = dataUnit ?? [];


  // const [rawVolume, refetchVolume, postVolume] = props.volume;
  // let volumeBackEnd = rawVolume ?? [];
  const foodItemEditRender = []
  // foodsRaw.forEach((foodsRaw) => {
  // foodTags
  // const [foodsBackEnd, setFoodsBackEnd] = useState("")
  // useEffect(() => { 
  //   let res = refetchFood()
  //     // .then(res => res.json())
  //     .then(foodsRaw => setFoodsBackEnd(foodsRaw))
  //     // .then(a => { console.log("foodsBackEnd", a) })
  // },[])
  // console.log("foodsBackEnd", foodsBackEnd)
  // const [foodsRaw, setFoodsRaw] = useState("")
  // let foodsRaw = rawFoods 
  // useEffect(() => {

  //   // setFoodsRaw(rawUnit)
  //   refetchFood() .then(res => res.json()).then(response => { foodsRaw = response; })
  // }, [])
  // console.log("foodsRaw", foodsRaw)

  // function fetchImageFoodRaw(foodsRaw) {
  // refetchImagefood().then(imageFoodBackEnd =>fetchSteps(foodsRaw,imageFoodBackEnd))
  // }

  // function fetchSteps(foodsRaw,imageFoodBackEnd) {
  //   refetchSteps().then(stepsRaw =>fetchIngredients(foodsRaw,imageFoodBackEnd,stepsRaw))
  // }
  // function fetchIngredients(foodsRaw,imageFoodBackEnd,stepsBackEnd) {
  //   refetchIngredients().then(ingredientsBackEnd=>fetchIngredient(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd))
  // }

  // function fetchIngredient(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd) {
  //   refetchIngredient().then(ingredientBackEnd => fetchUnit(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd,ingredientBackEnd))
  // }
  // function fetchUnit(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd,ingredientBackEnd) { 
  //   refetchUnit().then(unitBackEnd=>fetchTags(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd,ingredientBackEnd,unitBackEnd))
  // }

  // function fetchTags(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd,ingredientBackEnd,unitBackEnd) {
  //   refetchFoodTags()
  //     .then(foodTagsBackEnd => {
  //       console.log(foodsRaw, imageFoodBackEnd, stepsBackEnd, ingredientsBackEnd, ingredientBackEnd, unitBackEnd, foodTagsBackEnd)
  //     }
  //       // handleFood(foodsRaw, imageFoodBackEnd, stepsBackEnd, ingredientsBackEnd, ingredientBackEnd, unitBackEnd, foodTagsBackEnd)
  //       )
  // }



  // function handleFood(foodsRaw, imageFoodBackEnd, stepsBackEnd, ingredientsBackEnd, ingredientBackEnd, unitBackEnd, foodTagsBackEnd, imageFoodList) {
  // console.log(

  //   // "foodsRaw :", foodsRaw,
  //   // "imageFoodBackEnd :", imageFoodBackEnd,
  //   // "stepsBackEnd :", stepsBackEnd,
  //   // "ingredientsBackEnd :", ingredientsBackEnd,
  //   // "ingredientBackEnd :", ingredientBackEnd,
  //   "unitBackEnd ",unitBackEnd,
  //   // "foodTagsBackEnd :", foodTagsBackEnd
  // )
  // foodTags
  // let foodsRaw = ""
  // foodsRaw.map((data) => {
  let foodTagsIDList = [];
  // for (let foodsRaw of food) {

  // const [foodID, setFoodID] = useState("");
  // const [name, setName] = useState(null);
  // const [nameTagSet, setNameTagSet] = useState(
  //   new Set());
  // const [foodTagSet, setFoodTagSet] = useState(
  //   new Set()
  // );

  // const [foodTagSetID, setFoodTagSetID] = useState(
  //   new Set()
  // );
  // const [stepsSet, setStepsSet] = useState(new Set());
  // const [stepsSetID, setStepsSetID] = useState(
  //   new Set()
  // );

  // const [ingredientsSet, setIngredientsSet] = useState(
  //   new Set()
  // );
  // // const [ingredientSetNotDiv, setIngredientSetNotDiv] = useState(
  // //   new Set(foodItemEditRender.ingredientsNotDiv)
  // // );
  // const [ingredientsSetID, setIngredientsSetID] = useState(
  //   new Set()
  // );
  // const [date, setDate] = useState();
  // const [images, setImages] = useState("");
  // const [imagePreview, setImagePreview] = useState([]);
  // const [imageURLs, setImageURLs] = useState([]);
  // const [imageURLsList, setImageURLsList] = useState();

  // const [imageFlag, setImageFlag] = useState(true);
  // const [imageURLsPost, setImageURLsPost] = useState();
  // const [filterTagList, setFilterTagList] = useState(new Set([]));





  function handleFood() {
    // if (rawFoods && rawImagefood && rawFoodTags && rawSteps && rawIngredients && rawIngredient && rawUnit) {

    // let foodsRaw = rawFoods 

    // console.log("foodsRaw", foodsRaw)
    // return
    // foodsRaw.forEach((foodsRaw) => {
    // console.log("foodsRaw2", foodsRaw)
    // if(foodsRaw){console.log("ANO foodsRaw",foodsRaw)
    let backEndFood = dataFoods;
    let backEndFoodTags = dataFoodTags;
    let backEndSteps = dataSteps;
    let backEndImagefood = dataImagefood;
    let backEndIngredients = dataIngredients;
    let backEndIngredient = dataIngredient;
    let backEndUnit = dataUnit;


    backEndFood.foodTags.forEach((datatags) => {
      backEndFoodTags.map((e) => {
        if (e.id === datatags) {
          foodTagsList.push(e.foodTag);
          foodTagsIDList.push(e.id);
        }
      });
    });

    // imageFood

    let imageFoodList = [];
    backEndImagefood.map((e) => {
      if (e.food === backEndFood.id) {
        imageFoodList.push(e);
      }
    });

    // Steps
    let stepsList = [];
    let stepsIDList = [];

    backEndFood.steps.forEach((datatags) => {
      backEndSteps.map((e) => {
        let stepId = 0;
        if (e.id == datatags) {
          let a = e.step;
          // console.log("e.step", e);
          // stepsList.push(<div className={style.unitIngredient}>{e.step}</div>);
          stepsList.push(e);
          stepsIDList.push(e.id);
          // console.log("e.step", e.step, "e.id", e.id);
        }
        stepId++;
      });
    });

    // Ingredients
    let ingredientsList = new Set();
    let ingredientsIDList = [];
    let ingredientsListNotDiv = [];
    backEndFood.ingredients.forEach((datatags) => {
      let ingredientsTemp = [];
      let ingredientVolume = "";
      let ingredientUnit = "";
      let ingredientIngredient = "";
      let ingredientUnitID = "";
      let ingredientIngredientID = "";

      backEndIngredients.map((e) => {
        if (e.id === datatags) {
          ingredientsTemp.push(e);
        }
        ingredientsTemp.forEach((r) => {
          ingredientVolume = r.volume;
          // unit
          backEndUnit.map((u) => {
            if (u.id == r.units) {
              ingredientUnit = u.unit;
              ingredientUnitID = u.id;
            }
          });
          // Ingredient
          backEndIngredient.map((i) => {
            if (i.id == r.ingredientName) {
              ingredientIngredient = i.ingredient;
              ingredientIngredientID = i.id;
            }
          });
        });
      });
      let IDid = 1;
      let IDtimes = 10;
      let IDunit = 100;
      let IDingredient = 1000;

      // console.log("datatags", datatags);
      // console.log("ingredientVolume", ingredientVolume);
      // console.log("ingredientUnit", ingredientUnit);
      // console.log("ingredientIngredient", ingredientIngredient);
      ingredientsList.add(
        <>
          <IngrID id={datatags} key={IDid} />
          <Times times={ingredientVolume} key={IDtimes} />
          <Unit unit={ingredientUnit} key={IDunit} />
          <Ingredient ing={ingredientIngredient} key={IDingredient} />
        </>
      );
      ingredientsListNotDiv.push({
        id: datatags,
        times: ingredientVolume,
        unit: ingredientUnit,
        ing: ingredientIngredient,
      });
      ingredientsIDList.push(datatags);

      IDid++;
      IDtimes++;
      IDunit++;
      IDingredient++;
    });


    return ({
      id: backEndFood.id,
      name: backEndFood.name,
      image: imageFoodList,
      ingredients: ingredientsList,
      ingredientsID: ingredientsIDList,
      ingredientsNotDiv: ingredientsListNotDiv,
      steps: stepsList,
      stepsID: stepsIDList,
      foodTags: foodTagsList,
      foodTagsID: foodTagsIDList,
      date: backEndFood.date,
    })
  }





  // setFoodID({ id: foodsRaw.id });
  // setName({ name: foodsRaw.name });
  // // setNameTagSet(foodItemEditRender.nameTags);
  // setFoodTagSet({ foodTags: foodTagsList });
  // setFoodTagSetID({ foodTagsID: foodTagsIDList });
  // setStepsSet({ steps: stepsList });
  // setStepsSetID({ stepsID: stepsIDList });
  // setIngredientsSet({ ingredients: ingredientsList });
  // setIngredientsSetID({ ingredientsID: ingredientsIDList });
  // setDate({ date: foodsRaw.date });
  // setImageURLs({ image: imageFoodList, });
  // setImageURLsList({ image: imageFoodList, });
  // setImageURLsPost({ image: imageFoodList, });
  // foodTagSetArray.push({ foodTags: foodTagsList })
  // ingredientSetArray.push({ ingredients: ingredientsList })
  // })
  // }
  // }

  // handleFood()
  // foodItemEditRender.push({
  //   id: foodsRaw.id,
  //   name: foodsRaw.name,
  //   image: imageFoodList,
  //   ingredients: ingredientsList,
  //   ingredientsID: ingredientsIDList,
  //   ingredientsNotDiv: ingredientsListNotDiv,
  //   steps: stepsList,
  //   stepsID: stepsIDList,
  //   foodTags: foodTagsList,
  //   foodTagsID: foodTagsIDList,
  //   date: foodsRaw.date,
  // })






  // foodItemEditRender.push({
  //   id: foodsRaw.id,
  //   name: foodsRaw.name,
  //   image: imageFoodList,
  //   ingredients: ingredientsList,
  //   ingredientsID: ingredientsIDList,
  //   ingredientsNotDiv: ingredientsListNotDiv,
  //   steps: stepsList,
  //   stepsID: stepsIDList,
  //   foodTags: foodTagsList,
  //   foodTagsID: foodTagsIDList,
  //   date: foodsRaw.date,
  // });
  // }


  // console.log("foodItemEditRender", foodItemEditRender)

  // const [foodItemEditRender, setFoodItemEditRender] =    props.foodItemEditRenderState;

  // setFoodItemEditRender(props.handleFoodItemEditRender())
  // console.log("foodItemEditRender",foodItemEditRender)
  // const [foodID, setFoodID] = useState(foodItemEditRender.id);
  // const [name, setName] = useState(foodItemEditRender.name);
  // const [nameTagSet, setNameTagSet] = useState(
  //   new Set([foodItemEditRender.nameTags]));
  // const [foodTagSet, setFoodTagSet] = useState(
  //   new Set(foodItemEditRender.foodTags)
  // );

  // const [foodTagSetID, setFoodTagSetID] = useState(
  //   new Set(foodItemEditRender.foodTagsID)
  // );
  // const [stepsSet, setStepsSet] = useState(new Set(foodItemEditRender.steps));
  // const [stepsSetID, setStepsSetID] = useState(
  //   new Set(foodItemEditRender.stepsID)
  // );

  // const [ingredientsSet, setIngredientsSet] = useState(
  //   new Set(foodItemEditRender.ingredients)
  // );
  // // const [ingredientSetNotDiv, setIngredientSetNotDiv] = useState(
  // //   new Set(foodItemEditRender.ingredientsNotDiv)
  // // );
  // const [ingredientsSetID, setIngredientsSetID] = useState(
  //   new Set(foodItemEditRender.ingredientsID)
  // );
  // const [date, setDate] = useState(foodItemEditRender.date);
  // const [images, setImages] = useState("");
  // const [imagePreview, setImagePreview] = useState([]);
  // const [imageURLs, setImageURLs] = useState(foodItemEditRender.image);
  // const [imageURLsList, setImageURLsList] = useState(foodItemEditRender.image);

  // const [imageFlag, setImageFlag] = useState(true);
  // const [imageURLsPost, setImageURLsPost] = useState(foodItemEditRender.image);
  // const [filterTagList, setFilterTagList] = useState(new Set([]));


  // handleFoodUpdate()
  // useEffect(() => {
  //   handleFoodUpdate()
  //   // console.log("UPDATE", rawFoods, rawImagefood, rawFoodTags, rawSteps, rawIngredients, rawIngredient, rawUnit)
  // }, [foodItemEditRender])
  // console.log("ingredientsSet", ingredientsSet)


  // console.log("foodItemEditRender", foodItemEditRender)
  // console.log("name", name)
  // foodTags
  // let foodTagsList = [];
  // foodTagsBackEnd.forEach((e) => {
  //   foodTagsList.push(e.foodTag);
  // });

  // let foodTagsListID = [];
  // foodTagSet.forEach((tag) => {
  //   foodTagsBackEnd.map((e) => {
  //     if (e.foodTag === tag) {
  //       foodTagsListID.push(e.id);
  //     }
  //   });
  // });

  // // Steps
  // let stepsListSteps = [];
  // stepsBackEnd.forEach((e) => {
  //   stepsListSteps.push(e.steps);
  // });

  // let stepsListID = [];
  // stepsSet.forEach((step) => {
  //   stepsBackEnd.map((e) => {
  //     if (e.step === step) {
  //       stepsListID.push(e.id);
  //     }
  //   });
  // });

  // Ingredients
  // let ingredientsID = [];
  // ingredientSetNotDiv.forEach((datatags) => {
  //   ingredientsBackEnd.map((e) => {
  //     if (e.id === datatags) {
  //       ingredientsID.push(e);
  //     }
  //   });
  // });
  function handleCheckStep() {
    // for (let i in step)
    // props.onFoodSave(makeFoodRecord());
  }

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

  // function stepsCheckPostOld(step) {
  //   let filter = stepsBackEnd.filter((element) => element.step == step);
  //   if (filter == "") {
  //     postStep({ step: step }).then(refetchSteps);
  //   }
  //   addToStepIDList(step);
  // }

  // function unitCheck(unit) {

  //   console.log("filterItem", filterItem)

  // }
  // function ingredientCheck(ing) {
  //   console.log("ingredientCheck", ing)
  //   console.log("ingredientBackEnd", ingredientBackEnd)
  //  let filterIngre = ingredientBackEnd.filter((element) => console.log("element",element)
  // )
  // let a=""
  // let filterIngre =""
  //   refetchIngredient().then(b => filterIngre = b)

  // let filterIngre = refetchIngredient().then(a=>a.find((element) => element.ingredient == ing)
  // )
  // const printAddress = () => {
  //   filterIngre.then((a) => {return a
  //   });
  // };
  //     console.log("filterIngre", filterIngre)
  // let v = ""
  //     const printAddress = async () => {
  //       const a = await filterIngre;
  //       console.log("a", a)
  //       v= a
  //     };
  //    printAddress();
  //   console.log("v",v)

  // }

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
    let ingredientFilter = dataUnit.find((element) => element.ingredient == ingredient)

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
    console.log("foodTag", foodTag);
    console.log("foodTag.id", foodTag.id);
    console.log("foodTag.id", foodTag.foodTag);
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

  function addToIngredientsIDList(times, unitID, ingID) {
    let newIngredientsIDList = new Set(ingredientsSetID);
    newIngredientsIDList.add(times, unitID, ingID);
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
    else { addToIngredientsIDList(times, unitChecked.id, ingredientChecked.id) }
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
    // let filter = foodTagsList.filter(
    //   (element) => element == foodTag
    // );
    // console.log("filter", filter)
    // if (filter == "") {

    let filterFoodTag = dataFoodTags.filter((element) => element.foodTag == foodTag);
    if (filterFoodTag == "") {
      postFoodTag({ foodTag: foodTag })
    } else { addTofoodTagList(filterFoodTag[0]) }
    // function foodTagPost(foodTag) {
    //   let filter = foodTagsList.filter(
    //     (element) => element == foodTag
    //   );
    //   if (filter == "") {
    //     postFoodTag({ foodTag: foodTag });
    //   }
    //   addTofoodTagList(foodTag);
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
  function deleteImage(image) {
    console.log("Delete : ", id)
    deleteImagefood({
      id: image.id,
      name: image.name,
      image: image.image,
      date: image.date,
      food: image.food,
    })
  }
  function imgageFoodCheckPost(image) {
    // console.log("imgageFoodCheckPost image", image);
    // console.log("imgageFoodCheckPost image", image.name);

    //  let a = dataImagefood.filter((element) => element.id == image.id);
    //   if (a == "") {

    let formdata = new FormData();
    formdata.append("name", image.name);
    formdata.append("image", image.image);
    formdata.append("date", image.date);
    formdata.append("food", image.food);
    // console.log("Posting formdata", formdata);
    fetch("http://127.0.0.1:8000/imagefood/", {
      method: "POST",
      body: formdata,
      headers: { 'X-CSRFToken': 'csrftoken' },
    })
      .then((res) => { return res.ok })

    // postImagefood(formdata)


  }

  // function imgageFoodCheckPost(image) {
  //   console.log("dataImagefood", dataImagefood);
  //   image.forEach((e) => {
  //     let a = [];
  //     a = dataImagefood.filter((element) => element.id == e.id);
  //     if (a == "") {
  //       let formdata = new FormData();
  //       formdata.append("name", e.name);
  //       formdata.append("image", e.image);
  //       formdata.append("date", e.date);
  //       formdata.append("food", e.food);
  //       console.log("Posting formdata", formdata);
  //       // fetch("http://127.0.0.1:8000/imagefood/", {
  //       //   method: "POST",
  //       //   body: formdata,
  //       //   headers: {'X-CSRFToken': 'csrftoken'},
  //       // })
  //       postImagefood(formdata)
  //     }
  //   });
  // }

  function makeFoodRecord() {

    // const imageFoodItem = { image: [...imageURLsPost] };
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
    } else return ({
      id: foodID,
      name: name,
      date: date,
      ingredients: [...ingredientsSetID],
      steps: [...stepsSetID],
      foodTags: [...foodTagSetID],
      image: [...imageURLsPost]
      // nameTags: [...nameTagSet],
    })
  }

  function handleEditFoodSave(id,
    name,
    date,
    ingredients,
    steps,
    foodTags, image) {
    postImagefood(id,
      name,
      date,
      ingredients,
      steps,
      foodTags, image)





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
  function closeModal(e) {
    console.log("close")
    setModalLightboxFlag(false)
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



  function imgageDisplayStep(move) {
    console.log("currentImageID 1", currentImageID)
    console.log("length", imageURLs.length)
    let newPosition = ""
    if (move > 0) {
      if (currentImageID < (-1 + imageURLs.length)) {
        newPosition = currentImageID + move
        imageUploader(newPosition)
      }
    }
    if (move < 0) {
      if (currentImageID > 0) {
        newPosition = currentImageID + move
        imageUploader(newPosition)
      }
    }
  }

  function handlerImage(imageToAdd, currentImageID) {
    let position = getPosition(imageToAdd.id, imageURLs)
    imageUploader(position)
  }

  function imageUploader(position) {
    console.log("position 2", position)
    setCurrentImageID(position)
    // console.log("imageURLs[position].id :", imageURLs[position].id);

    // console.log("INsite 10", currentImageID)
    let newImagePreview = []
    newImagePreview.push(
      <>
        {/* <div className={style.imagebox}> */} {/* <b>&times;</b> */}
        <div className={style.imageblock}>
          {/* <span className={style.close} onClick={closeModal} id="close">
            <Tooltip text={"ZrušiťčťžýášruUpraviť"}>
              <b>&times;</b>
            </Tooltip>
          </span> */}


          {/* <Tooltip text={"Upraviť"}>   <b>&times;</b> */}
            {/* <FontAwesomeIcon className={style.editIcon} icon={faPenToSquare} />
          </Tooltip>

          {isVisibleEdit &&
            <Tooltip text={"Uložiť"}>
              <FontAwesomeIcon className={style.saveIcon} icon={faFloppyDisk} />
            </Tooltip>}
            {isVisibleEdit &&
            <Tooltip text={"Zmazať"}>
              <FontAwesomeIcon className={style.trashIcon} icon={faTrash} />
            </Tooltip>} */}

          <a className={style.prev} onClick={() => imgageDisplayStep(-1)}>&#10094;</a>
          <a className={style.next} onClick={() => imgageDisplayStep(+1)} >&#10095;</a>

          <img

            key={imageURLs[position].id}
            src={imageURLs[position].image}
            //   onClick={() =>props.deleteImage (image)}
            alt="Image Preview"
            id="imagePreviewed"
          />

        </div>
        {/* </div> */}
      </>

    )

    setImageDispley(newImagePreview);

  }



  //   if (imageURLs.length < 1) { return; } else {
  //     // let lenght = imageURLs.length
  //     let IDs = 100
  //     imageURLs.forEach((image) => {
  //       if (image.id === imageToAdd.id) {
  //         let newImagePreview = []
  //         newImagePreview.push(
  //           <>
  //             {/* <div className={style.imagebox}> */}
  //             <div className={style.imageblock}>
  //               <span className={style.close} onClick={closeModal} id="close">&times;</span>
  //               <a className={style.prev} onClick="plusSlides(-1)" >&#10094;</a>
  //               <a className={style.next} onClick="plusSlides(1)" >&#10095;</a>

  //               <img

  //                 key={image.id}
  //                 src={imageToAdd.image}
  //                 //   onClick={() =>props.deleteImage (image)}
  //                 alt="Image Preview"
  //                 id="imagePreviewed"
  //               />

  //             </div>
  //             {/* </div> */}
  //           </>
  //         )
  //         setImageDispley(newImagePreview)
  //       };
  //       IDs++
  //     })
  //   }
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


  // function handleImage() {
  //   let formdata = new FormData();
  //   console.log("image", state);
  //   formdata.append("image", state);
  //   setImages2(formdata);
  // }
  // function onImageChange(e) {
  //   setImages(e.target.files);
  //   state = { file: images };
  //   handleImage();
  // }

  // function previewImage() {
  //   const input = document.getElementById("image-input");
  //   const preview = document.getElementById("image-preview");

  //   const reader = new FileReader();
  //   reader.onload = function () {
  //     preview.src = reader.result;
  //   };

  //   if (input.files && input.files[0]) {
  //     reader.readAsDataURL(input.files[0]);
  //   }
  // }
  // const reader = new FileReader();

  // function handleEvent(event) {
  //   // eventLog.textContent += `${event.type}: ${event.loaded} bytes transferred\n`;

  //   if (event.type === "load") {
  //     images.src = reader.result;
  //   }
  // }
  // function getAllPictures(pics) {
  //   pics.then((data) => {
  //     return data.forEach((picture) => {
  //       // The setState will trigger a re-render
  //       setImageURLs((photo) => [...photo, picture.Key]);
  //     });
  //   });
  // }

  // function addListeners(reader) {
  //   reader.addEventListener("loadstart", handleEvent);
  //   reader.addEventListener("load", handleEvent);
  //   reader.addEventListener("loadend", handleEvent);
  //   reader.addEventListener("progress", handleEvent);
  //   reader.addEventListener("error", handleEvent);
  //   reader.addEventListener("abort", handleEvent);
  // }

  // useEffect(() => {
  // let ID = 0;
  // let DD = "";

  // if (images.length < 1) return;
  // const newImageUrls = [];
  // const newImageUrls2 = [];
  // console.log("images", images);

  // // imageURLs.map((imageSrc) => newImageUrls2.push(imageSrc)),
  // images.forEach((image) =>
  //   // URL.createObjectURL(image).then(
  //   //   newImageUrls.push(<Image image={image} key={ID} />)
  //   // )
  //   newImageUrls.push(URL.createObjectURL(image))
  // );
  // console.log("newImageUrls", newImageUrls);

  // if (images) {
  //   addListeners(reader);
  //   reader.readAsDataURL(images);
  // }

  // reader.readAsDataURL(images);
  // formData.append("image", images);
  // images.forEach((image) => reader.readAsDataURL(image));

  //   ID++;
  //   setImageURLsReader(images);
  //   setImageURLs(newImageUrls);
  // }, [images]);
  // function readerhandler() {
  //   setTimeout(() => {
  //     console.log("images", images);
  //   }, 100);
  // }

  // images for Posting
  useEffect(() => {
    let newImageUrlsPost = [];
    let ID = 0;
    let newImageURL = [];
    let newImagePreview = [];
    let newImageUrls = imageURLs;

    if (images.length < 1) return;
    images.forEach(
      (image) =>
        newImageUrlsPost.push({
          id: 0,
          name: name,
          image: image,
          date: date,
          food: foodID,
        }),
      setImageURLsPost(newImageUrlsPost)
    );

    images.forEach(
      (image) => {

        let res = imgageFoodCheckPost({
          id: 0,
          name: name,
          image: image,
          date: date,
          food: foodID
        })
        if (res = true) {
          console.log("posting OK pushing to ImageUrls");
          newImageUrls.push({
            id: 0,
            name: name,
            image: URL.createObjectURL(image),
            date: date,
            food: foodID,
          })
        } else {
          handlerSetModalError()
        }
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

  //   images.forEach((image) => newImageURL.push(URL.createObjectURL(image)));
  //   newImageURL.forEach((image) => {
  //     newImagePreview.push(
  //       <img
  //         className={style.foodimage}
  //         key={ID}
  //         src={image}
  //         alt="Image Preview"
  //       />
  //     );
  //   });
  //   ID++;
  //   setImagePreview(newImagePreview);
  // }, [images]);



  //     // images for Preview
  //     useEffect(() => {

  //         if (images.length < 1) return;

  //   }, [images]);

  //     // images for Images list
  //     useEffect(() => {

  //       if (images.length < 1) return;

  //  }, [images]);

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
  // useEffect(() => {
  //   const image_input = document.querySelector(`.${style.imageinput}`);
  //   const imageContainer = document.getElementById("imagePreview");
  //   const numOfFiles = document.getElementById("numOfFiles");

  //   // function preview() {
  //   console.log("image_input.type", image_input.type);
  //   imageContainer.innerHTML = "";
  //   numOfFiles.textContent = `${image_input.files.length}Files selected`;
  //   for (let i of image_input.files) {
  //     let reader = new FileReader();
  //     let figure = document.createElement("figure");
  //     let figCap = document.createElement("figcaption");

  //     figCap.innerText = i.name;
  //     figure.setAttribute("src", reader.result);
  //     figure.appendChild(figCap);
  //     reader.onload = () => {
  //       let img = document.createElement("img");
  //       img.setAttribute("src", reader.result);
  //       // img.setAttribute("src", reader.result);
  //       figure.insertBefore(img, figCap);
  //     };
  //     imageContainer.appendChild(figure);
  //     reader.readAsDataURL(i);
  //   }

  // useEffect(() => {
  //   const image_input = document.querySelector(`.${style.imageinput}`);
  //   let uploaded_image = "";

  //   image_input.addEventListener("change", function () {
  //     const reader = new FileReader();
  //     reader.addEventListener("load", function () {
  //       console.log("bla0");
  //       uploaded_image = reader.result;
  //       document.querySelector(
  //         `.${style.imagePreview}`
  //       ).style.backgroundImage = `url(${uploaded_image})`;
  //       console.log("hej", this);
  //     });
  //     reader.readAsDataURL(this.files[0]);
  //     setImageURLsReader(reader);
  //   });

  // const inpFile = document.getElementById("inpFile");
  // const previewContainer = document.getElementById("imagePreview");
  // const previewImage = previewContainer.querySelector(
  //   `.${style.imagePreview__image}`
  // );
  // const previewDefaultText = previewContainer.querySelector(
  //   `.${style.imagePreview__defaultText}`
  // );

  // inpFile.addEventListener("change", function () {
  //   const file = this.files[0];
  //   console.log("bla0");
  //   if (file) {
  //     const reader = new FileReader();

  //     reader.addEventListener("load", function () {
  //       previewImage.setAttribute("src", this.result);
  //     });
  //     reader.readAsDataURL(file);
  //   } else {
  //     previewDefaultText.style.display = null;
  //     previewImage.style.display = null;
  //   }
  // });
  // setTimeout(() => {
  // console.log(loadingFood, loadingFoodTags, loadingSteps, loadingIngredients, loadingIngredient, loadingUnit, loadingImageFood)
  if (loadingFood || loadingFoodTags || loadingSteps || loadingIngredients || loadingIngredient || loadingUnit || loadingImageFood)
    return <label htmlFor="inpFile">
      <div className={style.loadingContainer}>
        <FontAwesomeIcon
          className={style.loadingIcon}
          icon={faSpinner}
          // onClick={props.onTagDelete}
          id="inpFileIcon"
          spin ></FontAwesomeIcon>
      </div>
    </label>//<h1>Loading...</h1> 
  if (statusFood === 'error') return <h1>{JSON.stringify(errorFoods)}</h1>
  if (statusImagefood === 'error') return <h1>{JSON.stringify(errorImagefood)}</h1>
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
        {/* <div className={style.foodtypesbox}>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://www.nin.sk/wp-content/uploads/2019/01/img_2802-900x1350.jpg"
              alt="POLIEVKY"
              value={imageURLs}
              onClick={() => handleAddToFoodTagList("POLIEVKY")}
              checked={foodTagSetArray.includes("POLIEVKY")}
            />
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("POLIEVKY")}
                className={style.checkboxInput}
                name="POLIEVKY"
                id="POLIEVKY"
                key="POLIEVKY"
                onChange={() => handleAddToFoodTagList("POLIEVKY")}
              />
              <label
                className={style.label}
                htmlFor="POLIEVKY"
                onClick={() => handleAddToFoodTagList("POLIEVKY")}
              >
                POLIEVKY
              </label>
            </div>
          </div>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://www.gyron.sk/storage/article_images/f_2011020010.png"
              alt="MASO A HYDINA"
              onClick={() => handleAddToFoodTagList("MASO A HYDINA")}
            />
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("MASO A HYDINA")}
                name="MASO A HYDINA"
                className={style.checkboxInput}
                id="MASO A HYDINA"
                key="MASO A HYDINA"
                onChange={() => handleAddToFoodTagList("MASO A HYDINA")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("MASO A HYDINA")}
              >
                MASO A HYDINA
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("HOVADZIE")}
                name="HOVADZIE"
                className={style.checkboxInput}
                id="HOVADZIE"
                key="HOVADZIE"
                onChange={() => handleAddToFoodTagList("HOVADZIE")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("HOVADZIE")}
              >
                HOVADZIE
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("BRAVCOVE")}
                name="BRAVCOVE"
                className={style.checkboxInput}
                id="BRAVCOVE"
                key="BRAVCOVE"
                onChange={() => handleAddToFoodTagList("BRAVCOVE")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("BRAVCOVE")}
              >
                BRAVCOVE
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("KURACIE")}
                name="KURACIE"
                className={style.checkboxInput}
                id="KURACIE"
                key="KURACIE"
                onChange={() => handleAddToFoodTagList("KURACIE")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("KURACIE")}
              >
                KURACIE
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("KACACIE")}
                name="KACACIE"
                className={style.checkboxInput}
                id="KACACIE"
                key="KACACIE"
                onChange={() => handleAddToFoodTagList("KACACIE")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("KACACIE")}
              >
                KACACIE
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("KRALIK")}
                name="KRALIK"
                className={style.checkboxInput}
                id="KRALIK"
                key="KRALIK"
                onChange={() => handleAddToFoodTagList("KRALIK")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("KRALIK")}
              >
                KRALIK
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("JAHNA")}
                name="JAHNA"
                className={style.checkboxInput}
                id="JAHNA"
                key="JAHNA"
                onChange={() => handleAddToFoodTagList("JAHNA")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("JAHNA")}
              >
                JAHNA
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("RYBA")}
                name="RYBA"
                className={style.checkboxInput}
                id="RYBA"
                key="RYBA"
                onChange={() => handleAddToFoodTagList("RYBA")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("RYBA")}
              >
                RYBA
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("INE")}
                name="INE"
                className={style.checkboxInput}
                id="INE"
                key="INE"
                onChange={() => handleAddToFoodTagList("INE")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("INE")}
              >
                INE
              </label>
            </div>
          </div>

          <div className={style.food}>
            <img
              className={style.image}
              src="https://img.mimibazar.sk/s/bs/9/220205/19/i60958.jpg"
              alt="BEZMASITE JEDLA"
              onClick={() => handleAddToFoodTagList("BEZMASITE JEDLA")}
            />
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("BEZMASITE JEDLA")}
                name="BEZMASITE JEDLA"
                className={style.checkboxInput}
                id="BEZMASITE JEDLA"
                key="BEZMASITE JEDLA"
                onChange={() => handleAddToFoodTagList("BEZMASITE JEDLA")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("BEZMASITE JEDLA")}
              >
                BEZMASITE JEDLA
              </label>
            </div>
          </div>

          <div className={style.food}>
            <img
              className={style.image}
              src="https://www.dennikrelax.sk/include/crop.php?h=480&w=720&f=../photos/amarant.jpg"
              alt="PRILOHY"
              onClick={() => handleAddToFoodTagList("PRILOHY")}
            />
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("PRILOHY")}
                name="PRILOHY"
                className={style.checkboxInput}
                id="PRILOHY"
                key="PRILOHY"
                onChange={() => handleAddToFoodTagList("PRILOHY")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("PRILOHY")}
              >
                PRILOHY
              </label>
            </div>
          </div>

          <div className={style.food}>
            <img
              className={style.image}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGGE2i7To_F9Sl2qbNG6Fv38hZ0MAilY4l-phNS4mpieX6znGVYrl5K8C48pdjWCWbx-s&usqp=CAU"
              alt="KOLACE A DEZERTY"
              onClick={() => handleAddToFoodTagList("KOLACE A DEZERTY")}
            />
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("KOLACE A DEZERTY")}
                name="KOLACE A DEZERTY"
                className={style.checkboxInput}
                id="KOLACE A DEZERTY"
                key="KOLACE A DEZERTY"
                onChange={() => handleAddToFoodTagList("KOLACE A DEZERTY")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("KOLACE A DEZERTY")}
              >
                KOLACE A DEZERTY
              </label>
            </div>
          </div>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZVgjDPFoecZAoqQkNrjFaKaF1M7Iy2K4daQ&usqp=CAU"
              alt="CESTOVINY"
              onClick={() => handleAddToFoodTagList("CESTOVINY")}
            />
            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("CESTOVINY")}
                name="CESTOVINY"
                className={style.checkboxInput}
                id="CESTOVINY"
                key="CESTOVINY"
                onChange={() => handleAddToFoodTagList("CESTOVINY")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("CESTOVINY")}
              >
                CESTOVINY
              </label>
            </div>
          </div>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://img.aktuality.sk/foto/MHg1MTk6NDg1MHgzMjM1LzkyMHg3NjAvc21hcnQvaW1n/mS3qqABtQ1vf_Yi8XVL5Cw.jpg?st=7ygkC0k_nRu6IarjLFo0TL4_jSQ6j_LWctMX2-SUBoQ&ts=1600752583&e=0"
              alt="NATIERKY"
              onClick={() => handleAddToFoodTagList("NATIERKY")}
            />

            <div>
              <input
                type="checkbox"
                checked={foodTagSetArray.includes("NATIERKY")}
                name="NATIERKY"
                className={style.checkboxInput}
                id="NATIERKY"
                key="NATIERKY"
                onChange={() => handleAddToFoodTagList("NATIERKY")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToFoodTagList("NATIERKY")}
              >
                NATIERKY
              </label>
            </div>
          </div>
        </div> */}
        <div className={style.ingredientsImageBox}>
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
          <Image visible={imageFlag} imageURLs={imageURLsList} deleteImage={deleteImage} setModalFlag={setModalLightboxFlag} handlerImage={handlerImage}></Image>

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
      <input
        type="button"
        value="Save"
        onClick={handleFoodSave}
      // onClick={() => props.onFoodSave(makeFoodRecord())}
      />
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
      <Lightbox imageURLs={imageURLsList} setModalFlag={setModalLightboxFlag} handlerImage={handlerImage} getPosition={getPosition}imageDispley={imageDispley} currentImageID={currentImageID}
      ></Lightbox>
    </ModalPreview>
  </>
  )
  // }, 1000)

}
export default EditFood;
