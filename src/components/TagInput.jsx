import { useState } from "react";
import style from "./TagInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

//just a component
function Tag(props) {
  return (
    <div className={style.tag}>
      <FontAwesomeIcon
        icon={faTimesCircle}
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
  const [tagList, setTagList] = props.tagListState;

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

  for (const tag of tagList) {
    tagListRender.push(
      <Tag tag={tag} key={tag} onTagDelete={() => handleTagDelete(tag)} />
    );
  }

  return (
    <div className={style.searchBox}>
      <input
        type="text"
        className={style.tagInput}
        placeholder="enter tags"
        value={searchedTag}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
      />
      <div className={style.tagList}>{tagListRender}</div>
    </div>
  );
}
