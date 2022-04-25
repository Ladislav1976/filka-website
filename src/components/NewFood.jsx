import { useState } from "react";
import TagInput from "./TagInput";
import style from "./NewFood.module.css";
import IngredientInput from "./IngredientInput";

//TODO: add rest of the inputs
//TODO: style
export default function NewFood(props) {
  const [imgLink, setImgLink] = useState("");
  const [name, setName] = useState("");
  const [tagSet, setTagSet] = useState(new Set());

  function handleImgChange(event) {
    setImgLink(event.target.value);
  }

  function handleNameChange(event) {
    setName(event.target.value);
  }

  function compareTags(tag1, tag2) {
    let tag1LowerCase = tag1.toLowerCase();
    let tag2LowerCase = tag2.toLowerCase();
    return tag1LowerCase == tag2LowerCase;
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

  function removeFromTagSet(tag) {
    let newTagList = new Set(tagSet); // slice for sets
    newTagList.delete(tag); // push for set
    setTagSet(newTagList);
  }

  function makeFoodRecord() {
    if (name === "" && imgLink === "" && tagSet === "") {
      alert("Name , Image, Tags can not be empty");
    } else if (imgLink === "" && tagSet === "") {
      alert("Image, Tags can not be empty");
    } else if (name === "" && tagSet === "") {
      alert("Name , Tags can not be empty");
    } else if (name === "") {
      alert("Name can not be empty");
    } else if (imgLink === "") {
      alert("Image can not be empty");
    } else if (tagSet === "") {
      alert("Tags can not be empty");
    } else
      return {
        id: props.foodItemEditRender.id,
        name: name,
        image: imgLink,
        tags: [...tagSet],
      };
  }

  const [file, setFile] = useState("");
  const onInputChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className={style.main}>
      <div className={style.header}>NOVY RECEPT</div>
      <div className={style.fooodbox}>
        <div className={style.foodtypes}>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://www.nin.sk/wp-content/uploads/2019/01/img_2802-900x1350.jpg"
              alt="POLIEVKY"
            />
            <div>
              <input
                type="checkbox"
                checked=""
                name="tag"
                id="tag"
                key="POLIEVKY"
              />
              <label className={style.label} htmlFor="tag">
                POLIEVKY
              </label>
            </div>
          </div>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://www.gyron.sk/storage/article_images/f_2011020010.png"
              alt="MASO A HYDINA"
            />
            <div>
              <input
                type="checkbox"
                checked=""
                name="tag"
                id="tag"
                key="MASO A HYDINA"
              />
              <label className={style.label} htmlFor="tag">
                MASO A HYDINA
              </label>
            </div>
          </div>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://www.svetbedniciek.sk/userfiles_sk//product-images/7328/86e2a6bd7db4b1e8dcad27c5dc8ce49d.262x262.fit.q95.jpg"
              alt="RYBY"
            />
            <div className="inputlabel">
              <input
                type="checkbox"
                checked=""
                name="tag"
                id="tag"
                key="RYBY"
              />
              <label className={style.label} htmlFor="tag">
                RYBY
              </label>
            </div>
          </div>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://img.mimibazar.sk/s/bs/9/220205/19/i60958.jpg"
              alt="BEZMASITE JEDLA"
            />
            <div>
              <input
                type="checkbox"
                checked=""
                name="tag"
                id="tag"
                key="BEZMASITE JEDLA"
              />
              <label className={style.label} htmlFor="tag">
                BEZMASITE JEDLA
              </label>
            </div>
          </div>

          <div className={style.food}>
            <img
              className={style.image}
              src="https://www.dennikrelax.sk/include/crop.php?h=480&w=720&f=../photos/amarant.jpg"
              alt="PRILOHY"
            />
            <div>
              <input
                type="checkbox"
                checked=""
                name="tag"
                id="tag"
                key="PRILOHY"
              />
              <label className={style.label} htmlFor="tag">
                PRILOHY
              </label>
            </div>
          </div>

          <div className={style.food}>
            <img
              className={style.image}
              src="https://i.pinimg.com/736x/a3/29/4f/a3294fc39a067c63b012fdf7a4b28817.jpg"
              alt="KOLACE A DEZERTY"
            />
            <div>
              <input
                type="checkbox"
                checked=""
                name="tag"
                id="tag"
                key="KOLACE A DEZERTY"
              />
              <label className={style.label} htmlFor="tag">
                KOLACE A DEZERTY
              </label>
            </div>
          </div>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://www.domacakuchyna.sk/images/Recepty/Bezmasite/Spagety-spenatovo_syrove/cropped-spagety-spenatovo_syrove00.jpg"
              alt="CESTOVINY"
            />
            <div>
              <input
                type="checkbox"
                checked=""
                name="tag"
                id="tag"
                key="CESTOVINY"
              />
              <label className={style.label} htmlFor="tag">
                CESTOVINY
              </label>
            </div>
          </div>
          <div className={style.food}>
            <img
              className={style.image}
              src="https://img.aktuality.sk/foto/MHg1MTk6NDg1MHgzMjM1LzkyMHg3NjAvc21hcnQvaW1n/mS3qqABtQ1vf_Yi8XVL5Cw.jpg?st=7ygkC0k_nRu6IarjLFo0TL4_jSQ6j_LWctMX2-SUBoQ&ts=1600752583&e=0"
              alt="NATIERKY"
            />

            <div>
              <input
                type="checkbox"
                checked=""
                name="tag"
                id="tag"
                key="NATIERKY"
              />
              <label className={style.label} htmlFor="tag">
                NATIERKY
              </label>
            </div>
          </div>
        </div>
        <div className={style.ingredientsImageBox}>
          <img
            className={style.foodimage}
            src="https://www.nin.sk/wp-content/uploads/2019/01/img_2802-900x1350.jpg"
            alt="foodimage"
          />
          <input
            className={style.foodinput}
            type="file"
            id="image_input"
            accept="image/png, image/jpg, image/jpeg"
            onChange={onInputChange}
          />
          <div>
            <div>Suroviny:</div>
            <IngredientInput
              addToIngredientList={props.addToIngredientList}
              ingredientList={props.ingredientList}
              removeFromIngredientList={props.removeFromIngredientList}
            ></IngredientInput>
          </div>
        </div>
        <div className={style.procedureBox}>
          <div>Nazov:</div>
          <input className={style.foodname} type="text" />
          <div>Postup:</div>
          <textarea className={style.procedure} rows="20" />
        </div>
      </div>
      <input
        type="button"
        value="Save"
        onClick={() => props.onFoodSave(makeFoodRecord())}
      />
    </div>
  );
}
