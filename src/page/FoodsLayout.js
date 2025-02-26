import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"
import style from "./Register.module.css";
const FooodsLayout = () => {
    return (
        <main className={style.layout}>
                        <header className={style.header}>RECEPTY</header>
            {/* <div className={style.sticky} >
            <Navbar />
            </div> */}
            <Outlet />
        </main>
    )
}

export default FooodsLayout

