import { useContext, useState } from "react";
import { UserContext } from "../context/UserProvider";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { messageForCode } from "../utils/message.util";
import FormError from "../components/FormError";
import { formValidate } from "../utils/formValidate";
import FormInput from "../components/FormInput";

const Register = () => {

    const {registerUser}  = useContext(UserContext);
    const navegate = useNavigate();
    const {register,handleSubmit, formState:{errors},getValues, setError} = useForm();
    const {required, patternEmail,minLength,validateTrim,validateEquals} = formValidate()

    const onSubmit = async({email,password}) => {
        try {
            await registerUser(email,password);
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
        <h1>Registro</h1>
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

            <FormInput
                type="password" 
                placeholder="Repita contraseña" 
                {...register("repassword",{
                    validate:validateEquals(getValues)
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