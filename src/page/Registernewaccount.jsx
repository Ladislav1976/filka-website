import { useRef, useState, useEffect } from 'react';

import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import style from '../assets/styles/Pages/RegisterNewAccount.module.css';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import CSRFToken from './CSFRToken';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
// const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = 'register';

export default function RegisterNewAccount() {
    const axiosPrivate = useAxiosPrivate();
    const [isLoading, setIsLoading] = useState(false);

    const first_name_Ref = useRef();
    const last_name_Ref = useRef();

    const emailRef = useRef();
    const errRef = useRef();

    const [first_name, setFirst_name] = useState('');
    const [last_name, setLast_name] = useState('');

    const [email, setEmail] = useState('');
    const [validFirst_name, setValidFirst_name] = useState(false);
    const [validLast_name, setValidLast_name] = useState(false);

    const [validEmail, setValidEmail] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        first_name_Ref.current.focus();
    }, []);

    function first_nameKeyDown(event) {
        if (event.key === 'Enter') {
            last_name_Ref.current.focus();
        }
    }

    function last_nameKeyDown(event) {
        if (event.key === 'Enter') {
            emailRef.current.focus();
        }
    }

    useEffect(() => {
        setValidFirst_name(USER_REGEX.test(first_name));
    }, [first_name]);

    useEffect(() => {
        setValidLast_name(USER_REGEX.test(last_name));
    }, [last_name]);

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email]);

    useEffect(() => {
        setErrMsg('');
    }, [first_name, last_name, email]);

    async function handleSubmit(e) {
        e.preventDefault();
        setIsLoading(true);
        const controller = new AbortController();

        const v1 = USER_REGEX.test(first_name);
        const v2 = USER_REGEX.test(last_name);
        const v3 = EMAIL_REGEX.test(email);
        if (!v1 || !v2 || !v3) {
            setErrMsg('Invalid Entry');
            return;
        }
        try {
            const response = await axiosPrivate.post(
                REGISTER_URL,
                JSON.stringify({
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                }),
                {
                    signal: controller.signal,
                },
            );
            console.log(response);
            setSuccess(true);
            setIsLoading(false);

            setFirst_name('');
            setLast_name('');
            setEmail('');
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg(
                    `Tento ${err.response?.data.message} je už zaregistrovaný`,
                );
            } else {
                setErrMsg('Registrácia zlyhala');
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {' '}
            <div className={style.main}>
                {success ? (
                    <div className={style.submitContainer}>
                        <section>
                            <h1>Nový účet pre {email} bol vytvorený!</h1>
                        </section>
                    </div>
                ) : (
                    <div
                        className={
                            !isLoading ? style.submitContainer : style.offScreen
                        }
                    >
                        <form
                            onSubmit={handleSubmit}
                            className={
                                !isLoading ? style.form : style.offscreen
                            }
                        >
                            {' '}
                            <p
                                ref={errRef}
                                className={
                                    errMsg ? style.errmsg : style.offscreen
                                }
                                aria-live="assertive"
                            >
                                {errMsg}
                            </p>
                            <h1>Registrácia</h1>
                            <CSRFToken />
                            <div className={style.inputContainer}>
                                <label
                                    className={style.label}
                                    htmlFor="first_name"
                                >
                                    Meno:
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={
                                            validFirst_name
                                                ? style.valid
                                                : style.hide
                                        }
                                    />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={
                                            validFirst_name || !first_name
                                                ? style.hide
                                                : style.invalid
                                        }
                                    />
                                </label>
                                <div className={style.inputBox}>
                                    <input
                                        type="text"
                                        className={style.input}
                                        id="first_name"
                                        ref={first_name_Ref}
                                        onKeyDown={first_nameKeyDown}
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setFirst_name(e.target.value)
                                        }
                                        value={first_name}
                                        required
                                        aria-invalid={
                                            validFirst_name ? 'false' : 'true'
                                        }
                                        aria-describedby="uidnote"
                                    />
                                </div>
                                <label
                                    className={style.label}
                                    htmlFor="last_name"
                                >
                                    Priezvisko:
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={
                                            validLast_name
                                                ? style.valid
                                                : style.hide
                                        }
                                    />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={
                                            validLast_name || !last_name
                                                ? style.hide
                                                : style.invalid
                                        }
                                    />
                                </label>
                                <div className={style.inputBox}>
                                    <input
                                        type="text"
                                        className={style.input}
                                        id="last_name"
                                        ref={last_name_Ref}
                                        onKeyDown={last_nameKeyDown}
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setLast_name(e.target.value)
                                        }
                                        value={last_name}
                                        required
                                        aria-invalid={
                                            validLast_name ? 'false' : 'true'
                                        }
                                        aria-describedby="uidnote"
                                    />
                                </div>
                                <label className={style.label} htmlFor="email">
                                    Email:
                                    <FontAwesomeIcon
                                        icon={faCheck}
                                        className={
                                            validEmail
                                                ? style.valid
                                                : style.hide
                                        }
                                    />
                                    <FontAwesomeIcon
                                        icon={faTimes}
                                        className={
                                            validEmail || !email
                                                ? style.hide
                                                : style.invalid
                                        }
                                    />
                                </label>
                                <div className={style.inputBox}>
                                    <input
                                        type="email"
                                        className={style.input}
                                        id="email"
                                        ref={emailRef}
                                        placeholder="email@gmail.com"
                                        autoComplete="off"
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        value={email}
                                        required
                                        aria-invalid={
                                            validEmail ? 'false' : 'true'
                                        }
                                        aria-describedby="uidnote"
                                    />
                                </div>
                            </div>
                            <button
                                className={style.button}
                                disabled={
                                    !validFirst_name ||
                                    !validLast_name ||
                                    !validEmail
                                        ? true
                                        : false
                                }
                            >
                                Odoslať
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </>
    );
}
