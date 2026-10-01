import { useEffect, useState } from "react";
import Aside from "../../components/Profile/Aside/Aside";
import style from "./AdminPanel.module.css"
import api from "../../api/axios";
import { Link } from "react-router";

function AdminPanel() {
    const [games, setGames] = useState([])
    const [users, setUsers] = useState([])

    const deleteUser = async (id) =>{
        try {
            const response = await api.delete(`admin/user/${id}`)
            setUsers((prev) => prev.filter((user) => user.id !== id))
        } 
        catch (error) {
            console.log(error)
        }
    }

    const deleteGame = async (id) =>{
        try {
            await api.delete(`admin/game/${id}`)
            setGames((prev) => prev.filter((game) => game.gameId !== id))
        } catch (error) {
            console.log(error.response?.data?.msg || "Ошибка удаление")
        }
    }


    useEffect(() =>{
        const gameHandler = async () =>{
            try {
                const response = await api.get('/admin/games')    
                setGames(response.data.games)   
            } catch (error) {
                console.log(error)
            }
        }
        gameHandler()
    },[])
    useEffect(() =>{
        const userHandler = async () =>{
            try {
                const response = await api.get("/admin/users")
                setUsers(() => response.data.users.filter((user) => user.role !== "admin" ) )
            } catch (error) {
                console.log(error)
            }
        }
        userHandler()
    },[])

    const [change, setChange] = useState(false)
    const handleChange = () =>{
        setChange(prev => !prev)
    }
    
    

  return (
    <div className={style.wrapper}>
        <Aside/>
        <div className={style.block}>
            <button className={style.button} onClick={handleChange}>{change ? "Games" : "Users"}</button>
            {change ? <Link to={"/createGame"} className={style.create} >Create</Link> : ""}
            <div className={style.gamesContainer}>
            {change ? games.length > 0 ? games.map((game) => (
                    <div className={style.gameCard} key={game.id}>
                        <img
                            src={`http://localhost:4000${game.image}`}
                            width={100}/>
                        <h3>{game.title}</h3>
                        <p>{game.price}₸</p>

                        <button>Редактировать</button>
                        <button onClick={() => deleteGame(game.gameId)}>Удалить</button>
                    </div>
                )) : <h1>Nothing</h1>
                :
                users.length > 0 ? users.map((user) => (
                    <div className={style.gameCard} key={user.id}>
                        <h3>ID:  {user.id}</h3>
                        <h3>Name:  {user.name}</h3>
                        <button onClick={() => deleteUser(user.id)}>Удалить</button>
                    </div>
                    
                ))
                : <div>Nothing</div>
            }
            </div>
        </div>
    </div>
    
  )
}

export default AdminPanel