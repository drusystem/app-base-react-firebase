import { useContext } from "react"
import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import Navbar from "./components/Navbar"
import { UserContext } from "./context/UserProvider"
import IsAuthenticated from "./middleware/IsAuthenticated"
import RequireAuth from "./middleware/RequireAuth"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"


const App = ()=> {

  const {user} = useContext(UserContext)

  if(user === false){
    return <p>Loading...</p>
  }

  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={
          <IsAuthenticated>
              <Login/>
          </IsAuthenticated> 
          } />
          <Route path="/register" element={<Register/>} />
          <Route path="/dashboard" element={
            <RequireAuth>
                <Dashboard/>
            </RequireAuth>
          } />

        </Routes>
      </Layout>
    </>
  )
}

export default App
