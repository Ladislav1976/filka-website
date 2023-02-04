import style from "./Foods.module.css";
import { useState, useEffect } from "react";
import Modal from "./Modal";
import NewFood from "./NewFood";
import EditFood from "./EditFood";
import FoodItemList from "./FoodItemList";
import TagInput from "./TagInput";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useGet, useMutate } from "restful-react";
import { render } from "@testing-library/react";
import axios from "axios";

// function Step(props) {
//   let step = props.stePPp;
//   console.log("STEP", step);
//   return (
//     <>
//       <div className={style.timesIngredient}>{step}</div>
//       {/* <textarea
//         className={style.step}
//         rows="5"
//         value={step}
//         // onChange={handleUpdateStep} */}
//       {/* /> */}
//       {/* <div
//         className={style.ingredientButton}
//         // onClick={() => props.addStepToTagList(step, stepID)}
//       >
//         Pridať
//       </div> */}
//       {/* <textarea className={style.ingIngredient}>{props.step}/> */}
//     </>
//   );
// }
function Prepol(props) {
  console.log("AAAAA");
  return (
    <>
      <div className={style.unitIngredient}>{props.step}</div>
    </>
  );
}
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

function Foods() {
  const base = "https://jsonplaceholder.typicode.com";
  const { data: rawFoods, refetch: refetchFood } = useGet({
    path: "/foods/",
  });

  const { data: rawFoodTags, refetch: refetchFoodTags } = useGet({
    path: "/foodTags/",
  });
  const { data: rawSteps, refetch: refetchSteps } = useGet({
    path: "/steps/",
  });

  const { data: rawIngredients, refetch: refetchIngredients } = useGet({
    path: "/ingredients/",
  });
  let ingredientLengh = 0;
  const {
    data: rawIngredient,
    refetch: refetchIngredient,
    loading: loadingIngredient,
    error,
  } = useGet({
    path: "/ingredient/",
  });

  const { data: rawUnit, refetch: refetchUnit } = useGet({
    path: "/unit/",
  });

  const { data: rawImagefood, refetch: refetchImagefood } = useGet({
    path: "/imagefood/",
  });
  // const { data: rawVolume, refetch: refetchVolume } = useGet({
  //   path: "/volume/",
  // });

  const { mutate: postFood } = useMutate({
    verb: "POST",
    path: "/foods/",
  });

  const { mutate: put } = useMutate({
    verb: "PUT",
    path: (id) => `/foods/${id}/`,
  });

  const { mutate: postFoodTag } = useMutate({
    verb: "POST",
    path: "/foodTags/",
  });
  const { mutate: postImageFood } = useMutate({
    verb: "POST",
    path: "/imagefood/",
  });

  const { mutate: postStep } = useMutate({
    verb: "POST",
    path: "/steps/",
  });

  const { mutate: putStep } = useMutate({
    verb: "PUT",
    path: (id) => `/steps/${id}/`,
  });

  const { mutate: postVolume } = useMutate({
    verb: "POST",
    path: "/volume/",
  });

  const { mutate: postUnit } = useMutate({
    verb: "POST",
    path: "/unit/",
  });

  const { mutate: postIngredient } = useMutate({
    verb: "POST",
    path: "/ingredient/",
  });

  const { mutate: postIngredients } = useMutate({
    verb: "POST",
    path: "/ingredients/",
  });

  let foodsRaw = rawFoods ?? [];
  let tagsBackEnd = rawFoodTags ?? [];
  let steps = rawSteps ?? [];
  let ingredients = rawIngredients ?? [];
  let ingredientRaw = rawIngredient ?? [];
  let imageFoodRaw = rawImagefood ?? [];
  let ingredient = [];

  let unit = rawUnit ?? [];
  // let volume = rawVolume ?? [];

  let foods = [];
  foodsRaw.forEach((data) => {
    // foodTags
    let foodTagsList = [];
    let foodTagsIDList = [];
    data.foodTags.forEach((datatags) => {
      tagsBackEnd.map((e) => {
        if (e.id === datatags) {
          foodTagsList.push(e.foodTag);
          foodTagsIDList.push(e.id);
        }
      });
    });

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
          stepsList.push(e.step);
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
    data.ingredients.forEach((datatags) => {
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
    });
  });

  const [maxFoodId, setMaxFoodId] = useState(2);
  const [filterTagList, setFilterTagList] = useState(new Set([]));
  const [modalNewFlag, setModalNewFlag] = useState(false);
  const [modalEditFlag, setModalEditFlag] = useState(false);
  const navigate = useNavigate();
  // const [ingredientSet, setIngredientSet] = useState(new Set([]));
  // const [stepsSet, setStepsSet] = useState(new Set([]));
  // const [nameTagSet, setNameTagSet] = useState(new Set());
  // const [foodTagSet, setFoodTagSet] = useState(new Set());
  const [foodItemEditRender, setFoodItemEditRender] = useState("");

  let filterTagListArray = [...filterTagList];

  function handleEditttFoodSave(foodItem) {
    let current_time = new Date().toLocaleDateString("en-uk", {
      day: "numeric",
      year: "numeric",
      month: "short",
    });
    // let newData = data.slice();
    // let newFoodId = maxFoodId + 1;
    // setMaxFoodId(newFoodId);
    // foodItem.id = newFoodId;
    // foodItem.likes = 0;
    // foodItem.dislikes = 0;
    // foodItem.fave = false;
    // foodItem.date = current_time;
    console.log("foodItem:", foodItem);
    fetch("http://localhost:8000/foods/", {
      method: "POST",
      body: foodItem,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => console.log(res))
      .catch((error) => console.log(error))
      .then(refetchFood);

    // post(foodItem).then(refetch);
    // newData.push(foodItem);
    // setData(newData);
    setModalNewFlag(false);
  }

  function handleNewFoodSave(foodItem) {
    let newData = foodsRaw.filter((d) => d.id != foodItem.id);
    newData.push(foodItem);
    newData.sort((a, b) => a.id - b.id);
    postFood(foodItem).then(refetchFood);
    // setData(newData);
    setModalEditFlag(false);
  }

  function handleEditFoodSave(foodItem) {
    console.log("foodItem", foodItem);
    console.log("imageFoodItem", foodItem.imageFoodItem);
    put(
      foodItem.foodItem,
      { pathParams: foodItem.foodItem.id }
      // {
      //   headers: {
      //     "content-type": "multipart/form-data",
      //   },
    ).then(refetchFood);
    imgageFoodCheckPost(foodItem.imageFoodItem);
    setModalEditFlag(false);
  }

  function imgageFoodCheckPost(image) {
    console.log("imageFoodRaw", imageFoodRaw);
    image.image.forEach((e) => {
      let a = [];
      a = imageFoodRaw.filter((element) => element.id == e.id);
      if (a == "") {
        let formdata = new FormData();
        formdata.append("name", e.name);
        formdata.append("image", e.image);
        formdata.append("date", e.date);
        formdata.append("food", e.food);
        console.log("Posting formdata", formdata);
        // fetch("http://127.0.0.1:8000/imagefood/", {
        //   method: "POST",
        //   body: formdata,
        //   headers: {'X-CSRFToken': 'csrftoken'},
        // })
        postImageFood(formdata).then(refetchImagefood);
      }
    });
  }

  function addToTagList(tag) {
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

  return (
    <>
      <header className={style.Appheader}>RECEPTY</header>
      <div className={style.droplist}>
        <div className={style.newFoodButton} onClick={setModalNewFlagTrue}>
          {/* <div
          className={style.newFoodButton}
          onClick={() => {
            navigate("/newfood");
          }}
        > */}
          NOVY RECEPT
        </div>
        <main className={style.Appmain}>
          <TagInput
            filterTagListState={[filterTagList, setFilterTagList]}
            addToTagList={addToTagList}
            removeFromTagList={removeFromTagList}
          />
        </main>
      </div>
      <div className={style.main}>
        <div className={style.foodtypesbox}>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://www.nin.sk/wp-content/uploads/2019/01/img_2802-900x1350.jpg"
              alt="POLIEVKY"
              // onClick={() => handleAddToFoodTagList("POLIEVKY")}
              //checked={foodTagSetArray.includes("POLIEVKY")}
            />
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("polievky")}
                className={style.checkboxInput}
                name="POLIEVKY"
                id="POLIEVKY"
                key="POLIEVKY"
                onChange={() => handleAddToTagList("POLIEVKY")}
                // onChange={() => handleAddToFoodTagList("POLIEVKY")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("POLIEVKY")}
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
              // onClick={() => handleAddToFoodTagList("MASO A HYDINA")}
            />
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("maso a hydina")}
                name="MASO A HYDINA"
                className={style.checkboxInput}
                id="MASO A HYDINA"
                key="MASO A HYDINA"
                onChange={() => handleAddToTagList("MASO A HYDINA")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("MASO A HYDINA")}
              >
                MASO A HYDINA
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("hovadzie")}
                name="HOVADZIE"
                className={style.checkboxInput}
                id="HOVADZIE"
                key="HOVADZIE"
                onChange={() => handleAddToTagList("HOVADZIE")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("HOVADZIE")}
              >
                HOVADZIE
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("bravcove")}
                name="BRAVCOVE"
                className={style.checkboxInput}
                id="BRAVCOVE"
                key="BRAVCOVE"
                onChange={() => handleAddToTagList("BRAVCOVE")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("BRAVCOVE")}
              >
                BRAVCOVE
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("kuracie")}
                name="KURACIE"
                className={style.checkboxInput}
                id="KURACIE"
                key="KURACIE"
                onChange={() => handleAddToTagList("KURACIE")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("KURACIE")}
              >
                KURACIE
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("kacacie")}
                name="KACACIE"
                className={style.checkboxInput}
                id="KACACIE"
                key="KACACIE"
                onChange={() => handleAddToTagList("KACACIE")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("KACACIE")}
              >
                KACACIE
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("kralik")}
                name="KRALIK"
                className={style.checkboxInput}
                id="KRALIK"
                key="KRALIK"
                onChange={() => handleAddToTagList("KRALIK")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("KRALIK")}
              >
                KRALIK
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("jahna")}
                name="JAHNA"
                className={style.checkboxInput}
                id="JAHNA"
                key="JAHNA"
                onChange={() => handleAddToTagList("JAHNA")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("JAHNA")}
              >
                JAHNA
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("ryba")}
                name="RYBA"
                className={style.checkboxInput}
                id="RYBA"
                key="RYBA"
                onChange={() => handleAddToTagList("RYBA")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("RYBA")}
              >
                RYBA
              </label>
            </div>
          </div>
          <div className={style.foodMaso}>
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("ine")}
                name="INE"
                className={style.checkboxInput}
                id="INE"
                key="INE"
                onChange={() => handleAddToTagList("INE")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("INE")}
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
              //onClick={() => handleAddToFoodTagList("BEZMASITE JEDLA")}
            />
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("bezmasite jedla")}
                name="BEZMASITE JEDLA"
                className={style.checkboxInput}
                id="BEZMASITE JEDLA"
                key="BEZMASITE JEDLA"
                onChange={() => handleAddToTagList("BEZMASITE JEDLA")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("BEZMASITE JEDLA")}
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
              //onClick={() => handleAddToFoodTagList("PRILOHY")}
            />
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("prilohy")}
                name="PRILOHY"
                className={style.checkboxInput}
                id="PRILOHY"
                key="PRILOHY"
                onChange={() => handleAddToTagList("PRILOHY")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("PRILOHY")}
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
              //onClick={() => handleAddToFoodTagList("KOLACE A DEZERTY")}
            />
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("kolace a dezerty")}
                name="KOLACE A DEZERTY"
                className={style.checkboxInput}
                id="KOLACE A DEZERTY"
                key="KOLACE A DEZERTY"
                onChange={() => handleAddToTagList("KOLACE A DEZERTY")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("KOLACE A DEZERTY")}
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
              //onClick={() => handleAddToFoodTagList("CESTOVINY")}
            />
            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("cestoviny")}
                name="CESTOVINY"
                className={style.checkboxInput}
                id="CESTOVINY"
                key="CESTOVINY"
                onChange={() => handleAddToTagList("CESTOVINY")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("CESTOVINY")}
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
              //onClick={() => handleAddToFoodTagList("NATIERKY")}
            />

            <div>
              <input
                type="checkbox"
                checked={filterTagListArray
                  .map((str) => str.toLowerCase())
                  .includes("natierky")}
                name="NATIERKY"
                className={style.checkboxInput}
                id="NATIERKY"
                key="NATIERKY"
                onChange={() => handleAddToTagList("NATIERKY")}
              />
              <label
                className={style.label}
                htmlFor="tag"
                onClick={() => handleAddToTagList("NATIERKY")}
              >
                NATIERKY
              </label>
            </div>
          </div>
        </div>
        <div className={style.FoodItemList}>
          <FoodItemList
            food={foods}
            filterTagList={filterTagList}
            setModalEditFlagTrue={setModalEditFlagTrue}
            foodItemEditRenderState={[
              foodItemEditRender,
              setFoodItemEditRender,
            ]}
          ></FoodItemList>
        </div>
      </div>
      <Modal visible={modalNewFlag} setModalFlag={setModalNewFlag}>
        <NewFood
          // addToIngredientList={addToIngredientList}
          // ingredientSet={ingredientSet}
          // removeFromIngredientList={removeFromIngredientList}
          // addToStepsList={addToStepsList}
          // stepsSet={stepsSet}
          // removeFromStepsList={removeFromStepsList}
          // foodTagSetState={[foodTagSet, setFoodTagSet]}
          // addToFoodTagList={addToFoodTagList}
          // removeFromFoodTagList={removeFromFoodTagList}
          // nameTagSet={nameTagSet}
          // addToNameTagList={addToNameTagList}
          onFoodSave={handleNewFoodSave}
        ></NewFood>
      </Modal>
      <Modal visible={modalEditFlag} setModalFlag={setModalEditFlag}>
        <EditFood
          // addToIngredientList={addToIngredientList}
          // ingredientSet={ingredientSet}
          // removeFromIngredientList={removeFromIngredientList}
          // addToStepsList={addToStepsList}
          // stepsSet={stepsSet}
          // removeFromStepsList={removeFromStepsList}
          // foodTagSetState={[foodTagSet, setFoodTagSet]}
          // addToFoodTagList={addToFoodTagList}
          // removeFromFoodTagList={removeFromFoodTagList}
          // nameTagSet={nameTagSet}
          // addToNameTagList={addToNameTagList}
          onFoodSave={handleEditFoodSave}
          foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]}
          foodTags={[rawFoodTags, refetchFoodTags, postFoodTag]}
          steps={[rawSteps, refetchSteps, postStep, putStep]}
          // ingredientHandler={ingredientHandler}
          ingredients={[rawIngredients, refetchIngredients, postIngredients]}
          ingredient={[
            ingredientRaw,
            refetchIngredient,
            postIngredient,
            loadingIngredient,
            error,
          ]}
          ingredientLengh={ingredientLengh}
          unit={[rawUnit, refetchUnit, postUnit]}
          // volume={[rawVolume, refetchVolume, postVolume]}
        ></EditFood>
      </Modal>
    </>
  );
}

export default Foods;
