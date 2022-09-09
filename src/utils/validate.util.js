const validaciones = [
    {
        name:'required',
        value:true,
        message:'Campo obligatorio'
    }
]

const validateForName = (name)=>{

    let objValidateDefault = {
        value: false,
        message:'No se encontró la validación solicitada !'
    }
    
    let objValidate = validaciones.find(validItem => validItem.name === name);

    if(objValidate){
        return {
            value:objValidate.value,
            message:objValidate.message
        };
    } 

    return objValidateDefault;
}

export {
    validateForName
}