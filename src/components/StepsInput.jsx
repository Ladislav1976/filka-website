import { useState, useEffect } from "react";
import style from "./StepsInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCartPlus, faCheck, faXmark, faBasketShopping, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { ACTION_TYPES } from "../reducer/actionTypes";
import { STATE_LIST } from "../reducer/reducer";


function Step(props) {
  const [step, setStep] = useState(props.step);
  const [stepDefault, setStepDefault] = useState("");
  const component = props.component
  const dispatch = props.dispatch



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
    props.updateStepList(step)
    dispatch({
      type: ACTION_TYPES.UPDATE_STEP, payload:
        { name: STATE_LIST.STEPS, value: step },
    })
    setStepDefault("")
  }
  function handleStepMove(move, step) {
    props.stepMove(move, step)
  }
  return (
    <>
      <div className={style.stepContainer}>
        <div className={style.stepid}>{props.stID}.</div>
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
              // className={style.editIcon}
              icon={stepDefault == "" ? faCheck : faFloppyDisk}
              onClick={() => {
                handleUpdateStepList()

              }}
            /></div>

          <div className={style.deleteIcon}
          // datatooltip="Vymazať"
          >
            <FontAwesomeIcon
              // className={style.deleteIcon}
              icon={faTrash}
              onClick={() => {
                dispatch({
                  type: ACTION_TYPES.DELETE_STEP, payload:
                    { name: STATE_LIST.STEPS, value: step },
                });
                props.handleStepDelete()
              }}
            /></div>
          {stepDefault != "" && <div className={style.cancelIcon} datatooltip="Zrušiť">
            <FontAwesomeIcon
              // className={style.cancelIcon}
              icon={faXmark}
              onClick={() => handleCancelStep()} /></div>}
        </div>}

        {(component == "editcomponent" || component == "newcomponent") && <div className={style.upddownbox} >
          <div className={style.up} onClick={() => {
            dispatch({
              type: ACTION_TYPES.MOVE_UP_STEP, payload:
                { name: STATE_LIST.STEPS, value: step },
            });
            handleStepMove(-1, step)
          }} >&#10095;</div>
          <div className={style.down} onClick={() => {
            dispatch({
              type: ACTION_TYPES.MOVE_DOWN_STEP, payload:
                { name: STATE_LIST.STEPS, value: step },
            });
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

  const dispatch = props.dispatch

  function handleChangeStep(event) {
    setAddedStep(event.target.value);
  }

  // function getPosition(elementToFind, arrayElements) {
  //   var i;
  //   for (i = 0; i < arrayElements.length; i += 1) {
  //     if (arrayElements[i].id === elementToFind) {
  //       return i;
  //     }
  //   }
  //   return null; //not found
  // }

  function addStep() {
    if (addedStep == "") return
    props.handleAddStep({ id: uniqueID, step: addedStep, statusDelete: false }, stepsList);
    setAddedStep("");
    // dispatch({
    //   type: ACTION_TYPES.ADD_STEP, payload:
    //     { name: STATE_LIST.STEPS, value: { id: uniqueID, step: addedStep, statusDelete: false } },
    // })
    
  }

  function handleStepDelete(step) {
    props.deleteStep(step)
  }

  const proceduteListRender = [];
  let Id = 1;

  stepsList?.map((step) => {
    if (step.statusDelete === false) {
      proceduteListRender.push(
        <Step
          step={step}
          // stepID={step.id}
          stID={Id}
          key={step.id}
          updateStepList={props.updateStepList}
          handleStepDelete={() => handleStepDelete(step)}
          stepMove={props.stepMove}
          component={component}
          dispatch={dispatch}

        />
      )
    };

    Id++;
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
          // onClick={() => { props.handleAddStep({id: uniqueID, step: addedStep, statusDelete: false},stepsList); setAddedStep("") }}
          ></FontAwesomeIcon>{" "}
        </div>
      </div>
      <div className={style.addedstep}>{proceduteListRender}</div>
    </>
  );
}
