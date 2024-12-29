import style from "./UrlInput.module.css";
import { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPenToSquare, faCartPlus, faCheck, faXmark, faBasketShopping, faFloppyDisk } from "@fortawesome/free-solid-svg-icons";

function Url(props) {
    const [urlDefault, setUrlDefault] = useState("");
    const [url, setUrl] = useState(props.url);



    function handleUpdateUrl(event) {
        if (urlDefault == "") {
            setUrlDefault(url)
            setUrl({...url,
                url:event.target.value});
        } else {
            setUrl({...url,
                url:event.target.value});
        }

    }
    function handleCancelUrl() {
        if (urlDefault != "") {
            setUrl(urlDefault);
            setUrlDefault("")
        }
    }

    function handleUpdateUrlList() {
        props.updateUrlList( url)
        setUrlDefault("")
    }
    return <>

        <div className={style.urlContainer}>
            {props.component === "viewcomponent" &&
                <>
                    <div className={style.urlTextContainer}>
                        <div>
                            <a
                                className={style.urlTextView}
                                href={props.url.url} target="_blank">
                                {`Link${props.index + 1}`}
                            </a> </div></div>
                </>}


            {(props.component === "editcomponent" || props.component === "newcomponent") &&
                <>
                    <div className={style.urlid}>{props.index + 1}.</div>

                    <form >
                        <label className={style.formLabel} htmlFor="url"></label>
                        <input
                            className={style.urlEditView}
                            value={url.url}
                            type="url"
                            id="url"

                            name="url"
                            onChange={handleUpdateUrl}

                        />
                    </form>



                    <div className={style.iconBox}>
                        <div className={urlDefault == "" ? style.OKIcon : style.editIcon} datatooltip={urlDefault == "" ? "OK" : "Uložiť"}>
                            <FontAwesomeIcon
                                color={urlDefault == "" ? "#558113" : "#fd0000"}
                                // className={style.editIcon}
                                icon={urlDefault == "" ? faCheck : faFloppyDisk}
                                onClick={() => {
                                    handleUpdateUrlList()

                                }}
                            /></div>

                        <div className={style.deleteIcon}
                        //datatooltip="Vymazať"
                        >
                            <FontAwesomeIcon
                                // className={style.deleteIcon}
                                icon={faTrash}
                                onClick={() => props.handleUrlDelete(url)}
                            /></div>
                        {urlDefault != "" && <div className={style.cancelIcon} datatooltip="Zrušiť">
                            <FontAwesomeIcon
                                // className={style.cancelIcon}
                                icon={faXmark}
                                onClick={() => handleCancelUrl()} /></div>}
                    </div>
                </>}


        </div>
    </>
}


export default function UrlInput(props) {
    const urlList = props.urlList;
    const [addedUrl, setAddedUrl] = useState("");
    let uniqueID = new Date().toISOString()
    const component = props.component

    function handleUrlDelete(url) {
        props.deleteUrl(url)
    }

    function handleChangeUrl(event) {
        setAddedUrl(event.target.value);
    }
    let urlListRender = []


    urlList?.map((url, index) => {
        if(url.statusDelete ===false){
        urlListRender.push(
            <Url
                url={url}
                index={index}
                component={component}
                handleUrlDelete={handleUrlDelete}
                updateUrlList={props.updateUrlList}
            />)}
    })

    return (<>

        {(component === "editcomponent" || component == "newcomponent") &&
            <>

                <div className={style.urlContainer}>
                    <form >
                        <label className={style.formLabel} htmlFor="newurl"></label>
                        <input
                            className={style.newUrl}
                            value={addedUrl}
                            type="url"
                            id={"newurl"}
                            name={"newurl"}
                            placeholder="https://example.com"
                            onChange={handleChangeUrl}

                        />
                    </form>


                    <div className={style.newUrlIcon} datatooltip="Vložiť">
                        <FontAwesomeIcon
                            icon={faBasketShopping}
                            onClick={() => { props.handleAddUrl({ id: uniqueID, url: addedUrl, statusDelete: false }, urlList); setAddedUrl("") }}
                        ></FontAwesomeIcon>{" "}
                    </div>
                </div>
            </>}
        <div className={style.foodurl}>{urlListRender}</div>
    </>)
}
