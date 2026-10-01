import { useEffect, useState } from "react";
import style from "./Hero.module.css"
import api from "../../../api/axios";
import { Link } from "react-router";

function Hero() {
  const [games, setGames] = useState([])
  const [index, setIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() =>{
    const getGames = async () =>{
      try {
        const response = await api.get("/game")
        setGames(response.data.games)
        console.log(response)
        console.log(games)
        setLoading(false)
      } catch (error) {
        console.log(error.response?.data?.msg || "Ошибка")
        setLoading(true)
      }
      
    }
    getGames()
  },[])

  if(loading){
    return <h1>Loading...</h1>
  }

  const prevImage = () =>{
    setIndex((prev) => prev === 0 ? games.length - 1 : prev - 1)
  }
  const nextImage = () =>{
    setIndex((prev) => prev === games.length - 1 ? 0 : prev + 1)
  }

  return (
    <div className={style.hero}>
        <button className={style.btn} onClick={prevImage}><img src="ArrowLeft.svg"/></button>
        <img src={`http://localhost:4000${games[index].image}`} alt="image" className={style.hero__image}/>
        <nav className={style.nav}>
          <p>{games[index].price} ₸</p>
          <Link to={"/"}><button className={style.buy}>Buy Now</button></Link>
          <Link to={"/wishlist"}><button className={style.add}>Add to Whishlist</button></Link>
        </nav>
        <button className={style.btn} onClick={nextImage}><img src="ArrowRight.svg"/></button>
      </div>
  )
}

export default Hero