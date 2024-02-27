import { useState, useEffect } from "react";
import style from "./StepsInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Step(props) {
  const [step, setStep] = useState(props.step);

  let stepID = props.stepID;

let stepIDPosition = props.stepIDPosition

  if (stepID == null) { stepID = 0 }
  console.log("stepID", stepID)
  // if (stepIDPosition != null) {
  //   position = stepIDPosition
  // } else {position = "" }
 
  // console.log("position AAA", position)

  function handleUpdateStep(event) {
    setStep(event.target.value);
  }

  return (
    <>
      <div className={style.stepID}>{props.stID}</div>{" "}
      <div className={style.step}>
        <FontAwesomeIcon
          className={style.stepIcon}
          icon={faTrash}
          onClick={props.onTagDelete}
        ></FontAwesomeIcon>{" "}
        {/* <div className={style.stepText}>{props.step}</div> */}
        {/* <div></div> */}
        <textarea
          className={style.step}
          type="text"
          rows="2"
          value={step}
          onChange={handleUpdateStep}
        />
        <div
          className={style.ingredientButton}
          onClick={() => props.addStepToTagList(step, stepID, stepIDPosition)}
        >
          Pridať
        </div>
      </div>
    </>
  );
}

export default function StepsInput(props) {
  const stepsSet = props.stepsSetState;
  const stepsSetID = props.stepsSetIDState;
  const [stepIdSet, setStepIdSet] = useState("");
  const [addedStep, setAddedStep] = useState("");
  const [stepIdCounter, setStepIdCounter] = useState(1);

  // const stepsSet = props.stepsSetState;
  // const stepsSetID = props.stepsSetIDState;
  let stepsList = [...stepsSet];
  let stepsListID = [...stepsSetID];
  let stepListBulk = [];
  // console.log("setStepsSet 3", stepsSet);
  // console.log("stepsSetID 3", stepsSetID);

  // if (stepsList.length != stepsListID.length) {

  // } else {

  // }

  for (let i of stepsList) {

    stepListBulk.push({ id: i.id, step: i.step });
    // console.log("stepListBulk", stepListBulk);
  }

  // for (let i = 0; i < stepsList.length; i++) {
  //   for (let u = 0; u < stepsListID.length; u++) {
  //     if (i == u) {
  //       stepListBulk.push({ step: stepsList[i], stepID: stepsListID[u] });

  //     }
  //   }
  // }

  function handleChangeStep(event) {
    setAddedStep(event.target.value);
    // console.log("addedStep", addedStep);
  }

  // function handleUpdateStep(event) {
  //   setUpdatedStep(event.target.value);
  // }

  function handleChangeStepId(event) {
    setStepIdSet(event.target.value);
  }

  function getPosition(elementToFind, arrayElements) {
    var i;
    for (i = 0; i < arrayElements.length; i += 1) {
      if (arrayElements[i].id === elementToFind) {
        return i;
      }
    }
    return null; //not found
  }

  function addStepToTagList(step, stepID, stepPosition) {

    // let stepPosition = "";
    // if (stepIdSet == "" || stepIdSet == 0) {
    //   // console.log("stepIdSetAAAA",stepIdSet)
    //   stepPosition = stepIdSet;
    // } else {
    //   stepPosition = stepIDPosition-1;
    // }
    // if ( stepIdSet == 0) {
    //   // console.log("stepIdSetAAAA",stepIdSet)
    //   stepPosition = stepIdSet;
    // } else {
    //   stepPosition = stepIDPosition-1;
    // }
    // let ID = stepIdSet -1 ;
    // console.log("ID: ", ID);
    // if (stepIdSet > 1) {
    //   stepID = stepIdSet - 1;
    // } else {
    //   stepID = stepIdSet;
    // }
    console.log("step, stepID, stepPosition", step, stepID, stepPosition)
    props.addToStepsList(step, stepID, stepPosition);
    setAddedStep("");
    setStepIdSet("");
  }

  // function updateStepToTagList(stepID) {
  //   // let ID = "";
  //   // if (stepIdSet == "" || stepIdSet == 0) {
  //   //   ID = stepIdSet;
  //   // } else {
  //   //   ID = stepIdSet - 1;
  //   // }

  //   props.addToStepsList(updatedStep, stepID);
  //   setStepsSet("");
  //   setStepIdSet("");
  // }

  function handleStepDelete(step, stepID) {
    props.removeFromStepsList(step, stepID);
  }

  const proceduteListRender = [];
  let Id = 1;

  for (const step of stepListBulk) {
    // console.log("Id :", Id ,"step.step", step.step,"step.id", step.id)
    let stepIDPosition = getPosition(step.id, stepsList);
    // console.log("stepIDPosition 1:", stepIDPosition, "step.step", step.step)
    // console.log("POSITION", stepIDPosition)
    proceduteListRender.push(
      <Step
        step={step.step}
        stepID={step.id}
        stepIDPosition={stepIDPosition}
        stID={Id}
        key={Id}
        addStepToTagList={addStepToTagList}
        onTagDelete={() => handleStepDelete(step, stepIDPosition)}
      />
    );
    Id++;
  }
  // }

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
      <div
        className={style.ingredientButton}
        onClick={() => addStepToTagList(addedStep, 0)}
      >
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
