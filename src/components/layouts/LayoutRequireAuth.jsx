import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { UserContext } from "../../context/UserProvider"
import Navbar from "../Navbar"
import Footer from "./Footer"



const LayoutRequireAuth = () => {

    const{user} = useContext(UserContext)

    if(!user){
        return <Navigate to="/" />
    }

    return (
        <div className="flex flex-col h-screen w-full">
            {/* <header>CABECERA</header> */}
            <Navbar/>
            <main className="container mx-auto flex-grow mb-3">
            <Outlet/>
            </main>
            <Footer/>
        </div>
    );
}

export default LayoutRequireAuth;