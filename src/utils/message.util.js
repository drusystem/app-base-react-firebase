const mensajesError = [
   
    {code:'auth/claims-too-large',description:'La carga útil de la reclamación que se entregó a setCustomUserClaims() supera el tamaño máximo de 1,000 bytes.'},
    {code:'auth/email-already-exists',description:'Otro usuario ya está utilizando el correo electrónico proporcionado. Cada usuario debe tener un correo electrónico único.'},
    {code:'auth/id-token-expired',description:'El token de ID de Firebase que se proporcionó está vencido.'},
    {code:'auth/id-token-revoked',description:'Se revocó el token de ID de Firebase.'},
    {code:'auth/insufficient-permission',description:'La credencial que se usó para inicializar el SDK de Admin no tiene permisos suficientes para acceder al recurso de Authentication solicitado. Consulta cómo configurar un proyecto de Firebase si necesitas ver la documentación para generar una credencial con los permisos apropiados y usarla a fin de autenticar los SDK de Admin.'},
    {code:'auth/internal-error',description:'El servidor de Authentication encontró un error inesperado cuando se intentaba procesar la solicitud. Para obtener información adicional, revisa la respuesta del servidor de autenticación, que debería estar incluida en el mensaje de error. Si el error persiste, avísanos mediante nuestro canal de asistencia de informe de errores.'},
    {code:'auth/invalid-argument',description:'Se proporcionó un argumento no válido para un método de autenticación. El mensaje de error debe incluir información adicional.'},
    {code:'auth/invalid-claims',description:'Los atributos personalizados del reclamo que se entregaron a setCustomUserClaims() no son válidos.'},
    {code:'auth/invalid-continue-uri',description:'La URL de continuación debe ser una string de URL válida.'},
    {code:'auth/invalid-creation-time',description:'La hora de creación debe ser una string de fecha en formato UTC válida.'},
    {code:'auth/invalid-credential',description:'La credencial que se usa para autenticar los SDK de Admin no se puede emplear a fin de realizar la acción deseada. Algunos métodos de autenticación, como createCustomToken() y verifyIdToken(), requieren que los SDK se inicialicen con una credencial de certificado en lugar de un token de actualización o una credencial predeterminada de la aplicación. Consulta Inicializa el SDK para ver documentación sobre cómo autenticar el SDK de Admin con una credencial de certificado.'},
    {code:'auth/invalid-disabled-field',description:'El valor que se proporcionó para la propiedad del usuario disabled no es válido. Debe ser un booleano.'},
    {code:'auth/invalid-display-name',description:'El valor que se proporcionó para la propiedad del usuario displayName no es válido. Debe ser una string que no esté vacía.'},
    {code:'auth/invalid-dynamic-link-domain',description:'El dominio del vínculo dinámico proporcionado no se configuró o no se autorizó para el proyecto actual.'},
    {code:'auth/invalid-email',description:'El valor que se proporcionó para la propiedad del usuario email no es válido. Debe ser una dirección de correo electrónico de string.'},
    {code:'auth/invalid-email-verified',description:'El valor que se proporcionó para la propiedad del usuario emailVerified no es válido. Debe ser un booleano.'},
    {code:'auth/invalid-hash-algorithm',description:'El algoritmo de hash debe coincidir con las strings de la lista de algoritmos compatibles.'},
    {code:'auth/invalid-hash-block-size',description:'El tamaño del conjunto de hash debe ser un número válido.'},
    {code:'auth/invalid-hash-derived-key-length',description:'La longitud de la clave derivada de hash debe ser un número válido.'},
    {code:'auth/invalid-hash-key',description:'La clave de hash debe ser un búfer de bytes válido.'},
    {code:'auth/invalid-hash-memory-cost',description:'El costo de la memoria de hash debe ser un número válido.'},
    {code:'auth/invalid-hash-parallelization',description:'La paralelización de hash debe ser un número válido.'},
    {code:'auth/invalid-hash-rounds',description:'Las rondas de hash deben ser un número válido.'},
    {code:'auth/invalid-hash-salt-separator',description:'El campo del separador de sal del algoritmo de hash debe ser un búfer de bytes válido.'},
    {code:'auth/invalid-id-token',description:'El token de ID que se proporcionó no es un token de ID de Firebase válido.'},
    {code:'auth/invalid-last-sign-in-time',description:'La hora del último acceso debe ser una string de fecha en formato UTC válida.'},
    {code:'auth/invalid-page-token',description:'El token de página siguiente que se entregó en listUsers() no es válido. Debe ser una string válida que no esté vacía.'},
    {code:'auth/invalid-password',description:'El valor que se proporcionó para la propiedad del usuario password no es válido. Debe ser una string con al menos seis caracteres.'},
    {code:'auth/invalid-password-hash',description:'El hash de contraseñas debe ser un búfer de bytes válidos.'},
    {code:'auth/invalid-password-salt',description:'La contraseña con sal debe ser un búfer de bytes válido.'},
    {code:'auth/invalid-phone-number',description:'El valor que se proporcionó para phoneNumber no es válido. Debe ser una string de identificador que no esté vacía y que cumpla con el estándar E.164.'},
    {code:'auth/invalid-photo-url',description:'El valor que se proporcionó para la propiedad del usuario photoURL no es válido. Debe ser una URL de string.'},
    {code:'auth/invalid-provider-data',description:'providerData debe ser una serie de objetos UserInfo.'},
    {code:'auth/invalid-provider-id',description:'providerId debe ser una string del identificador del proveedor compatible válida.'},
    {code:'auth/invalid-oauth-responsetype',description:'Se debe configurar solo un responseType de OAuth como verdadera.'},
    {code:'auth/invalid-session-cookie-duration',description:'La duración de la cookie de sesión debe ser un número válido en milisegundos que vaya entre los 5 minutos y las 2 semanas.'},
    {code:'auth/invalid-uid',description:'El uid proporcionado debe ser una string no vacía con un máximo de 128 caracteres.'},
    {code:'auth/invalid-user-import',description:'El registro de usuarios para importar no es válido.'},
    {code:'auth/maximum-user-count-exceeded',description:'Se excedió la cantidad máxima de usuarios permitidos para importar.'},
    {code:'auth/missing-email',description:'Se requiere enviar un correo electrónico'},
    {code:'auth/missing-android-pkg-name',description:'Si es obligatorio instalar la app para Android, debe proporcionarse un nombre de paquete de Android.'},
    {code:'auth/missing-continue-uri',description:'Se debe proporcionar una URL de continuación válida en la solicitud.'},
    {code:'auth/missing-hash-algorithm',description:'Para importar usuarios con hash de contraseñas, es necesario proporcionar el algoritmo de hash y sus parámetros.'},
    {code:'auth/missing-ios-bundle-id',description:'Falta un ID del paquete en la solicitud.'},
    {code:'auth/missing-uid',description:'Se requiere un identificador uid para la operación actual.'},
    {code:'auth/missing-oauth-client-secret',description:'El secreto de cliente de la configuración de OAuth es obligatorio para habilitar el flujo de código de OIDC.'},
    {code:'auth/operation-not-allowed',description:'El proveedor de acceso proporcionado está inhabilitado para tu proyecto de Firebase. Habilítalo en la sección Método de acceso de Firebase console.'},
    {code:'auth/phone-number-already-exists',description:'Otro usuario ya utiliza el phoneNumber proporcionado. Cada usuario debe tener un phoneNumber único.'},
    {code:'auth/project-not-found',description:'No se encontró ningún proyecto de Firebase para la credencial que se usó para inicializar los SDK de Admin. Consulta cómo configurar un proyecto de Firebase si necesitas ver la documentación para generar la credencial de tu proyecto y usarla a fin de autenticar los SDK de Admin.'},
    {code:'auth/reserved-claims',description:'Una o más reclamaciones personalizadas de usuarios que se entregaron a setCustomUserClaims() están reservadas. Por ejemplo, no deben usarse reclamos específicos de OIDC (p. ej., sub, iat, iss, exp, aud o auth_time) como claves para reclamos personalizados.'},
    {code:'auth/session-cookie-expired',description:'La cookie proporcionada de la sesión de Firebase venció.'},
    {code:'auth/session-cookie-revoked',description:'Se revocaron las cookies de la sesión de Firebase.'},
    {code:'auth/uid-already-exists',description:'Otro usuario ya utiliza el uid proporcionado. Cada usuario debe tener un uid único.'},
    {code:'auth/unauthorized-continue-uri',description:'El dominio de la URL de continuación no está en la lista blanca. Inclúyelo en la lista en Firebase console.'},
    {code:'auth/user-not-found',description:'No existe ningún registro de usuario que corresponda al identificador proporcionado.'}

]

const messageForCode = ({code})=>{

    let objMessage = mensajesError.find(msj => msj.code === code);
    if(objMessage){
        return objMessage.description
    }
    return `Error no controlado : "${code}", por favor tome captura del navegador y notifquelo al administrador`;
}

export {
    messageForCode
}