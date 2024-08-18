import style from "./Foods.module.css";
import { useState, useEffect } from "react";
import Modal from "../reports/Modal";
import NewFood from "./NewFood";
import EditFood from "./EditFood";
import FoodItemList from "./FoodItemList";
import TagInput from "./TagInput";
import LeftPanelFilter from "./LeftPanelFilter";

import React from "react";
import { useQuery } from "@tanstack/react-query"
import { Link, parsePath, useNavigate,useParams } from "react-router-dom";
import { useGet, useMutate } from "restful-react";
// import { RestfulProvider, error } from "restful-react";
import { render } from "@testing-library/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { defaultQueryFn, getFoodsPageFn,searchFoodsPageFn } from "../hooks/use-get";



function IngrID(props) {
  return (
    <>
      <div className="dd" id="dd"></div>
    </>
  );
}

function Times(props) {
  // console.log("dsadsadsa");
  return (
    <>
      <div className={style.timesIngredient}>{props.times}</div>
    </>
  );
}

function Unit(props) {
  // console.log("dsadsadsa");
  return (
    <>
      <div className={style.unitIngredient}>{props.unit}</div>
    </>
  );
}

function Ingredient(props) {
  return <div className={style.ingIngredient}>{props.ing}</div>;
}

function FoodsSearch(props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1)
  const current_time = new Date().toDateString()
//   const pg = useParams()
  const  search  = useParams()

  let SEARCH = search.search

  const [getTodo, setTodo] = useState("");

  var apiKey = "6de9bfb3c9bb1f5bb3f71b73e0e0dc0d";
  var city = "Bratislava";
  let clock = 0;
  function fetchSelectedData() {
    let current_time = new Date().toLocaleDateString("en-ca", {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    });
    let request = fetch(
      "https://api.openweathermap.org/data/2.5/weather?q=" +
        city +
        "&appid=" +
        apiKey +
        "&units=metric"
    )
      .then((data) => {
        return data.json();
      })
      .then((parsedData) => {
        // console.log(parsedData);
        setTodo(parsedData);
        console.log(
          "clock:",
          clock,
          "temp: ",
          parsedData.main.temp,
          "time",
          current_time
        );
      });
    setTimeout(fetchSelectedData, 60000);
    clock++;
  }

  function getKeyValuePairs(json_object) {
    let array = ["", ""];

    for (var value in json_object) {
      let pair = value + " : " + json_object[value] + "  ";
      // console.log("Array", array);
      let newArray = array.slice();
      // console.log("New Array", newArray);
      newArray.push(pair);
      array = newArray;
      // console.log("Full Chabang", pair, array, newArray);
    }
    return array;
  }
  function getTargetData(getTodo) {
    if (getTodo == "") {
      return "";
    }
    return (
      <div>
        <h2>
          testing Pressure<br></br>
          Pressure: {getTodo.main.pressure}
          <br></br>
          Temp: {getTodo.main.temp}
          <br></br>
          Humidity: {getTodo.main.humidity}
          <br></br>
          Wind: {getTodo.wind.speed}
          <br></br>
          Wind direction: {getTodo.wind.deg}
          <br></br>
          Coord: {getTodo.coord.lon}, {getTodo.coord.lat}
          <br></br>
          <img
            src={
              "https://openweathermap.org/img/wn/" +
              getTodo.weather[0].icon +
              "@2x.png"
            }
          ></img>
          <br></br>
          Weather: {getTodo.weather[0].description}
          <br></br>
          Weather: {getTodo.weather[0].id}, {getTodo.weather[0].main}
          <br></br>
          Cloud: {getTodo.clouds.all}
          <br></br>
        </h2>
        <img
          src={
            "https://tile.openweathermap.org/map/clouds_new/10/560/355.png?appid=" +
            apiKey
          }
        ></img>
      </div>
    );
  }

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    const hour = today.getHours();
    const minute = today.getMinutes();
    const second = today.getSeconds();
  
    return `${month}/${date}/${year},  ${hour}:${minute}/${second}`;
  }
 
    const [currentDate, setCurrentDate] = useState(getDate());
// console.log("itemsNum",itemsNum)

  // async function defaultQueryFn({ queryKey }) {
  //   const { data } = await axios.get(
  //     `http://127.0.0.1:8000${queryKey[0]}`,
  //   )
  //   // .then((users) => users.map((user) => user.id))
  //   return data
  // }

  // async function infiniteQueryFn({ queryKey }) {
  //   const { data } = await axios.get(
  //     `http://127.0.0.1:8000${queryKey[0]}`,
  //     {
  //       params: {
  //         _page: pageParam,
  //         _limit: 4,
  //       },
  //     })
  //     .then((res) => res.data)
  //   // .then((users) => users.map((user) => user.id))
  //   return data
  // }

  // const fetchPost = async (page) => {
  //   await new Promise((resolve) => setTimeout(resolve, 1000))
  //   return post.slice((page - 1) * 2, page * 2)
  // }

  // const { data: rawFoods, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
  //   queryFn: ( pageParam = 1)=>getUsersPageFn(pageParam),
  //   getNextPageParam:(lastPage, allPages)=> {
  //     return lastPage.length > 0 ? allPages.length + 1 : undefined;
  //   },
  // })

//   const { data: rawFoods, isFetching: isFetchingFoods, isLoading: loadingRawFoods, error: errorFoods, isError: isErrorFoods, isPreviousData: isPreviousDataFoods } = useQuery({
//     queryKey: [`/foods/`, page],
//     queryFn: () => getUsersPageFn(page),
//     // keepPreviousData: true
//   })
    console.log("foodsSearch")
  console.log("search :", search)

  const { data: rawFoods, isFetching: isFetchingFoods, isLoading: loadingRawFoods, error: errorFoods, isError: isErrorFoods, isPreviousData: isPreviousDataFoods } = useQuery({
    queryKey: [`/foods/?search=`,  SEARCH ],
      enabled: search?.search !=null,
    queryFn: defaultQueryFn,
    // keepPreviousData: true
  })

  //     if (errorFoods){
  //      console.log("errorFoods")}
  //     if (loadingRawFoods)
  //     { console.log("loadingRawFoods")}
  //   // HandleGet(`/foods/`)
  // console.log("rawFoods",rawFoods)
  // const { data: rawFoodTags,
  //   refetch: refetchFoodTags,
  //   loading: loadingFoodTags,
  // } = useGet({
  //   path: "/foodTags/",
  // });
  const { data: rawFoodTags, isFetching: isFetchingFoodTags, error: errorFoodTags, isLoading: loadingFoodTags, isError: isErrorFoodTags } = useQuery({
    queryKey: ["/foodTags/"],
    enabled: rawFoods?.results !=null,
    queryFn: defaultQueryFn,
  })
  // HandleGet("/foodTags/")

  // const { data: rawSteps,
  //   refetch: refetchSteps,
  //   loading: loadingSteps} = useGet({
  //   path: "/steps/",
  // });
  const { data: rawSteps, isFetching: isFetchingSteps, error: errorSteps, isLoading: loadingSteps, isError: isErrorSteps } = useQuery({
    queryKey: ["/steps/"],
    enabled: !!rawFoodTags,
    queryFn: defaultQueryFn,
  })

  // const { data: rawIngredients,
  //   refetch: refetchIngredients,
  //   loading: loadingIngredients} = useGet({
  //   path: "/ingredients/",
  // });
  const { data: rawIngredients, isFetching: isFetchingIngredients, error: errorIngredients, isLoading: loadingIngredients, isError: isErrorIngredients } = useQuery({
    queryKey: ["/ingredients/"],
    enabled: !!rawSteps,
    queryFn: defaultQueryFn,
  })

  let ingredientLengh = 0;
  // const {
  //   data: rawIngredient,
  //   refetch: refetchIngredient,
  //   loading: loadingIngredient,
  //   error,
  // } = useGet({
  //   path: "/ingredient/",
  // })
  const { data: rawIngredient, isFetching: isFetchingIngredient, error: errorIngredient, isLoading: loadingIngredient, isError: isErrorIngredient } = useQuery({
    queryKey: ["/ingredient/"],
    enabled: !!rawIngredients,
    queryFn: defaultQueryFn,
  })
  // const { data: rawUnit,
  //   refetch: refetchUnit,
  //   loading: loadingUnit,
  //   error: errorUnit,
  // } = useGet({
  //   path: "/unit/",
  // });
  const { data: rawUnit, isFetching: isFetchingUnit, error: errorUnit, isLoading: loadingUnit, isError: isErrorUnit } = useQuery({
    queryKey: ["/unit/"],
    enabled: !!rawIngredient,
    queryFn: defaultQueryFn,
  })
  // const { data: rawImagefood,
  //   refetch: refetchImagefood,
  //   loading: loadingImageFood
  // } = useGet({
  //   path: "/imagefood/",
  // });
  const { data: rawImagefood, isFetching: isFetchingImagefood, error: errorImagefood, isLoading: loadingImagefood, isError: isErrorImagefood, } = useQuery({
    queryKey: ["/imagefood/"],
    enabled: !!rawUnit,
    queryFn: defaultQueryFn,
  })

 
  // const { data: rawVolume, refetch: refetchVolume } = useGet({
  //   path: "/volume/",
  // });

  // const { mutate: postFood } = useMutate({
  //   verb: "POST",
  //   path: "/foods/",
  // });

  // const { mutate: put } = useMutate({
  //   verb: "PUT",
  //   path: (id) => `/foods/${id}/`,
  // });

  // const { mutate: postFoodTag } = useMutate({
  //   verb: "POST",
  //   path: "/foodTags/",
  // });
  // const { mutate: postImageFood } = useMutate({
  //   verb: "POST",
  //   path: "/imagefood/",
  // });

  // const { mutate: postStep } = useMutate({
  //   verb: "POST",
  //   path: "/steps/",
  // });

  // const { mutate: putStep } = useMutate({
  //   verb: "PUT",
  //   path: (id) => `/steps/${id}/`,
  // });

  // const { mutate: postVolume } = useMutate({
  //   verb: "POST",
  //   path: "/volume/",
  // });

  // const { mutate: postUnit } = useMutate({
  //   verb: "POST",
  //   path: "/unit/",
  // });

  // const { mutate: postIngredient } = useMutate({
  //   verb: "POST",
  //   path: "/ingredient/",
  // });

  // const { mutate: postIngredients } = useMutate({
  //   verb: "POST",
  //   path: "/ingredients/",
  // });

  let foodsTATA = rawFoods ?? [];

  let tagsBackEnd = rawFoodTags ?? [];
  let steps = rawSteps ?? [];
  let ingredients = rawIngredients ?? [];

  let ingredientRaw = rawIngredient ?? [];
  let imageFoodRaw = rawImagefood ?? [];
  let ingredient = [];


  

  let foodsRaw=foodsTATA.results



  // useEffect(() => {
  //   if (!rawUnit) {
  //     const timerId = window.setTimeout(() => refetchUnit().then((response) => console.log(response.data))
  //       .catch((error) => console.log(error)), 1000);
  //     return () => window.clearTimeout(timerId);
  //   } else {
  //     return;
  //   }
  // }, [rawUnit, refetchUnit, errorUnit]);
  let unit = rawUnit ?? [];
  // let volume = rawVolume ?? [];
  let foodTagsContainer = []
  let foods = [];
  // foodsRaw?.pages?.forEach((data) => {
  // foodTags

  let foodTagsList = [];
  let foodTagsIDList = [];
  
  
    foodsRaw?.forEach((data) => {
      data.foodTags.forEach((datatags) => {
        tagsBackEnd.map((e) => {
          if (e.id === datatags) {
            foodTagsList.push(e.foodTag);
            foodTagsIDList.push(e.id);
          }
        });
      });
      // console.log("imageFoodRaw",imageFoodRaw)
      // imageFood
      let imageFoodList = [];
      imageFoodRaw.map((e) => {
        if (e.food === data.id) {
          imageFoodList.push(e);
        }
      });

      // Steps
      let stepsList = [];
      let stepsIDList = [];

      data.steps.forEach((datatags) => {
        steps.map((e) => {
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
      data?.ingredients?.forEach((datatags) => {
        let ingredientsTemp = [];
        let ingredientVolume = "";
        let ingredientUnit = "";
        let ingredientIngredient = "";
        let ingredientUnitID = "";
        let ingredientIngredientID = "";

        ingredients.map((e) => {
          if (e.id === datatags) {
            ingredientsTemp.push(e);
          }
          ingredientsTemp.forEach((r) => {
            ingredientVolume = r.volume;
            // unit
            unit.map((u) => {
              if (u.id == r.units) {
                ingredientUnit = u.unit;
                ingredientUnitID = u.id;
              }
            });
            // Ingredient
            ingredientRaw.map((i) => {
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
    
      
      foods.push({
        id: data.id,
        name: data.name,
        image: imageFoodList,
        ingredients: ingredientsList,
        ingredientsID: ingredientsIDList,
        ingredientsNotDiv: ingredientsListNotDiv,
        steps: stepsList,
        stepsID: stepsIDList,
        foodTags: foodTagsList,
        foodTagsID: foodTagsIDList,
        date: data.date,
      }); foodTagsContainer.push(foodTagsList)
    }
    )
  

  const [maxFoodId, setMaxFoodId] = useState(2);
  const [filterTagList, setFilterTagList] = useState(new Set([]));
  const [modalNewFlag, setModalNewFlag] = useState(false);
  const [modalEditFlag, setModalEditFlag] = useState(false);

  // const [ingredientSet, setIngredientSet] = useState(new Set([]));
  // const [stepsSet, setStepsSet] = useState(new Set([]));
  // const [nameTagSet, setNameTagSet] = useState(new Set());
  // const [foodTagSet, setFoodTagSet] = useState(new Set());
  const [foodItemEditRender, setFoodItemEditRender] = ("")
  // function handleFoodItemEditRender() { 
  //   return foodItemEditRender
  // }
  let filterTagListArray = [...filterTagList];

  // function handleEditttFoodSave(foodItem) {
  //   let current_time = new Date().toLocaleDateString("en-uk", {
  //     day: "numeric",
  //     year: "numeric",
  //     month: "short",
  //   });
  //   // let newData = data.slice();
  //   // let newFoodId = maxFoodId + 1;
  //   // setMaxFoodId(newFoodId);
  //   // foodItem.id = newFoodId;
  //   // foodItem.likes = 0;
  //   // foodItem.dislikes = 0;
  //   // foodItem.fave = false;
  //   // foodItem.date = current_time;
  //   console.log("foodItem:", foodItem);
  //   fetch("http://localhost:8000/foods/", {
  //     method: "POST",
  //     body: foodItem,
  //     headers: {
  //       "Content-Type": "multipart/form-data",
  //     },
  //   })
  //     .then((res) => console.log(res))
  //     .catch((error) => console.log(error))
  //     .then(refetchFood);

  //   // post(foodItem).then(refetch);
  //   // newData.push(foodItem);
  //   // setData(newData);
  //   setModalNewFlag(false);
  // }

  // function handleNewFoodSave(foodItem) {
  //   let newData = foodsRaw.filter((d) => d.id != foodItem.id);
  //   newData.push(foodItem);
  //   newData.sort((a, b) => a.id - b.id);
  //   postFood(foodItem).then(refetchFood);
  //   // setData(newData);
  //   setModalEditFlag(false);
  // }

  // function handleEditFoodSave(foodItem) {
  //   console.log("foodItem", foodItem);
  //   console.log("imageFoodItem", foodItem.imageFoodItem);
  //   put(
  //     foodItem.foodItem,
  //     { pathParams: foodItem.foodItem.id }
  //     // {
  //     //   headers: {
  //     //     "content-type": "multipart/form-data",
  //     //   },
  //     // ).then(refetchFood);
  //   ).then(res => console.log("res", res)).then(refetchFood).then(imgageFoodCheckPost(foodItem.imageFoodItem)).then(
  //     setModalEditFlag(false))

  // }

  // function imgageFoodCheckPost(image) {
  //   console.log("imageFoodRaw", imageFoodRaw);
  //   image.image.forEach((e) => {
  //     let a = [];
  //     a = imageFoodRaw.filter((element) => element.id == e.id);
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
  //       postImageFood(formdata).then(refetchImagefood);
  //     }
  //   });
  // }

  function addToTagList(tag) {
    navigate(`/foods/?search=${tag}`)
    let filterTagListArray = [...filterTagList];
    let tagListLowerCase = filterTagListArray.map((str) => str.toLowerCase());
    let newTagListSet = new Set(tagListLowerCase);
    if (tag === "") {
      return;
    } else if (newTagListSet.has(tag.toLowerCase())) {
      return;
    }

    let newTagList = new Set(filterTagList);
    newTagList.add(tag);
    setFilterTagList(newTagList);
  }

  function removeFromTagList(tag) {
    let newTagList = new Set(filterTagList); // slice for sets
    newTagList.delete(tag); // push for set
    setFilterTagList(newTagList);
  }

  function setModalNewFlagTrue(flag) {
    setModalNewFlag(true);
  }

  function setModalEditFlagTrue(flag) {
    setModalEditFlag(true);
  }

  function handleAddToTagList(tag) {
    console.log("typeof tag: ", typeof tag);
    if (filterTagListArray && Array.isArray(filterTagListArray)) {
      if (filterTagListArray.includes(tag)) {
        //console.log("included", val);
        removeFromTagList(tag);
        console.log("removeFromTagList_1", tag);
        //  uncheckTag(tag);
      } else {
        console.log("not included", tag);
        console.log("newTagListArray", filterTagListArray);
        addToTagList(tag);
      }
    }
  }
  function handleNavigateToNovyRecept() {
    navigate(`/foods/novy_recept/`)
  }
  function pageReload() {
    window.location.reload();
  }




  if (loadingRawFoods || loadingFoodTags || loadingSteps || loadingSteps || loadingIngredients || loadingIngredient || loadingUnit || loadingImagefood)
    return <label htmlFor="inpFile">
      <div className={style.loadingContainer}>
        <FontAwesomeIcon
          className={style.loadingIcon}
          icon={faSpinner}
          id="inpFileIcon"
          spin ></FontAwesomeIcon>
      </div>
    </label>//<h1>Loading...</h1> 
  if (isErrorFoods) return <h1>{JSON.stringify(errorFoods.message)}</h1>
  if (isErrorImagefood) return <h1>{JSON.stringify(errorImagefood.message)}</h1>
  if (isErrorFoodTags) return <h1>{JSON.stringify(errorFoodTags.message)}</h1>
  if (isErrorSteps) return <h1>{JSON.stringify(errorSteps.message)}</h1>
  if (isErrorIngredients) return <h1>{JSON.stringify(errorIngredients.message)}</h1>
  if (isErrorIngredient) return <h1>{JSON.stringify(errorIngredient.message)}</h1>
  if (isErrorUnit) return <h1>{JSON.stringify(errorUnit.message)}</h1>

  // const pagesArray = Array(rawFoods.TotalNumOfPages).fill().map((_, index) => index + 1)
  // console.log("rawFoods", rawFoods  )
  // console.log("pagesArray", pagesArray)
  // const nav = (
  //   <nav className="nav-ex2">
  //     <button onClick={prevPage} disabled={isPreviousDataFoods || page === 1}>&lt;&lt;</button>
  //     {/* Removed isPreviousData from PageButton to keep button focus color instead */}
  //     {pagesArray.map(pg => <PageButton key={pg} pg={pg} page={page}  setPage={setPage} />)}
  //     <button onClick={nextPage} disabled={isPreviousDataFoods || page === rawFoods.TotalNumOfPages}>&gt;&gt;</button>
  //   </nav>)
 
  return (
    <>
      <header className={style.Appheader}>RECEPTY</header>
      <div className={style.droplist}>
        <div style={{ color: "orange" }}>{getTodo.name}</div>
   <div>          Temp: {getKeyValuePairs(getTodo.main)}
          {getKeyValuePairs(Math.ceil(getTodo.temp))}</div> 
   
        <div>{ current_time}</div>

 
        <main className={style.Appmain}>
          <TagInput
            filterTagListState={[filterTagList, setFilterTagList]}
            addToTagList={addToTagList}
            removeFromTagList={removeFromTagList}
          />
        </main>
        <div className={style.foodButton} onClick={handleNavigateToNovyRecept}>
          NOVY RECEPT
        </div>
      </div>
      <div className={style.main}>
        <LeftPanelFilter
          filterTagListArray={filterTagListArray}
          handleAddToTagList={handleAddToTagList}
          foodTagsContainer={foodTagsContainer}
        />
        <div  >
          <FoodItemList
            food={foods}
            filterTagList={filterTagList}
            setModalEditFlagTrue={setModalEditFlagTrue}
            foodItemEditRenderState={[
              foodItemEditRender,
              setFoodItemEditRender,
            ]}
            page={[page, setPage]}
            isPreviousDataFoods={isPreviousDataFoods}
            rawFoods={rawFoods}
          ></FoodItemList>
                  <div>
        <input type="button" value="Fetch data!" onClick={fetchSelectedData} />
        <h2 style={{ color: "orange" }}>{getTodo.name}</h2>
        <h3 style={{ color: "red" }}>
          {" "}
          <b>Temperature:</b>
          <br></br>
          {getKeyValuePairs(getTodo.main)}
        </h3>
        <h3 style={{ color: "yellow" }}>
          {" "}
          <b>Wind Speed:</b>
          <br></br>
          {getKeyValuePairs(getTodo.wind)}
        </h3>
        <h3>{getTargetData(getTodo)}</h3>
        {/* <h3>{getTodo.main.temp}</h3> */}
      </div>
      let tem
      <div>
        <h2>
          testing Pressure<br></br>
          Pressure: {getKeyValuePairs(getTodo.main)}
          {getKeyValuePairs(getTodo.pressure)}
          <br></br>
          Temp: {getKeyValuePairs(getTodo.main)}
          {getKeyValuePairs(Math.ceil(getTodo.temp))}
          <br></br>
          Humidity: {getKeyValuePairs(getTodo.main)}
          {getKeyValuePairs(getTodo.humidity)}
          <br></br>
          Wind: {getKeyValuePairs(getTodo.wind)}
          {getKeyValuePairs(getTodo.speed)}
          <br></br>
          Wind direction: {getKeyValuePairs(getTodo.wind)}
          {getKeyValuePairs(getTodo.deg)}
          <br></br>
          Coord: {getKeyValuePairs(getTodo.coord)}
          {getKeyValuePairs(getTodo.lon)}, {getKeyValuePairs(getTodo.coord)}
          {getKeyValuePairs(getTodo.lat)}
          <br></br>
          Weather: {getKeyValuePairs(getTodo.weather)}
          {getKeyValuePairs(getTodo.description)}
          <br></br>
          Weather: {getKeyValuePairs(getTodo.weather)}
          {getKeyValuePairs(getTodo.id)}, {getKeyValuePairs(getTodo.weather)}
          {getKeyValuePairs(getTodo.main)}
          <br></br>
          Cloud: {getKeyValuePairs(getTodo.clouds)}
          {getKeyValuePairs(getTodo.all)}
          <br></br>
        </h2>
      </div>
 {/* <span>Current Page: {page + 1}</span>
      <button
        onClick={() => setPage(old => Math.max(old - 1, 0))}
        disabled={page === 0}
      >
        Previous Page
      </button>{' '}
      <button
        onClick={() => {
          if (!isPreviousDataFoods && rawFoods.hasMore) {
            setPage(old => old + 1)
          }
        }}
        // Disable the Next Page button until we know a next page is available
        disabled={isPreviousDataFoods || !rawFoods?.hasMore}
      >
        Next Page
      </button> */}
          {/* { nav}
      {isFetchingFoods ? <span> Loading...</span> : null}{' '} */}

        </div>
        {/* <button onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
      </button> */}
      </div>
      {/* <Modal visible={modalNewFlag} setModalFlag={setModalNewFlag}>
        <NewFood
          onFoodSave={handleNewFoodSave}
        ></NewFood>
      </Modal>
      <Modal visible={modalEditFlag} setModalFlag={setModalEditFlag}>
        <EditFood
          onFoodSave={handleEditFoodSave}
          foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]}
          foodTags={[postFoodTag]}
          steps={[rawSteps, refetchSteps, postStep, putStep]}
          ingredients={[rawIngredients, refetchIngredients, postIngredients]}
          ingredient={[
            ingredientRaw,
            refetchIngredient,
            postIngredient,
                  ]}
          ingredientLengh={ingredientLengh}
          unit={[rawUnit, refetchUnit, postUnit]}
        // volume={[rawVolume, refetchVolume, postVolume]}
        ></EditFood>
      </Modal> */}
    </>
  );
}

export default FoodsSearch;
