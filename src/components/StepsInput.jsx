import { useState, useEffect } from "react";
import style from "./StepsInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash, faPenToSquare, faCartPlus, faCheck, faXmark ,faQuestion,faFloppyDisk} from "@fortawesome/free-solid-svg-icons";

function Step(props) {
  const [step, setStep] = useState(props.step);
 
  const [stepID, setStepID] = useState(props.stepID)

  const [stepDefault, setStepDefault] = useState("");
 
  function handleUpdateStep(event) {
    if (stepDefault == "") {
      setStepDefault(step)
      setStep(event.target.value);
    } else {
      setStep(event.target.value);
    }
    // setStep(event.target.value);
  }
  function handleCancelStep(){
    if (stepDefault!=""){
    setStep(stepDefault);
    setStepDefault("")}
  }

  function handleAddStepToTagList(){
    props.addStepToTagList(step, stepID)
    setStepDefault("")
  }

  return (
    <>
      <div className={style.stepID}>{props.stID}</div>{" "}
      <div className={style.stepBox}>

        {/* <div className={style.stepText}>{props.step}</div> */}
       
        <textarea
          className={style.stepText}
          type="text"
          rows="2"
          value={step}
          onChange={handleUpdateStep}
        />
        <div className={style.iconBox}>
          <FontAwesomeIcon 
            color={stepDefault == "" ? "#558113": "#fd0000" }
            className={style.editIcon}
            icon={stepDefault == ""? faCheck : faFloppyDisk} 
            onClick={() => handleAddStepToTagList()}
            />
          <FontAwesomeIcon
            className={style.cancelIcon}
            icon={faXmark} 
            onClick={()=>handleCancelStep()}/>
          <FontAwesomeIcon
            className={style.deleteIcon}
            icon={faTrash}
            onClick={()=>props.stepDelete(step, stepID)}
            />
        </div>
        {/* <div
          className={style.ingredientButton}
          onClick={() => props.addStepToTagList(step, stepID)}
        >
          Opravit
        </div> */}

      </div>
    </>
  );
}

export default function StepsInput(props) {
  const stepsSet = props.stepsSetState;
  const stepsSetID = props.stepsSetIDState;
  // const [stepIdSet, setStepIdSet] = useState("");
  const [addedStep, setAddedStep] = useState("");

  // console.log("stepListBulk", stepListBulk);
  // console.log("stepsSetID", stepsSetID);
  let stepsList = [...stepsSet];
  let stepsListID = [...stepsSetID];
  let stepListBulk = [];


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
  }

  // function handleUpdateStep(event) {
  //   setUpdatedStep(event.target.value);
  // }

  // function handleChangeStepId(event) {
  //   setStepIdSet(event.target.value);
  // }

  function getPosition(elementToFind, arrayElements) {
    var i;
    for (i = 0; i < arrayElements.length; i += 1) {
      if (arrayElements[i].id === elementToFind) {
        return i;
      }
    }
    return null; //not found
  }

  function addStepToTagList(step, stepID) {


    if (step == "") return
    let stepIDPosition = "newposition"
    if (stepID != "newStep") { stepIDPosition = getPosition(stepID, stepsList) }

    // console.log("step, stepID, stepPosition", step, stepID, stepIDPosition)
    props.stepsCheckPost(stepID, step, stepIDPosition);
    setAddedStep("");
    // setStepIdSet("");
  }

  function handleStepDelete(step, stepID) {

    let stepObj = ({ id: stepID, step: step });
    props.deleteStep(stepObj)
  }

  const proceduteListRender = [];
  let Id = 1;

  for (const step of stepListBulk) {
    proceduteListRender.push(
      <Step
        step={step.step}
        stepID={step.id}
        // stepIDPosition={stepIDPosition}
        stID={Id}
        key={Id}
        addStepToTagList={ addStepToTagList}
        stepDelete={handleStepDelete}
        // addStepToTagList={() => addStepToTagList(step.step, step.id)}
        // onTagDelete={() => handleStepDelete(step.step, step.id)}
      />
    );
    Id++;
  }
  // }

  return (
    <>
      {/* <input
        className={style.stepIdSet}
        stepidset={stepIdSet}
        type="text"
        onChange={handleChangeStepId}
      /> */}
      <div className={style.stepBox}>
      <textarea
        className={style.stepText}
        rows="5"
        value={addedStep}
        onChange={handleChangeStep}
      />
      <FontAwesomeIcon
        className={style.newStepIcon}
        icon={faFloppyDisk}
        onClick={() => addStepToTagList(addedStep, "newStep")}
      ></FontAwesomeIcon>{" "}
      </div>
      {/* <div
        className={style.ingredientButton}
        onClick={() => addStepToTagList(addedStep, "newStep")}
      >
        Pridať
      </div> */}
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
