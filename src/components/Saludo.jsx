const Saludo = ({title,description}) => {
  return (
    <div className="flex bg-white shadow-lg rounded-lg mb-2">
    <div className="icon bg-sky-600 flex justify-center items-center py-4 px-6 rounded-tr-3xl rounded-lg">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-8 w-8 bg-white rounded-full text-sky-600 p-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
    </div>
    <div className="flex flex-col p-4 rounded-tr-lg rounded-br-lg">
        <h2 className="font-semibold text-sky-600">{title}</h2>
        <p className="text-gray-700">
        {description}
        </p>
    </div>
</div>
  )
}

export default Saludo