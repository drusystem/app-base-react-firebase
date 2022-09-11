import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { UserContext } from "../context/UserProvider"


const IsAuthenticated = ({children}) => {

    const{user} = useContext(UserContext)

    if(user){
        return <Navigate to="/dashboard" />
    }

    return children;
}

export default IsAuthenticated;