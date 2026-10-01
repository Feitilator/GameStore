import style from './Home.module.css'
import Hero from '../../components/HomeComponents/Hero/Hero';

function Home() {


  return (
    <div className={style.wrapper}>
      <Hero />
      
    </div>
  )
}

export default Home