import { Outlet } from "react-router-dom"
import Navbar from "./Navbar"

const Layout = () => {
  return (
    <>
        {/* <header>CABECERA</header> */}
        <Navbar/>
        <main>
          <Outlet/>
        </main>
        <footer>
            FOOTER
        </footer>
    </>
  )
}

export default Layout