
const CardItem = ({label,description}) => {
  return (
    <div className="mb-6">
    <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
    >
        {label}
    </label>
        <div
        className="flex items-center p-3 text-base text-gray-900 bg-gray-100 rounded-lg hover:bg-gray-200 group hover:shadow dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-white"
        >
            {description}
        </div>

    </div>

  )
}

export default CardItem