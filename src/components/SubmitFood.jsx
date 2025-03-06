import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";


import IngredientInput from './IngredientInput';
import StepsInput from './StepsInput';
import UrlInput from './Url';
import emailjs from '@emailjs/browser';
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAuth from "../hooks/useAuth";
import useEmailFormSubmit from '../hooks/useEmailFormSubmit';
import { useQueriesItems } from '../hooks/Queries/useQueriesItems';
import { useSteps } from '../hooks/Queries/useSteps';
import { useIngredients } from '../hooks/Queries/useIngredients';
import style from "../page/Register.module.css";
import styla from "./NewFood.module.css";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfoCircle, faTimes, faBackward } from "@fortawesome/free-solid-svg-icons";

const EMAIL_URL = 'https://api.emailjs.com/api/v1.0/email/send'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function SubmitFood(props) {
    const id = useParams()
    let ID = parseInt(id.id)
    const component = "viewcomponent"
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate();
    const goBack = () => navigate(-1);
    const controller = new AbortController();

    const { auth } = useAuth();
    const [usersQf, foodQf, ingredientQf, unitsQf, urlsQf, tagsQf] = useQueriesItems(ID, axiosPrivate, controller)
    const stepsQf = useSteps(foodQf)
    const ingredientsQf = useIngredients(foodQf, ingredientQf, unitsQf)




    const form = useRef();
    const emailRef = useRef();


    const [success, setSuccess] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);



    const [message, setMessage] = useState(`Dobrý deň,\n\nPodľa dohody Vám zasielam tento recept.\n\nS pozdravom\n${auth?.userRes?.first_name} ${auth?.userRes?.last_name}`);


    const [errMsg, setErrMsg] = useState('');
    const errRef = useRef();

    useEffect(() => {
        emailRef.current.focus();
    }, [])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])


    const [name, setName] = useState("")
    const [stepsList, setStepsList] = useState([])
    const [ingredientsList, setIngredientsList] = useState([])
    const [urlList, setUrlList] = useState([])

    const food_form = useEmailFormSubmit(name, stepsList, ingredientsList, urlList)

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

    function ingredientsListDownl(backEndFood, backEndIngredients, backEndUnit, backEndIngredient) {
        let ingredients = []
        backEndFood?.ingredients?.map((datatags) => {
            backEndIngredients?.map((e) => {
                if (e?.id == datatags) {
                    backEndUnit?.map((u) => {
                        if (u?.id == e?.units) {
                            backEndIngredient?.map((i) => {
                                if (i?.id == e?.ingredientName) {
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

    useEffect(() => {
        if (!foodQf.isLoading &&
            !stepsQf.isLoading &&
            !ingredientQf.isLoading &&
            !ingredientsQf.isLoading &&
            !unitsQf.isLoading &&
            !urlsQf.isLoading) {
            setName(foodQf.data.name);
            setStepsList(itemListDownl(foodQf.data.steps, stepsQf.data, true),);
            setIngredientsList(ingredientsListDownl(foodQf.data, ingredientsQf.data, unitsQf.data, ingredientQf.data));
            setUrlList(itemListDownl(foodQf.data.urls, urlsQf.data, false),)
        }
    },
        [
            foodQf.isLoading,
            stepsQf.isLoading,
            ingredientsQf.isLoading,
            urlsQf.isLoading,
            ingredientQf.isLoading,
            unitsQf.isLoading
        ]
    );
    async function sendEmail(e) {
        e.preventDefault();
        setIsLoading(true)
        const serviceId = 'service_35q6ps9'
        const templateId = 'template_jizuh7j'
        const publicKey = 'KVWK7w-1jgmN_ohjf'

        const data = {
            service_id: serviceId,
            template_id: templateId,
            user_id: publicKey,

            template_params: {
                from_name: `${auth?.userRes?.first_name} ${auth?.userRes?.last_name}`,
                from_email: auth?.useRes?.email,
                to_email: email,
                message: message,
                food_form: food_form,

                // food_form:'food_form'
            }
        }

        try {

            const response = await axios.post(EMAIL_URL, JSON.stringify(data)
                ,
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
            console.log(response?.data);

            setSuccess(true)
            setIsLoading(false)
        }
        catch (err) {
            if (!err?.response) {
                setErrMsg('No Server Response');
            } else if (err.response?.status == 409) {
                setErrMsg(err.response?.data?.message);
                errRef.current.focus();
            }
            else {
                console.log("err.response", err.response)
            }
        }

    };

    return (
        <>      <div className={styla.boxcontainer}>
                    <div className={style.messagebox}>
                    {}</div>
            <div className={styla.buttonBox} >

               
                <div className={styla.foodButton}
                >
                    <FontAwesomeIcon
                        onClick={() => navigate(-1)}
                        icon={faBackward}

                    />
                </div>
            </div> </div>
            {success ? (
                <main className={style.main}>
                    <section>
                        <h1>Email bol úspešne odoslaný!</h1>
                        <h1>Chce ist spat na recept? </h1>
                        <button onClick={goBack}>Späť</button>
                        {/* <p>
                            <a href="">Spat</a>
                        </p> */}
                    </section>
                </main>
            ) : (
                <div className={style.App} >
                    <section>

                        {/* <div className={isLoading ? style.loadingContainer : style.offscreen}>
                        <FontAwesomeIcon
                            className={style.loadingIcon}
                            icon={faSpinner}
                            id="inpFileIcon"
                            spin ></FontAwesomeIcon>
                    </div> */}
                        {/* <div > */}
                        {/* <div className={!isLoading ? style.onscreen : style.offscreen} > */}
                        <form className={!isLoading ? style.onscreen : style.offscreen} ref={form} onSubmit={sendEmail} id='food_form'>
                            <p ref={errRef} className={errMsg ? style.errmsg : style.offscreen} aria-live="assertive">{errMsg}</p>
                            <h1>Odoslať email</h1>
                            <label className={style.label} htmlFor="email">
                                Email :
                                <FontAwesomeIcon icon={faCheck} className={validEmail ? style.valid : style.hide} />
                                <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? style.hide : style.invalid} />
                            </label>
                            <div className={style.inputbox} >
                                <input
                                    type="email"
                                    className={style.input}
                                    id="email"
                                    ref={emailRef}
                                    placeholder="email@gmail.com"
                                    autoComplete="off"
                                    onChange={(e) => setEmail(e.target.value)}
                                    value={email}
                                    required
                                    aria-invalid={validEmail ? "false" : "true"}
                                    aria-describedby="uidnote"
                                    onFocus={() => setEmailFocus(true)}
                                    onBlur={() => setEmailFocus(false)}
                                />
                                <p id="uidnote" className={emailFocus && email && !validEmail ? style.instructions : style.offscreen}>
                                    <FontAwesomeIcon icon={faInfoCircle} />
                                    Povolené znaky: <br />- písmená, číslice, bodky<br />- symbol „@“,<br />
                                    - .sk .com, .org, .cc<br />

                                </p>
                            </div>
                            <label className={style.label} htmlFor="message">
                                Správa:

                            </label>
                            <div className={style.inputbox} >
                                <textarea
                                    type="text"
                                    id="message"
                                    autoComplete="off"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    required
                                    aria-describedby="uidnote"

                                />
                            </div>

                            <button disabled={!validEmail ? true : false}>Odoslať</button>

                            {/* <h4>Ukážka</h4>
                            <div className={style.foodnameView}>Nazov: {name}
                            <br />
                                <br />
                                Suroviny:
                                <IngredientInput
                                    ingredientsList={ingredientsList}
                                    component={component}
                                ></IngredientInput>
                                <br />       <br />
                                Postup:
                                <StepsInput
                                    stepsList={stepsList}
                                    component={component}
                                ></StepsInput>
                                <br />       <br />
                                URL:
                                <UrlInput
                                    urlList={urlList}
                                    component={component}
                                >
                                </UrlInput>
                         
                            </div> */}
                        </form>
                        {/* <p> */}
                            {/* Spat na recept?<br /> */}
                            {/* <span className={style.line}> */}
                                {/* <button onClick={goBack}>Späť</button> */}
                                {/* <a onClick={goBack} style={{ cursor: "pointer" }}>Spat</a> */}
                            {/* </span> */}
                        {/* </p> */}
                        {/* </div> */}
                    </section>
                </div>
            )}
        </>
    );
};
