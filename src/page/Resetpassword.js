import { useRef, useState, useEffect } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import style from "./Register.module.css";
import axios from "../api/axios";
import { useParams } from "react-router-dom";
import CSRFToken from './CSFRToken';
import Cookies from 'js-cookie';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const RESET_URL = "reset-password/";


export default function Reset_password() {
    const token = useParams()

    const errRef = useRef();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);



    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [pwd, matchPwd])

    async function handleSubmit(e) {
        e.preventDefault();
        // if button enabled with JS hack
         const v1 = PWD_REGEX.test(pwd);
        if (!v1) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const response = await axios.post(RESET_URL,
                // { password: pwd ,confirm_password:matchPwd, reset_id:token.token},
                { password: pwd ,confirm_password:matchPwd, 
                    reset_id:token.token
                },
                // JSON.stringify({ first_name: first_name, last_name: last_name, username: user_name, email: email, password: pwd }),
                {
                    headers: { 
                                //    "Accept": "application/json",
                                   "Content-Type": "application/json",
                                   "X-CSRFToken": Cookies.get("csrftoken")
                    },
                    withCredentials: true
                }
            );
            console.log(response?.data);
            console.log("response :",response);

            // console.log(JSON.stringify(response))
            setSuccess(true);
            setPwd('');
            setMatchPwd('');
        } catch (err) {

            if (!err?.response) {
                setErrMsg('No Server Response');
            }
            // else if (err.response?.status === 409 && err.response?.status === "username") {
            //     setErrMsg('Tento "username" je uz zaregistrovany');
            // } 
            else if (err.response?.status === 409) {
                setErrMsg(` ${err.data.message} `);
            }
            else if (err.response?.status === 408) {
                setErrMsg(`${err.data.message}`);
            }
            else {console.log(err)
                setErrMsg( `${err.message}`)
            }
            errRef.current.focus();
        }
    }

    return (
        <>
            {success ? (
                <main className={style.App}>
                    <section>
                        <h1>Success!</h1>
                        <p>
                            <a href="recepty">Sign In</a>
                        </p>
                    </section>
                </main>
            ) : (
                <main className={style.App}>
                    <section>
                        <p ref={errRef} className={errMsg ? style.errmsg : style.offscreen} aria-live="assertive">{errMsg}</p>
                        <h1>Reset Password</h1>
                        <form onSubmit={handleSubmit}>
                               <CSRFToken />
                            <label htmlFor="password">
                                Password:
                                <FontAwesomeIcon icon={faCheck} className={validPwd ? style.valid : style.hide} />
                                <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? style.hide : style.invalid} />
                            </label>
                            <input
                                type="password"
                                className={style.input}
                                id="password"
                                onChange={(e) => setPwd(e.target.value)}
                                value={pwd}
                                required
                                aria-invalid={validPwd ? "false" : "true"}
                                aria-describedby="pwdnote"
                                onFocus={() => setPwdFocus(true)}
                                onBlur={() => setPwdFocus(false)}
                            />
                            <p id="pwdnote" className={pwdFocus && !validPwd ? style.instructions : style.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Must include uppercase and lowercase letters, a number and a special character.<br />
                                Allowed special characters: <span aria-label="exclamation mark">!</span> <span aria-label="at symbol">@</span> <span aria-label="hashtag">#</span> <span aria-label="dollar sign">$</span> <span aria-label="percent">%</span>
                            </p>


                            <label htmlFor="confirm_pwd">
                                Confirm Password:
                                <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? style.valid : style.hide} />
                                <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? style.hide : style.invalid} />
                            </label>
                            <input
                                type="password"
                                className={style.input}
                                id="confirm_pwd"
                                onChange={(e) => setMatchPwd(e.target.value)}
                                value={matchPwd}
                                required
                                aria-invalid={validMatch ? "false" : "true"}
                                aria-describedby="confirmnote"
                                onFocus={() => setMatchFocus(true)}
                                onBlur={() => setMatchFocus(false)}
                            />
                            <p id="confirmnote" className={matchFocus && !validMatch ? style.instructions : style.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                Must match the first password input field.
                            </p>

                            <button disabled={!validPwd || !validMatch ? true : false}>Reset Password</button>
                        </form>
                        <p>
                            Remember your password ?<br />
                            <span className={style.line}>
                                {/*put router link here*/}
                                <a href="login">Sign In</a>
                            </span>
                        </p>
                    </section></main>
            )}
        </>
    )
}