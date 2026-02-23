import { Outlet } from 'react-router-dom';

import { useState, useEffect } from 'react';
import useRefreshToken from '../hooks/useRefreshToken';
import useLocalStorage from '../hooks/useLocalStorage';
import useAuth from '../hooks/useAuth';
import style from '../assets/styles/Pages/PersistLogin.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

export default function PersistLogin() {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [persist] = useLocalStorage('persist', false);

    useEffect(() => {
        let isMounted = true;
        async function verifyRefreshToken() {
            try {
                await refresh();
            } catch (err) {
                console.error(err);
            } finally {
                isMounted && setIsLoading(false);
            }
        }

        !auth?.access_token ? verifyRefreshToken() : setIsLoading(false);
        return () => (isMounted = false);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // useEffect(() => {
    //     console.log(`isLoading: ${isLoading}`);
    //     console.log(`aT: ${JSON.stringify(auth?.access_token)}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [isLoading]);

    return (
        <>
            {!persist ? (
                <Outlet />
            ) : isLoading ? (
                <div className={style.loadingContainer}>
                    Is loading
                    <FontAwesomeIcon
                        className={style.loadingIcon}
                        icon={faSpinner}
                        id="inpFileIcon"
                        spin
                    ></FontAwesomeIcon>
                </div>
            ) : (
                <Outlet />
            )}
        </>
    );
}
