import style from '../assets/styles/Reports/Save.module.css';
import { useRef, useEffect } from 'react';

export default function DeleteConfirm(props) {
    const deleteRef = useRef();
    const cancelRef = useRef();
    const errRef = useRef();
    const errMsg = props.errMsg;

    useEffect(() => {
        cancelRef.current.focus();
    }, []);

    useEffect(() => {
        errRef.current.focus();
    }, [errMsg]);

    function delKeyDown(event) {
        if (event.key === 'ArrowRight') {
            cancelRef.current.focus();
        }
        if (event.key === 'Enter') {
            props.onDelete();
        }
    }

    function canKeyDown(event) {
        console.log(event.key);
        if (event.key === 'ArrowLeft') {
            deleteRef.current.focus();
        }
        if (event.key === 'Enter') {
            props.onDeleteCancel();
        }
    }
    return (
        <>
            <div className={style.box}>
                <h3>Vymazať : {props.item} ? </h3>
                <div>
                    <button
                        ref={deleteRef}
                        onKeyDown={delKeyDown}
                        id={style.yes_button13}
                        className={`${style.button} ${style.delete}`}
                        onClick={props.onDelete}
                    >
                        ANO
                    </button>
                    <button
                        ref={cancelRef}
                        onKeyDown={canKeyDown}
                        id={style.nobutton13}
                        className={`${style.button} ${style.cancel}`}
                        onClick={props.onDeleteCancel}
                    >
                        NIE
                    </button>
                </div>
                <p
                    ref={errRef}
                    className={errMsg ? style.errmsg : style.offscreen}
                    aria-live="assertive"
                >
                    {errMsg}
                </p>
            </div>
        </>
    );
}
