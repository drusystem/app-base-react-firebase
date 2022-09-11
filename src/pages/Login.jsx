import { useContext} from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { messageForCode } from "../utils/message.util";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import { formValidate } from "../utils/formValidate";

const Login = () => {

    const {loginUser}  = useContext(UserContext);
    const navegate = useNavigate();
    const {register,handleSubmit, formState:{errors}, setError} = useForm();
    const {required, patternEmail,minLength,validateTrim} = formValidate()

    const onSubmit = async({email,password}) => {
        try {
            await loginUser(email,password);
            navegate("/dashboard");
        } catch (error) {
            console.log(error.code);
            const errorUtil = messageForCode(error)
            setError("firebase",{
                message:errorUtil
            })
            // errors.email.message = errorUtil;
        }
    }

    return (
        <>
            <h1>INICIAR SESIÓN</h1>
            <FormError error={errors.firebase}/>
            <form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
                type="email" 
                placeholder="Ingrese email" 
                {...register("email",{
                    required,
                    pattern: patternEmail
                })}
            >
            </FormInput>
            <FormError error={errors.email}/>

            <FormInput  
                type="password" 
                placeholder="Ingrese contraseña"
                {...register("password",{
                    minLength:minLength(6),
                    validate:validateTrim
                })}
            ></FormInput>
            <FormError error={errors.password}/>

                <input type="submit" value="Ingresar" />
            </form>
        </>
    )
}

export default Login