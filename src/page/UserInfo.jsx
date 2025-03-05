import useAuth from "../hooks/useAuth";
import style from "./Register.module.css";
import user_image from "../image/user_image.png";
import { useRef, useState } from 'react';
import useLogout from "../hooks/useLogout";

export default function UserInfo(props) {
    const { auth } = useAuth();
    const errRef = useRef();
    const [errMsg, setErrMsg] = useState('');

    const logOut = useLogout(errRef, setErrMsg)

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
            <div className={style.logout} >
                <svg className={style.svgicon} onClick={() => logOut()} viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M768 106V184c97.2 76 160 194.8 160 328 0 229.6-186.4 416-416 416S96 741.6 96 512c0-133.2 62.8-251.6 160-328V106C121.6 190.8 32 341.2 32 512c0 265.2 214.8 480 480 480s480-214.8 480-480c0-170.8-89.6-321.2-224-406z" fill="" /><path d="M512 32c-17.6 0-32 14.4-32 32v448c0 17.6 14.4 32 32 32s32-14.4 32-32V64c0-17.6-14.4-32-32-32z" fill="" />
                </svg>

            </div>

        </div>
    </>
    )

}