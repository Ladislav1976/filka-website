import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";


const RequireAuthUserEdit = ({ allowedRoles }) => {
    const { auth, setAuth ,usercont, setUsercont, csrftoken, setCSRFToken} = useAuth();
console.log("userContext :",usercont)
console.log("auth :",auth)
    const location = useLocation();
    return (
        // userContext?.id == auth?.userRes?.id
        // ? 
       !allowedRoles?.includes(auth?.userRes?.role)
       ?  <Navigate to="/unauthorized" state={{ from: location }} replace />
       : (auth?.userRes?.role==="User_edit" && usercont[0].id !== auth?.userRes?.id)
            ? <Navigate to="/unauthorized" state={{ from: location }} replace />
            : <Outlet />
                // ? <Navigate to="/unauthorized" state={{ from: location }} replace />
                // : <Navigate to="/login" state={{ from: location }} replace />
    );
}

export default RequireAuthUserEdit;