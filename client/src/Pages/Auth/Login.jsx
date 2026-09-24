import { Link, useNavigate } from "react-router";
import style from "./Auth.module.css"
import { useState } from "react";
import axios from "axios";

function Login() {
    const navigate = useNavigate()
    const [show, setShow] = useState(false)
    const [data, setData] = useState({
        name: "",
        password: ""
    })

    const handleLogin = async (event) =>{
        event.preventDefault()
        try {
            const response = await axios.post('/api/auth/login',data,{
                withCredentials: true,
                headers:{
                    "Content-Type": "application/json"
                }
            })
            if (response.data){
                navigate('/')
            }
        } catch (error) {
            console.log("Ошибка", error)
        }
    }

  return (
    <div className={style.wrapper}>
        <Link to={"/"} className={style.close}><img src="../../public/close.svg" alt="close" /></Link>
      <div className={style.content}>
        <h1 className={style.h1} >Welcome Back</h1>
          <form className={style.form} onSubmit={handleLogin}>
            <input type="text" placeholder="Nickname" value={data.name} onChange={(event) => setData({...data, name : event.target.value})} />
            <div className={style.wrapper__input}>
                <input type={show ? "text" : "password"} placeholder="Password" value={data.password} onChange={(event) => setData({...data, password : event.target.value})} />  
                <button onClick={(event)=> { 
                    event.preventDefault()  
                    setShow(show => !show)}} className={style.btn__eye}>
                    <img src={show ? '../../public/eye-open.png' : '../../public/hide.png'} alt="eye" />
                </button>
            </div>
            <button type="submit" className={style.btn}>Submit</button>
          </form>
          <p className={style.p}> Don’t have an account? <Link to={"/register"}><b className={style.b}>Sign up</b></Link></p>
        </div>
        <img src="../../public/Wallpaper_login.png" alt="image" />
      </div>
  )
}

export default Login