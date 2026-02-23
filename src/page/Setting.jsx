import style from '../assets/styles/Pages/Setting.module.css';
import TagGroup from '../components/TagGroup';
import Tag from '../components/Tag';
import Unit from '../components/Unit';
import { useTagGroups } from '../hooks/Queries/useTagGroups';
import { useUnit } from '../hooks/Queries/useUnit';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Modal from '../reports/Modal';
import DeleteConfirm from '../reports/DeleteConfirm';
import { useDeleteTag } from '../hooks/Mutations/useDeleteTag';
import { useDeleteGroup } from '../hooks/Mutations/useDeleteGroup';
import { useDeleteUnit } from '../hooks/Mutations/useDeleteUnit';
import { useState } from 'react';
export default function Tags() {
    const [modalDeleteFlag, setModalDeleteFlag] = useState(false);
    const [tagToDelete, setTagToDelete] = useState('');
    const [groupToDelete, setGroupToDelete] = useState('');
    const [unitToDelete, setUnitToDelete] = useState('');

    const [errMsg, setErrMsg] = useState('');
    const axiosPrivate = useAxiosPrivate();
    const tagGroupQf = useTagGroups(axiosPrivate);
    const unitQf = useUnit(axiosPrivate);
    const groups = tagGroupQf?.data || [];
    const units = unitQf?.data || [];

    const deleteTag = useDeleteTag(axiosPrivate);
    const deleteGroup = useDeleteGroup(axiosPrivate);
    const deleteUnit = useDeleteUnit(axiosPrivate);
    function handleTagDelete(tag) {
        if (!Number.isInteger(tag.id)) return;
        setTagToDelete(tag);
        setModalDeleteFlag(true);
    }

    function handleGroupDelete(tag) {
        if (!Number.isInteger(tag.id)) return;
        setGroupToDelete(tag);
        setModalDeleteFlag(true);
    }

    function handleUnitDelete(unit) {
        if (!Number.isInteger(unit.id)) return;
        setUnitToDelete(unit);
        setModalDeleteFlag(true);
    }

    function showErr(message) {
        setErrMsg(message);

        setTimeout(() => {
            setErrMsg('');
        }, 3000);
    }
    function deleteTagCanceled() {
        setModalDeleteFlag(false);
    }

    async function handleDeleteTag() {
        const id = tagToDelete?.id;
        if (!Number.isInteger(id)) return;
        try {
            const res = await deleteTag.mutateAsync({ id: id });
            if (res) {
                setModalDeleteFlag(false);
            }
        } catch (err) {
            if (err.status && err.response.data.detail) {
                showErr(err.response.data.detail);
            } else {
                showErr(`Problem so serverom.`);
            }
        }
    }
    async function handleDeleteGroup() {
        const id = groupToDelete?.id;
        if (!Number.isInteger(id)) return;
        try {
            const res = await deleteGroup.mutateAsync({ id: id });
            if (res) {
                setModalDeleteFlag(false);
            }
        } catch (err) {
            if (err.status && err.response.data.detail) {
                showErr(err.response.data.detail);
            } else {
                showErr(`Problem so serverom.`);
            }
        }
    }
    async function handleDeleteUnit() {
        const id = unitToDelete?.id;
        if (!Number.isInteger(id)) return;
        try {
            const res = await deleteUnit.mutateAsync({ id: id });
            if (res) {
                setModalDeleteFlag(false);
            }
        } catch (err) {
            if (err.status && err.response.data.detail) {
                showErr(err.response.data.detail);
            } else {
                showErr(`Problem so serverom.`);
            }
        }
    }
    function handleDelete() {
        if (tagToDelete) {
            handleDeleteTag();
        }
        if (groupToDelete) {
            handleDeleteGroup();
        }
        if (unitToDelete) {
            handleDeleteUnit();
        }
    }
    function sortingGroups(array) {
        return array
            ? [...array].sort((a, b) => a.groupName.localeCompare(b.groupName))
            : [];
    }

    function sortingTags(array) {
        return array
            ? [...array].sort((a, b) => a.foodTag.localeCompare(b.foodTag))
            : [];
    }
    if (tagGroupQf.isLoading || unitQf.isLoading) {
        return <div className={style.loadingContainer}>Načítavam ...</div>;
    }
    if (tagGroupQf.isError || unitQf.isError) {
        return <div className={style.error}>Chyba pri načítaní dát.</div>;
    }
    return (
        <>
            <div className={style.main}>
                <div className={style.container}>
                    <h3>Nastavenia</h3>
                    <div className={style.containerJednotky}>
                        <h3>Jednotky</h3>
                        <div className={style.inputContainer}>
                            <Unit />
                        </div>
                        <div className={style.unitContainer}>
                            <table className={style.tagTable}>
                                <thead>
                                    <tr>
                                        <th>Jednotka</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unitQf.isSuccess &&
                                        units.map((unit) => (
                                            <tr key={unit.id}>
                                                <td
                                                    className={
                                                        style.groupHeaderCell
                                                    }
                                                >
                                                    {unit.unit}{' '}
                                                    <div
                                                        className={
                                                            style.deleteIcon
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                            onClick={() => {
                                                                handleUnitDelete(
                                                                    unit,
                                                                );
                                                            }}
                                                        />
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className={style.containerTags}>
                        <h3>Kategorizácia jedál</h3>
                        <div className={style.inputContainer}>
                            <TagGroup />
                            <Tag tagGroupQf={tagGroupQf} />
                        </div>
                        <div className={style.tagsContainer}>
                            {tagGroupQf.isSuccess &&
                                sortingGroups(groups).map((group) => {
                                    // Tagy zoradene podla abecedy
                                    const sortedTags = sortingTags(group?.tags);

                                    return (
                                        <table
                                            className={style.tagTable}
                                            key={group.id}
                                        >
                                            <thead>
                                                <tr>
                                                    <th>Kategória</th>
                                                    <th>Označenie </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sortedTags.length > 0 ? (
                                                    sortedTags.map(
                                                        (tag, index) => (
                                                            <tr
                                                                key={`${group.id}${tag.id}`}
                                                            >
                                                                {index ===
                                                                    0 && (
                                                                    <td
                                                                        rowSpan={
                                                                            group
                                                                                .tags
                                                                                .length
                                                                        }
                                                                        className={
                                                                            style.groupHeaderCell
                                                                        }
                                                                    >
                                                                        {
                                                                            group.groupName
                                                                        }{' '}
                                                                        <div
                                                                            className={
                                                                                style.deleteIcon
                                                                            }
                                                                        >
                                                                            <FontAwesomeIcon
                                                                                icon={
                                                                                    faTrash
                                                                                }
                                                                                onClick={() => {
                                                                                    handleGroupDelete(
                                                                                        group,
                                                                                    );
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                )}
                                                                <td
                                                                    className={
                                                                        style.tagCell
                                                                    }
                                                                >
                                                                    {
                                                                        tag.foodTag
                                                                    }
                                                                    <div
                                                                        className={
                                                                            style.deleteIcon
                                                                        }
                                                                    >
                                                                        <FontAwesomeIcon
                                                                            icon={
                                                                                faTrash
                                                                            }
                                                                            onClick={() => {
                                                                                handleTagDelete(
                                                                                    tag,
                                                                                );
                                                                            }}
                                                                        />
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        ),
                                                    )
                                                ) : (
                                                    <tr key={group.id}>
                                                        <td
                                                            className={
                                                                style.groupHeaderCell
                                                            }
                                                        >
                                                            {group.groupName}{' '}
                                                            <div
                                                                className={
                                                                    style.deleteIcon
                                                                }
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTrash
                                                                    }
                                                                    onClick={() => {
                                                                        handleGroupDelete(
                                                                            group,
                                                                        );
                                                                    }}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td
                                                            className={
                                                                style.tagCell
                                                            }
                                                        >
                                                            <i>-</i>
                                                        </td>
                                                    </tr>
                                                )}
                                            </tbody>
                                        </table>
                                    );
                                })}
                        </div>
                    </div>
                </div>
            </div>
            <Modal visible={modalDeleteFlag} setModalFlag={setModalDeleteFlag}>
                <DeleteConfirm
                    item={
                        tagToDelete.foodTag ||
                        groupToDelete.groupName ||
                        unitToDelete.unit
                    }
                    errMsg={errMsg}
                    onDelete={handleDelete}
                    onDeleteCancel={deleteTagCanceled}
                ></DeleteConfirm>
            </Modal>
        </>
    );
}
