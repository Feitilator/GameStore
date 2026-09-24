import style from './Home.module.css'

function Home() {
  return (
    <div className={style.wrapper}>
      <div class="image-container">
        <img src="../../public/TheLastOfUs.png" alt="image" className={style.hero}/>
      </div>
    </div>
  )
}

export default Home