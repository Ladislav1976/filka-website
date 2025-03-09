import { createContext, useState } from "react";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
    const [auth, setAuth] = useState({});
    const [usercont, setUsercont] = useState({});
    const [csrftoken, setCSRFToken] = useState({});
    const [page, setPage] = useState("")
    const [pageSize, setPageSize] = useState("")
    const [ordering, setOrdering] = useState("")

    return (
        <AuthContext.Provider value={{ auth, setAuth, usercont, setUsercont, csrftoken, setCSRFToken ,page, setPage, pageSize, setPageSize,ordering, setOrdering}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;