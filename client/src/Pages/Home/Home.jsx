import style from './Home.module.css'

function Home() {
  return (
    <div className={style.wrapper}>
      <img src="../../public/TheLastOfUs.png" alt="image" className={style.hero__image}/>
    </div>
  )
}

export default Home