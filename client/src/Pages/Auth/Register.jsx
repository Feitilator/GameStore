import { Link, useNavigate } from "react-router";
import style from "./Auth.module.css"
import { useState } from "react";
import api from "../../api/axios";

function Register() {
  const nav = useNavigate()
  const [message, setMessage] = useState('')
  const [show, setShow] = useState(false)  
  const [data, setData] = useState({
    name: "",
    password: ""
  })
  const handleRegister = async (event) =>{
    event.preventDefault()
    try {
      const response = await api.post('/auth/register',data,{
        headers:{
          "Content-Type": "application/json"
        }
      })
      nav('/login')
    } catch (error) {
      setMessage(error.response?.data?.message || "Произошла ошибка")
      console.log("Ошибка", error.message)
    }
  }

  return (
    <div className={style.wrapper}>
      <div className={style.content}>
        <h1 className={style.h1} >Create an account</h1>
          <form className={style.form} onSubmit={handleRegister}>
            <input type="text" placeholder="Nickname" value={data.name} onChange={(event) => setData({...data, name : event.target.value})} />
            <div className={style.wrapper__input}>
                <input type={show ? "text" : "password"} placeholder="Password" value={data.password} onChange={(event) => setData({...data, password : event.target.value})} />
                <button onClick={(event)=> { 
                    event.preventDefault()  
                    setShow(show => !show)}} className={style.btn__eye}>
                    <img src={show ? '../../public/eye-open.png' : '../../public/hide.png'} alt="eye" />
                </button>
            </div>
            <p style={{color: "red"}}>{message}</p>
            <button type="submit" className={style.btn}>Submit</button>
          </form>
          <p className={style.p}>Already have an account? <Link to={"/login"}><b className={style.b}>Log in</b></Link></p>
          <Link to={"/"} className={style.back}><img src="../../public/back.svg" alt="back" /> Back</Link>
        </div>
        <img src="../../public/Wallpaper_login.png" alt="image" />
      </div>
  )
}

export default Register