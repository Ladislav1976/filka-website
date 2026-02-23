import useAuth from './useAuth';
import Cookies from 'js-cookie';
import CSRFToken from '../page/CSFRToken';
import { useNavigate } from 'react-router-dom';
import useAxiosPrivate from './useAxiosPrivate';

const useLogout = (errRef, handlerSetErrMessage) => {
    const { setAuth } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const LOGOUT_URL = 'logout';

    const navigate = useNavigate();
    const controller = new AbortController();
    <CSRFToken />;
    const logout = async () => {
        try {
            const response = await axiosPrivate.post(
                LOGOUT_URL,
                {},
                {
                    headers: {
                        // Accept: 'application/json',
                        'Content-Type': 'application/json',
                        'X-CSRFToken': Cookies.get('csrftoken'),
                    },
                    withCredentials: true,
                    signal: controller.signal,
                },
            );

            if (response.status === 204) {
                setAuth({});
                navigate('login');
            }
        } catch (err) {
            if (!err?.response) {
                handlerSetErrMessage('Porucha servera');
            } else if (err.response?.status === 404) {
                handlerSetErrMessage('Odhásenie zlyhalo');
                // errRef.current.focus();
            }
        }
    };

    return logout;
};

export default useLogout;
