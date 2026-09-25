import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    const checkAuth = async () =>{
        try {
            const response = await axios.get('/api/profile/me',{
                withCredentials: true,
                headers:{
                    "Content-Type": "application/json"
                }
            })
            setUser(response.data)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setUser(null)
        }
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
