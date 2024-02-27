import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import StepsInput from "./StepsInput";
import style from "./NewFood.module.css";
import IngredientInput from "./IngredientInput";
import LeftPanelFilter from "./LeftPanelFilter";
import React, { Component } from "react";
import Image from "./Image";
import { useGet, useMutate } from "restful-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
// import { useGetFood } from "./useGet"
import UseSOmarina from "./UseSOmarina";
import  {QueryClientProvider, QueryClient} from '@tanstack/react-query'

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
export default function EditFood(props) {
  const id = useParams()
  // console.log(`/foods/${id.id}/`)
  console.log (typeof (id.id))
  // let b = parseInt(id.id)
  // console.log(b)
  let stepObj = { id: id.id };
  console.log ("stepObj",stepObj)
  const useGetFood = props => {

    const { data: rawFoods,
      refetch: refetchFood,
      loading: loadingFoods,
    } = useGet({
  
      path: (id) => `/foods/${id}/`,
      // path: `/foods/${b}/`,
      // debounce: true,
      debounce: { wait: 500, options: { leading: true, maxWait: 500, trailing: false } } /* ms */,
    })
    console.log("foodsRaw",rawFoods,"loadingFoods",loadingFoods)
    return(rawFoods,refetchFood,loadingFoods)

  }

  // // useEffect(()=>{
  // const { foodsRaw, refetchFood, loadingFoods } = refetchFood(stepObj, { pathParams: stepObj.id })
  // let foodsRaw = rawFoods ?? [];
UseSOmarina()
  // },[]
  // )
  // let foodsRaw = ""
  // useEffect(() => {
  
  // },[])

  // console.log("useGetFood", JSON.stringify(rawFoods), "loadingFoods", loadingFoods)

  const { mutate: postFood } = useMutate({
    verb: "POST",
    path: "/foods/",
  });

  // let foodsRaw = useGetFood()
  // console.log(`foodsRaw`,foodsRaw)

  // console.log("foodsRaw",foodsRaw, "loadingFoods", loadingFoods)
  const { data: rawImagefood,
    refetch: refetchImagefood,
    loading: loadingImageFood
  } = useGet({
    path: "/imagefood/",
  });
  const { mutate: postImageFood } = useMutate({
    verb: "POST",
    path: "/imagefood/",
  });
  let imageFoodBackEnd = rawImagefood ?? [];

  const { data: rawFoodTags,
    refetch: refetchFoodTags,
    loading: loadingFoodTags,
  } = useGet({
    path: "/foodTags/",
  });
  const { mutate: postFoodTag } = useMutate({
    verb: "POST",
    path: "/foodTags/",
  });
  let foodTagsBackEnd = rawFoodTags ?? [];
  // const [rawFoodTags, refetchFoodTags, postFoodTag, loadingFoodTags] = props.foodTags;
  // const [ postFoodTag] = props.foodTags;
  // console.log("loadingFoodTags",loadingFoodTags)
  // let foodTagsBackEnd = rawFoodTags ?? [];
  const { data: rawSteps,
    refetch: refetchSteps,
    loading: loadingSteps } = useGet({
      path: "/steps/",
    });
  const { mutate: postStep } = useMutate({
    verb: "POST",
    path: "/steps/",
  });
  const { mutate: putStep } = useMutate({
    verb: "PUT",
    path: (id) => `/steps/${id}/`,
  });
  let stepsBackEnd = rawSteps ?? [];
  // const [rawSteps, refetchSteps, postStep, putStep] = props.steps;
  // let stepsBackEnd = rawSteps ?? [];

  const { data: rawIngredients,
    refetch: refetchIngredients,
    loading: loadingIngredients } = useGet({
      path: "/ingredients/",
    });
  const { mutate: postIngredients } = useMutate({
    verb: "POST",
    path: "/ingredients/",
  });

  // const [rawIngredients, refetchIngredients, postIngredients] =
  //   props.ingredients;
  let ingredientsBackEnd = rawIngredients ?? [];
  const {
    data: rawIngredient,
    refetch: refetchIngredient,
    loading: loadingIngredient,
    error,
  } = useGet({
    path: "/ingredient/",
  })
  let ingredientLengh = 0;
  const { mutate: postIngredient } = useMutate({
    verb: "POST",
    path: "/ingredient/",
  });

  let ingredientBackEnd = rawIngredient ?? [];

  // let ingredientLengh = props.ingredientLengh;
  const { data: rawUnit,
    refetch: refetchUnit,
    loading: loadingUnit,
    error: errorUnit,
  } = useGet({
    path: "/unit/",
  });
  const { mutate: postUnit } = useMutate({
    verb: "POST",
    path: "/unit/",
  });
  // const [rawUnit, refetchUnit, postUnit] = props.unit;
  let unitBackEnd = rawUnit ?? [];


  // const [rawVolume, refetchVolume, postVolume] = props.volume;
  // let volumeBackEnd = rawVolume ?? [];
  let foodItemEditRender = [];
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
  console.log("foodsRaw", foodsRaw)

  function fetchImageFoodRaw(foodsRaw) {
  refetchImagefood().then(imageFoodBackEnd =>fetchSteps(foodsRaw,imageFoodBackEnd))
  }

  function fetchSteps(foodsRaw,imageFoodBackEnd) {
    refetchSteps().then(stepsRaw =>fetchIngredients(foodsRaw,imageFoodBackEnd,stepsRaw))
  }
  function fetchIngredients(foodsRaw,imageFoodBackEnd,stepsBackEnd) {
    refetchIngredients().then(ingredientsBackEnd=>fetchIngredient(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd))
  }

  function fetchIngredient(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd) {
    refetchIngredient().then(ingredientBackEnd => fetchUnit(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd,ingredientBackEnd))
  }
  function fetchUnit(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd,ingredientBackEnd) { 
    refetchUnit().then(unitBackEnd=>fetchTags(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd,ingredientBackEnd,unitBackEnd))
  }

  function fetchTags(foodsRaw,imageFoodBackEnd,stepsBackEnd,ingredientsBackEnd,ingredientBackEnd,unitBackEnd) {
    refetchFoodTags()
      .then(foodTagsBackEnd => {
        console.log(foodsRaw, imageFoodBackEnd, stepsBackEnd, ingredientsBackEnd, ingredientBackEnd, unitBackEnd, foodTagsBackEnd)
      }
        // handleFood(foodsRaw, imageFoodBackEnd, stepsBackEnd, ingredientsBackEnd, ingredientBackEnd, unitBackEnd, foodTagsBackEnd)
        )
  }


  let foodTagsList = [];
  let imageFoodList = [];

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
  let foodTagsIDList = [];
  foodsRaw.foodTags.forEach((datatags) => {
    foodTagsBackEnd.map((e) => {
      if (e.id === datatags) {
        foodTagsList.push(e.foodTag);
        foodTagsIDList.push(e.id);
      }
    });
  });

  // imageFood

  imageFoodBackEnd.map((e) => {
    if (e.food === foodsRaw.id) {
      imageFoodList.push(e);
    }
  });

  // Steps
  let stepsList = [];
  let stepsIDList = [];
  foodsRaw.steps.forEach((datatags) => {
    stepsBackEnd.map((e) => {
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
  foodsRaw.ingredients.forEach((datatags) => {
    let ingredientsTemp = [];
    let ingredientVolume = "";
    let ingredientUnit = "";
    let ingredientIngredient = "";
    let ingredientUnitID = "";
    let ingredientIngredientID = "";

    ingredientsBackEnd.map((e) => {
      if (e.id === datatags) {
        ingredientsTemp.push(e);
      }
      ingredientsTemp.forEach((r) => {
        ingredientVolume = r.volume;
        // unit
        unitBackEnd.map((u) => {
          if (u.id == r.units) {
            ingredientUnit = u.unit;
            ingredientUnitID = u.id;
          }
        });
        // Ingredient
        ingredientBackEnd.map((i) => {
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
  foodItemEditRender.push({
    id: foodsRaw.id,
    name: foodsRaw.name,
    image: imageFoodList,
    ingredients: ingredientsList,
    ingredientsID: ingredientsIDList,
    ingredientsNotDiv: ingredientsListNotDiv,
    steps: stepsList,
    stepsID: stepsIDList,
    foodTags: foodTagsList,
    foodTagsID: foodTagsIDList,
    date: foodsRaw.date,
  });
  // }
  // });

  console.log("foodItemEditRender", foodItemEditRender)

  // const [foodItemEditRender, setFoodItemEditRender] =    props.foodItemEditRenderState;

  // setFoodItemEditRender(props.handleFoodItemEditRender())
  // console.log("foodItemEditRender",foodItemEditRender)
  const [foodID, setFoodID] = useState(foodItemEditRender.id);
  const [name, setName] = useState(foodItemEditRender.name);
  const [nameTagSet, setNameTagSet] = useState(
    new Set([foodItemEditRender.nameTags])
  );

  const [foodTagSet, setFoodTagSet] = useState(
    new Set(foodItemEditRender.foodTags)
  );
  const [foodTagSetID, setFoodTagSetID] = useState(
    new Set(foodItemEditRender.foodTagsID)
  );

  const [stepsSet, setStepsSet] = useState(new Set(foodItemEditRender.steps));
  const [stepsSetID, setStepsSetID] = useState(
    new Set(foodItemEditRender.stepsID)
  );

  const [ingredientsSet, setIngredientsSet] = useState(
    new Set(foodItemEditRender.ingredients)
  );
  const [ingredientSetNotDiv, setIngredientSetNotDiv] = useState(
    new Set(foodItemEditRender.ingredientsNotDiv)
  );

  const [ingredientsSetID, setIngredientsSetID] = useState(
    new Set(foodItemEditRender.ingredientsID)
  );

  const [date, setDate] = useState(foodItemEditRender.date);

  const [images, setImages] = useState("");
  const [imagePreview, setImagePreview] = useState([]);
  const [imageURLs, setImageURLs] = useState(foodItemEditRender.image);
  const [imageURLsList, setImageURLsList] = useState(foodItemEditRender.image);

  const [imageFlag, setImageFlag] = useState(true);
  const [imageURLsPost, setImageURLsPost] = useState(foodItemEditRender.image);

  let foodTagSetArray = [...foodTagSet];

  let ingredientSetArray = [...ingredientsSet];

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
    props.onFoodSave(makeFoodRecord());
  }

  function handleAddToNameTagList() {
    let nameSplit = name?.split(" ");
    props.addToNameTagList(nameSplit);
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

  function handleAddToFoodTagList(tag) {

    if (foodTagSetArray.includes(tag)) {
      console.log("no")
      removeFromFoodTagList(tag);
    } else {
      console.log("yes")
      addToFoodTagList(tag);
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

  function ingredientsCheckPost(times, unit, ing) {

    refetchUnit().then(a => a.find((element) => (element.unit == unit)))
      .then(res => {
        if (res == null) {
          console.log("Unit NULL", times, res);
          postUnit({ unit: unit })
            .then((response) => {
              ingredientCheckPost(times, response)
            })
        } else {
          console.log("Unit NOT NULL", times, res);
          ingredientCheckPost(times, res)
        }
      }
      )

    function ingredientCheckPost(t, u) {
      console.log("BBB")
      refetchIngredient().then(a => a.find((element) => element.ingredient == ing))
        .then(res => {
          if (res == null) {
            console.log("Ingre NULL", t, res);
            postIngredient({ ingredient: ing })
              .then((response) => {
                ingredientsPost(t, u, response)
              })
          } else {
            console.log("Ingre NOT NULL", t, u, res);
            ingredientsPost(t, u, res)
          }
        }
        )
    }

    // .then((t, u) => console.log("t, u ", t, u))

    // .then((t, u, i) => console.log("t, u, i", t, u, i))


    // console.log("times, unitChecked, ingredientChecked", times, unitChecked, ingredientChecked)
    //       // ingredientsPost(times, unitChecked, ingredientChecked)
    //     })
    // console.log("times, filterUnit, filterIngredient", times, unitChecked, ingredientChecked))
    // ingredientsPost(times, unitChecked, ingredientChecked)
    // const filterUnit = unitCheck(unit)
    // console.log("filterUnit 1", filterUnit)
    // let filterIngredient = ingredientCheck(ing)
    // console.log("filterIngredientID 1", filterIngredient)

    // ingredientsPost(times, filterUnit, filterIngredient)



    // let filterIngre = ingredientBackEnd.filter(
    //   (element) => element.ingredient == ing
    // );
    // if (filterIngre == "") {
    //   postIngredient({ ingredient: ing }).then((response) => console.log("postIngredient", response.id))
    //     .then((error) => console.log("ERROR postIngredient", error));;
    // }

    //   setTimeout(() => {
    //     let unitBack = refetchUnit();
    //     let ingredientBack = refetchIngredient();
    //     unitBack.then((unitB) => {
    //       ingredientBack.then((ingredientB) => {
    //         ingredientsPost(times, unit, ing, ingredientB, unitB);
    //       });
    //     });
    //   }, 10);
  }

  function addTofoodTagIDList(foodTag) {
    let newfoodTagIDList = new Set(foodTagSetID);
    setTimeout(() => {
      let foodTagBack = refetchFoodTags();
      foodTagBack.then((s) => {
        let filterFoodTag = s.filter((element) => element.foodTag == foodTag);
        newfoodTagIDList.add(filterFoodTag[0].id);
        setFoodTagSetID(newfoodTagIDList);
      });
    }, 100);
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
    refetchIngredients().then(a => a.find(
      (element) =>
        element.volume == times &&
        element.units[0] == unitChecked.id &&
        element.ingredientName[0] == ingredientChecked.id
    )).then(res => {
      if (res == null) {
        postIngredients({
          volume: times,
          units: [unitChecked.id],
          ingredientName: [ingredientChecked.id],
        }).then((response) => addToIngredientsIDList(response.volume, response.units, response.ingredientName)
        )
      } else { addToIngredientsIDList(times, unitChecked.id, ingredientChecked.id) }

    })

    //Filter to make sure ingredients does not exist then POST
    // // console.log("filterUnit id", a.id, "filterIngredient.id", filterIngredient.id)
    // let filterIngres = ingredientsBackEnd.find(
    //   (element) =>
    //     element.volume == times &&
    //     element.units[0] == unitChecked.id &&
    //     element.ingredientName[0] == ingredientChecked.id
    // );
    // console.log("filterIngres", filterIngres)
    // let filter = ingredientsBackEndFilter(
    //   times,
    //   unitID,
    //   ingID,
    //   ingredientsBackEnd
    // );
    // if (filterIngres == null) {
    //   // console.log("POST addToIngredientsIDList", times, filterUnit.id, filterIngredient.id);
    //   postIngredients({
    //     volume: times,
    //     units: [unitChecked.id],
    //     ingredientName: [ingredientChecked.id],
    //   }).then((response) => addToIngredientsIDList(response.volume, response.units, response.ingredientName)
    //     console.log("response id", response.id, "response units", response.units, "response.ingredientName", response.ingredientName),

    //   )
    //     .then((error) => console.log("error postIngredients", error));;
    // } else {
    //   console.log("addToIngredientsIDList", times, unitChecked.id, ingredientChecked.id)
    //   addToIngredientsIDList(times, unitChecked.id, ingredientChecked.id)
    //   // addToIngredientsIDList(times, unitID, ingID)
    // };
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

  function addToStepsList(step, stepID, stepPosition) {
    console.log("1step: ", step, "stepID :", stepID, "stepPosition :", stepPosition);
    let newStepsList = [...stepsSet];
    let newStepsIDList = [...stepsSetID];
    let stepId = 0;
    if (stepsSet == "") {
      return;
    }

    if (step != "") {

      console.log("stepPosition", stepPosition)
      stepsCheckPost(stepID, step, stepPosition)

      function stepsCheckPost(stepID, step, stepPosition) {
        let stepObj = { id: stepID, step: step };
        // if (stepID == 0) {
        //   postStep({ step: step }).then(refetchSteps);
        console.log("stepID :", stepID, "step :", step)
        refetchSteps().then(a => a.find(element => (element.id == stepID)))
          // refetchSteps().then(a => a.find(element => ( console.log("element :", element.id, "stepID :", stepID) )))
          .then(res => {
            console.log("RES", res);
            if (res == null) {
              postStep({ step: step })
                .then(response => { addToSetStepsSet(response, stepPosition) });
              // .then(response => { console.log("postStep", response); addToSetStepsSet(response) });
            }
            else if (res != null) {
              if (res.step != step) {
                console.log("res.step != ", res.step, "step", step);
                putStep(stepObj, { pathParams: stepObj.id }).then(response => { addToSetStepsSet(response, stepPosition) });
                // .then(response => { console.log("putStep ", response) })
                // .then(response => { console.log("putStep ", response); addToSetStepsSet(response) });
              }

            } else { addToSetStepsSet(stepID, step, stepPosition) }

          })

      }

      function addToSetStepsSet(stepToAdd, stepPosition) {
        if (stepPosition == null) {
          let index = newStepsList.length;
          console.log("index", index)
          stepPosition = index + 1;
          newStepsList.splice(stepPosition, 0, stepToAdd)
          newStepsIDList.splice(stepPosition, 0, stepToAdd.id)
        } else {
          console.log("stepToAdd 1", stepToAdd, "stepPosition", stepPosition)
          console.log("newStepsIDList 1", newStepsIDList)
          console.log("newStepsList 1", newStepsList)
          newStepsList.splice(stepPosition, 1, stepToAdd)
          newStepsIDList.splice(stepPosition, 1, stepToAdd.id)
          console.log("newStepsIDList 2", newStepsIDList)
          console.log("newStepsList 2", newStepsList)
        }
        setStepsSet(newStepsList);
        setStepsSetID(newStepsIDList)
      }

    }
  }

  // function addToStepsListOld(step, stepPosition) {
  //   // let newStepsSet = new Set(stepsList);
  //   let newStepsList = [...stepsSet];
  //   let stepId = 0;
  //   // console.log("stepPosition step:", step);
  //   // console.log("stepPosition:", stepPosition);
  //   // let position = stepPosition - 1;
  //   // console.log("position:", position);
  //   if (stepsSet === "") {
  //     return;
  //   }
  //   if (step != "") {
  //     if (stepPosition === "") {
  //       let index = newStepsList.length;
  //       stepPosition = index + 1;
  //     } else {
  //     }
  //     // if (stepPosition == "") {
  //     //   newStepsSet.add(
  //     //     <>
  //     //       <Step step={step} key={stepId} />
  //     //     </>
  //     //   );
  //     // }
  //     // if ((stepPosition) => 0) {
  //     newStepsList.splice(stepPosition, 0, <Step step={step} key={stepId} />);
  //     stepsCheckPost(step);

  //     setStepsSet(newStepsList);
  //     // }
  //     stepId++;
  //   }
  // }

  function removeFromStepsList(step, stepID) {
    console.log("step delete", step);
    console.log("stepID delete", stepID);
    let newStepsSet = new Set(stepsSet);
    let newStepsIDSet = new Set(stepsSetID);
    console.log("newStepsSet before", newStepsSet);
    newStepsSet.delete(step);
    let filterStep = rawSteps.filter((element) => element.step == step);
    console.log("newStepsSet after", newStepsSet);
    console.log("filterStep.id", filterStep[0].id);
    console.log("newStepsIDSet before", newStepsIDSet);
    newStepsIDSet.delete(filterStep[0].id);
    console.log("newStepsIDSet after", newStepsIDSet);
    setStepsSetID(newStepsIDSet);
    setStepsSet(newStepsSet);
  }

  function addToFoodTagList(foodTag) {
    let newFoodTagSet = new Set(foodTagSet);
    newFoodTagSet.add(foodTag);
    foodTagPost(foodTag);
    setFoodTagSet(newFoodTagSet);
  }

  function foodTagPost(foodTag) {
    let filter = foodTagsList.filter(
      (element) => element == foodTag
    );
    if (filter == "") {
      postFoodTag({ foodTag: foodTag });
    }
    addTofoodTagIDList(foodTag);
  }

  function removeFromFoodTagList(tag) {
    let newFoodTagSet = new Set(foodTagSet);
    let newFoodTagIDSet = new Set(foodTagSetID);
    newFoodTagSet.delete(tag);
    let filterfoodTag = rawFoodTags.filter(
      (element) => element.foodTag == tag
    );
    newFoodTagIDSet.delete(filterfoodTag[0].id);
    setFoodTagSetID(newFoodTagIDSet);
    setFoodTagSet(newFoodTagSet);
  }

  function addToNameTagList(tag) {
    let newNameTagSet = new Set(nameTagSet);
    newNameTagSet.add(tag);
    setNameTagSet(newNameTagSet);
  }

  function makeFoodRecord() {
    const foodItem = {
      id: foodItemEditRender.id,
      name: name,
      ingredients: [...ingredientsSetID],
      steps: [...stepsSetID],
      foodTags: [...foodTagSetID],
      date: date,
      // nameTags: [...nameTagSet],
    };
    const imageFoodItem = { image: [...imageURLsPost] };
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
    } else return { foodItem, imageFoodItem };
  }

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
      (image) =>
        newImageUrls.push({
          id: 0,
          name: name,
          image: URL.createObjectURL(image),
          date: date,
          food: foodID,
        }),
      setImageURLsList(newImageUrls)
    );

    images.forEach((image) => newImageURL.push(URL.createObjectURL(image)));
    newImageURL.forEach((image) => {
      newImagePreview.push(
        <img
          className={style.foodimage}
          key={ID}
          src={image}
          alt="Image Preview"
        />
      );
    });
    ID++;
    setImagePreview(newImagePreview);
  }, [images]);

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
  return (<>
    {/* {!rawFoodTags} ? <h1>Loading...</h1> : */}
    <div className={style.main}>
      <div className={style.header}>RECEPT</div>
      <div className={style.fooodbox} id="fooodbox">
        <LeftPanelFilter
          filterTagListArray={foodTagSetArray}
          handleAddToTagList={handleAddToFoodTagList}
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
          <div className={style.images} id="imagePreview">
            {imagePreview}
            <span className={style.imagePreview__defaultText}>
              Image Preview
            </span>
          </div>

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
          <label for="inpFile">
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
          <Image visible={imageFlag} imageURLs={imageURLsList}></Image>
          <div>
            <div>Suroviny:</div>
            <IngredientInput
              addToIngredientList={addToIngredientList}
              ingredientsList={ingredientsSet}
              ingredientsIDList={ingredientsSetID}
              removeFromIngredientList={removeFromIngredientList}
            ></IngredientInput>
          </div>
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
            addToStepsList={addToStepsList}
            stepsSetState={stepsSet}
            stepsSetIDState={stepsSetID}
            removeFromStepsList={removeFromStepsList}
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
  </>
  )
  // }, 1000)

}
