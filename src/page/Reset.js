import { useRef, useState, useEffect, useContext } from 'react';

import useAuth from "../hooks/useAuth"
import style from "./Register.module.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import CSRFToken from './CSFRToken';
import Cookies from 'js-cookie';
import axios from "../api/axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faInfoCircle } from "@fortawesome/free-solid-svg-icons";


const RESET_URL = 'forgot-password/';


const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Reset() {
    // const { auth, csrftoken } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const emailRef = useRef();
    const errRef = useRef();

    const [email, setEmail] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [success, setSuccess] = useState(false);
    const BASE_URL = 'http://localhost:8000'
    const axx = axios.create({
        baseURL: BASE_URL,
    })

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [email])


    async function handleSubmit(e) {
        e.preventDefault();
        // const a = JSON.stringify({ email: email })
        setIsLoading(true)
        const a = JSON.stringify({ email: email })
        const v1 = EMAIL_REGEX.test(email);
        if (!v1) {
            setErrMsg("Invalid Entry");
            return
        }
        try {
            
            const response = await axios.post(RESET_URL, a
                ,
                {
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json",
                        "X-CSRFToken": Cookies.get("csrftoken")
                    },

                    // withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            // const refresh = response?.data?.refresh;
            const url_reset = response?.data?.url_reset
            const reset_id = response?.data?.reset_id;


            // console.log("refresh refresh",response?.data.refresh)
            console.log("url_reset", url_reset)
            console.log("reset_id", reset_id)
            setSuccess(true)
            setIsLoading(false)
            // navigate(from, { replace: true });
            // navigate(from, { replace: true });
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 409) {
                setErrMsg(err.response?.data?.message);
                errRef.current.focus();
            }
            else {
                console.log("err.response", err.response)
            }
        }
    }
    // console.log("putReset.isSuccess ",putReset.isSuccess )
    // console.log("putReset.isPending ",putReset.isPending)

    return (
        <>
            {success ? (
                <main className={style.App}>
                    <section>
                        <h1>Žiadosť bola odoslana!</h1>
                        <p>
                            {/* <a href="recepty">Sign In</a> */}
                        </p>
                    </section>
                </main>
            ) : (
                <main className={style.App  }>
                    <section>
                        <p ref={errRef} className={errMsg ? style.errmsg : style.offscreen} aria-live="assertive">{errMsg}</p>
                        <h1>Zmeniť heslo</h1>
                        
                            <div className={isLoading ? style.loadingContainer : style.offscreen}>
                            <FontAwesomeIcon
                                className={style.loadingIcon}
                                icon={faSpinner}
                
                                spin ></FontAwesomeIcon>
                        </div> 
                        <div className={!isLoading ? style.onscreen : style.offscreen}>
                        <h5>Zabudli ste heslo? </h5>
                        <h5>Vložte prosím vašu emailovú adresu na   </h5>
                        <h5>   ktorý Vám bude obratom zaslany email s inštrukciami</h5>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <CSRFToken />
                            <label className={style.label} htmlFor="email">Email:</label>
                            <div className={style.inputbox} >
                            <input
                                type="email"
                                className={style.input}
                                id="email"
                                ref={emailRef}
                                placeholder="email@gmail.com"
                                autoComplete="off"
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}
                                required
                                aria-invalid={validEmail ? "false" : "true"}
                                aria-describedby="uidnote"
                                onFocus={() => setEmailFocus(true)}
                                onBlur={() => setEmailFocus(false)}
                            />
                            <p id="uidnote" className={emailFocus && email && !validEmail ? style.instructions : style.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Povolené znaky: <br />- písmená, číslice, bodky<br />- symbol „@“,<br />
                                - .sk .com, .org, .cc<br />

                            </p>
                            </div>
                            <button disabled={!validEmail ? true : false} >Odoslať</button>
                        </form>
                        <p>
                            Chcete sa prihlásiť?<br />
                            <span className={style.line}>
                                {/*put router link here*/}
                                <a href="login">Prihlásiť sa</a>
                            </span>
                        </p>
                        </div>

                    </section></main>
            )}
        </>
    )
}
