import style from "./App.module.css";
import { useState } from "react";
import Modal from "./components/Modal";
import NewFood from "./components/NewFood";
import EditFood from "./components/EditFood";
import FoodItemList from "./components/FoodItemList";
import TagInput from "./components/TagInput";

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
function App() {
  const [data, setData] = useState([
    {
      id: 0,
      name: "Pepperoni Pizza",
      image: "https://i.imgur.com/YBZacyX.jpeg",
      ingredients: ["sunka", "vajce"],
      foodTags: ["sunka", "vajce", "RYBA", "MASO A HYDINA"],
      steps: "",
      date: "1 Feb 2018",
    },
    {
      id: 1,
      name: "Meatball Spaghetti",
      image:
        "https://th.bing.com/th/id/R.b9461de6a6d92e22a0093e54f44aa766?rik=KyLC75MJQaLtHA&riu=http%3a%2f%2fwww.realfoodfinds.com%2fwp-content%2fuploads%2f2014%2f09%2fSpaghetti-Meatballs-10.jpg&ehk=XoDGoZkndS3itt6AQmeCu6oMkZK%2fEk0tnxrNjsJsjp4%3d&risl=&pid=ImgRaw&r=0",
      ingredients: ["sunka", "vajce"],
      foodTags: ["sunka", "vajce", "POLIEVKy"],
      steps: "",
      date: "1 Feb 2018",
    },
  ]);
  const [maxFoodId, setMaxFoodId] = useState(2);
  const [filterTagList, setFilterTagList] = useState(new Set([]));
  const [modalNewFlag, setModalNewFlag] = useState(false);
  const [modalEditFlag, setModalEditFlag] = useState(false);
  const [ingredientSet, setIngredientSet] = useState(new Set([]));
  const [stepsSet, setStepsSet] = useState(new Set([]));
  const [nameTagSet, setNameTagSet] = useState(new Set());
  const [foodTagSet, setFoodTagSet] = useState(new Set());
  const [foodItemEditRender, setFoodItemEditRender] = useState(null);
  let filterTagListArray = [...filterTagList];

  function handleNewFoodSave(foodItem) {
    let current_time = new Date().toLocaleDateString("en-uk", {
      day: "numeric",
      year: "numeric",
      month: "short",
    });
    let newData = data.slice();
    let newFoodId = maxFoodId + 1;
    setMaxFoodId(newFoodId);
    foodItem.id = newFoodId;
    // foodItem.likes = 0;
    // foodItem.dislikes = 0;
    // foodItem.fave = false;
    foodItem.date = current_time;

    newData.push(foodItem);
    console.log("newData:", newData);
    setData(newData);
    setModalNewFlag(false);
  }

  function addToTagList(tag) {
    let filterTagListArray = [...filterTagList];
    let tagListLowerCase = filterTagListArray.map((str) => str.toLowerCase());
    let newTagListSet = new Set(tagListLowerCase);

    console.log("tag.newTagListSet:", newTagListSet);
    if (tag === "") {
      return;
    } else if (newTagListSet.has(tag.toLowerCase())) {
      return;
    }

    let newTagList = new Set(filterTagList);
    newTagList.add(tag);
    setFilterTagList(newTagList);
  }

  function addToFoodTagList(tag) {
    let newFoodTagSet = new Set(foodTagSet);
    newFoodTagSet.add(tag);
    setFoodTagSet(newFoodTagSet);
  }

  function addToNameTagList(tag) {
    let newNameTagSet = new Set(nameTagSet);
    newNameTagSet.add(tag);
    setNameTagSet(newNameTagSet);
  }

  function removeFromFoodTagList(tag) {
    let newFoodTagSet = new Set(foodTagSet);
    newFoodTagSet.delete(tag);
    setFoodTagSet(newFoodTagSet);
  }

  function addToIngredientList(times, unit, ing) {
    let newIngredientList = new Set(ingredientSet);
    if (ing === "") {
      return;
    }
    newIngredientList.add(
      <>
        <Times times={times} key={times} />
        <Unit unit={unit} key={unit} />
        {"   "}
        <Ingredient ing={ing} key={ing} />
      </>
    );
    setIngredientSet(newIngredientList);
  }
  function addToStepsList(step) {
    let newStepsList = new Set(stepsSet);
    if (step === "") {
      return;
    }
    newStepsList.add(step);
    setStepsSet(newStepsList);
  }

  function removeFromTagList(tag) {
    let newTagList = new Set(filterTagList); // slice for sets
    newTagList.delete(tag); // push for set
    setFilterTagList(newTagList);
  }

  function removeFromIngredientList(ing) {
    let newIngredientList = new Set(ingredientSet); // slice for sets
    newIngredientList.delete(ing); // push for set
    setIngredientSet(newIngredientList);
  }

  function removeFromStepsList(step) {
    let newStepsList = new Set(stepsSet); // slice for sets
    newStepsList.delete(step); // push for set
    setStepsSet(newStepsList);
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
      <div className={style.App}>
        <header className={style.Appheader}>Filka Family</header>
        <div className={style.droplist}>
          <div className={style.newFoodButton} onClick={setModalNewFlagTrue}>
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
              data={data}
              filterTagList={filterTagList}
              setModalEditFlagTrue={setModalEditFlagTrue}
              foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]}
            ></FoodItemList>
          </div>
        </div>
        <Modal visible={modalNewFlag} setModalFlag={setModalNewFlag}>
          <NewFood
            addToIngredientList={addToIngredientList}
            ingredientSet={ingredientSet}
            removeFromIngredientList={removeFromIngredientList}
            addToStepsList={addToStepsList}
            stepsSet={stepsSet}
            removeFromStepsList={removeFromStepsList}
            foodTagSetState={[foodTagSet, setFoodTagSet]}
            addToFoodTagList={addToFoodTagList}
            removeFromFoodTagList={removeFromFoodTagList}
            nameTagSet={nameTagSet}
            addToNameTagList={addToNameTagList}
            onFoodSave={handleNewFoodSave}
          ></NewFood>
        </Modal>
        <Modal visible={modalEditFlag} setModalFlag={setModalEditFlag}>
          <EditFood
            addToIngredientList={addToIngredientList}
            ingredientSet={ingredientSet}
            removeFromIngredientList={removeFromIngredientList}
            addToStepsList={addToStepsList}
            stepsSet={stepsSet}
            removeFromStepsList={removeFromStepsList}
            foodTagSetState={[foodTagSet, setFoodTagSet]}
            addToFoodTagList={addToFoodTagList}
            removeFromFoodTagList={removeFromFoodTagList}
            nameTagSet={nameTagSet}
            addToNameTagList={addToNameTagList}
            onFoodSave={handleNewFoodSave}
            foodItemEditRenderState={[foodItemEditRender, setFoodItemEditRender]}
          ></EditFood>
        </Modal>
      </div>
    </>
  );
}

export default App;
