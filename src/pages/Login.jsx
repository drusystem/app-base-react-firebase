import { useContext ,useState} from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"

const Login = () => {

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const {loginUser}  = useContext(UserContext);
    const navegate = useNavigate();

    const handleSubmit= async(e) =>{
        e.preventDefault()

        try {
            const responseLogin = await loginUser(email,password);
            navegate("/dashboard");
        } catch (error) {
            console.log(error.code);
        }
    }

    return (
        <>
            <h1>INICIAR SESIÓN</h1>
            <form onSubmit={handleSubmit}>
                <input type="email" placeholder="Ingrese email" value={email} onChange={e=>setEmail(e.target.value)} />
                <input type="password" placeholder="Ingrese contraseña" value={password} onChange={e=>setPassword(e.target.value)}  />
                <input type="submit" value="Ingresar" />
            </form>
        </>
    )
}

export default Login