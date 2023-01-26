import { useGet, useState, useEffect } from "react";
import StepsInput from "./StepsInput";
import style from "./NewFood.module.css";
import IngredientInput from "./IngredientInput";
import React, { Component } from "react";
import Image from "./Image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowUp } from "@fortawesome/free-solid-svg-icons";

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
      <div className={style.step}>{props.step}</div>
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
  // console.log("HOOK");
  const [rawFoodTags, refetchFoodTags, postFoodTag] = props.foodTags;
  let foodTagsBackEnd = rawFoodTags ?? [];

  const [rawSteps, refetchSteps, postStep] = props.steps;
  let stepsBackEnd = rawSteps ?? [];

  const [rawIngredients, refetchIngredients, postIngredients] =
    props.ingredients;
  let ingredientsBackEnd = rawIngredients ?? [];

  const [
    rawIngredient,
    refetchIngredient,
    postIngredient,
    loadingIngredient,
    error,
  ] = props.ingredient;

  let ingredientBackEnd = rawIngredient ?? [];

  let ingredientLengh = props.ingredientLengh;

  const [rawUnit, refetchUnit, postUnit] = props.unit;
  let unitBackEnd = rawUnit ?? [];

  // const [rawVolume, refetchVolume, postVolume] = props.volume;
  // let volumeBackEnd = rawVolume ?? [];

  const [foodItemEditRender, setFoodItemEditRender] =
    props.foodItemEditRenderState;
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
  console.log("stepsSetTTTTTTT",stepsSet)

  const [ingredientsSet, setIngredientsSet] = useState(
    new Set(foodItemEditRender.ingredients)
  );
  const [ingredientSetNotDiv, setIngredientSetNotDiv] = useState(
    new Set(foodItemEditRender.ingredientsNotDiv)
  );

  const [ingredientSetID, setIngredientSetID] = useState(
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
  let foodTagsListfoodTag = [];
  foodTagsBackEnd.forEach((e) => {
    foodTagsListfoodTag.push(e.foodTag);
  });

  let foodTagsListID = [];
  foodTagSet.forEach((tag) => {
    foodTagsBackEnd.map((e) => {
      if (e.foodTag === tag) {
        foodTagsListID.push(e.id);
      }
    });
  });

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
      removeFromFoodTagList(tag);
    } else {
      addToFoodTagList(tag);
    }
  }
  function stepsCheckPost(step) {
    let filter = stepsBackEnd.filter((element) => element.step == step);
    if (filter == "") {
      postStep({ step: step }).then(refetchSteps);
    }
    addToStepIDList(step);
  }

  function ingredientsCheckPost(times, unit, ing) {
    let filterUnit = unitBackEnd.filter((element) => element.unit == unit);
    if (filterUnit == "") {
      postUnit({ unit: unit });
    }

    let filterIngre = ingredientBackEnd.filter(
      (element) => element.ingredient == ing
    );
    if (filterIngre == "") {
      postIngredient({ ingredient: ing });
    }

    setTimeout(() => {
      let unitBack = refetchUnit();
      let ingredientBack = refetchIngredient();
      unitBack.then((unitB) => {
        ingredientBack.then((ingredientB) => {
          ingredientsPost(times, unit, ing, ingredientB, unitB);
        });
      });
    }, 10);
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
      steps.then((s) => {
        let filterStep = s.filter((element) => element.step == step);
        newStepsIDList.add(filterStep[0].id);
        setStepsSetID(newStepsIDList);
      });
    }, 100);
  }

  function addToIngredientsIDList(times, unitID, ingID) {
    let newIngredientsIDList = new Set(ingredientSetID);
    let filter = [];
    setTimeout(() => {
      let ingre = refetchIngredients();
      ingre.then((ingreback) => {
        filter = ingredientsBackEndFilter(times, unitID, ingID, ingreback);
        newIngredientsIDList.add(filter[0].id);
        setIngredientSetID(newIngredientsIDList);
      });
    }, 100);
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

  function ingredientsBackEndFilter(times, unitID, ingID, currentIngreBackEnd) {
    let filter = "";
    filter = currentIngreBackEnd.filter(
      (element) =>
        element.volume == times &&
        element.units == unitID &&
        element.ingredientName == ingID
    );
    return filter;
  }

  function ingredientsPost(times, unit, ing, ingredientB, unitB) {
    let unitID = handleUnitToID(unit, unitB);
    let ingID = handleIngredientToID(ing, ingredientB);

    //Filter to make sure ingredients does not exist then POST
    let filter = ingredientsBackEndFilter(
      times,
      unitID,
      ingID,
      ingredientsBackEnd
    );
    if (filter == "") {
      postIngredients({
        volume: times,
        units: [unitID],
        ingredientName: [ingID],
      });
    }
    addToIngredientsIDList(times, unitID, ingID);
  }

  function addToIngredientList(times, unit, ing) {
    let IDtimes = 0;
    let IDunit = 100;
    let IDingredient = 1000;
    let newIngredientList = new Set(ingredientsSet);
    if (ing === "") {
      return;
    }
    newIngredientList.add(
      <>
        <Times times={times} key={IDtimes} />
        <Unit unit={unit} key={IDunit} />
        {"   "}
        <Ingredient ing={ing} key={IDingredient} />
      </>
    );
    IDtimes++;
    IDunit++;
    IDingredient++;
    ingredientsCheckPost(times, unit, ing);
    setIngredientsSet(newIngredientList);
  }

  function removeFromIngredientList(ingID,ing) {
    // let ings = [];
    // let ings = ing.includes(ing);
    // let inputVal = document.getElementsByClassName("dd");
    console.log("delete ingID", ingID);
    console.log("delete  ing", ing);
    let newIngredientsSet = new Set(ingredientsSet); // slice for sets
    let newIngredientsIDSet = new Set(ingredientSetID); // slice for sets
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
    setIngredientSetID(newIngredientsIDSet);
    setIngredientsSet(newIngredientsSet);
  }

  function addToStepsList(step, stepPosition) {
    // let newStepsSet = new Set(stepsList);
    let newStepsList = [...stepsSet];
    let stepId = 0;
    console.log("stepPosition step:", step);
    console.log("stepPosition:", stepPosition);
    // let position = stepPosition - 1;
    // console.log("position:", position);
    if (stepsSet === "") {
      return;
    }
    if (step != "") {
      if (stepPosition === "") {
        let index = newStepsList.length;
        stepPosition = index + 1;
      } else {
      }
      // if (stepPosition == "") {
      //   newStepsSet.add(
      //     <>
      //       <Step step={step} key={stepId} />
      //     </>
      //   );
      //   setStepsList(newStepsSet);
      // }
      // if ((stepPosition) => 0) {
      newStepsList.splice(stepPosition, 0, <Step step={step} key={stepId} />);
      stepsCheckPost(step);

      setStepsSet(newStepsList);
      // }
      stepId++;
    }
  }

  function removeFromStepsList(step) {
    console.log("step",step)
    let newStepsSet = new Set(stepsSet);
    let newStepsIDSet = new Set(stepsSetID);
    console.log("newStepsSet before",newStepsSet)
    newStepsSet.delete(step);
    let filterStep = stepsBackEnd.filter((element) => element.step == step);
    console.log("newStepsSet after",newStepsSet)
    console.log("filterStep.id",filterStep)
    console.log("newStepsIDSet before",newStepsIDSet)
    newStepsIDSet.delete(filterStep[0].id);
    console.log("newStepsIDSet after",newStepsIDSet)
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
    let filter = foodTagsListfoodTag.filter(
      (element) => element.foodTag == foodTag
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
    let filterfoodTag = foodTagsBackEnd.filter(
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
    const foodItem={
      id: foodItemEditRender.id,
      name: name,
      ingredients: [...ingredientSetID],
      steps: [...stepsSetID],
      foodTags: [...foodTagSetID],
      date: date,
      // nameTags: [...nameTagSet],
    };
    const imageFoodItem= {image: [...imageURLsPost]}
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
    } else

      return {foodItem,imageFoodItem}
      
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
    let newImageUrlsPost = []
    let ID = 0;
    let newImageURL = []
    let newImagePreview = []
    let newImageUrls = (imageURLs)


    if (images.length < 1) return;
    images.forEach((image) =>
    newImageUrlsPost.push(
      {id:0, name:name,image:image,date:date,food:foodID}  ),
      setImageURLsPost(newImageUrlsPost));


      images.forEach((image) =>
      newImageUrls.push(
        {id:0, name:name,image:(URL.createObjectURL(image)),date:date,food:foodID}),
        setImageURLsList(newImageUrls)); 


      images.forEach((image) =>
      newImageURL.push(URL.createObjectURL(image)))
      newImageURL.forEach((image) =>
      {newImagePreview.push(<img
        className={style.foodimage}
        key={ID}
        src={image}
        alt="Image Preview"
      />)});  ID++;
      setImagePreview(newImagePreview)
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

  return (
    <div className={style.main}>
      <div className={style.header}>RECEPT</div>
      <div className={style.fooodbox} id="fooodbox">
        <div className={style.foodtypesbox}>
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
        </div>
        <div className={style.ingredientsImageBox}>
       
          <div className={style.images} id="imagePreview">{imagePreview}
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
              ingredientsIDList={ingredientSetID}
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
  );
}
