import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import style from "./Register.module.css";
const AdminLayout = () => {
    return (
        <main className={style.layout}>
            <header className={style.header} >Admin</header>

            <Outlet />
        </main>
    )
}

export default AdminLayout

