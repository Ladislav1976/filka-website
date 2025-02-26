import { useState, useEffect } from "react";

const getLocalValue = (key, initValue) => {
    //SSR Next.js 
    console.log(key, initValue)
    if (typeof window === 'undefined') return initValue;
    console.log("key, initValue :",key, initValue)
    // if a value is already store 
    const localValue = JSON.parse(localStorage.getItem(key));
    console.log("localValue :",localValue)
    if (localValue) return localValue;

    // return result of a function 
    if (initValue instanceof Function) return initValue();

    return initValue;
}

const useLocalStorage = (key, initValue) => {
    console.log("key, initValue :",key, initValue)
    const [value, setValue] = useState(() => {
        
        return getLocalValue(key, initValue);
    });

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value));
    }, [key, value])

    return [value, setValue];
}

export default useLocalStorage 