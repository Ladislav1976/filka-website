import { Link } from "react-router-dom";
import style from "./Register.module.css";
import Users from "./Users";

export default function Admin() {
    return (
        <main className={style.layout}>
      
                <Users />

        </main>
    )
}