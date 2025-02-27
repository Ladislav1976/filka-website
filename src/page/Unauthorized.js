import { useNavigate } from "react-router-dom"
import style from "./Register.module.css";
const Unauthorized = () => {
    const navigate = useNavigate();

    const goBack = () => navigate(-1);

    return (
        <main className={style.App}>
            <section>
                <h1>Prístup zamietnuty</h1>
                <br />
                <p>Nemáte povolený prístup na editovanie stránky.</p>
                <div className="flexGrow">
                    <button onClick={goBack}>Späť</button>
                </div>
            </section>
        </main>
    )
}

export default Unauthorized