import Navbar from "./Navbar"

const Layout = ({children}) => {
  return (
    <>
        <header>CABECERA</header>
        <Navbar/>
        <main>
            {children}
        </main>
        <footer>
            FOOTER
        </footer>
    </>
  )
}

export default Layout