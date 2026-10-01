import { Outlet } from "react-router";
import Header from "../components/Header/Header";

function Layout() {
  return (
    <div>
        <Header />
        <main style={{maxWidth: 1440, margin: "0 auto"}}>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout