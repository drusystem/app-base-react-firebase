const UlCustom = ({children,classAdicional}) => {
  return (
    <ul className={`w-full ${classAdicional} text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:text-white`}>
    {children}
    </ul>
  )
}

export default UlCustom