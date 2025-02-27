import useAuth from "../hooks/useAuth";
import style from "./Register.module.css";
import user_image from "../image/user_image.png";
// import logout from "../image/logout.png";
import logout from "../image/reboot-icon-11.jpg";

import { useNavigate } from "react-router-dom";
import { useRef, useState } from 'react';
import axios from "../api/axios";
import useLogout from "../hooks/useLogout";
// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faRightFromBracket, faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";

export default function UserInfo(props) {
    const { auth, setAuth } = useAuth();

    const navigate = useNavigate()
    const logOut = useLogout()


    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');


    async function signOut() {
        await  logOut();
        navigate("login");
    }

        // async function signOut() {
        // try {
        //     const response = await axiosPrivate.post(LOGOUT_URL,
        //         {

        //         }
        //     );
        //     console.log(JSON.stringify(response?.data));
        //     setAuth({})
        //     navigate("login");
        // } catch (err) {
        //     if (!err?.response) {
        //         setErrMsg('No Server Response');
        //     } else if (err.response?.status === 405) {
        //         setErrMsg('Login Failed');
        //         errRef.current.focus();
        //     }
        // }}


    
    return (<>
        <div className={style.navBarUser}>
            <p ref={errRef} className={errMsg ? style.errmsg : style.offscreen} aria-live="assertive">{errMsg}</p>
            <img className={style.imgage} src={user_image} alt="usder_image" />
            <div className={style.name}>
                {auth?.userRes?.first_name}
            </div>
            <div className={style.name}>
                {auth?.userRes?.last_name}
            </div>
            {/* <div className={style.logout} onClick={() => handleSubmit()}>
                <FontAwesomeIcon
                    icon={faRightFromBracket}
                    // onClick={() => navigate("/admin")}
                // onClick={() => { props.handleAddStep({ id: uniqueID, step: addedStep, statusDelete: false }, stepsList); setAddedStep("") }}
                ></FontAwesomeIcon>{<div className={style.logoutlabel} >ODHLASIT</div>}
            </div> */}
            <div className={style.logout} >
            {/* <img src={logout} alt="logout"></img><div className={style.logoutlabel}>ODHLASIT</div> */}
            <svg className={style.svgicon} onClick={() => signOut()} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M768 106V184c97.2 76 160 194.8 160 328 0 229.6-186.4 416-416 416S96 741.6 96 512c0-133.2 62.8-251.6 160-328V106C121.6 190.8 32 341.2 32 512c0 265.2 214.8 480 480 480s480-214.8 480-480c0-170.8-89.6-321.2-224-406z" fill="" /><path d="M512 32c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32s32-14.4 32-32V64c0-17.6-14.4-32-32-32z" fill="" />
            {/* <div className={style.logoutlabel} >ODHLASIT</div> */}
            </svg>
         
            </div>
            
        </div>
    </>
    )

}