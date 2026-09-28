import { useEffect, useState } from "react";
import Aside from "../../components/Profile/Aside/Aside";
import style from "./AdminPanel.module.css"
import api from "../../api/axios";

function AdminPanel() {
    const [games, setGames] = useState({})
    const [users, setUsers] = useState([])

    const deleteHandle = async (id) =>{
        try {
            const response = await api.delete(`admin/deleteuser/${id}`)
            console.log(response)
        } 
        catch (error) {
            console.log(error)
        }
    }


    useEffect(() =>{
        const gameHandler = async () =>{
            try {
                const response = await api.get('/admin/gameslist')
                setGames(response.data)
            } catch (error) {
                console.log(error)
            }
        }
        gameHandler()
    },[])
    useEffect(() =>{
        const userHandler = async () =>{
            try {
                const response = await api.get("/admin/userslist")
                setUsers(response.data.users)
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
            <div className={style.gamesContainer}>
            {change ? games.lenght > 0 ? games.map((game) => (
                    <div className={style.gameCard} key={game.id}>
                        <img/>

                        <h3>{game.title}</h3>
                        <p>{game.price}₸</p>

                        <button>Редактировать</button>
                        <button>Удалить</button>
                    </div>
                )) : <h1>Nothing</h1>
                :
                users.length > 0 ? users.map((user) => (
                    <div className={style.gameCard} key={user.id}>
                        <h3>ID:  {user.id}</h3>
                        <h3>Name:  {user.name}</h3>
                        <button onClick={deleteHandle(user.id)}>Удалить</button>
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