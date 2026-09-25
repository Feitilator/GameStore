import { data, Link } from "react-router";
import style from "./Header.module.css"
import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../Context/AuthContext";

function Header() {
  const {user, checkAuth} = useAuth()
      useEffect(()=>{
        checkAuth()
    },[])
  
  return (
    <div className={style.wrapper}>
      <div className={style.logo}>
        <img src="../../public/Logo.png" alt="logo" style={{width:'65',height:'59'}}/>
        <input type="search" className={style.search} placeholder=" &#128269; Search store"/>
      </div>
      <nav>
        <ul className={style.ul__navigate}>
          <Link to={"/"}><li>Home</li></Link>
          <Link><li>Browse</li></Link>
          <Link><li>News</li></Link>
          <Link><li>About</li></Link>
        </ul>
      </nav>
      {!user ?
        <div className={style.auth}>
          <Link to={"/login"}><button className={style.login}>Log in</button></Link>
          <Link to={"/register"}><button className={style.register}>Register</button></Link>
        </div>
      :
        <div className={style.profile}>
          <Link to={"/cart"}><img src="../../cart.svg" alt="cart" /></Link>
          <Link to={"/profile"}><img src="../../public/profile.svg" alt="profile" /></Link>
        </div>
      }
    </div>
  )
}

export default Header