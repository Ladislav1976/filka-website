import React, { useState, useEffect, useRef } from 'react';
import { useParams } from "react-router-dom";
import { useQueries, useQuery } from "@tanstack/react-query"
import { getUrl, getFood, getIngredientsID, getIngredient, getUnit, getStep, getData ,getDataPrivate} from "../hooks/use-get";
import IngredientInput from './IngredientInput';
import StepsInput from './StepsInput';
import UrlInput from './Url';
import emailjs from '@emailjs/browser';
import useAxiosPrivate from "../hooks/useAxiosPrivate";

// import { useUsersQuery, useFoodQuery } from '../hooks/useQuery';
import useAuth from "../hooks/useAuth";
import useEmailFormSubmit from '../hooks/useEmailFormSubmit';
// import style from "./SubmitFood.module.css";
import style from "../page/Register.module.css";
import axios from 'axios';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faInfoCircle, faTimes, faSpinner } from "@fortawesome/free-solid-svg-icons";

const EMAIL_URL = 'https://api.emailjs.com/api/v1.0/email/send'
const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


export default function SubmitFood(props) {
    const component = "viewcomponent"
    const axiosPrivate = useAxiosPrivate()

    const controller = new AbortController();
    const id = useParams()
    const { auth, setAuth, usercont, setUsercont, csrftoken, setCSRFToken } = useAuth();
    let ID = parseInt(id.id)
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

    const dataUsers = useQuery({
        queryKey: ["users"],
        queryFn: (queryKey) => getDataPrivate(axiosPrivate, controller, queryKey.queryKey[0]),
    })

    function foodHandler(food, userList) {
        let list1 = []
        food?.user?.map((f) => {
            userList?.map((e) => {
                if (e.id === f) {
                    list1.push(e);
                }
            })
        });
        return { ...food, user: list1 }
    }

    // const dataFood = ()=> {if (!!ID && !!dataUsers){return useFoodQuery(ID,dataUsers)}}
    const dataFood = useQueries({

        queries: !!ID && !!dataUsers

            ? [{
                queryKey: ["foods", ID],
                queryFn: () => getFood(ID),
                // queryFn:(queryKey)=> getData(axiosPrivate,controller, `${queryKey.queryKey[0]}/${queryKey.queryKey[1]}`),
                staleTime: Infinity,
            }] : [],
        combine: (results) => {
            if (!results) return
            return {
                data: results?.map((result) => foodHandler(result.data, dataUsers.data)),
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
            }
        },
    })


    const dataSteps = useQueries({

        queries: dataFood.isLoading == false

            ? dataFood?.data[0].steps?.map((id) => ({
                queryKey: ["steps", id],
                queryFn: () => getStep(id),
                // queryFn:(queryKey)=> getData(axiosPrivate,controller, `${queryKey.queryKey[0]}/${queryKey.queryKey[1]}`),
                staleTime: Infinity,

            })) : [],
        combine: (results) => {
            if (!results) return
            return {
                data: results?.map((result) => result.data).map((data) => { return Object.assign({ ...data }, { statusDelete: false }) })
                    .sort(function (a, b) {
                        return a.position - b.position;
                    })
                ,
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
            }
        },
    })


    const dataUrl = useQueries({

        queries: dataFood.isLoading == false

            ? dataFood?.data[0].urls?.map((id) => ({
                queryKey: ["url", id],
                queryFn: () => getUrl(id),
                // queryFn:(queryKey)=> getData(axiosPrivate,controller, `${queryKey.queryKey[0]}/${queryKey.queryKey[1]}`),
                staleTime: Infinity,

            })) : [],
        combine: (results) => {
            if (!results) return
            return {
                data: results?.map((result) => result.data).map((data) => { return Object.assign({ ...data }, { statusDelete: false }) }),
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
            }
        },
    })

    const dataIngredient = useQuery({
        queryKey: ["ingredient"],
        queryFn: getIngredient,
    })

    const dataUnit = useQuery({
        queryKey: ["unit"],
        queryFn: getUnit
    })

    function ingredientsDownl(backEndIngredients, backEndUnit, backEndIngredient) {
        let ingredients = []
        backEndIngredients?.map((e) => {
            backEndUnit?.map((u) => {
                if (u.id == e.data?.units) {
                    backEndIngredient?.map((i) => {
                        if (i.id == e.data.ingredientName) {
                            ingredients.push({
                                id: e.data?.id,
                                quantity: e.data.quantity,
                                unit: [u],
                                ingredient: [i],
                                position: e.data.position,
                                statusDelete: false
                            })
                        }
                    })
                }
            })
            // }
        }
        )
        // })
        ingredients.sort(function (a, b) {
            return a.position - b.position;
        })

        return ingredients
    }

    const dataIngredients = useQueries({

        queries: dataFood.isLoading == false
            && dataIngredient.isLoading == false
            && dataUnit.isLoading == false

            ? dataFood?.data[0].ingredients?.map((id) => ({
                queryKey: ["ingredients", id],
                queryFn: () => getIngredientsID(id),
                // queryFn:(queryKey)=> getData(axiosPrivate,controller, `${queryKey.queryKey[0]}/${queryKey.queryKey[1]}`),
                staleTime: Infinity,
            })) : [],
        combine: (results) => {
            if (!results) return
            return {
                data: ingredientsDownl(results, dataUnit.data, dataIngredient.data),
                isPending: results.some((result) => result.isPending),
                isLoading: results.some((result) => result.isLoading),
                isSuccess: results.some((result) => result.isSuccess),
                status: results.some((result) => result.status),
                isFetched: results.some((result) => result.isFetched),
            }
        },
    })

    const [name, setName] = useState(dataFood.data[0].name)
    const [stepsList, setStepsList] = useState(dataSteps.data)
    const [ingredientsList, setIngredientsList] = useState(dataIngredients.data)
    const [urlList, setUrlList] = useState(dataUrl.data)
    const food_form = useEmailFormSubmit(dataFood.data[0], dataSteps.data, dataIngredients.data, dataUrl.data)


    useEffect(() => {
        setName(dataFood.data[0].name)
        setStepsList(dataSteps.data);
        setIngredientsList(dataIngredients.data)
        setUrlList(dataUrl.data)
    },
        [
            dataFood.data,
            dataSteps.data,
            dataIngredients.data,
            dataUrl.data,
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
            // navigate(from, { replace: true });
            // navigate(from, { replace: true });
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
        <>
            {success ? (
                <main className={style.main}>
                    <section>
                        <h1>Email bol úspešne odoslaný!</h1>
                        <h1>Chce ist spat na recept? </h1>

                        <p>
                            <a href="recepty">Spat</a>
                        </p>
                    </section>
                </main>
            ) : (
                <main className={style.App} >
                     <section>
                     <p ref={errRef} className={errMsg ? style.errmsg : style.offscreen} aria-live="assertive">{errMsg}</p>
                    <h2>Odoslat email</h2>
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
                            {/* <label>Name</label>
                        <input type="text" name="user_name" /> */}
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

                            {/* <label>Správa : </label>
                        <textarea name="message" /> */}
                            <label className={style.label} htmlFor="message">
                                Správa:

                            </label>
                            <div className={style.inputbox} >
                                <textarea
                                    type="text"
                                    // className={style.input}
                                    id="message"
                                    // ref={first_name_Ref}
                                    autoComplete="off"
                                    onChange={(e) => setMessage(e.target.value)}
                                    value={message}
                                    required
                                    // aria-invalid={validFirst_name ? "false" : "true"}
                                    aria-describedby="uidnote"
                                // onFocus={() => setFirst_nameFocus(true)}
                                // onBlur={() => setFirst_nameFocus(false)}
                                />
                                {/* <p id="uidnote" className={first_nameFocus && first_name && !validFirst_name ? style.instructions : style.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters.<br />
                                Must begin with a letter.<br />
                                Letters, numbers, underscores, hyphens allowed.
                            </p> */}
                            </div>

                            <button disabled={!validEmail ? true : false}>Odoslať</button>
                            <div>Ukážka</div>
                            <label className={style.label} htmlFor="name">Nazov:</label>
                            <input
                                className={style.input}
                                id="name"
                                value={name}
                                type="text"
                                maxLength="300"
                            //   onChange={handleNameChange}
                            // onClick={handleAddToNameTagList}
                            />
                            <div style={{width:"500px"}}>
                            <IngredientInput
                                ingredientsList={ingredientsList}
                                component={component}
                            ></IngredientInput>
                            <StepsInput
                                // stepMove={stepMove}
                                // addStepToTagList={addStepToTagList}
                                // updateStepInTagList={updateStepInTagList}
                                stepsList={stepsList}
                                // stepsSetIDState={stepsSetID}
                                // deleteStep={makeSteptoDelete}
                                component={component}
                            ></StepsInput>
                            <UrlInput
                                urlList={urlList}
                                component={component}
                            >
                            </UrlInput>
                            </div>
  
                            {/* <input type="submit" value="Send" /> */}
                        </form>
                        {/* </div> */}
                        <p>
                            Spat na recept?<br />
                            <span className={style.line}>
                                {/*put router link here*/}
                                <a href="login">Spat</a>
                            </span>
                        </p>
                    {/* </div> */}
                    </section>
                </main>
            )}
        </>
    );
};
