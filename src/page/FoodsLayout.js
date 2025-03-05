import { Outlet } from "react-router-dom"
import style from "./Register.module.css";
const FooodsLayout = () => {
    return (
        <main className={style.layout}>
            <header className={style.header}>RECEPTY</header>

            <Outlet />
        </main>
    )
}

export default FooodsLayout

