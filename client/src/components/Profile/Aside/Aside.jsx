import { NavLink } from "react-router";
import style from "./Aside.module.css"

function Aside() {
  return (
        <aside className={style.aside}>
            <NavLink to={"/profile"} className={({isActive}) => isActive ? style.active : ""}><h3>My Account</h3><p>Account Management</p></NavLink>
            <NavLink to={"/info"} className={({isActive}) => isActive ? style.active : ""}><h3>Personal Information</h3><p>Modify Your Personal Information</p></NavLink>
            <NavLink to={"/orders"} className={({isActive}) => isActive ? style.active : ""}><h3>My Orders</h3><p>View Your Previous Orders</p></NavLink>
            <NavLink to={"/wishlist"} className={({isActive}) => isActive ? style.active : ""}><h3>Wishlist</h3><p>View Games You Added in Wishlist</p></NavLink>
            <NavLink to={"/payment"} className={({isActive}) => isActive ? style.active : ""}><h3>Payment Methods</h3><p>Adjust Your Payment Method</p></NavLink>
        </aside>
  )
}

export default Aside