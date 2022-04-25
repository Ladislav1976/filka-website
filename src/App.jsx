import style from "./App.module.css";
import { useState } from "react";
import Modal from "./components/Modal";
import NewFood from "./components/NewFood";
import FoodItemList from "./components/FoodItemList";
import TagInput from "./components/TagInput";

function App() {
  const [data, setData] = useState([
    {
      id: 0,
      name: "Pepperoni Pizza",
      image: "https://i.imgur.com/YBZacyX.jpeg",
      ingredients: ["sunka", "vajce"],
      procedure: "",
      likes: 5,
      dislikes: 1,
      fave: true,
      tags: ["italian", "meat", "baked"],
      date: "1 Feb 2018",
    },
    {
      id: 1,
      name: "Meatball Spaghetti",
      image:
        "https://th.bing.com/th/id/R.b9461de6a6d92e22a0093e54f44aa766?rik=KyLC75MJQaLtHA&riu=http%3a%2f%2fwww.realfoodfinds.com%2fwp-content%2fuploads%2f2014%2f09%2fSpaghetti-Meatballs-10.jpg&ehk=XoDGoZkndS3itt6AQmeCu6oMkZK%2fEk0tnxrNjsJsjp4%3d&risl=&pid=ImgRaw&r=0",
      ingredients: ["sunka", "vajce"],
      procedure: "",
      likes: 5,
      dislikes: 1,
      fave: true,
      tags: ["Slovak", "meat", "baked"],
      date: "1 Feb 2018",
    },
  ]);

  const [filterTagList, setFilterTagList] = useState(new Set([]));
  const [modalNewFlag, setModalNewFlag] = useState(true);
  const [ingredientList, setIngredientList] = useState(new Set([]));

  function addToTagList(tag) {
    let tagListArray = [...filterTagList];
    let tagListLowerCase = tagListArray.map((str) => str.toLowerCase());
    let newTagListSet = new Set(tagListLowerCase);
    if (tag === "") {
      return;
    } else if (newTagListSet.has(tag.toLowerCase())) {
      return;
    }

    let newTagList = new Set(filterTagList); // slice for sets
    newTagList.add(tag); // push for set
    setFilterTagList(newTagList);
  }

  function addToIngredientList(ing) {
    let ingredientListArray = [...ingredientList];
    let ingredientListLowerCase = ingredientListArray.map((str) =>
      str.toLowerCase()
    );
    let newIngredientListSet = new Set(ingredientListLowerCase);
    if (ing === "") {
      return;
    } else if (newIngredientListSet.has(ing.toLowerCase())) {
      return;
    }

    let newIngredientList = new Set(ingredientList); // slice for sets
    newIngredientList.add(ing); // push for set
    setIngredientList(newIngredientList);
  }

  function removeFromTagList(tag) {
    let newTagList = new Set(filterTagList); // slice for sets
    newTagList.delete(tag); // push for set
    setFilterTagList(newTagList);
  }

  function removeFromIngredientList(ing) {
    let newIngredientList = new Set(ingredientList); // slice for sets
    newIngredientList.delete(ing); // push for set
    setIngredientList(newIngredientList);
  }

  function setModalNewFlagTrue(flag) {
    setModalNewFlag(true);
  }

  return (
    <>
      <div className={style.App}>
        <header className={style.Appheader}>Filka Family</header>
        <main className={style.Appmain}>
          <TagInput
            tagListState={[filterTagList, setFilterTagList]}
            addToTagList={addToTagList}
            removeFromTagList={removeFromTagList}
          />
        </main>
        <div className={style.main}>
          <div className={style.tags}>blabla</div>
          <div className={style.FoodItemList}>
            <FoodItemList data={data} tagFilter={filterTagList}></FoodItemList>
          </div>
        </div>
        <Modal visible={modalNewFlag} setModalFlag={setModalNewFlag}>
          <NewFood
            addToIngredientList={addToIngredientList}
            ingredientList={ingredientList}
            removeFromIngredientList={removeFromIngredientList}
          ></NewFood>
        </Modal>
      </div>
    </>
  );
}

export default App;
