import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import style from "./Register.module.css";
const Layout = () => {
    return (
        <main className={style.layout}>
            {/* <div className={style.sticky} >
            <Navbar />
            </div> */}
            <Outlet />
        </main>
    )
}

export default Layout

