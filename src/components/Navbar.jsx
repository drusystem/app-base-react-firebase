import { useContext } from "react"
import { NavLink } from "react-router-dom"
import { UserContext } from "../context/UserProvider"



const Navbar = () => {

  const {user,signOutUser } = useContext(UserContext);

  const handleClickLogout = async()=>{
    try {
      await signOutUser()
    } catch (error) {
      console.log(error.code)
    }
  }

  return (
    <div>
      {user ?
        (<>
          <NavLink to="/dashboard">Panel Control</NavLink>
          <button onClick={handleClickLogout}>Cerrar Sesión</button>
        </>):(
          <>
            <NavLink to="/">Ingreso</NavLink>
            <NavLink to="/register">Registro</NavLink>
          </>
        )
      
      }
    </div>
  )
}

export default Navbar