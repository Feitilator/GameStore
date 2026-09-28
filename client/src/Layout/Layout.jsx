import { Outlet } from "react-router";
import Header from "../components/Header/Header";

function Layout() {
  return (
    <div>
        <Header />
        <main>
            <Outlet />
        </main>
    </div>
  )
}

export default Layout