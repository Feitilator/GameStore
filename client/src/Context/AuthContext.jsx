import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/axios";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () =>{
        try {
            const response = await api.get('/profile/me')
            setUser(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setUser(null)
        }
        setLoading(false)
    }
    useEffect(() =>{
        checkAuth()
    },[])

  return (
    <AuthContext.Provider
    value={{
        user,
        loading,
        setUser,
        checkAuth

    }}
    >
        {children}
    </AuthContext.Provider>
  )
}

export function useAuth(){
    const context = useContext(AuthContext)
    if(!context){
        throw new Error(
            "useAuth должен использоваться внутри AuthProvider"
        )
    }
    return context
}
