import { useState, useEffect } from "react";
import style from "./StepsInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faTrash, faPenToSquare, faCartPlus, faCheck, faXmark, faQuestion, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function Step(props) {
  const [step, setStep] = useState(props.step);
  const [stepID, setStepID] = useState(props.stepID)
  const [stepDefault, setStepDefault] = useState("");
  const stposition = props.stposition
  const component = props.component

  function handleUpdateStep(event) {
    if (stepDefault == "") {
      setStepDefault(step)
      setStep(event.target.value);
    } else {
      setStep(event.target.value);
    }

  }
  function handleCancelStep() {
    if (stepDefault != "") {
      setStep(stepDefault);
      setStepDefault("")
    }
  }

  function handleUpdateStepInTagList() {
    props.updateStepInTagList(stepID, "", step)
    setStepDefault("")
  }
  function handleStepMove(move, step) {
    console.log("handleStepMove",move, step)
    props.stepMove(move, step)

  }
  return (
    <>

      <div className={style.stepid}>{props.stID}.</div>
      <div className={style.stepBox}>
        {component == "viewcomponent" && <div className={style.stepTextView}>{step}</div>}
        {component == "editcomponent" && <textarea
          className={style.stepText}
          type="text"
          rows="2"
          value={step}
          onChange={handleUpdateStep}
        />}
        {component == "editcomponent" && <div className={style.iconBox}>
          <div className={stepDefault == "" ? style.OKIcon : style.editIcon} datatooltip={stepDefault == "" ? "OK" : "Uložiť"}>
            <FontAwesomeIcon
              color={stepDefault == "" ? "#558113" : "#fd0000"}
              // className={style.editIcon}
              icon={stepDefault == "" ? faCheck : faFloppyDisk}
              onClick={() => {
                handleUpdateStepInTagList()

              }}
            /></div>

          <div className={style.deleteIcon}
            //datatooltip="Vymazať"
          >
            <FontAwesomeIcon
              // className={style.deleteIcon}
              icon={faTrash}
              onClick={() => props.stepDelete(stepID, step, stposition)}
            /></div>
          {stepDefault != "" && <div className={style.cancelIcon} datatooltip="Zrušiť">
            <FontAwesomeIcon
              // className={style.cancelIcon}
              icon={faXmark}
              onClick={() => handleCancelStep()} /></div>}
        </div>}

        {component == "editcomponent" && <div className={style.upddownbox} >
          <div className={style.up} onClick={() => handleStepMove(-1, { id: stepID, step: step })} >&#10095;</div>
          <div className={style.down} onClick={() => handleStepMove(1, { id: stepID, step: step })} >&#10094;</div>
        </div>}


      </div>
    </>
  );
}

export default function StepsInput(props) {

  const [stepsSetID, setStepsSetID] = useState(props.stepsSetIDState);
  let stepsSet = props.stepsSet
  const [addedStep, setAddedStep] = useState("");
  const component = props.component





  function handleChangeStep(event) {
    setAddedStep(event.target.value);
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



  function handleStepDelete(stepID, step, stposition) {
    props.deleteStep(stepID, step, stposition)
  }

  const proceduteListRender = [];
  let Id = 1;
  let stepsSetFilter = stepsSet.filter((element) => element.stposition != "delete")
  stepsSetFilter.map((step) => {
    proceduteListRender.push(
      <Step
        step={step.step}
        stepID={step.id}
        stID={Id}
        stposition={step.stposition}
        key={step.id}
        updateStepInTagList={props.updateStepInTagList}
        stepDelete={handleStepDelete}
        stepMove={props.stepMove}
        component={component}
      />
    );

    Id++;
  })


  let uniqueID = new Date().toISOString()

  if (component == "viewcomponent") return <div className={style.addedstep}>{proceduteListRender}</div>
  return (
    <>
      <div className={style.stepBox}>
        <textarea
          className={style.stepText}
          rows="5"
          value={addedStep}
          onChange={handleChangeStep}
        />
        <div className={style.newStepIcon} datatooltip="Uložiť">
          <FontAwesomeIcon
            icon={faFloppyDisk}
            onClick={() => { props.addStepToTagList(uniqueID, addedStep); setAddedStep("") }}
          ></FontAwesomeIcon>{" "}
        </div>
      </div>
      <div className={style.addedstep}>{proceduteListRender}</div>
    </>
  );
}
