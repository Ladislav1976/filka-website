import { useState, useEffect, useRef } from 'react';

import { useNavigate, useLocation } from 'react-router-dom';
import StepsInput from '../components/StepsInput';
import SaveLoading from '../reports/SaveLoading';
import SaveSaved from '../reports/SaveSaved';
import SaveError from '../reports/SaveError';
import SaveErrorMissing from '../reports/SaveErrorMissing';
import Lightbox from '../components/Lightbox';
import style from '../assets/styles/Pages/NewFood.module.css';
import IngredientInput from '../components/IngredientInput';
import LeftPanelFilter from '../components/LeftPanelFilter';
import Image from '../components/Image';
import UrlInput from '../components/UrlInput';
import Modal from '../reports/Modal';
import ModalPreview from '../reports/ModalPreview';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward, faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

import useAuth from '../hooks/useAuth';
import useAxiosPrivate from '../hooks/useAxiosPrivate';
import { useUnit } from '../hooks/Queries/useUnit';
import { useTagGroups } from '../hooks/Queries/useTagGroups';
import { usePostFood } from '../hooks/Mutations/usePostFood';
import { usePostImage } from '../hooks/Mutations/usePostImage';

import { useQueryClient } from '@tanstack/react-query';
import MenuToggle from '../components/MenuToggle';

function NewFood(props) {
    const { auth, pageSize } = useAuth();
    const axiosPrivate = useAxiosPrivate();
    const queryClient = useQueryClient();
    const component = 'newcomponent';
    const navigate = useNavigate();
    const unitQf = useUnit(axiosPrivate);
    const tagGroupQf = useTagGroups(axiosPrivate);
    // const [isSaving, setIsSaving] = useState(false);
    const location = useLocation();
    let uniqueID = new Date().toISOString();
    const foods =
        location.state?.foods.pathname + location.state?.foods.search || '/';

    const goBack = () => navigate(foods);

    const postImage = usePostImage(axiosPrivate);

    const [name, setName] = useState('');
    const [ingredientsList, setIngredientsList] = useState([]);
    const [urlList, setUrlList] = useState([]);
    const [stepsList, setStepsList] = useState([]);
    const [foodTagSet, setFoodTagSet] = useState(new Set());

    const [images, setImages] = useState('');
    const [imageURLsList, setImageURLsList] = useState([]);

    const [modalLoadingFlag, setModalLoadingFlag] = useState(false);
    const [modalSavedFlag, setModalSavedFlag] = useState(false);
    const [modalErrorFlag, setModalErrorFlag] = useState(false);
    const [modalSaveErrorMissingFlag, setModalSaveErrorMissingFlag] =
        useState(false);
    const [errMsg, setErrMsg] = props.errMsg;
    const [modalLightboxFlag, setModalLightboxFlag] = useState(false);
    const [isVisibleEdit, setIsVisibleEdit] = useState(false);

    const [toggle, setToggle] = useState(false);

    const postFood = usePostFood(
        axiosPrivate,
        setModalLoadingFlag,
        handlerSetModalError,
        makeImagesRecord,
    );

    const nameRef = useRef();
    const urlRef = useRef();
    const stepRef = useRef();
    const qtRef = useRef();
    const unitRef = useRef();
    const ingrRef = useRef();

    function nameKeyDown(event) {
        if (event.key === 'Enter') {
            urlRef.current.focus();
        }
    }
    function urlKeyDown(event) {
        if (event.key === 'Enter') {
            stepRef.current.focus();
        }
    }
    function stepKeyDown(event) {
        if (event.key === 'Enter') {
            qtRef.current.focus();
        }
    }

    function qrKeyDown(event) {
        if (event.key === 'Enter') {
            unitRef.current.focus();
        }
    }

    function unitKeyDown(event) {
        if (event.key === 'Enter') {
            ingrRef.current.focus();
        }
    }
    function ingKeyDown(event) {
        if (event.key === 'Enter') {
            nameRef.current.focus();
        }
    }

    function handleFoodSave() {
        const filterIngredients = ingredientsList.filter(
            (ingre) => ingre.position !== 'delete',
        );
        if (
            name === '' &&
            filterIngredients.length === 0 &&
            foodTagSet.size === 0 &&
            stepsList.length === 0
        ) {
            handlerSetModalErrorMissing(
                'Doplň chýbajúce informácie: Nazov jedla, Suroviny, Druj jedla, Postup',
            );
        } else if (
            filterIngredients.length === 0 &&
            foodTagSet.size === 0 &&
            stepsList.length === 0
        ) {
            handlerSetModalErrorMissing(
                'Doplň chýbajúce informácie: , Suroviny, Druj jedla, Postup',
            );
        } else if (
            name === '' &&
            foodTagSet.size === 0 &&
            stepsList.length === 0
        ) {
            handlerSetModalErrorMissing(
                'Doplň chýbajúce informácie: Nazov , Druj jedla, Postup',
            );
        } else if (
            name === '' &&
            filterIngredients.length === 0 &&
            stepsList.length === 0
        ) {
            handlerSetModalErrorMissing(
                'Doplň chýbajúce informácie: Nazov, Suroviny, Postup',
            );
        } else if (
            name === '' &&
            filterIngredients.length === 0 &&
            foodTagSet.size === 0
        ) {
            handlerSetModalErrorMissing(
                'Doplň chýbajúce informácie: Nazov, Suroviny, Druj jedla',
            );
        } else if (name === '' && filterIngredients.length === 0) {
            handlerSetModalErrorMissing(
                'Doplň chýbajúce informácie: Nazov,Suroviny',
            );
        } else if (name === '' && foodTagSet.size === 0) {
            handlerSetModalErrorMissing(
                'Doplň chýbajúce informácie: ,Nazov, Druj jedla',
            );
        } else if (name === '' && stepsList.length === 0) {
            handlerSetModalErrorMissing(
                'Doplň chýbajúce informácie: Nazov, Postup',
            );
        } else if (filterIngredients.length === 0 && foodTagSet.size === 0) {
            handlerSetModalErrorMissing(
                'Doplň chýbajúce informácie: Suroviny,Druj jedla',
            );
        } else if (filterIngredients.length === 0 && stepsList.length === 0) {
            handlerSetModalErrorMissing(
                'Doplň chýbajúce informácie: Suroviny,Postup',
            );
        } else if (name === '') {
            handlerSetModalErrorMissing('Doplň chýbajúce informácie: Nazov');
        } else if (filterIngredients.length === 0) {
            handlerSetModalErrorMissing('Doplň chýbajúce informácie: Suroviny');
        } else if (foodTagSet.size === 0) {
            handlerSetModalErrorMissing(
                'Doplň chýbajúce informácie: Druj jedla',
            );
        } else if (stepsList.length === 0) {
            handlerSetModalErrorMissing('Doplň chýbajúce informácie: Postup');
        } else {
            makeFoodRecord({
                name: name,
                date: new Date().toISOString().substring(0, 10),
                foodTags: [...foodTagSet].map((tag) => tag.id),
                user: auth.userRes.id ? auth.userRes.id : '',
                steps: stepsList
                    ?.filter((i) => !i.statusDelete)
                    .map((res, index) => {
                        return {
                            // id: res.id,
                            step: res.step,
                            position: index + 1,
                        };
                    }),
                urls: urlList
                    ?.filter((i) => !i.statusDelete)
                    .map((res, index) => {
                        return {
                            // id: res.id,

                            url: res.url,
                            urlname: res.urlname,
                        };
                    }),
                ingredients: ingredientsList
                    ?.filter((i) => !i.statusDelete)
                    .map((res, index) => {
                        console.log('res :', res);
                        return {
                            // id: res.id,
                            units: [res.unit.id],
                            quantity: res.quantity,
                            ingredientName: [res.ingredient.ingredient],

                            position: index + 1,
                        };
                    }),
            });
        }
    }
    function tagSearchInArray(array, tag) {
        if (!tag || !array) return false;

        return array.some((item) => {
            if (String(item?.id) !== String(tag?.id)) return false;
            const tagMatch =
                item?.foodTag?.toLowerCase() === tag?.foodTag?.toLowerCase();
            const emailMatch = item?.email === tag?.email;

            return tagMatch || emailMatch;
        });
    }
    function foodTagSetCheck(tag) {
        const response = tagSearchInArray([...foodTagSet], tag);
        if (response) {
            removeFromFoodTagSet(tag);
        } else {
            addTagTofoodTagSet(tag);
        }
    }

    // eslint-disable-next-line no-unused-vars
    function normalizeText(text) {
        // Funkcia na odstranenie diakritiky
        return text
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase();
    }

    function addTagTofoodTagSet(foodTag) {
        let newFoodTagSet = new Set(foodTagSet);
        newFoodTagSet.add(foodTag);
        setFoodTagSet(newFoodTagSet);
    }

    function addToIngredientList(quantity, unit, ing) {
        console.log(quantity, unit, ing);
        if (ing === '') {
            return;
        }
        let newIngredientsList = ingredientsList.slice();

        newIngredientsList.push({
            id: uniqueID,
            quantity: quantity,
            unit: unit,
            ingredient: ing,
            statusDelete: false,
        });

        setIngredientsList(newIngredientsList);
    }

    function makeIngredientsDelete(ingre) {
        setIngredientsList(makeItemDelete(ingre, ingredientsList));
    }

    function makeSteptoDelete(step) {
        setStepsList(makeItemDelete(step, stepsList));
    }

    function makeUrlToDelete(url) {
        setUrlList(makeItemDelete(url, urlList));
    }

    function makeItemDelete(item, array) {
        let newArray = array.slice();
        newArray.forEach((ingre) => {
            console.log(ingre, item);
            if (ingre.id === item.id) {
                ingre.statusDelete = true;
            }
        });
        // console.log('array 1:', array);
        // let itemIDPosition = getPosition(item.id, array);
        // let newArray = array.slice();
        // newArray.splice(itemIDPosition, 1, { ...item, statusDelete: true });
        // console.log('array 2:', newArray);
        return newArray;
    }

    function updateStepList(oldID, newID, step) {
        setStepsList(
            updateItemList(
                oldID,
                newID,
                { i: oldID, step: step },
                { i: newID, step: step },
                stepsList,
            ),
        );
    }

    function updateUrlList(oldID, newID, url) {
        setUrlList(
            updateItemList(
                oldID,
                newID,
                { i: oldID, url: url },
                { i: newID, url: url },
                urlList,
            ),
        );
    }

    function updateItemList(oldID, newID, itemOldObj, itemNewObj, array) {
        let position = getPosition(oldID, array);
        console.log(itemOldObj, itemNewObj);
        let newArray = array.slice();
        if (Number.isInteger(oldID)) {
            newArray.splice(position, 1, itemOldObj);
        }
        if (!Number.isInteger(oldID)) {
            if (newID === '') {
                newArray.splice(position, 1, itemOldObj);
            }
            if (newID) {
                newArray.splice(position, 1, itemNewObj);
            }
        }
        return newArray;
    }

    function handleAddUrl(url, urlList) {
        if (url.url === '') return;
        setUrlList(addItem(url, urlList));
    }

    function handleAddStep(step, stepsList) {
        if (step.step === '') return;
        setStepsList(addItem(step, stepsList));
    }

    function addItem(itemObj, array) {
        let newArray = array.slice();
        newArray.push(itemObj);
        return newArray;
    }

    function removeFromFoodTagSet(tag) {
        const filteredArray = Array.from(foodTagSet).filter((item) => {
            const idMatch = item?.id === tag?.id;
            const tagMatch =
                Boolean(item?.id !== 0) &&
                Boolean(item?.foodTag && tag?.foodTag) &&
                item?.foodTag?.toLowerCase() === tag?.foodTag?.toLowerCase();
            const emailMatch =
                Boolean(item?.id !== 0) &&
                Boolean(item?.email && tag?.email) &&
                item?.email === tag?.email;
            const searchMatch =
                Boolean(item?.id === 0) &&
                Boolean(item?.searchTag && tag?.searchTag) &&
                item?.searchTag === tag?.searchTag;
            const match =
                (tagMatch && idMatch) || (emailMatch && idMatch) || searchMatch;
            return !match;
        });
        let newFoodTagSet = new Set(filteredArray);
        newFoodTagSet.delete(tag);
        setFoodTagSet(newFoodTagSet);
    }

    function handleDataID(res) {
        let array = [];
        res.forEach((r) => {
            if (!r) return;
            // zmazane (status 204)
            if (r.status === 204) return;
            if (r.data && r.data.id) {
                array.push(r.data.id);
            }
        });
        return array;
    }

    async function imagiesForPostHandler(food) {
        const date = new Date(food.date).toISOString().substring(0, 10);
        const seconds = new Date(food.date).getUTCMilliseconds();

        return Promise.all(
            imageURLsList?.map((res, index) => {
                let formdata = new FormData();
                formdata.append('food', food.id);
                formdata.append(
                    'upload_folder',
                    `${food.name}-${date}-${seconds}`,
                );
                formdata.append('image', res.imageForBackEnd);
                formdata.append('position', index + 1);

                if (!Number.isInteger(res.id) && res.statusDelete === false) {
                    return postImage.mutateAsync({ formdata });
                }
                if (!Number.isInteger(res.id) && res.statusDelete === true) {
                    return { status: 204 };
                } else {
                    return '';
                }
            }),
        )
            .then((res) => {
                return {
                    status: 'fullfilled',
                    value: handleDataID(res),
                };
            })
            .catch((err) => {
                console.log('Error Imagies', err);
            });
    }

    function makeFoodRecord(food) {
        setModalLoadingFlag(true);
        postFood.mutate(food);
    }
    async function makeImagesRecord(foodCreated) {
        try {
            await Promise.all([imagiesForPostHandler(foodCreated)]);

            handlerSetModalSave();

            queryClient.invalidateQueries(['imageFood', foodCreated.id]);
        } catch (err) {
            console.log(
                'ERROR POST request can not be executed! Posssible Error in the following post function: Imagies',
                err,
            );
            setModalLoadingFlag(false);
            handlerSetModalError();
            throw err;
        }
    }

    async function imageURLsUpdater(imageURLsList) {
        await setImageURLsList(imageURLsList);
    }

    function stepMove(move, step) {
        setStepsList(itemMove(move, step, stepsList));
    }

    function ingredientMove(move, ing) {
        setIngredientsList(itemMove(move, ing, ingredientsList));
    }

    function itemMove(move, item, array) {
        let position = getPosition(item.id, array);

        let newArray = array.slice();
        if (move > 0) {
            if (position < -1 + array.length) {
                newArray.splice(position, 1);
                newArray.splice(position + move, 0, item);
                return newArray;
            }
        }
        if (move < 0) {
            if (position > 0) {
                newArray.splice(position, 1);
                newArray.splice(position - 1, 0, item);
                return newArray;
            }
        }
    }

    function handlerSetModalSave() {
        setModalSavedFlag(true);
        setTimeout(() => {
            setModalSavedFlag(false);
            navigate(`/recepty/?page_size=${pageSize}`);
        }, 1000);
    }
    function handlerSetModalError() {
        setModalErrorFlag(true);
        setTimeout(() => {
            setModalErrorFlag(false);
        }, 3000);
    }
    function handlerSetModalErrorMissing(message) {
        setErrMsg(message);
        setTimeout(() => {
            setErrMsg('');
        }, 3000);
    }

    function closeModal(e) {
        setModalLightboxFlag(false);
        setIsVisibleEdit(false);
    }

    function getPosition(elementToFind, arrayElements) {
        var i;
        for (i = 0; i < arrayElements.length; i += 1) {
            if (arrayElements[i].id === elementToFind) {
                return i;
            }
        }
        return null;
    }

    const [imagePosition, setImagePosition] = useState();
    function handlerImage(imageToAdd) {
        let imagePosition = getPosition(imageToAdd.id, imageURLsList);
        setImagePosition(imagePosition);
    }

    function makeImageDelete(image) {
        let imageIDPosition = getPosition(image.id, imageURLsList);
        let newImageURLsList = imageURLsList.slice();
        newImageURLsList.splice(imageIDPosition, 1, {
            ...image,
            statusDelete: true,
        });
        setImageURLsList(newImageURLsList);
    }
    // images for Posting
    useEffect(() => {
        let newImageUrlsPost = imageURLsList.slice();

        if (images.length < 1) return;
        let position = newImageUrlsPost.length + 1;
        images.forEach((image, index) => {
            newImageUrlsPost.push({
                id: `${uniqueID}${index}`,
                image: URL.createObjectURL(image),
                imageForBackEnd: image,
                position: position,
                statusDelete: false,
            });
            position++;
        }, setImageURLsList(newImageUrlsPost));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [images]);

    function onImageChange(e) {
        setImages([...e.target.files]);
    }

    if (unitQf.isLoading || !unitQf.data || !tagGroupQf.data) return;
    if (unitQf.isError || tagGroupQf.isError) return;
    return (
        <>
            <form className={style.main} onSubmit={handleFoodSave}>
                <div className={style.panel}>
                    {' '}
                    <MenuToggle toggle={[toggle, setToggle]} />
                    <div className={style.messagebox}>{errMsg}</div>
                    <div className={style.buttonBox}>
                        <button
                            className={style.foodButton}
                            id={style.foodButtonSave}
                            type="submit"
                        >
                            <FontAwesomeIcon icon={faFloppyDisk} />
                        </button>
                        <div
                            className={style.foodButton}
                            // datatooltip="Spať"
                        >
                            <FontAwesomeIcon
                                onClick={() => goBack()}
                                icon={faBackward}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.fooodbox}>
                    <div className={style.fooodboxMidpanel}>
                        <LeftPanelFilter
                            onFoodTagSet={foodTagSet}
                            handleAddTagToFoodTagsList={foodTagSetCheck}
                            foodTagsBox={null}
                            component={component}
                            toggle={[toggle, setToggle]}
                            tagGroups={tagGroupQf.data || []}
                        />

                        <IngredientInput
                            addToIngredientList={addToIngredientList}
                            ingredientsList={ingredientsList}
                            handlerSetModalErrorMissing={
                                handlerSetModalErrorMissing
                            }
                            ingredientMove={ingredientMove}
                            removeFromIngredientList={makeIngredientsDelete}
                            component={component}
                            qtRef={qtRef}
                            unitRef={unitRef}
                            ingrRef={ingrRef}
                            qrKeyDown={qrKeyDown}
                            unitKeyDown={unitKeyDown}
                            ingKeyDown={ingKeyDown}
                            unitsDw={unitQf?.data || []}
                        ></IngredientInput>

                        <Image
                            imageURLs={imageURLsList}
                            makeImageDelete={makeImageDelete}
                            setModalFlag={setModalLightboxFlag}
                            handlerImage={handlerImage}
                            onImageChange={onImageChange}
                            component={component}
                        ></Image>
                        <div className={style.thirdColumn}>
                            <UrlInput
                                urlList={urlList}
                                component={component}
                                deleteUrl={makeUrlToDelete}
                                updateUrlList={updateUrlList}
                                handleAddUrl={handleAddUrl}
                                urlRef={urlRef}
                                urlKeyDown={urlKeyDown}
                            ></UrlInput>

                            <StepsInput
                                stepMove={stepMove}
                                handleAddStep={handleAddStep}
                                updateStepList={updateStepList}
                                stepsList={stepsList}
                                deleteStep={makeSteptoDelete}
                                component={component}
                                stepRef={stepRef}
                                stepKeyDown={stepKeyDown}
                            ></StepsInput>
                        </div>
                        <div className={style.fooodnamebox}>
                            <div className={style.name} htmlFor="name">
                                Nazov:
                            </div>

                            <input
                                className={style.foodname}
                                id="name"
                                name="name"
                                ref={nameRef}
                                value={name}
                                onKeyDown={nameKeyDown}
                                type="text"
                                maxLength="300"
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div className={style.date}></div>
                    </div>
                </div>
            </form>
            <Modal
                visible={modalLoadingFlag}
                setModalFlag={setModalLoadingFlag}
            >
                <SaveLoading></SaveLoading>
            </Modal>
            <Modal visible={modalSavedFlag} setModalFlag={setModalSavedFlag}>
                <SaveSaved></SaveSaved>
            </Modal>
            <Modal visible={modalErrorFlag} setModalFlag={setModalErrorFlag}>
                <SaveError></SaveError>
            </Modal>
            <Modal
                visible={modalSaveErrorMissingFlag}
                setModalFlag={setModalSaveErrorMissingFlag}
            >
                <SaveErrorMissing modalMessage={errMsg} />
            </Modal>
            <ModalPreview
                visible={modalLightboxFlag}
                setModalFlag={setModalLightboxFlag}
            >
                <Lightbox
                    imageURLsList={imageURLsList}
                    closeModal={closeModal}
                    handlerImage={handlerImage}
                    getPosition={getPosition}
                    isVisibleEdit={[isVisibleEdit, setIsVisibleEdit]}
                    imagePosition={[imagePosition, setImagePosition]}
                    imageURLsUpdater={imageURLsUpdater}
                ></Lightbox>
            </ModalPreview>
        </>
    );
}
export default NewFood;
