import style from "./Foods.module.css";
import { useState, useEffect } from "react";
import Modal from "../reports/Modal";
import NewFood from "./NewFood";
import EditFood from "./EditFood";
import FoodItemList from "./FoodItemList";
import TagInput from "./TagInput";
import LeftPanelFilter from "./LeftPanelFilter";
import PageButton from "./PageButton"
import React from "react";
import { useQuery } from "@tanstack/react-query"
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import { useGet, useMutate } from "restful-react";
// import { RestfulProvider, error } from "restful-react";
import { render } from "@testing-library/react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useInfiniteQuery } from "@tanstack/react-query";
import { defaultQueryFn, getFoodsPageFn, searchFoodsPageFn } from "../hooks/use-get";



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

function Foods(props) {
  const navigate = useNavigate();
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(2)
  const location = useLocation()
  const [loc, setLoc] = useState(location)
  useEffect(() => {
    setLoc(location)
  }, [location])

  const current_time = new Date().toDateString()
  // const currentDate = new Date().toLocaleDateString('sk-SK')
  // let current_time = new Date().toLocaleDateString("en-ca", {
  //   year: "numeric",
  //   month: "numeric",
  //   day: "numeric",
  //   hour: "numeric",
  //   minute: "numeric",
  // });

  const [getTodo, setTodo] = useState("");

  var apiKey = "6de9bfb3c9bb1f5bb3f71b73e0e0dc0d";
  var city = "Bratislava";
  let clock = 0;
  //fetchSelectedData()
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
  const [filterTagList, setFilterTagList] = useState(new Set([]));

  const { data: rawFoods, isFetching: isFetchingFoods, isLoading: loadingRawFoods, error: errorFoods, isError: isErrorFoods, isPreviousData: isPreviousDataFoods } = useQuery({
    queryKey: ["/foods/", location],
    queryFn: () => {
      if (location?.search != null) {
        return searchFoodsPageFn(location.search)
        // if (page > 1) { return searchFoodsPageFn(location.search, page) }
        // if (page < 1) { return searchFoodsPageFn(location.search) }
      } else { return getFoodsPageFn(page) }
    }

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
    enabled: rawFoods?.results != null,
    queryFn: defaultQueryFn,
  })

  const { data: rawSteps, isFetching: isFetchingSteps, error: errorSteps, isLoading: loadingSteps, isError: isErrorSteps } = useQuery({
    queryKey: ["/steps/"],
    enabled: !!rawFoodTags,
    queryFn: defaultQueryFn,
  })


  const { data: rawIngredients, isFetching: isFetchingIngredients, error: errorIngredients, isLoading: loadingIngredients, isError: isErrorIngredients } = useQuery({
    queryKey: ["/ingredients/"],
    enabled: !!rawSteps,
    queryFn: defaultQueryFn,
  })

  let ingredientLengh = 0;

  const { data: rawIngredient, isFetching: isFetchingIngredient, error: errorIngredient, isLoading: loadingIngredient, isError: isErrorIngredient } = useQuery({
    queryKey: ["/ingredient/"],
    enabled: !!rawIngredients,
    queryFn: defaultQueryFn,
  })

  const { data: rawUnit, isFetching: isFetchingUnit, error: errorUnit, isLoading: loadingUnit, isError: isErrorUnit } = useQuery({
    queryKey: ["/unit/"],
    enabled: !!rawIngredient,
    queryFn: defaultQueryFn,
  })

  const { data: rawImagefood, isFetching: isFetchingImagefood, error: errorImagefood, isLoading: loadingImagefood, isError: isErrorImagefood, } = useQuery({
    queryKey: ["/imagefood/"],
    enabled: !!rawUnit,
    queryFn: defaultQueryFn,
  })


  let foodsComplete = rawFoods ?? [];

  let tagsBackEnd = rawFoodTags ?? [];
  let steps = rawSteps ?? [];
  let ingredients = rawIngredients ?? [];

  let ingredientRaw = rawIngredient ?? [];
  let imageFoodRaw = rawImagefood ?? [];
  let ingredient = [];


  let foodsRaw = foodsComplete.results
  let foodsTags_list = foodsComplete.tags_list

  let unit = rawUnit ?? [];

  let foodTagsContainer = []
  let foods = [];


  foodsRaw?.forEach((data) => {

    let foodTagsList = [];
    let foodTagsIDList = [];


    data.foodTags.forEach((datatags) => {
      //console.log("datatags", datatags)
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
          stepsList.push(e);
          stepsIDList.push(e.id);

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
    });
    foodTagsContainer.push(foodTagsList)
  }
  )

  const [modalNewFlag, setModalNewFlag] = useState(false);
  const [modalEditFlag, setModalEditFlag] = useState(false);

  const [foodItemEditRender, setFoodItemEditRender] = ("")

  let filterTagListArray = [...filterTagList];

  function handleSetPage(page) {
    setPage(page)
    const contentNext = foodsComplete.next;
    const contentPrevious = foodsComplete.previous;
    const ra = /(\?.+)/
    //  const re = /(\?|&)(page=)(\d+)(\?|&)(page_size=)(\d+)/
    //const rs = /(\?)(.+)(\?|&)(page=)(\d+)(\?|&)(page_size=)(\d+)/
    const rb = /(\?)(.*\w*)(&*)(page=)(\d+)(\&)(page_size=)(\d+)/

    let matchColplete;
    let match;
    if (contentNext != null) {
      if (matchColplete = ra.exec(contentNext)) {
        if (match = rb.exec(matchColplete[0])) {
          console.log("match", match)
          if (page > 1) {
            navigate(`/recepty/${matchColplete[0].replace(match[0], `${match[1]}${match[2]}${match[3]}${match[4]}${page}${match[6]}${match[7]}${pageSize}`)}`)
            // navigate(`/recepty/${matchColplete[0].replace(match[0], `${match[1]}${match[2]}${page}${match[4]}${match[5]}${pageSize}`)}`)
          }
          else {
            navigate(`/recepty/${matchColplete[0].replace(match[0], `${match[1]}${match[2]}${match[6]}${match[7]}${pageSize}`)}`)
          }
        }
      }
    } else {
      if (matchColplete = ra.exec(contentPrevious)) {
        if (match = rb.exec(matchColplete[0])) {
          if (page > 1) {
            navigate(`/recepty/${matchColplete[0].replace(match[0], `${match[1]}${match[2]}${match[3]}${match[4]}${page}${match[6]}${match[7]}${pageSize}`)}`)
          }
          else {
            navigate(`/recepty/${matchColplete[0].replace(match[0], `${match[1]}${match[2]}${match[6]}${match[7]}${pageSize}`)}`)
          }
        }
        else {
          navigate(`/recepty/${matchColplete[0]}`)
        }
      }
    }
  }

  function addToTagList(tag) {
    setPage(1)
    let filterTagListArray = [...filterTagList];
    let tagListLowerCase = filterTagListArray.map((str) => str.toLowerCase());
    let newTagListSet = new Set(tagListLowerCase);
    if (tag === "") {
      return;
    } else if (newTagListSet.has(tag.toLowerCase())) {
      return;
    }

    let newTagList = new Set(filterTagList);
    const re = /(\?search=)/
    const contentCurrent = foodsComplete.current;
    let match;
    if (contentCurrent != null) {
      match = re.exec(contentCurrent)
      if (match) {
        newTagList = [tag];
      } else {
        newTagList.add(tag);
      }
    }
    filterTagListArray = [...newTagList]
    let filter = (`?foodTags__foodTag=${filterTagListArray.join("&")}&page_size=${pageSize}`)
    navigate(`/recepty/${filter}`)
    setFilterTagList(newTagList);
  }

  function searchAddToTagList(tag) {
    let search = (`?search=${tag}`)
    navigate(`/recepty/${search}`)
    let newTagList = [tag];
    setFilterTagList(newTagList);

  }

  function removeFromTagList(tag) {
    let newTagList = new Set(filterTagList); // slice for sets
    newTagList.delete(tag); // push for set
    filterTagListArray = [...newTagList]
    if (filterTagListArray == "") {
      navigate(`/recepty/?page_size=${pageSize}`)
    }
    else {
      let filter = (`?foodTags__foodTag=${filterTagListArray.join("&")}`)
      navigate(`/recepty/${filter}`)
    }
    setFilterTagList(newTagList);
  }

  function setModalNewFlagTrue(flag) {
    setModalNewFlag(true);
  }

  function setModalEditFlagTrue(flag) {
    setModalEditFlag(true);
  }

  function handleAddToTagList(tag) {

    if (filterTagListArray && Array.isArray(filterTagListArray)) {
      if (filterTagListArray.includes(tag)) {
        //console.log("included", val);
        removeFromTagList(tag);
        //console.log("removeFromTagList_1", tag);
        //  uncheckTag(tag);
      } else {
        // console.log("not included", tag);
        //console.log("newTagListArray", filterTagListArray);
        addToTagList(tag);
      }
    }
  }
  function handleNavigateToNovyRecept() {
    navigate(`/recepty/novy_recept/`)
  }
  function handlePageSize(event) {
    setPageSize(event.target.value);
    setPage(1)

  }

  useEffect(() => {
    handleSetPage(page)
  }, [pageSize])

  const pagesArray = Array(foodsComplete.TotalNumOfPages).fill().map((_, index) => index + 1)
  const nav = (<>

  </>)

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
  if (isErrorFoods) return <h1>foods: {JSON.stringify(errorFoods.message)}</h1>
  if (isErrorImagefood) return <h1>Image: {JSON.stringify(errorImagefood.message)}</h1>
  if (isErrorFoodTags) return <h1>TAGS: {JSON.stringify(errorFoodTags.message)}</h1>
  if (isErrorSteps) return <h1>{JSON.stringify(errorSteps.message)}</h1>
  if (isErrorIngredients) return <h1>{JSON.stringify(errorIngredients.message)}</h1>
  if (isErrorIngredient) return <h1>{JSON.stringify(errorIngredient.message)}</h1>
  if (isErrorUnit) return <h1>{JSON.stringify(errorUnit.message)}</h1>

  // const pagesArray = Array(rawFoods.TotalNumOfPages).fill().map((_, index) => index + 1)

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
        {/* <div style={{ color: "orange" }}>{getTodo.name}</div> */}
        {/* <div>          Temp: {getKeyValuePairs(getTodo.main)} */}
        {/* {getKeyValuePairs(Math.ceil(getTodo.temp))}</div> */}
        <div>{getTargetData(getTodo)}</div>
        <div>{current_time}</div>


        <main className={style.Appmain}>
          <TagInput
            filterTagListState={[filterTagList, setFilterTagList]}
            searchAddToTagList={searchAddToTagList}
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
          foodTagsContainer={foodsTags_list}
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
            pageSize={[pageSize, setPageSize]}
            handleSetPage={handleSetPage}
            isPreviousDataFoods={isPreviousDataFoods}
            rawFoods={rawFoods}
          ></FoodItemList>
          <div className={style.paginationBox}>
            <nav className={style.navigationbar}>
              <button className={style.button} onClick={() => handleSetPage(page - 1)} disabled={isPreviousDataFoods || page === 1} id={isPreviousDataFoods || page === 1 ? style["buttondisabled"] : style["buttonenabled"]}>&lt;&lt;</button>
              {/* Removed isPreviousData from PageButton to keep button focus color instead */}
              {pagesArray.map(pg => <PageButton key={pg} pg={pg} page={page} handleSetPage={handleSetPage} />)}
              <button className={style.button} onClick={() => handleSetPage(page + 1)} disabled={isPreviousDataFoods || page === foodsComplete.TotalNumOfPages} id={isPreviousDataFoods || page === foodsComplete.TotalNumOfPages ? style["buttondisabled"] : style["buttonenabled"]}>&gt;&gt;</button>


            </nav>
            <div className={style.navdisplay}>({foodsComplete.FirstItemsOnPage} - {foodsComplete.LastItemsOnPage})  z  {foodsComplete.TotalItems}

              <select
                className={style.unit}
                onChange={handlePageSize}
                value={pageSize}
              >
                <option>2</option>
                <option>4</option>
                <option>6</option>
                <option>8</option>
                <option>10</option>

              </select>
            </div>
          </div>
          <div>
            <input type="button" value="Fetch data!" onClick={fetchSelectedData} />
            <h2 style={{ color: "orange" }}>Mesto{getTodo.name}</h2>
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

export default Foods;
