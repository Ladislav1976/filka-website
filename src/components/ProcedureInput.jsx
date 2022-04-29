import { useState } from "react";
import style from "./ProcedureInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

function Step(props) {
  return (
    <>
      <div className={style.step}>
        {" "}
        <FontAwesomeIcon
          icon={faXmark}
          onClick={props.onTagDelete}
        ></FontAwesomeIcon>{" "}
        {props.step}
      </div>
    </>
  );
}

export default function ProcedureInput(props) {
  const [addedStep, setAddedStep] = useState("");

  const stepsList = props.stepsList;

  function handleChangeStep(event) {
    setAddedStep(event.target.value);
  }

  function addStepToTagList() {
    props.addToStepsList(addedStep);
    setAddedStep("");
  }

  function handleStepDelete(step) {
    props.removeFromStepsList(step);
  }

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      addStepToTagList();
    }
  }

  let stepsListArray = [...stepsList];
  const proceduteListRender = [];
  let StepId = 0;
  for (const step of stepsListArray) {
    proceduteListRender.push(
      <Step
        step={step}
        key={StepId}
        onTagDelete={() => handleStepDelete(step)}
      />
    );
    StepId++;
  }

  return (
    <>
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
