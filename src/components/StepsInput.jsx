import { useState, useEffect } from "react";
import style from "./StepsInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

function Step(props) {
  const [step, setStep] = useState(props.step);
  // console.log("stepPPPPP", step);
  const stepID = props.stepID;

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
          onClick={() => props.addStepToTagList(step, stepID)}
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
  console.log("setStepsSet 3", stepsSet);
  // console.log("stepsSetID 3", stepsSetID);
  // if (stepsList.length != stepsListID.length) {
  //   // console.log("not equal");
  // } else {
  //   // console.log(" equal");
  // }

  // for (let i = 0; i < stepsList.length; i++) {
  //   for (let u = 0; u < stepsListID.length; u++) {
  //     if (i == u) {
  //       stepListBulk.push({ step: stepsList[i], stepID: stepsListID[u] });
  //       // console.log("stepListBulk", stepListBulk);
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
      if (arrayElements[i] === elementToFind) {
        return i;
      }
    }
    return null; //not found
  }

  function addStepToTagList(st, stID) {
    let stepPosition = "";
    if (stepIdSet == "" || stepIdSet == 0) {
      stepPosition = stepIdSet;
    } else {
      stepPosition = stepIdSet - 1;
    }
    // let ID = stepIdSet -1 ;
    // console.log("ID: ", ID);
    // if (stepIdSet > 1) {
    //   stepID = stepIdSet - 1;
    // } else {
    //   stepID = stepIdSet;
    // }

    props.addToStepsList(st, stID, stepPosition);
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
  for (const step of stepsSet) {
    let steID = getPosition(step.step, stepsList);
    console.log("step", step);
    console.log("stepID", steID);
    proceduteListRender.push(
      <Step
        step={step.step.step}
        stepID={step.step.id}
        stID={steID + 1}
        key={Id}
        addStepToTagList={addStepToTagList}
        onTagDelete={() => handleStepDelete(step.step, step.stepID)}
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
