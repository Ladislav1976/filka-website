import { useRef, useState, useEffect, useContext } from 'react';
// import AuthContext from "./context/AuthProvider";
import useAuth from "../hooks/useAuth"
import style from "./Register.module.css";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
// import useLocalStorage from '../hooks/useLocalStorage';
import useInput from '../hooks/useInput';
import useToggle from '../hooks/useToggle';

import axios from "../api/axios";
const LOGIN_URL = 'login';
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default function Login() {
    const { setAuth, setCSRFToken ,setPage,  setPageSize, setOrdering} = useAuth();

    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";


    const emailRef = useRef();

    const errRef = useRef();

    const [email, resetEmail, emailAttribs] = useInput('email', '');//useState("")
    const [pwd, setPwd] = useState('');
    // const [validPwd, setValidPwd] = useState(false);
    // const [pwdFocus, setPwdFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');

    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);
    // const [check, toggleCheck] = useState('persist', false);
    const [check, toggleCheck] = useToggle('persist', false);
    // const [success, setSuccess] = useState(false);

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setErrMsg('');
    }, [email, pwd])

    async function handleSubmit(e) {
        e.preventDefault();
        const v1 = EMAIL_REGEX.test(email);
        if (!v1) {
            setErrMsg("Invalid Entry");
            return
        }
        try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ email: email, password: pwd }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            console.log(JSON.stringify(response?.data));
            //console.log(JSON.stringify(response));
            // const refresh = response?.data?.refresh;
            const access_token = response?.data?.access_token
            const userRes = response?.data?.user;
            const CSRFToken = response?.headers["x-csrftoken"]

            // console.log("refresh refresh",response?.data.refresh)
            console.log("refresh access", response?.data?.access_token)
            console.log("response", response?.data)
            setAuth({ userRes, pwd, access_token });
            setCSRFToken(CSRFToken)
            setPage(1);
            setPageSize(20);
            setOrdering("date");
            resetEmail();
            setPwd('');
            window.localStorage.setItem("IsLogedIn", true)
            // navigate(from, { replace: true });
            navigate(from, { replace: true });
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                setErrMsg('Emailova adresa alebo heslo nebolo spravne!');
            } else {
                setErrMsg('Login Failed');
            }
            errRef.current.focus();
        }
    }


    // const tooglePersist = () => {
    //     setPersist(prev => !prev)
    // }

    // useEffect(() => {
    //     localStorage.setItem('persist', persist)
    // }, [persist])
    return (
        // <>
        //     {success ? (
        //         <section>
        //             <h1>You are logged in!</h1>
        //             <br />
        //             <p>
        //                 <a href="#">Go to Home</a>
        //             </p>
        //         </section>
        //     ) : (
        <main className={style.MainApp}>
            <section>
                <p ref={errRef} className={errMsg ? style.errmsg : style.offscreen} aria-live="assertive">{errMsg}</p>
                <h1>Prihlásiť sa</h1>
                <form onSubmit={handleSubmit}>
                    <label className={style.label} htmlFor="email">Email:</label>
                    <div className={style.inputbox} >
                        <input
                            type="email"
                            className={style.input}
                            id="email"
                            ref={emailRef}
                            placeholder="email@gmail.com"
                            autoComplete="off"
                            {...emailAttribs}
                            // onChange={(e) => setEmail(e.target.value)}
                            // value={email}
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
                    <label className={style.label} htmlFor="password">Heslo:</label>
                    <input
                        type="password"
                        className={style.input}
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        value={pwd}
                        required
                    />
                    <button disabled={!validEmail ? true : false}>Odoslať</button>
                    <div className={style.persistCheck}>
                        <input
                            type="checkbox"
                            id="persist"
                            onChange={toggleCheck}
                            checked={check}
                        />
                        <label htmlFor="persist">Dôverovať tomuto počítaču</label>
                    </div>
                </form>
                {/* <p>
                    Chcete sa zaregistrovať?<br />
                    <span className={style.line}>
                        <a href="register">Registrácia</a>
                    </span>
                </p> */}
                <p>
                    Zabudli ste svoje heslo? <br />
                    <span className={style.line}>
                        {/*put router link here*/}
                        <a href="reset">Zmeniť heslo</a>
                    </span>
                </p>
            </section></main>
        //     )}
        // </>
    )
}
