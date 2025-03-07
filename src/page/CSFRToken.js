import React from 'react';
import { useState, useEffect } from 'react';
import axios from "../api/axios";
// import axios from 'axios';

const CSFR_URL = 'csrf_cookie/';
export default function CSRFToken() {
    const [csrftoken, setcsrftoken ] = useState('');

    const getCookie = (name) => {
        let cookieValue = null;
        if (document.cookie && document.cookie !== '') {
            let cookies = document.cookie.split(';');
            for (let i = 0; i < cookies.length; i++) {
                let cookie = cookies[i].trim();
                if (cookie.substring(0, name.length + 1) === (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        console.log("cookieValue :", cookieValue)
        return cookieValue;
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                // await axios.get(`${process.env.REACT_APP_API_URL}/csrf_cookie`);
                await axios.get(CSFR_URL);

            } catch (err) {
                console.log(err)
            }
        };

        fetchData();
        setcsrftoken (getCookie('csrftoken'));
    }, []);
    console.log("csrftoken :", csrftoken)
    return (
        <input type='hidden' name="csrfmiddlewaretoken" value={csrftoken} />
    );

}