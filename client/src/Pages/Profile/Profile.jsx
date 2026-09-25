import style from './Profile.module.css'
import Aside from '../../components/Profile/Aside/Aside';
import { useAuth } from '../../Context/AuthContext';
import { Link } from 'react-router';

function Profile() {
    const {user,loading} = useAuth()

    if(loading){
        return <h1 className={style.loading}>Loading...</h1>
    }

  return (
    <div className={style.wrapper}>
        <Aside />
        <div className={style.block}>
            <h1>Hello {user.name}</h1>
            <p className={style.p}>What do you want to do?</p>
            <hr />
            <nav className={style.cards}>
                <Link to={"/info"}><article><img src="../../public/user.svg" alt="image" /><h1>Personal Information</h1> <p>Modify Your Personal Information</p></article></Link>
                <Link><article><img src="../../public/order.svg" alt="image" /><h1>My Orders</h1><p>Manage Your Previous Orders</p></article></Link>
                <Link><article><img src="../../public/wishlist.svg" alt="image" /><h1>Wishlist</h1><p>View Games You Added in Wishlist</p></article></Link>
                <Link><article><img src="../../public/payment.svg" alt="image" /><h1>Payment Methods</h1><p>Adjust Your Payment Method</p></article></Link>
            </nav>
        </div>
    </div>
  )
}

export default Profile