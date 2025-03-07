import { useState } from "react";
import style from "./StepsInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faCheck, faXmark, faBasketShopping, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";



function Step(props) {
  const [step, setStep] = useState(props.step);
  const [stepDefault, setStepDefault] = useState("");
  const component = props.component




  function handleUpdateStep(event) {
    if (stepDefault == "") {
      setStepDefault(step)
      setStep({
        ...step,
        step: event.target.value
      });
    } else {
      setStep({
        ...step,
        step: event.target.value
      });
    }

  }
  function handleCancelStep() {
    if (stepDefault != "") {
      setStep(stepDefault);
      setStepDefault("")
    }
  }

  function handleUpdateStepList() {
    props.updateStepList(step);
    setStepDefault("")
  }
  function handleStepMove(move, step) {
    props.stepMove(move, step)
  }
  return (
    <>
      <div className={style.stepContainer}>
        <div className={style.stepid}>{props.index+1}.</div>
        {/* <div className={style.stepBox}> */}
        {component == "viewcomponent" && <div className={style.stepTextView}>{step.step}</div>}
        {(component == "editcomponent" || component == "newcomponent") && <textarea
          className={style.stepText}
          type="text"
          rows="2"
          value={step.step}
          onChange={handleUpdateStep}
        />}

        {(component == "editcomponent" || component == "newcomponent") && <div className={style.iconBox}>
          <div className={stepDefault == "" ? style.OKIcon : style.editIcon} datatooltip={stepDefault == "" ? "OK" : "Uložiť"}>
            <FontAwesomeIcon
              color={stepDefault == "" ? "#558113" : "#fd0000"}
              icon={stepDefault == "" ? faCheck : faFloppyDisk}
              onClick={() => {
                handleUpdateStepList()

              }}
            /></div>

          <div className={style.deleteIcon}
          // datatooltip="Vymazať"
          >
            <FontAwesomeIcon
              icon={faTrash}
              onClick={() => {
                props.handleStepDelete(step)
              }}
            />
            </div>
          {stepDefault != "" && <div className={style.cancelIcon} datatooltip="Zrušiť">
            <FontAwesomeIcon
              icon={faXmark}
              onClick={() => handleCancelStep()} /></div>}
        </div>}

        {(component == "editcomponent" || component == "newcomponent") && <div className={style.upddownbox} >
          <div className={style.up} onClick={() => {
            handleStepMove(-1, step)
          }} >&#10095;</div>
          <div className={style.down} onClick={() => {

            handleStepMove(1, step)
          }} >&#10094;</div>
        </div>}


      </div>
    </>
  );
}

export default function StepsInput(props) {


  let stepsList = props.stepsList ?? []
  const [addedStep, setAddedStep] = useState("");
  const component = props.component


  function handleChangeStep(event) {
    setAddedStep(event.target.value);
  }


  function addStep() {
    if (addedStep == "") return
    props.handleAddStep({ id: uniqueID, step: addedStep, statusDelete: false }, stepsList);
    setAddedStep("");
   }

  function handleStepDelete(step) {
    props.deleteStep(step)
  }

  const proceduteListRender = [];


  stepsList?.map((step,index) => {
    if (step.statusDelete === false) {
      proceduteListRender.push(
        <Step
          step={step}
          index={index}
          key={step.id}
          updateStepList={props.updateStepList}
          handleStepDelete={ handleStepDelete}
          stepMove={props.stepMove}
          component={component}


        />
      )
    };


  })


  let uniqueID = new Date().toISOString()

  if (component === "viewcomponent") return <div className={style.addedstep}>{proceduteListRender}</div>
  return (
    <>

      <div className={style.stepBox}>
        <textarea
          className={style.newStepText}
          ref={props.stepRef}
          onKeyDown={props.stepKeyDown}
          placeholder='"Vlozit dalsi postup"'
          rows="5"
          value={addedStep}
          onChange={handleChangeStep}
        />
        <div className={style.newStepIcon} datatooltip="Uložiť">
          <FontAwesomeIcon
            icon={faBasketShopping}
            onClick={() => {
              addStep()
            }}
          ></FontAwesomeIcon>
        </div>
      </div>
      <div className={style.addedstep}>{proceduteListRender}</div>
    </>
  );
}
