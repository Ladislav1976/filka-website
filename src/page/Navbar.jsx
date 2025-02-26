import React, { Fragment } from 'react';
import axios from "../api/axios";
import UserInfo from "./UserInfo";
import useAuth from "../hooks/useAuth";
import style from "./Register.module.css";



// import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useRef, useState } from 'react';
import {
    BrowserRouter as Router,
    NavLink,
    Link,
    useNavigate,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear, faHouseChimneyWindow, faPeopleRoof } from "@fortawesome/free-solid-svg-icons";
// import logo from './pngfind.com-power-png-410934.png'

export default function Navbar() {
    // const controller = new AbortController();
    // const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth();
    const navigate = useNavigate()



    return (
        <>
            {/* 
            <nav className='navbar navbar-expand-lg navbar-light bg-light'>
                <div className='container-fluid'>
                    <Link className='navbar-brand' exact to='/'>Session Auth</Link>
                    <button
                        className='navbar-toggler'
                        type='button'
                        data-bs-toggle='collapse'
                        data-bs-target='#navbarNav'
                        aria-controls='navbarNav'
                        aria-expanded='false'
                        aria-label='Toggle navigation'
                    >
                        <span className='navbar-toggler-icon'></span>
                    </button>
                    <div className='collapse navbar-collapse' id='navbarNav'>
                        <ul className='navbar-nav'>
                            <li className='nav-item'>
                                <NavLink className='nav-link' exact to='/'>Home</NavLink>
                            </li> */}
            {/* { isAuthenticated ? authLinks : guestLinks } */}
            {/* <Fragment>
                                <li className='nav-item'>
                                    <NavLink className='nav-link' to='/dashboard'>Dashboard</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <a className='nav-link'  href='#!'>Logout</a>
                                </li>
                            </Fragment>
                        </ul>
                    </div>
                </div>
            </nav> */}
            {auth.userRes ? <main >
                <div className={style.navbar}>
                    <div className={style.navbarleft} >
                        <div className={style.familylogo}>      <FontAwesomeIcon icon={faPeopleRoof} /></div>
                        <NavLink className={style.navlik} to="/" >
                            Home
                        </NavLink>
                        <NavLink className={style.navlik} to="/recepty" >
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


                    <UserInfo />  </div>
            </main> : <div></div>}
        </>
    );
};

