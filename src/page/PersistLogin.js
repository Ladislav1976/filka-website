import { Outlet } from "react-router-dom";

import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useLocalStorage from "../hooks/useLocalStorage";
// import useAuth from "../hooks/useAuth";
import useAuth from "../hooks/useAuth";
import style from "./Register.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


export default function () {
    const [isLoading, setIsLoading] = useState(true)
    const refresh = useRefreshToken();
    const { auth } = useAuth();
    const [persist] = useLocalStorage('persist',false)
console.log("persist   :",persist)
    useEffect(() => {
        let isMounted = true
        async function verifyRefreshToken() {
            try {
                await refresh();
            }
            catch (err) {
                console.error(err)
            }
            finally {
                isMounted &&  setIsLoading(false)
            }
        }

        !auth?.access_token ? verifyRefreshToken() : setIsLoading(false)
        return ()=> isMounted = false;
    }, [])


    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`aT: ${JSON.stringify(auth?.access_token)}`)

    }, [isLoading])

    return (
        <>{!persist
            ? <Outlet />
            : isLoading ? <div className={style.loadingContainer}> Is loading
                <FontAwesomeIcon
                        className={style.loadingIcon}
                        icon={faSpinner}
                        id="inpFileIcon"
                        spin ></FontAwesomeIcon>
            </div>

                : <Outlet />
        }
        </>
    )
}