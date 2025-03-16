import React, { useState } from 'react'
import style from "./LeftPanelFilter.module.css";
import { useUsers } from "../hooks/Queries/useUsers";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
export default function UsersFilter(props) {

    const component = props.component
    const axiosPrivate = useAxiosPrivate()
    const usersQf = useUsers(axiosPrivate)
    const [open, setOpen] = useState(false)
    function upDownCSS() {
        if (open) { return style.down } else { return style.up }
    }
    function labelParents() {
        if (open) { return style.labelParentsActive } else { return style.labelParentsNoNActive }
    }
    return (
        <main>
            <div className={props.component === "foodscomponent" ? style.checkboxContainer : style.displayNoN} onClick={() => setOpen(!open)}>
                <label className={props.component === "foodscomponent" ? style.labelParentsActive : style.displayNoN} htmlFor="usersfilter" >Uzivatelia:</label>
                <div className={upDownCSS()}
                >&#10094;</div>
            </div>
            <div className={style.checkBoxOpenner} >
                {open && <>
                    < input
                        name="usersfilter"
                        type='text'
                        placeholder='Hladat'>
                    </input>
                    <table>
                        <tbody>
                            {usersQf?.data?.map((user, i) => <tr key={user?.id}><td >{i + 1}</td><td >{user?.first_name}</td><td >
                                {user?.last_name}
                            </td><td>
                                    <input
                                        type="checkbox"
                                        // checked={handleFilterTagListArray(user)}
                                        name="user"
                                        className={style.checkboxInput}
                                        value={user}
                                        id={user.id}

                                        onChange={() => props.handleAddTagToFoodTagsList({type: "user",tag: user})}
                                    />
                                    <div
                                        className={style.buttonUser}                               
                                        onClick={() => props.handleAddTagToFoodTagsList({type: "user",tag: user})}
                                    />

                                </td></tr>)}
                        </tbody>
                    </table>
                </>}
            </div>
        </main >


    )
}
