import { Navigate, Outlet } from "react-router";
import { useAuth } from "../Context/AuthContext";

function RoleRoute({allowedRoles}) {
    const {loading, user} = useAuth()
    if(loading){
        return <div>Loading...</div>
    }
    if(!user){
        return <Navigate to={"/login"} replace/>
    }
    if(!allowedRoles.includes(user.role)){
        return <Navigate to={"/"} replace/>
    }

    return <Outlet />
}

export default RoleRoute