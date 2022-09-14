const LiCustom = ({llave,children}) => {
    
  return (
    <li key={llave} className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">{children}</li>
  )
}

export default LiCustom