import { forwardRef } from "react"


const FormInputJT = forwardRef(({type,placeholder,onChange, onBlur,name,label},ref) => {
  return (
    <>
      <div>
           <label htmlFor="email" className="text-gray-200">
            {label}
            </label>
           <input
              type={type} 
              id={name}
              ref={ref} 
              onChange={onChange} 
              onBlur={onBlur} 
              name={name}
              autoComplete="off"
              className="w-full py-2 px-4 bg-transparent border rounded-full mt-2 outline-none focus:border-indigo-400"
              placeholder={placeholder} 
            />
      </div>
    </>
    
  )
}
)
export default FormInputJT