import axios from "../api/axios";
import useAuth from "./useAuth";
import { useNavigate, useLocation } from 'react-router-dom';

export default function useRefreshToken() {

    const { auth, setAuth, csrftoken, setCSRFToken } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const refresh = async () => {

        try {
            const response = await axios.post('api/token/refresh/', {}
            );
            setAuth(prev => {
                return {
                    ...prev,
                    access_token: response?.data?.access?.access,
                    userRes: response?.data?.user
                }
            })
            setCSRFToken(response?.headers["x-csrftoken"])
            return { accessToken: response.data.access.access, csrfToken: response.headers["x-csrftoken"] }
        } catch (err) {
            if (err?.response?.status === 401) {
                navigate('/login', { state: { from: location }, replace: true })
            }
        }

    }

    return refresh;
}