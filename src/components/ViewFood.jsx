import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import StepsInput from "./StepsInput";
import SaveLoading from "../reports/SaveLoading";
import SaveSaved from "../reports/SaveSaved";
import SaveError from "../reports/SaveError";
import Lightbox from "./Lightbox";
import style from "./NewFood.module.css";
import IngredientInput from "./IngredientInput";
import LeftPanelFilter from "./LeftPanelFilter";
import React, { Component } from "react";
import Image from "./Image";
import UrlInput from "./Url";
import Modal from "../reports/Modal";
import ModalPreview from "../reports/ModalPreview";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faPenToSquare, faBackward, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useParams } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import { useQueriesItems } from "../hooks/Queries/useQueriesItems";
import { useSteps } from "../hooks/Queries/useSteps";
import { useIngredients } from "../hooks/Queries/useIngredients";
import { useImages } from "../hooks/Queries/useImages";







function ViewFood(props) {
    const id = useParams()
    let ID = parseInt(id.id)
    const axiosPrivate = useAxiosPrivate()
    const controller = new AbortController();

    const { setUsercont } = useAuth();
    const [usersQf, foodQf, ingredientQf, unitsQf, urlsQf, tagsQf] = useQueriesItems(ID, axiosPrivate, controller)
    const stepsQf = useSteps(foodQf)
    const ingredientsQf = useIngredients(foodQf, ingredientQf, unitsQf)
    const imagesQf = useImages(foodQf)


    const component = "viewcomponent"
    const navigate = useNavigate()
    const location = useLocation();
    const foods = location.state?.foods.pathname + location.state?.foods.search || "/";

    const goBack = () => navigate(foods);


    const [modalLoadingFlag, setModalLoadingFlag] = useState(false);
    const [modalSavedFlag, setModalSavedFlag] = useState(false);
    const [modalErrorFlag, setModalErrorFlag] = useState(false);
    const [modalImageDeleteErrorFlag, setModalImageDeleteErrorFlag] = useState(false);
    const [modalLightboxFlag, setModalLightboxFlag] = useState(false);
    const [isVisibleEdit, setIsVisibleEdit] = useState(false)







    // const [foodID, setFoodID] = useState(dataFoods.data.id)
    const [user, setUser] = useState([]);
    const [name, setName] = useState("")
    const [ingredientsList, setIngredientsList] = useState([])
    const [urlList, setUrlList] = useState([])
    const [foodTagSet, setFoodTagSet] = useState(new Set([]));
    const [stepsList, setStepsList] = useState([])
    const [imageURLsList, setImageURLsList] = useState([])
    const [date, setDate] = useState("")


    function ingredientsListDownl(backEndFood, backEndIngredients, backEndUnit, backEndIngredient) {
        let ingredients = []
        backEndFood.ingredients.map((datatags) => {
            backEndIngredients.map((e) => {
                if (e.id == datatags) {
                    backEndUnit.map((u) => {
                        if (u.id == e.units) {
                            backEndIngredient?.map((i) => {
                                if (i.id == e.ingredientName) {
                                    ingredients.push({
                                        id: e.id,
                                        quantity: e.quantity,
                                        unit: [u],
                                        ingredient: [i],
                                        position: e.position,
                                        statusDelete: false
                                    })
                                }
                            })
                        }
                    })
                }
            }
            )
        })
        ingredients.sort(function (a, b) {
            return a.position - b.position;
        })

        return ingredients
    }
    function itemListDownl(backEndFood, backEndItems, sorting) {
        let returnList = []
        backEndFood?.forEach((f) => {
            backEndItems?.map((e) => {
                if (e.id === f) {
                    returnList.push({
                        ...e,
                        statusDelete: false
                    });
                    ;
                }
            });
        });
        //sorting of items from 1 to 999
        if (sorting) {
            returnList.sort(function (a, b) {
                return a.position - b.position;
            }
            )
        };
        return returnList
    }


    useEffect(() => {

        if (!usersQf.isLoading &&
            !foodQf.isLoading &&
            !ingredientQf.isLoading &&
            !unitsQf.isLoading &&
            !urlsQf.isLoading &&
            !tagsQf.isLoading &&
            !stepsQf.isLoading &&
            !ingredientsQf.isLoading &&
            !imagesQf.isLoading) {

            setName(foodQf.data.name);
            setFoodTagSet(itemListDownl(foodQf.data.foodTags, tagsQf.data, false),);
            setStepsList(itemListDownl(foodQf.data.steps, stepsQf.data, true),);
            setIngredientsList(ingredientsListDownl(foodQf.data, ingredientsQf.data, unitsQf.data, ingredientQf.data));
            setUrlList(itemListDownl(foodQf.data.urls, urlsQf.data, false),)
            setDate(foodQf.data.date);
            setImageURLsList(itemListDownl(foodQf.data.images, imagesQf.data, true),);
            setUser(itemListDownl(foodQf.data.user, usersQf.data, false),)
            setUsercont(foodQf.data.user)
            }
    }, [usersQf.data, foodQf.data, ingredientQf.data, unitsQf.data, urlsQf.data, tagsQf.data, stepsQf.data, ingredientsQf.data, imagesQf.data
    ])



    function closeModal(e) {
        setModalLightboxFlag(false)
        setIsVisibleEdit(false)
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

    const [imagePosition, setImagePosition] = useState("")
    function handlerImage(imageToAdd) {
        let imagePosition = (getPosition(imageToAdd.id, imagesQf.data))
        setImagePosition(imagePosition)
    }



    return (<>

        {(usersQf.isLoading || foodQf.isLoading || ingredientQf.isLoading || unitsQf.isLoading || urlsQf.isLoading || tagsQf.isLoading || stepsQf.isLoading || ingredientsQf.isLoading || imagesQf.isLoading) ? (

            <div className={style.loadingContainer}>
                <FontAwesomeIcon
                    className={style.loadingIcon}
                    icon={faSpinner}
                    id="inpFileIcon"
                    spin ></FontAwesomeIcon>
            </div>
        ) :

            (<div className={style.main}>
                {/* <div className={style.header}>RECEPT</div> */}
                <div className={style.boxcontainer}>
                    <div className={style.messagebox}>
                    </div>
                    <div className={style.buttonBox} >
                        <div className={style.foodButton}>
                            {/* datatooltip="Upraviť" */}
                            <FontAwesomeIcon
                                onClick={() => navigate(`/recepty/${id.id}/email`)}
                                icon={faEnvelope}

                            />
                        </div>

                        <div className={style.foodButton}>
                            {/* datatooltip="Upraviť" */}
                            <FontAwesomeIcon
                                onClick={() => navigate(`/recepty/${id.id}/edit`)}

                                icon={faPenToSquare}

                            />
                        </div>
                        <div className={style.foodButton} >
                            {/* datatooltip="Upraviť" */}
                            <FontAwesomeIcon
                                onClick={() => goBack()}//`/recepty/?page_size=${20}`
                                icon={faBackward}
                            />
                        </div>
                    </div>
                </div>
                <div className={style.fooodbox} >
                    <div className={style.fooodboxMidpanel} >
                        {/* <div className={imgLoader > 0 ? style.unvisible : style.fooodbox} > */}
                        <LeftPanelFilter
                            onFoodTagSet={foodTagSet}
                            foodTagsBox={null}
                            component={component}
                            handleAddTagToFoodTagsList={() => { return }}
                        />
                        <div className={style.secondColumn}>
                            <div className={style.ingredients}>
                                <p>Suroviny:</p>
                                <IngredientInput
                                    ingredientsList={ingredientsList}
                                    component={component}
                                ></IngredientInput>
                            </div>

                            <Image  imageURLs={imageURLsList} setModalFlag={setModalLightboxFlag} handlerImage={handlerImage} component={component}></Image>

                        </div>
                        <div className={style.thirdColumn}>
                  
                            <div className={style.urlName}>
                                <p>URL :</p>
                            </div>
                            <UrlInput
                                urlList={urlList}
                                component={component}
                            >
                            </UrlInput>
                            <div className={style.urlName}>
                                <p>Postup :</p>
                            </div>
                            <StepsInput
                                stepsList={stepsList}
                                component={component}
                            ></StepsInput>

                        </div>
                        <div className={style.foodnameView}>{name}</div>
                        <div className={style.date}>
                                Vytvorené: <br /> {user?.map(res => res.first_name)} {user?.map(res => res.last_name)}<br />
                                {new Date(date).toLocaleDateString('sk-SK')}
                            </div>

                    </div>
                </div>

            </div>)}
        <Modal visible={modalLoadingFlag} setModalFlag={setModalLoadingFlag}>
            <SaveLoading
            ></SaveLoading>
        </Modal>
        <Modal visible={modalSavedFlag} setModalFlag={setModalSavedFlag}>
            <SaveSaved
            ></SaveSaved>
        </Modal>
        <Modal visible={modalErrorFlag} setModalFlag={setModalErrorFlag}>
            <SaveError
            ></SaveError>
        </Modal>
        <ModalPreview visible={modalLightboxFlag} setModalFlag={setModalLightboxFlag}>
            <Lightbox
                // imageURLsList={imagesDwn}
                imageURLsList={[imageURLsList, setImageURLsList]}
                closeModal={closeModal}
                handlerImage={handlerImage}
                getPosition={getPosition}
                modalImageDeleteErrorFlag={modalImageDeleteErrorFlag}
                isVisibleEdit={[isVisibleEdit, setIsVisibleEdit]}
                imagePosition={[imagePosition, setImagePosition]}
                component={component}
            >
            </Lightbox>
        </ModalPreview>

    </>
    )
}
export default ViewFood;
