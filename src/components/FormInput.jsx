import { forwardRef } from "react"
import FormError from "./FormError";


const FormInput = forwardRef(({type,placeholder,onChange, onBlur,name,label,error,uppercase=true,disabled=false},ref) => {
    // Si queremos q se guarde mayuscula, a parte de mostrarlo en el input en mayuscula
    // debemos agregar al objeto: variableString.toUpperCase()

    const classLabel = "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300";
    const errorClassLabel = "block mb-2 text-sm font-medium text-red-700 dark:text-red-500";
    let errorClassInput = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400";
    let classInput ="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500";

    uppercase && (classInput = classInput+' uppercase')
    uppercase && (errorClassInput = errorClassInput+' uppercase')

  return (
    <div className="mb-2">
        <label
          htmlFor={name}
          className={error?errorClassLabel:classLabel}
        >
          {label}
        </label>
        <input 
            className={error?errorClassInput:classInput}
            type={type} 
            placeholder={placeholder} 
            ref={ref} 
            onChange={onChange} 
            onBlur={onBlur} 
            name={name}
            disabled={disabled}
        />
        <FormError error={error}/>
    </div>
  )
}
)
export default FormInput