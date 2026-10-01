import { useState } from "react";
import style from "./CreateGame.module.css"
import api from "../../api/axios";
import { Link, useNavigate } from "react-router";

function CreateGame() {
    const nav = useNavigate()
    const [data, setData] = useState({
        title: "",
        description: "",
        price: ""
    })
    const [images, setImages] = useState([])

    const handleImages = (e) =>{
        const files = Array.from(e.target.files)

        if(files.length > 5){
            alert("Максимум 5 изображений")
            return
        }
        setImages(files)
    }

    const handleSumbit = async (e) =>{
        e.preventDefault()

        const formData = new FormData()

        formData.append("title", data.title)
        formData.append("description", data.description)
        formData.append("price", data.price)

        images.forEach((image) =>{
            formData.append("images", image)
        })
        try {
            const response = await api.post("/admin/game", formData)
            nav('/admin')
        } catch (error) {
            console.log(error.response?.data?.msg || "Ошибка")
        }
    }
  return (
    <div className={style.wrapper}>
        <div className={style.block}>
            <Link to={"/admin"}><img src="back.svg" /> Back </Link>
            <form className={style.form} onSubmit={handleSumbit}>
                <input type="text" placeholder="Название" value={data.title} onChange={(e) => setData({...data, title: e.target.value})} required/>
                <textarea width={500} style={{resize:"none"}} placeholder="Описание" value={data.description} onChange={(e) => setData({...data, description: e.target.value})} required/>
                <input type="number" placeholder="Цена" value={data.price} onChange={(e) => setData({...data, price: e.target.value})} required/>
                <input type="file" accept="image/jpeg,image/png,image/webp" multiple onChange={handleImages} required/>
                <div className={style.previos}>
                    {images.map((image,index) => (
                        <img 
                            className={style.image}
                            key={index} 
                            src={URL.createObjectURL(image)} 
                            alt="" 
                            width={270}
                            height={190}
                        />
                    ) )}
                </div>
                <button type="submit">Создать</button>
            </form>
            
        </div>
    </div>
  )
}

export default CreateGame