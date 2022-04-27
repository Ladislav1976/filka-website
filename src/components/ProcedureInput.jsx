import { useState } from "react";
import style from "./ProcedureInput.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

function Step(props) {
  return (
    <>
      <div className={style.step}>
        {" "}
        <FontAwesomeIcon
          icon={faTimesCircle}
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

  let stepsListArray = [...stepsList];
  const proceduteListRender = [];
  for (const step of stepsListArray) {
    proceduteListRender.push(
      <Step step={step} key={step} onTagDelete={() => handleStepDelete(step)} />
    );
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
      ;<div className={style.addedstep}>{proceduteListRender}</div>
    </>
  );
}
