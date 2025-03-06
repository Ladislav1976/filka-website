import axios from "../api/axios";
import useAuth from "./useAuth";
import wav from "../audio/button-43.wav";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "./useAxiosPrivate";

const useLogout = (errRef, setErrMsg) => {
    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate()
    const LOGOUT_URL = 'logout';
    const audio = new Audio(wav)
    const navigate = useNavigate()
    const controller = new AbortController();
    const logout = async () => {
    

        try {
            const response = await axiosPrivate.post(LOGOUT_URL, {
                signal: controller.signal
            });
            setAuth({})
            navigate("login");
            audio.play()
        } catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status === 405) {
                setErrMsg('Login Failed');
                errRef.current.focus();
            }
        }
    }

    return logout;
}

export default useLogout