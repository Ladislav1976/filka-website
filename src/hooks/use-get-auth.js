import { useState, useEffect } from "react";
import useAxiosPrivate from "./useAxiosPrivate";


import useAuth from "./useAuth";

import {  useNavigate, useLocation } from 'react-router-dom';


export default function useGetAuth({queryKey}){
    // console.log("URL :",(queryKey[0]))
    const [users, setUsers] = useState([])

    const axiosPrivate = useAxiosPrivate()
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();

        async function getUsers() {
            try {
                const response = await axiosPrivate.get(queryKey, {
                    signal: controller.signal
                       })
                console.log(response.data)
                isMounted && setUsers(response.data)
            } catch (err) {
                console.error(err);
                if (err?.response?.status === 401 ){
                navigate('/login',{state:{from:location},replace:true})
                }
            }
        }
        

        getUsers();
        return () => {
            isMounted = false;
            controller.abort();
            
        }


    }, [])


console.log( "users 2 :",users)
    return users
}
