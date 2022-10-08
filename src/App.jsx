import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import LayoutRequireAuth from "./components/layouts/LayoutRequireAuth"
import Loading from "./components/layouts/Loading"

import { UserContext } from "./context/UserProvider"
import IsAuthenticated from "./middleware/IsAuthenticated"
import ListParameters from "./pages/Config/Parameters/ListParameters"
import CostoDetalles from "./pages/Dashboard/Costos/CostoDetalles"
import Costos from "./pages/Dashboard/Costos/Costos"
import Home from "./pages/Dashboard/Home"

import Login from "./pages/Login"
import NotFound from "./pages/NotFound"
import Register from "./pages/Register"


const App = ()=> {

  const {user} = useContext(UserContext)

  if(user === false){
    return <Loading/>
  }

  return (
    <>
        <Routes>
          <Route path="/" element={
              <IsAuthenticated>
                  <Login/>
              </IsAuthenticated> 
              } 
            />
          <Route path="/register" element={<Register/>} />

          <Route path="/" element={<LayoutRequireAuth/>}>
              <Route path="dashboard" element={<Home/>}/>
              <Route path="dashboard/costos" element={<Costos/>}/>
              <Route path="dashboard/costos/:costoId" element={<CostoDetalles/>}/>
              <Route path="config/parameters" element={<ListParameters/>}/>
          </Route>
          <Route path="*" element={<NotFound/>}/>
          
          {/* <Route path="/" element={<Layout/>}>
            <Route path="/dashboard" element={
                <RequireAuth>
                    <Dashboard/>
                </RequireAuth>
              } 
            />
          </Route> */}

        </Routes>
    </>
  )
}

export default App
