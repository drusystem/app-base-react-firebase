import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";
import GeneralError from "../components/GeneralError";

const Register = () => {

    const {registerUser}  = useContext(UserContext);
    const navegate = useNavigate();
    const {register,handleSubmit, formState:{errors},getValues, setError} = useForm();
    const {required, patternEmail,minLength,validateTrim,validateEquals} = formValidate()
    const [errorSystem,setErrorSystem] = useState('');
    const onSubmit = async({email,password}) => {
        try {
            await registerUser(email,password);
            navegate("/dashboard");
        } catch (error) {
            setErrorSystem(error.code);
            // setError("firebase",{
            //     message:errorUtil
            // })
            // errors.email.message = errorUtil;
        }
    }

  return (
    <>
        <h1>Registro</h1>
        <GeneralError code={errorSystem}/>
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

            <FormInput
                type="password" 
                placeholder="Repita contraseña" 
                {...register("repassword",{
                    validate:validateEquals(getValues("password"))
                })}
            >
            </FormInput>
            <FormError error={errors.repassword}/>
            <input type="submit" value="Registrar" />
        </form>
    </>
  )
}

export default Register