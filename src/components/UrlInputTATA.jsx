import style from "./UrlInput.module.css";
import { useState, useEffect, useRef } from "react";

function Url(props) {

    return <>
        <div className={style.urlContainer}>
            {props.component == "viewcomponent" && <div>
                <a
                    className={style.urlTextView}
                    href="https://www.w3schools.com/cssref/atrule_import.php" target="_blank">
                    {`${props.url}${props.index}`}
                </a>

            </div>}
            {props.component == "editcomponent" && <input
                className={style.foodurl}
                value={props.url}
                type="url"
                maxLength="25"
                id={props.index}
       
            />}

        </div>
    </>
}


export default function UrlInput(props) {
    const [urlList, setUrlList] = useState(props.urlList);


    let urlListRender = []
    urlList.map((url, index) => {
        urlListRender.push(
            <Url
                url={url}
                index={index}
                component={props.component}
            />)
    })

    return (<>
        <div>
            <label htmlFor="url">URL:</label>
        </div>
        <div className={style.foodurl}>{urlListRender}</div>
    </>)
}
