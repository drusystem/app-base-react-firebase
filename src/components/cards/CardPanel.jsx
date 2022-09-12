

const CardPanel = ({children}) => {
  return (
    <div className="p-4 bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        {children}
    </div>
  )
}

export default CardPanel