import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import style from "./Register.module.css";

const Layout2 = () => {

    return (
        <main className={style.layout}>
            <div className={style.navheader} >
                <Navbar />
            </div>
            <Outlet />
        </main>
    )
}

export default Layout2

