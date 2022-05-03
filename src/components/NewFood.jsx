import { useState, useEffect } from "react";
import StepsInput from "./StepsInput";
import style from "./NewFood.module.css";
import IngredientInput from "./IngredientInput";

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

function StepID(props) {
  return (
    <>
      <div className={style.stepid}>{props.id}</div>
    </>
  );
}
export default function NewFood(props) {
  const [name, setName] = useState(null);
  const [nameTagSet, setNameTagSet] = useState(new Set());
  const [ingredientSet, setIngredientSet] = useState(new Set());
  const [stepsSet, setStepsSet] = useState(new Set());
  const [tagSet, setTagSet] = useState(new Set());
  const [foodTagSet, setFoodTagSet] = useState(new Set());
  const [images, setImages] = useState([]);
  const [imageURLs, setImageURLs] = useState([]);
  let foodTagSetArray = [...foodTagSet];
  let ingredientSetArray = [...ingredientSet];

  function handleFoodSave() {
    // handleAddToNameTagList();
    props.onFoodSave(makeFoodRecord());
  }

  function handleAddToNameTagList() {
    let nameSplit = name.split(" ");
    console.log("nameSplit:", nameSplit);
    addToNameTagList(nameSplit);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function addToTagList(tag) {
    let tagListArray = [...tagSet];
    let tagListLowerCase = tagListArray.map((str) => str.toLowerCase());
    let newTagListSet = new Set(tagListLowerCase);
    if (tag === "") {
      return;
    } else if (newTagListSet.has(tag.toLowerCase())) {
      return;
    }

    let newTagList = new Set(tagSet); // slice for sets
    newTagList.add(tag); // push for set
    setTagSet(newTagList);
  }

  function handleAddToFoodTagList(tag) {
    if (foodTagSetArray.includes(tag)) {
      removeFromFoodTagList(tag);
    } else {
      addToFoodTagList(tag);
    }
  }
  function addToIngredientList(times, unit, ing) {
    let newIngredientList = new Set(ingredientSet);
    let timesId = 0;
    let unitId = 1000;
    let ingId = 10000;
    if (ing === "") {
      return;
    }
    newIngredientList.add(
      <>
        <Times times={times} key={timesId} />
        <Unit unit={unit} key={unitId} />
        {"   "}
        <Ingredient ing={ing} key={ingId} />
      </>
    );
    timesId++;
    unitId++;
    ingId++;
    setIngredientSet(newIngredientList);
  }

  function removeFromIngredientList(ing) {
    let newIngredientList = new Set(ingredientSet); // slice for sets
    newIngredientList.delete(ing); // push for set
    setIngredientSet(newIngredientList);
  }

  function addToStepsList(id, step) {

    for (const step of stepsSet) {
        if (!step.id.includes(id))
        {let newStepsList = new Set(stepsSet);
    let stepId = 0;
    let Id = 1000;
    if (stepsSet === "") {
      return;
    }
    newStepsList.add(
      <>
        <StepID id={id} key={Id} />
        <Step step={step} key={stepId} />
      </>
    );
    stepId++;
    Id++;
    setStepsSet(newStepsList);
    }}}

  function removeFromStepsList(stepsSet, stepId) {
    let newStepsList = new Set(stepsSet); // slice for sets
    newStepsList.delete(stepsSet, stepId); // push for set
    setStepsSet(newStepsList);
  }

  function addToFoodTagList(tag) {
    let newFoodTagSet = new Set(foodTagSet);
    newFoodTagSet.add(tag);
    setFoodTagSet(newFoodTagSet);
  }

  function removeFromFoodTagList(tag) {
    let newFoodTagSet = new Set(foodTagSet);
    newFoodTagSet.delete(tag);
    setFoodTagSet(newFoodTagSet);
  }

  function addToNameTagList(tag) {
    let newNameTagSet = new Set(nameTagSet);
    newNameTagSet.add(tag);
    setNameTagSet(newNameTagSet);
  }

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
    } else
      return {
        name: name,
        image: imageURLs,
        ingredients: [...ingredientSet],
        foodTags: [...foodTagSet],
        nameTags: [...nameTagSet],
        steps: [...stepsSet],
      };
  }

  // const [file, setFile] = useState("");
  // const onInputChange = (e) => {
  //   setFile(e.target.files[0]);
  // };

  useEffect(() => {
    if (images.length < 1) return;
    const newImageUrls = [];
    images.forEach((image) => newImageUrls.push(URL.createObjectURL(image)));
    setImageURLs(newImageUrls);
  }, [images]);

  function onImageChange(e) {
    setImages([...e.target.files]);
  }
  // function removeFromTagSet(tag) {
  //   let newTagList = new Set(tagSet); // slice for sets
  //   newTagList.delete(tag); // push for set
  //   setTagSet(newTagList);

  return (
    <div className={style.main}>
      <div className={style.header}>NOVY RECEPT</div>
      <div className={style.fooodbox}>
        <div className={style.foodtypesbox}>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://www.nin.sk/wp-content/uploads/2019/01/img_2802-900x1350.jpg"
              alt="POLIEVKY"
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
                htmlFor="tag"
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
          {imageURLs.map((imageSrc) => (
            <img className={style.foodimage} src={imageSrc} />
          ))}
          <input
            className={style.imageinput}
            type="file"
            multiple
            accept="image/*"
            onChange={onImageChange}
          />
          <div>
            <div>Suroviny:</div>
            <IngredientInput
              addToIngredientList={addToIngredientList}
              ingredientList={ingredientSet}
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
            type="text"
            onChange={handleNameChange}
            onClick={handleAddToNameTagList}
          />
          <div>
            <p>Postup:</p>
          </div>
          <StepsInput
            addToStepsList={addToStepsList}
            stepsList={stepsSet}
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
