
const Table = ({columnas,loading,children}) => {

  return (    
        <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-white uppercase bg-red-900">
                    <tr>
                        {
                            columnas.map((columna)=>(
                                <th key={columna} scope="col" className="py-3 px-6">
                                        {columna}
                                </th>
                            ))
                        }
                    </tr>
                </thead>
                <tbody>
                                {
                            loading ?
                            (
                                <tr key="loading_info" className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <th scope="row" colSpan={columnas.length} className="text-center py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        Cargando información...
                                    </th>
                                </tr>
                            ):(<>
                            {children}
                            </>)
                        }
                </tbody>
            </table>
        </div>
  )
}

export default Table