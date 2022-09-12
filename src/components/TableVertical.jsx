
const TableVertical = ({elementos}) => {
  return (
    <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <tbody>
                {
                    elementos.map((item,index)=>(
                        <tr key={index} className="border-b border-gray-200 dark:border-gray-700">
                            <th key={`${index}_2`} scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap bg-gray-50 dark:text-white dark:bg-gray-800">
                                {item.column}
                            </th>
                            <td key={`${index}_2`} class="py-4 px-6">
                                {item.value}
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
    </div>

  )
}

export default TableVertical