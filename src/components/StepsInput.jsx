import { useState } from "react";
import style from "./StepsInput.module.css";
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
        <div>{props.step}</div>
      </div>
    </>
  );
}

export default function StepsInput(props) {
  const [addedStep, setAddedStep] = useState("");
  const [stepId, setStepId] = useState(1);
  const [stepIdCounter, setStepIdCounter] = useState(1);
  const stepsList = props.stepsList;

  function handleChangeStep(event) {
    setAddedStep(event.target.value);
  }

  function handleChangeStepId(event) {
    setStepId(event.target.value);
  }
  // let stepIdCounter = 1;
  function addStepToTagList() {
    if (stepId == stepIdCounter) {
      console.log("stepIdCounter:", stepIdCounter);
      props.addToStepsList(stepId, addedStep);
      setStepIdCounter(stepIdCounter + 1);
      setStepId(stepIdCounter)
      console.log("stepIdCounter +1:", stepIdCounter);
    } else if (stepIdCounter != stepId) {
      props.addToStepsList(stepId, addedStep);
    }
    setAddedStep("");
    setStepId(stepIdCounter);
    console.log("stepId:", stepId);
  }

  function handleStepDelete(stepId, addedStep) {
    props.removeFromStepsList(stepId, addedStep);
  }

  // function handleKeyPress(event) {
  //   if (event.key === "Enter") {
  //     addStepToTagList();
  //   }
  // }

  let stepsListArray = [...stepsList];
  const proceduteListRender = [];
  let Id = 0;
  for (const step of stepsListArray) {
    proceduteListRender.push(
      <Step step={step} key={Id} onTagDelete={() => handleStepDelete(step)} />
    );
    Id++;
  }

  return (
    <>
      <input
        className={style.stepId}
        type="text"
        onChange={handleChangeStepId}
        value={stepId}
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
