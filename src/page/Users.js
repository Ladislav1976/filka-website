import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";

import style from "./Register.module.css";
import useAuth from "../hooks/useAuth";

import { useNavigate, useLocation } from 'react-router-dom';

import { useUsers } from "../hooks/Queries/useUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";


export default function Users() {

    const [users, setUsers] = useState()

    const axiosPrivate = useAxiosPrivate()
    const controller = new AbortController();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    console.log(users)

    const getUsers = useUsers(axiosPrivate, controller

    )
    useEffect(() => {
        let isMounted = true;
        if (getUsers.isSuccess) {
            setUsers(getUsers.data)

        }
        // const controller = new AbortController();

        // const users = useUsers(axiosPrivate,controller)
        // async function getUsers() {
        //     try {
        //         const response = await axiosPrivate.get('userslist/', {
        //             signal: controller.signal
        //         })
        //         console.log(response.data)
        //         isMounted && setUsers(response?.data)
        //     } catch (err) {

        //         if (err instanceof DOMException && err.name === "CanceledError") {
        //             console.log(err.message);
        //         } else {
        //             console.error(err);
        //             // navigate('/login',{state:{from:location},replace:true})
        //         }
        //         // if (err?.response?.status != 401 ){

        //         // }
        //     }
        // }



        // getUsers();
        return () => {
            isMounted = false;
            // controller.abort();
        }


    }, [getUsers])



    return (
        <>
            {getUsers.isLoading ? (
        
                    <div className={style.loadingContainer}>
                        <FontAwesomeIcon
                            className={style.loadingIcon}
                            icon={faSpinner}
                  
                            spin ></FontAwesomeIcon>
                    </div>
        
            )
                : (<main className={style.App}>
                    <section>
                        <h2>Zoznam užívateľov</h2>
                        {users?.length
                            ?
                            (
                                <>
                                    {
                                        <table>
                                            <tbody>
                                                <tr>
                                                    <th >P.č.</th>
                                                    <th >Meno</th>
                                                    <th >Priezvisko</th>
                                                    <th >Právomoc</th>
                                                </tr>
                                           
                                            {users.map((user, i) => <tr key={user?.id}><th >{i + 1}</th><th >{user?.first_name}</th><th >{user?.last_name}</th><th >{user?.role}</th></tr>)}
                                            </tbody>
                                        </table>
                                    }
                                </>
                            ) : <p>Zoznam užívateľov nie je dostupný</p>
                        }


                    </section>
                </main>)}
        </>

    )
}