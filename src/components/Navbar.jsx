import { useContext } from "react"
import { Link, NavLink } from "react-router-dom"
import { UserContext } from "../context/UserProvider"
import { groupClassTailwind } from "../utils/groupClassTailwind";



const Navbar = () => {

  const {user,signOutUser } = useContext(UserContext);
  const {botonRojo, menuLinkOption} = groupClassTailwind();

  const handleClickLogout = async()=>{
    try {
      await signOutUser()
    } catch (error) {
      console.log(error.code)
    }
  }

  return (
    <nav className=" border-gray-200 px-2 sm:px-4 py-2.5 bg-gray-800">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
          <Link to="dashboard" className="flex items-center">
            <span className="self-center text-3xl font-semibold whitespace-nowrap text-white">APP - COSTOS</span>
          </Link>
          <div className="flex md:order-2">
              {user ?
                (<>
                  <button type="button" className={botonRojo} onClick={handleClickLogout}>Cerrar Sesión</button>
                </>):(
                  <>
                    <NavLink to="/" className="">Ingreso</NavLink>
                    <NavLink to="/register" className="">Registro</NavLink>
                  </>
                )
              }
              
              <button
                data-collapse-toggle="navbar-sticky"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-sticky"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
          </div>

          <div className="hidden justify-between items-center w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
            <ul className="flex flex-col p-4 mt-4 bg-gray-50 rounded-lg border border-gray-100 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              {user &&
                  (<>
                    <NavLink className={menuLinkOption} to="/dashboard">
                      <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                      INICIO
                    </NavLink>
                    <NavLink className={menuLinkOption} to="/dashboard/costos">
                    <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      COSTOS
                    </NavLink>
                  </>)
              }
              
             
            </ul>
          </div>

      </div>
      

    </nav>
  )
}

export default Navbar