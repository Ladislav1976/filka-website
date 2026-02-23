import { useState } from 'react';
import style from '../assets/styles/Components/StepInputMobile.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk, faXmark } from '@fortawesome/free-solid-svg-icons';

export default function StepInputMobile(props) {
    const [step, setStep] = useState(props.step ? props.step : '');

    function handleUpdateStep(e) {
        if (typeof step === 'object') {
            setStep({
                ...step,
                step: e.target.value,
            });
        }
        if (typeof step === 'string') {
            setStep(e.target.value);
        }
    }

    function handleSave() {
        if (typeof step === 'object') {
            props.handleOnChange(step.step);
        }
        if (typeof step === 'string') {
            props.handleOnChange(step);
        }
        props.handleUpdateList(step);
        props.setModalFlag(false);
    }

    return (
        <>
            <div className={style.main}>
                <div
                    className={style.iconSave}
                    datatooltip="Uložiť"
                    disabled={!step ? true : false}
                    onClick={handleSave}
                >
                    <FontAwesomeIcon icon={faFloppyDisk} />
                </div>
                <div
                    className={style.iconCancel}
                    onClick={() => props.setModalFlag(false)}
                    datatooltip="Zavrieť"
                >
                    <FontAwesomeIcon icon={faXmark} />
                </div>
                <div className={style.stepid}>{props.index}.</div>

                <textarea
                    className={style.stepText}
                    type="text"
                    value={step.step}
                    id="step"
                    autoComplete="off"
                    onChange={handleUpdateStep}
                />
                {/* <input
                        type="text"
                        className={style.searchInputMobile}
                        placeholder="Hľadať ..."
                        aria-label="Hľadať ..."
                        value={searchedTag}
                        onChange={handleChange}
                        onKeyDown={handleKeyPress}
                    /> */}
            </div>
        </>
    );
}
