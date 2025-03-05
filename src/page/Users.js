import { useState, useEffect } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import style from "./Register.module.css";
import useAuth from "../hooks/useAuth";
import Modal from "../reports/Modal";
import SaveError from "../reports/SaveError";
import { useNavigate, useLocation } from 'react-router-dom';

import { useUsers } from "../hooks/Queries/useUsers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faXmark, faCheck, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
// import { putDataPrivate } from "../hooks/use-post";
import { usePutUser } from "../hooks/Mutations/usePutUser";


function Role(props) {
    const [modalErrorFlag, setModalErrorFlag] = useState(false);
    const [roleDefault, setRoleDefault] = useState("");
    const [role, setRole] = useState(props.user?.role);

    const controller = new AbortController();
    const axiosPrivate = useAxiosPrivate()

    const putUser = usePutUser(setRole, roleDefault, setRoleDefault, handlerSetModalError, axiosPrivate, controller, props.user?.id)

    function handlerSetModalError() {
        setModalErrorFlag(true)
        setTimeout(() => {
            setModalErrorFlag(false)
        }, 3000)
    }

    function handleUpdateRole(event) {
        if (roleDefault == "") {

            if (event.target.value != "Admin") {
                setRoleDefault(role)
                setRole(event.target.value)
            }
        } else {
            if (event.target.value != "Admin") {
                setRole(event.target.value)
            };
        }

    }

    function handleCancelRole() {
        if (roleDefault != "") {
            setRole(roleDefault);
            setRoleDefault("")
        }
    }

    function handlePostRole() {

        // if (roleDefault != "") 
        // {
        console.log("POST")
        putUser.mutate({
            id: props.user?.id,
            email: props.user?.email,
            role: role
        })
        // };
    }


    return (<>
        <div className={style.rolebox}>
            <select
                className={style.roleinput}
                disabled={role === "Admin" ? true : false}
                onChange={handleUpdateRole}
                value={role}
            // ref={props.unitRef}
            // onKeyDown={props.unitKeyDown}
            >
                <option hidden={true} value="Admin">Admin</option>
                <option value="Editor">Editor</option>
                <option value="User_edit">User_edit</option>
                <option value="User_readOnly">User_readOnly</option>
            </select>
            <div className={roleDefault == "" ? style.OKIcon : style.editIcon} datatooltip={roleDefault == "" ? "OK" : "Uložiť"} hidden={role === "Admin" ? true : false}>
                <FontAwesomeIcon
                    color={roleDefault == "" ? "#558113" : "#fd0000"}

                    // className={style.editIcon}
                    icon={roleDefault == "" ? faCheck : faFloppyDisk}
                    onClick={roleDefault != "" ? handlePostRole : () => { return false }}
                /></div>

            <div className={style.deleteIcon} hidden={role === "Admin" ? true : false}>
                <FontAwesomeIcon
                    // className={style.cancelIcon}
                    icon={faXmark}
                    onClick={handleCancelRole}
                />
            </div>
        </div>
        <Modal visible={modalErrorFlag} setModalFlag={setModalErrorFlag}>
            <SaveError
            ></SaveError>
        </Modal>
    </>)
}

export default function Users() {

    const [users, setUsers] = useState()

    const axiosPrivate = useAxiosPrivate()
    const controller = new AbortController();
    const { auth } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();


    const getUsers = useUsers(axiosPrivate, controller)




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
                                        <table className={style.tableusers}>
                                            <tbody>
                                                <tr >
                                                    <th className={style.fontheader}>P.č.</th>
                                                    <th className={style.fontheader}>Meno</th>
                                                    <th className={style.fontheader}>Priezvisko</th>
                                                    <th className={style.fontheader}>Právomoc</th>
                                                </tr>
                                                {users.map((user, i) => <tr key={user?.id}><td >{i + 1}</td><td >{user?.first_name}</td><td >
                                                    {user?.last_name}
                                                </td><td >
                                                        <Role user={user} />
                                                    </td></tr>)}
                                            </tbody>
                                        </table>
                                    }
                                </>
                            ) : <p>Zoznam užívateľov nie je dostupný</p>
                        }



                    </section>
                    <div className={style.popisky}>




                        <table >
                            <tbody>
                                <tr>
                                    <td className={style.fonttable}>Admin</td><td className={style.fonttable}>- Admin</td>
                                </tr>
                                <tr>
                                    <td className={style.fonttable}>Editor</td><td className={style.fonttable}>- Môže editovať všetky recepty</td>
                                </tr>
                                <tr>
                                    <td className={style.fonttable}>User_edit</td><td className={style.fonttable}>- Môže editovať iba vlastne recepty</td>
                                </tr>
                                <tr>
                                    <td className={style.fonttable}>User_readOnly</td><td className={style.fonttable}>- Nemôže editovať</td>
                                </tr>
                            </tbody>
                        </table>
                        <br />
                        <table >
                            <tbody>
                                <tr>
                                    <td className={style.fonttable}><FontAwesomeIcon icon={faCheck} style={{ color: "558113" }} /></td><td className={style.fonttable}>- Uložené</td>
                                </tr>
                                <tr>
                                    <td className={style.fonttable}><FontAwesomeIcon icon={faFloppyDisk} style={{ color: "fd0000" }} /></td><td className={style.fonttable}>- Uložiť</td>
                                </tr>
                                <tr>
                                    <td className={style.fonttable}><FontAwesomeIcon icon={faXmark} style={{ color: "rgb(68, 68, 68)" }} /></td><td className={style.fonttable}>- Zrušiť</td>
                                </tr>
                            </tbody>
                        </table>

                    </div>
                </main>)}
        </>

    )
}