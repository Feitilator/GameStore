import { Link } from "react-router";
import style from "./Header.module.css"

function Header() {
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
      <div className={style.auth}>
        <Link to={"/login"}><button className={style.login}>Log in</button></Link>
        <Link to={"/register"}><button className={style.register}>Register</button></Link>
      </div>
    </div>
  )
}

export default Header