import { createContext, useState } from "react";

const AuthContext = createContext({});

export function AuthProvider  ({ children }) {
    const [auth, setAuth] = useState({});
    const [usercont, setUsercont] = useState({});
    const [csrftoken, setCSRFToken] = useState({});
    // const [persist, setPersist]= useState(JSON.parse(localStorage.getItem('persist')) || false)


    return (
        <AuthContext.Provider value={{ auth, setAuth ,usercont, setUsercont, csrftoken, setCSRFToken}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;