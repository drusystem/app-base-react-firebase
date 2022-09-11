export const formValidate = () =>{
    return {
        required:{
            value:true,
            message:"Campo Obligatorio",
        },
        patternEmail:{
            value:/[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message:"Formato de email incorrecto",
        },
        minLength: (length)=>{
            return {
                value:length,
                message:`Mínimo ${length} carácteres`
            }
        },
        maxLength: (length)=>{
            return {
                value:length,
                message:`Máximo ${length} carácteres`
            }
        },
        validateTrim:  {
            trim: inputValue =>{
                if(!inputValue.trim()){
                    return "No se permite espacios en blanco";
                }
                return true;
            }
        },
        validateEquals: (getValues)=>{
            return {
                equals: (valInput) => 
                        valInput === getValues("password") ||
                        "No coinciden las contraseñas"   
            }
        }
    }
}