import { forwardRef } from "react"
import FormError from "./FormError";

const FormInputYesNo = forwardRef(({opcion1,opcion2,desglose,label,onChange,onClick, onBlur,name,error,disabled},ref) => {

    const classLabel = "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300";
    const errorClassLabel = "block mb-2 text-sm font-medium text-red-700 dark:text-red-500";
    let errorClassInput = "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-red-100 dark:border-red-400";
    let classInput ="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500";

  return (
    <div className="mb-2">
        <label
          className={error?errorClassLabel:classLabel}
        >
          {label}
        </label>
        <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 sm:flex dark:bg-gray-700 dark:border-gray-600 dark:text-white">
            <li className="w-full border-b border-gray-200 sm:border-b-0 sm:border-r dark:border-gray-600">
            <div className="flex items-center pl-3">
                <input
                id={`${name}_${opcion1}`}
                type="radio"
                defaultValue="1"
                name={name}
                className={error?errorClassInput:classInput}
                ref={ref} 
                onBlur={onBlur}
                checked={desglose}
                onChange={onChange}
                disabled={disabled} 
                />
                <label
                htmlFor={`${name}_${opcion1}`}
                className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                {opcion1}
                </label>
            </div>
            </li>
            <li className="w-full dark:border-gray-600">
            <div className="flex items-center pl-3">
                <input
                id={`${name}_${opcion2}`}
                type="radio"
                defaultValue="2"
                name={name}
                className={error?errorClassInput:classInput}
                ref={ref} 
                onBlur={onBlur}
                checked={!desglose}
                onChange={onChange}
                disabled={disabled} 
                />
                <label
                htmlFor={`${name}_${opcion2}`}
                className="py-3 ml-2 w-full text-sm font-medium text-gray-900 dark:text-gray-300"
                >
                {opcion2}
                </label>
            </div>
            </li>
        </ul>
        <FormError error={error}/>
    </div>

  )
}
)
export default FormInputYesNo