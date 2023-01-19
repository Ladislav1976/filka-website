import { useState } from "react";
import style from "./StepsInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Step(props) {
  return (
    <>
      <div className={style.stepID}>{props.stepID}</div>{" "}
      <div className={style.step}>
        <FontAwesomeIcon
          className={style.stepIcon}
          icon={faTrash}
          onClick={props.onTagDelete}
        ></FontAwesomeIcon>{" "}
        <div className={style.stepText}>{props.step}</div>
      </div>
    </>
  );
}

export default function StepsInput(props) {
  const [addedStep, setAddedStep] = useState("");
  const [stepIdSet, setStepIdSet] = useState("");
  const [stepIdCounter, setStepIdCounter] = useState(1);
  const add = 1;
  const stepsList = props.stepListState;
  let stepsListArray = [...stepsList];

  function handleChangeStep(event) {
    setAddedStep(event.target.value);
  }

  function handleChangeStepId(event) {
    setStepIdSet(event.target.value);
  }

  function getPosition(elementToFind, arrayElements) {
    var i;
    for (i = 0; i < arrayElements.length; i += 1) {
      if (arrayElements[i] === elementToFind) {
        return i;
      }
    }
    return null; //not found
  }

  function addStepToTagList() {
    let ID = "";
    if (stepIdSet == "" || stepIdSet == 0) {
      ID = stepIdSet;
    } else {
      ID = stepIdSet - 1;
    }
    // let ID = stepIdSet -1 ;
    // console.log("stepIdSet", stepIdSet);
    // console.log("ID: ", ID);
    // if (stepIdSet > 1) {
    //   stepID = stepIdSet - 1;
    // } else {
    //   stepID = stepIdSet;
    // }

    props.addToStepsList(addedStep, ID);
    setAddedStep("");
  }

  function handleStepDelete(step) {
    props.removeFromStepsList(step);
  }

  const proceduteListRender = [];
  let Id = 0;
  for (const step of stepsListArray) {
    let stepID = getPosition(step, stepsListArray);
    proceduteListRender.push(
      <Step
        step={step}
        stepID={stepID + 1}
        key={Id}
        onTagDelete={() => handleStepDelete(step)}
      />
    );
    Id++;
  }

  return (
    <>
      <input
        className={style.stepIdSet}
        stepidset={stepIdSet}
        type="text"
        onChange={handleChangeStepId}
      />
      <textarea
        className={style.step}
        rows="5"
        value={addedStep}
        onChange={handleChangeStep}
      />
      <div className={style.ingredientButton} onClick={addStepToTagList}>
        Pridať
      </div>
      <div className={style.addedstep}>{proceduteListRender}</div>
      {/* <input
        className={style.addedstep}
        type="text"
        onChange={handleChangeStep}
        onKeyPress={handleKeyPress}
        value={proceduteListRender}
      /> */}
    </>
  );
}
