import { axiosPrivate } from "../api/axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import useAuth from "./useAuth"
// import { config } from "@fortawesome/fontawesome-svg-core";


export default function useAxiosPrivate(props) {

    const refresh = useRefreshToken();
    const { auth, csrftoken } = useAuth();
    // console.log("csrftoken",csrftoken)
    // console.log("auth?.access_token",auth?.access_token)
    // console.log("auth?.auth",auth?.userRes)
    useEffect(() => {

        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.access_token}`;
                    config.headers['X-CSRFToken'] = csrftoken

                }
                return config;
            }, (error) => Promise.reject(error)
        )
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if (error?.response?.status === 401
                    && !prevRequest.sent
                ) {
                    prevRequest.sent = true;
                    const { csrfToken: newCSRFToken, accessToken: newAccessToken } = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    prevRequest.headers['X-CSRFToken'] = newCSRFToken;
                    return axiosPrivate(prevRequest);
                } return Promise.reject(error)
            }
        )

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh,csrftoken])
    return axiosPrivate
}