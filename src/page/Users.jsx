import { useState, useEffect } from 'react';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import style from '../assets/styles/Pages/Users.module.css';
import { useUsers } from '../hooks/Queries/useUsers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import user_image from '../image/user_image.png';
import { faSpinner, faCircle } from '@fortawesome/free-solid-svg-icons';

import UserCard from '../components/UserCard';
import ModalUserCard from '../reports/ModalUserCard';

export default function Users() {
    const [users, setUsers] = useState();
    const [modalAdminFlag, setModalAdminFlag] = useState(false);
    const [userCard, setUserCard] = useState(null);

    const axiosPrivate = useAxiosPrivate();

    const getUsers = useUsers(axiosPrivate);

    function closeModal(e) {
        setModalAdminFlag(false);
    }

    const ROLES = [
        { role: 'Admin', viewRole: 'Admin' },
        { role: 'User_readOnly', viewRole: 'Read' },
        {
            role: 'User_edit',
            viewRole: 'Self Edit',
        },
        { role: 'Editor', viewRole: 'Edit' },
    ];

    useEffect(() => {
        // eslint-disable-next-line no-unused-vars
        let isMounted = true;
        if (getUsers.isSuccess) {
            setUsers(getUsers.data);
        }

        return () => {
            isMounted = false;
        };
    }, [getUsers]);

    return (
        <>
            {getUsers.isLoading ? (
                <div className={style.loadingContainer}>
                    <FontAwesomeIcon
                        className={style.loadingIcon}
                        icon={faSpinner}
                        spin
                    ></FontAwesomeIcon>
                </div>
            ) : (
                <div className={style.main}>
                    <div className={style.submitContainer}>
                        <form className={style.form}>
                            <div className={style.inputContainer}>
                                <h3>Zoznam užívateľov</h3>
                                <div className={style.tableWrapper}>
                                    {users?.length ? (
                                        <>
                                            {
                                                <table
                                                    className={style.tableusers}
                                                >
                                                    <thead>
                                                        <tr>
                                                            <th
                                                                className={
                                                                    style.fontheader
                                                                }
                                                            ></th>
                                                            <th
                                                                className={
                                                                    style.fontheader
                                                                }
                                                            >
                                                                P.č.
                                                            </th>
                                                            <th
                                                                className={
                                                                    style.fontheader
                                                                }
                                                            >
                                                                Meno
                                                            </th>
                                                            <th
                                                                className={
                                                                    style.fontheader
                                                                }
                                                            >
                                                                Priezvisko
                                                            </th>
                                                            <th
                                                                className={
                                                                    style.fontheader
                                                                }
                                                            >
                                                                Práva
                                                            </th>
                                                            <th
                                                                className={
                                                                    style.fontheader
                                                                }
                                                            >
                                                                Status
                                                            </th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {getUsers.data.map(
                                                            (user, i) => (
                                                                <tr
                                                                    key={
                                                                        user.id
                                                                    }
                                                                >
                                                                    <td>
                                                                        <img
                                                                            className={
                                                                                style.imgage
                                                                            }
                                                                            src={
                                                                                user.avatar ||
                                                                                user_image
                                                                            }
                                                                            alt=""
                                                                            onClick={() => {
                                                                                setModalAdminFlag(
                                                                                    true,
                                                                                );
                                                                                setUserCard(
                                                                                    user,
                                                                                );
                                                                            }}
                                                                        />
                                                                    </td>
                                                                    <td>
                                                                        {i + 1}
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            user?.first_name
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {
                                                                            user?.last_name
                                                                        }
                                                                    </td>
                                                                    <td>
                                                                        {ROLES.map(
                                                                            (
                                                                                r,
                                                                            ) =>
                                                                                r.role ===
                                                                                user?.role
                                                                                    ? r.viewRole
                                                                                    : '',
                                                                        )}
                                                                    </td>
                                                                    <td
                                                                        style={{
                                                                            color: user?.is_active
                                                                                ? 'rgb(1, 168, 1)'
                                                                                : '#999',
                                                                        }}
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            style={{
                                                                                width: '2rem',
                                                                                color: user?.is_active
                                                                                    ? 'rgb(1, 168, 1)'
                                                                                    : '#999',
                                                                            }}
                                                                            icon={
                                                                                faCircle
                                                                            }
                                                                        ></FontAwesomeIcon>
                                                                        {user?.is_active ? (
                                                                            <span>
                                                                                aktívny
                                                                            </span>
                                                                        ) : (
                                                                            <span>
                                                                                neaktívny
                                                                            </span>
                                                                        )}
                                                                    </td>
                                                                </tr>
                                                            ),
                                                        )}
                                                    </tbody>
                                                </table>
                                            }
                                        </>
                                    ) : (
                                        <p>Zoznam užívateľov nie je dostupný</p>
                                    )}
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            <ModalUserCard
                visible={modalAdminFlag}
                setModalFlag={setModalAdminFlag}
            >
                <UserCard
                    key={userCard?.id || ''}
                    userCard={userCard}
                    closeModal={closeModal}
                ></UserCard>
            </ModalUserCard>
        </>
    );
}
