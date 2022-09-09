import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { messageForCode } from "../utils/message.util";
import { regexForName } from "../utils/regex.util";
import { validateForName } from "../utils/validate.util";

const Register = () => {

    const {registerUser}  = useContext(UserContext);
    const navegate = useNavigate();
    const {register,handleSubmit, formState:{errors},getValues, setError} = useForm();

    const onSubmit = async({email,password}) => {
        try {
            await registerUser(email,password);
            navegate("/dashboard");
        } catch (error) {
            console.log(error.code);
            const errorUtil = messageForCode(error)
            setError("email",{
                message:errorUtil
            })
            // errors.email.message = errorUtil;
        }
    }

  return (
    <>
        <h1>Registro</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
            <input type="email" placeholder="Ingrese email" 
                {...register("email",{
                    required: validateForName('required'),
                    pattern: regexForName('formato_email')
                })}
            />
            {errors.email && <p>{errors.email.message}</p>}
            <input type="password" placeholder="Ingrese contraseña" 
                {...register("password",{
                    minLength:{
                        value:6,
                        message:"Mínimo 6 carácteres"
                    },
                    validate:{
                        trim: inputValue =>{
                            if(!inputValue.trim()){
                                return "No se permite espacios en blanco";
                            }
                            return true;
                        }
                    }
                })}
            />
            {errors.password && <p>{errors.password.message}</p>}
            <input type="password" placeholder="Repita contraseña" 
                {...register("repassword",{
                    validate:{
                        equals: valInput => valInput === getValues("password") ||
                        "No coinciden las contraseñas",
                    }
                })}
            />
            {errors.repassword && <p>{errors.repassword.message}</p>}
            <input type="submit" value="Registrar" />
        </form>
    </>
  )
}

export default Register