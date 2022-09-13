import { useEffect } from "react"
import Breadcrumb from "../../../components/Breadcrumb";
import Table from "../../../components/Table"
import { useFirestore } from "../../../hooks/useFirestore"
import { useNavigate } from "react-router-dom"
import GeneralError from "../../../components/GeneralError";

const Costos = () => {

  const {data,error,loading,getData} = useFirestore('costos')
  const navegate = useNavigate();
  useEffect(()=>{
    getData()
  },[])

  const columnasTabla = ['Documento','Proceso UNI','Proceso Cliente','Opciones']
  const migajas = ['Costos'];

  const handleClickDetalles = (costoId)=>{
    navegate(`/dashboard/costos/${costoId}`);
  }

  return (
    <>

      <Breadcrumb migajas={migajas}/>
      <GeneralError code={error}/>
      <Table  loading={loading.getData} columnas={columnasTabla}>
          {
            data.map(registro=>(
                <tr key={`tr_register_${registro.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td key={`tr_register_${registro.id}_1`} scope="row" className="py-4 px-6">
                        {registro.documento}
                    </td>
                    <td key={`tr_register_${registro.id}_2`} scope="row" className="py-4 px-6">
                        {registro.proceso_uni}
                    </td>
                    <td key={`tr_register_${registro.id}_3`} scope="row" className="py-4 px-6">
                        {registro.proceso_cliente}
                    </td>

                    {/* <td key={`tr_register_${registro.id}_3`} scope="row" className="py-4 px-6">
                        {registro..toDate().toLocaleDateString('es-ES')}  -
                        {registro.created_date.toDate().toLocaleTimeString('es-ES')}
                    </td> */}
                    <td key={`tr_register_${registro.id}_0`} scope="row" className="py-4 px-6">
                    <div className="inline-flex rounded-lg shadow-sm" role="group">
                        <button
                          type="button"
                          className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>

                          Editar
                        </button>
                        <button
                          onClick={()=>handleClickDetalles(registro.id)}
                          type="button"
                          className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            />
                          </svg>
                          Detalles
                        </button>
                        <button
                          type="button"
                          className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                        >
                          <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                            Eliminar
                        </button>
                      </div>

                    </td>
                </tr>
              ))
          }
      </Table>
    </>
  )
}

export default Costos