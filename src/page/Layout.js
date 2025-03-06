import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import style from "./Register.module.css";
const Layout = () => {
    return (
        <div className={style.body}>
            <Outlet />
        </div>
    )
}

export default Layout

