import { useContext,useState} from "react"
import { UserContext } from "../context/UserProvider"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form";
import { formValidate } from "../utils/formValidate";
import FormInputJT from "../components/jt-ui/FormInputJT";
import FormErrorJT from "../components/jt-ui/FormErrorJT";
import GeneralErrorJT from "../components/jt-ui/GeneralErrorJT";


const Login = () => {

    const {loginUser}  = useContext(UserContext);
    const navegate = useNavigate();
    const {register,handleSubmit, formState:{errors}, setError} = useForm();
    const {required, patternEmail,minLength,validateTrim} = formValidate();
    const [errorSystem,setErrorSystem] = useState('');

    const onSubmit = async({email,password}) => {
        try {
            await loginUser(email,password);
            navegate("/dashboard");
        } catch (error) {
            setErrorSystem(error.code);
        }
    }

    return (
        <>
            <div className="min-h-screen bg-[#252831] grid grid-cols-1 lg:grid-cols-2">
                <div className="text-white flex flex-col items-center justify-center gap-8 p-8 max-w-lg mx-auto">
                    {/* <!-- Titulo --> */}
                    <div className="flex flex-col gap-1 w-full">
                    <h1 className="text-4xl font-medium">Iniciar sesión</h1>
                    <p className="text-gray-400">
                        Ingresa al sistema con tus credenciales
                    </p>
                    </div>
                    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" >
                        <GeneralErrorJT code={errorSystem}/>
                        <FormInputJT
                            label="Correo electrónico *"
                            type="email" 
                            placeholder="Ingrese email" 
                            {...register("email",{
                                required,
                                pattern: patternEmail
                            })}
                            error={errors.email}
                        >
                        </FormInputJT>
                        <FormErrorJT error={errors.email}/>

                        <FormInputJT  
                            label="Contraseña *"
                            type="password" 
                            placeholder="Ingrese contraseña"
                            {...register("password",{
                                minLength:minLength(6),
                                validate:validateTrim
                            })}
                            error={errors.password}
                        ></FormInputJT>
                        <FormErrorJT error={errors.password}/>
                        {/* <div className="flex flex-col md:flex-row items-center justify-between gap-4 order-2 md:order-1">
                            <span className="text-gray-400">
                            ¿No tienes cuenta?{" "}
                            <a
                                href="#"
                                className="text-indigo-400 hover:text-indigo-500 transition-colors"
                            >
                                Registrate
                            </a>
                            </span>
                            <a
                            href="#"
                            className="text-gray-400 hover:text-gray-200 transition-colors"
                            >
                            ¿Olvidaste tu contraseña?
                            </a>
                        </div> */}
                        <div className="mt-4 order-1 md:order-2">
                            <button
                            type="submit"
                            className="w-full bg-indigo-700 p-2 rounded-full hover:bg-indigo-800 transition-colors"
                            >
                            Iniciar sesión
                            </button>
                        </div>
                    </form>
                </div>
                {/* <!-- Imagen de fondo --> */}
                <div className="bg hidden lg:block"></div>
                </div>
        </>
    )
}

export default Login