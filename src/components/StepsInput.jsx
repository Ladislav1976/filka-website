import { useState, useEffect } from "react";
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
  const [stepListBulk, setStepListBulk] = useState("");
  const add = 1;
  const stepsSet = props.stepsSetState;
  const stepsSetID = props.stepsSetIDState;
  let stepsList = [...stepsSet];
  let stepsListID = [...stepsSetID];
  // let stepsListArray = [...stepsList];
  console.log("stepsSet",stepsSet)
  console.log("stepsList",stepsList)
  useEffect(() => {
    console.log("BEEE")
    let array = [];
    for (let i = 0; i < stepsList.length; i++) {for (let u = 0; u < stepsListID.length; u++) {
      if(i==u){
        array.push({step:stepsList[i],stepID:stepsListID[u]});};console.log("AHOJJJJJ");setStepListBulk(array)
      }};
      
    }
      ,)

  function handleChangeStep(event) {
    console.log("DDDDDDDDDD", event.target.value);
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
    console.log("addedStep ID", ID);
    console.log("addedStep", addedStep,ID);
    // console.log("ID: ", ID);
    // if (stepIdSet > 1) {
    //   stepID = stepIdSet - 1;
    // } else {
    //   stepID = stepIdSet;
    // }

    props.addToStepsList(addedStep, ID);
    setAddedStep("");
  }

  function handleStepDelete(st,stID) {
    console.log("step", st)
    console.log("stepID", stID)
    props.removeFromStepsList(st,stID);
  }

  const proceduteListRender = [];
  let Id = 0;
  for (const step of stepListBulk) {
    let stepID = getPosition(step.stepID, stepsList);
    console.log("stepID", stepID)
    proceduteListRender.push(
      <Step
        step={step.step}
        stID={step.stepID}
        stepID={stepID + 1}
        key={Id}
        onTagDelete={() => handleStepDelete(step.step,step.stepID)}
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
