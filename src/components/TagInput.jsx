import { useState } from "react";
import style from "./TagInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

//just a component
function Tag(props) {
  return (
    <div className={style.tag} onClick={props.onTagDelete}>
      <FontAwesomeIcon
        icon={faXmark}
        onClick={props.onTagDelete}
      ></FontAwesomeIcon>{" "}
      {props.tag}
    </div>
  );
}

//also a component
// TODO: style everytnig
export default function TagInput(props) {
  const [searchedTag, setSearchedTag] = useState("");
  const [filterTagList, setFilterTagList] = props.filterTagListState;

  function addSearchTagToTagList() {
    props.addToTagList(searchedTag);
    setSearchedTag("");
  }

  function handleChange(event) {
    setSearchedTag(event.target.value);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addSearchTagToTagList();
    }
  }

  function handleTagDelete(tag) {
    console.log("tag delete", tag);
    props.removeFromTagList(tag);
  }

  const tagListRender = [];

  for (const tag of filterTagList) {
    tagListRender.push(
      <Tag
        className={style.tagname}
        tag={tag}
        key={tag}
        onTagDelete={() => handleTagDelete(tag)}
      />
    );
  }

  return (
    <>
      <div className={style.searchMain}>
        <div className={style.searchBox}>
          <input
            type="text"
            className={style.searchInput}
            placeholder="Napiste nazov jedla"
            value={searchedTag}
            onChange={handleChange}
            onKeyPress={handleKeyPress}
          />
          <div className={style.searchButton} onClick={addSearchTagToTagList}>
            <FontAwesomeIcon icon={faSearch}></FontAwesomeIcon>
          </div>
        </div>

        <div className={style.searchList}>{tagListRender}</div>
      </div>
    </>
  );
}
