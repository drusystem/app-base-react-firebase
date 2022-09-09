const validacionesRegex = [
    {
        name:'formato_email',
        value:/[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
        message:'Formato de correo inválido'
    }
]

const regexForName = (name)=>{

    let objRegexDefault = {
        value:/^([a-zA-Z0-9 _-]+)$/,
        message:'No se encontró el regex solicitado, validar!'
    }
    
    let objRegex = validacionesRegex.find(regexValid => regexValid.name === name);

    if(objRegex){
        return {
            value:objRegex.value,
            message:objRegex.message
        };
    } 

    return objRegexDefault;
}

export {
    regexForName
}