import style from './Profile.module.css'
import Aside from '../../components/Profile/Aside/Aside';
import { useAuth } from '../../Context/AuthContext';
import { Link, useNavigate } from 'react-router';
import api from '../../api/axios';

function Profile() {
    const nav = useNavigate()
    const {user,loading,checkAuth} = useAuth()

    if(loading){
        return <h1 className={style.loading}>Loading...</h1>
    }
    
    const handleLogout = async () =>{
        try {
        const response = await api.get("/auth/logout") 
        await checkAuth()
        nav('/') 
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className={style.wrapper}>
        <Aside />
        <div className={style.block}>
            <h1>Hello {user.name}</h1>
            <p className={style.p}>What do you want to do?</p>
            <hr />
            <nav className={style.cards}>
                <Link to={"/info"}><article><img src="user.svg" alt="image" /><h1>Personal Information</h1> <p>Modify Your Personal Information</p></article></Link>
                <Link to={"/orders"}><article><img src="order.svg" alt="image" /><h1>My Orders</h1><p>Manage Your Previous Orders</p></article></Link>
                <Link to={"/wishlist"}><article><img src="wishlist.svg" alt="image" /><h1>Wishlist</h1><p>View Games You Added in Wishlist</p></article></Link>
                {user.role == 'user' ? 
                <Link to={"/payment"}><article><img src="payment.svg" alt="image" /><h1>Payment Methods</h1><p>Adjust Your Payment Method</p></article></Link> 
                : 
                <Link to={"/admin"}><article><img src="administrator.png" alt="image" style={{width: 88, height: 88}} /><h1>Admin Panel</h1><p>Add new game or update information</p></article></Link>
                }
                
            </nav>
            <button className={style.logout} onClick={handleLogout}>Logout</button>
        </div>
    </div>
  )
}

export default Profile