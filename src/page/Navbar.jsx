import UserInfo from "./UserInfo";
import useAuth from "../hooks/useAuth";
import style from "./Register.module.css";

import {
    BrowserRouter as Router,
    NavLink,
    Link,
    useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faPeopleRoof } from "@fortawesome/free-solid-svg-icons";


export default function Navbar() {

    const { auth } = useAuth();


    return (
        <>
            {auth.userRes ? <div className={style.navbar}>
                    <div className={style.navbarleft} >
                        <div className={style.familylogo}>      <FontAwesomeIcon icon={faPeopleRoof} /></div>
                        <NavLink className={style.navlik} to="/" >
                            Home
                        </NavLink>
                        <NavLink className={style.navlik} to="/recepty?page=1&page_size=2" >
                            Recepty
                        </NavLink>
                        <div className={auth?.userRes?.is_superuser ? style.dropdown : style.hide} >
                            <button className={style.dropbtn} >Admin
                                {/* <div class={style.up}>&#10094;</div> */}
                                <div className={style.up}>&#10094;</div>
                            </button>

                            <div className={style.dropdowncontent} >
                                <NavLink className={style.li} to="/admin/users" >
                                Užívatelia
                                </NavLink>
                                <NavLink className={style.li} to="/admin/register" >
                                Nový účet
                                </NavLink>
      
                            </div>
                        </div>
                    </div>
                    <div className={style.navbarright}>
                    </div>


                    <UserInfo />  
                    </div>
         : <div></div>}
        </>
    );
};

