import style from '../assets/styles/Components/UrlInput.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faTrash,
    faCheck,
    faXmark,
    faFloppyDisk,
    faPlus,
} from '@fortawesome/free-solid-svg-icons';

function Url(props) {
    const [urlDefault, setUrlDefault] = useState('');
    const [urlNameDefault, setUrlNameDefault] = useState('');
    const [url, setUrl] = useState(props.url);
    const isChanged = urlDefault !== '' || urlNameDefault !== '';

    function handleUpdateUrlName(event) {
        if (!urlNameDefault) {
            setUrlNameDefault(url.urlname);
            setUrl({
                ...url,
                urlname: event.target.value,
            });
        } else {
            setUrl({
                ...url,
                urlname: event.target.value,
            });
        }
    }

    function handleUpdateUrl(event) {
        if (!urlDefault) {
            setUrlDefault(url.url);
            setUrl({
                ...url,
                url: event.target.value,
            });
        } else {
            setUrl({
                ...url,
                url: event.target.value,
            });
        }
    }
    function handleCancelUrl() {
        if (urlDefault) {
            setUrl({ ...url, url: urlDefault });
            setUrlDefault('');
        }
        if (urlNameDefault) {
            setUrl({ ...url, urlname: urlNameDefault });
            setUrlNameDefault('');
        }
    }

    function handleUpdateUrlList() {
        props.updateUrlList(url);
        setUrlDefault('');
        setUrlNameDefault('');
    }
    return (
        <div className={style.urlContainer}>
            {props.component === 'viewcomponent' && (
                <>
                    <div className={style.urlTextContainer}>
                        <div className={style.urlid}>{props.index + 1}.</div>
                        <div className={style.linkCont}>
                            <a
                                className={style.urlTextView}
                                href={props.url.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {`${props.url.urlname}`}
                            </a>{' '}
                        </div>
                    </div>
                </>
            )}

            {(props.component === 'editcomponent' ||
                props.component === 'newcomponent') && (
                <>
                    <div className={style.urlid}>{props.index + 1}.</div>
                    <div className={style.intContainer}>
                        <input
                            className={style.urlEditView}
                            value={url.urlname}
                            type="text"
                            id="urlname"
                            name="urlname"
                            size={50}
                            onChange={handleUpdateUrlName}
                        />
                        <input
                            className={style.urlEditView}
                            value={url.url}
                            type="url"
                            id="url"
                            pattern="https://.*"
                            name="url"
                            size={100}
                            onChange={handleUpdateUrl}
                        />
                    </div>
                    <div className={style.iconBox}>
                        <div
                            className={
                                isChanged ? style.editIcon : style.OKIcon
                            }
                            // datatooltip={urlDefault === '' ? 'OK' : 'Uložiť'}
                        >
                            <FontAwesomeIcon
                                color={isChanged ? '#fd0000' : '#558113'}
                                // className={style.editIcon}
                                icon={isChanged ? faFloppyDisk : faCheck}
                                onClick={() => {
                                    handleUpdateUrlList();
                                }}
                            />
                        </div>

                        <div
                            className={style.deleteIcon}
                            //datatooltip="Vymazať"
                        >
                            <FontAwesomeIcon
                                // className={style.deleteIcon}
                                icon={faTrash}
                                onClick={() => {
                                    props.handleUrlDelete(url);
                                }}
                            />
                        </div>
                        {isChanged && (
                            <div
                                className={style.cancelIcon}
                                datatooltip="Zrušiť"
                            >
                                <FontAwesomeIcon
                                    // className={style.cancelIcon}
                                    icon={faXmark}
                                    onClick={() => handleCancelUrl()}
                                />
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    );
}

export default function UrlInput(props) {
    const urlList = props.urlList;
    const [addedUrl, setAddedUrl] = useState('');
    const [addedUrlName, setAddedUrlName] = useState('');
    let uniqueID = new Date().toISOString();
    const component = props.component;

    function handleUrlDelete(url) {
        props.deleteUrl(url);
    }

    function addURL() {
        if (addedUrl === '') return;
        props.handleAddUrl(
            {
                id: uniqueID,
                url: addedUrl,
                urlname: addedUrlName,
                statusDelete: false,
            },
            urlList,
        );
        setAddedUrl('');
        setAddedUrlName('');
    }

    function handleChangeUrl(event) {
        setAddedUrl(event.target.value);
    }
    function handleChangeUrlName(event) {
        setAddedUrlName(event.target.value);
    }
    let urlListRender = [];

    // eslint-disable-next-line array-callback-return
    urlList?.map((url, index) => {
        if (url.statusDelete === false) {
            urlListRender.push(
                <Url
                    url={url}
                    key={url.id}
                    index={index}
                    urlList={urlList}
                    component={component}
                    handleUrlDelete={handleUrlDelete}
                    updateUrlList={props.updateUrlList}
                />,
            );
        }
    });
    if (component === 'viewcomponent')
        return (
            <div className={style.urlBox}>
                {' '}
                <div className={style.title}>
                    <p>URL :</p>
                </div>{' '}
                <div className={style.urlrender}> {urlListRender}</div>
            </div>
        );
    return (
        <>
            {(component === 'editcomponent' ||
                component === 'newcomponent') && (
                <>
                    <div className={style.urlBox}>
                        <div className={style.title}>
                            <p>URL :</p>
                        </div>

                        <div className={style.inputContainer}>
                            <input
                                className={style.newUrl}
                                value={addedUrlName}
                                ref={props.urlRef}
                                onKeyDown={props.urlKeyDown}
                                type="text"
                                id={'url'}
                                name={'url'}
                                // size={200}
                                placeholder="Názov"
                                onChange={handleChangeUrlName}
                            />
                            <input
                                className={style.newUrl}
                                value={addedUrl}
                                ref={props.urlRef}
                                onKeyDown={props.urlKeyDown}
                                type="url"
                                id={'url'}
                                name={'url'}
                                // size={200}
                                placeholder="https://example.com"
                                onChange={handleChangeUrl}
                            />
                        </div>
                        {/* </div> */}

                        <div className={style.newUrlIcon} onClick={addURL}>
                            <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                        </div>
                    </div>
                </>
            )}
            <div className={style.urlrender}> {urlListRender}</div>
        </>
    );
}
