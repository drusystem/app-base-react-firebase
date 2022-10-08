import { useEffect,useState } from "react"
import { useForm } from "react-hook-form"
import Breadcrumb from "../../../components/Breadcrumb"
import Table from "../../../components/Table"
import { useFirestore } from "../../../hooks/useFirestore"
import { useNavigate } from "react-router-dom"
import GeneralError from "../../../components/GeneralError"
import PlusSVG from "../../../components/iconsSVG/PlusSVG"
import BotonGDinamic from "../../../components/botonGrupal/BotonGDinamic"
import ModalCustom from "../../../components/modal/ModalCustom"
import FormInput from "../../../components/FormInput"
import { formValidate } from "../../../utils/formValidate"
import GeneralMessage from "../../../components/GeneralMessage"
import AutoSearch from "../../../components/AutoSearch"
import BotonGDinamicLoading from "../../../components/botonGrupal/BotonGDinamicLoading"
import CostoPDF from "./CostoPDF"

const Costos = () => {
  const [search,setSearch] = useState('')
  const [modalEstructura,setModalEstructura] = useState({
    title:'Nuevo Costo',
    show:false
  })
  
  const {data,error,loading,getData,addData,success,searchData,deleteData,updateData} = useFirestore('costos')
  const {getDataByColumnReturn:ListarActividades} = useFirestore("actividad")

  const {getItemByColumn,item : igv} = useFirestore("parametros")
  
  const navegate = useNavigate();

  useEffect(()=>{
    getData();
    getItemByColumn('name','IGV');
  },[])

  useEffect(()=>{
    searchData('documento',search)
  },[search])

  const columnasTabla = ['Documento','Proceso UNI','Proceso Cliente','Opciones']
  const migajas = [{
    name:'Costos',
    href:'/dashboard/costos'
  }];

  const {register,handleSubmit, formState:{errors},reset,setValue} = useForm({
    defaultValues:{
        uid:0,
        documento:'',
        pCliente:'',
        pUni:'',
        cliente:'',
        fPresupuesto:'',
        postulantes:''
    }
  });
  const {required} = formValidate()

  const handleClickDetalles = (costoId)=>{
    navegate(`/dashboard/costos/${costoId}`);
  }

  const onSubmit = async({uid, documento,proceso_cliente,proceso_uni,cliente,fecha_presupuesto,postulantes}) => {
        
        if(uid == 0){
          await addData({
            documento: documento.toUpperCase(),
            proceso_cliente,
            proceso_uni,
            cliente,
            fecha_presupuesto,
            postulantes
          })
        }else{
          await updateData(uid,{
            documento: documento.toUpperCase(),
            proceso_cliente,
            proceso_uni,
            cliente,
            fecha_presupuesto,
            postulantes
          })
        }
        
        reset()
        setModalEstructura(prev=>({...prev,show:false}))
  }

  const handleClickNew = () => {
    reset()
    setValue("uid",0);
    setModalEstructura(prev=>({title:'Nuevo Costo',show:true}))
  }

  const handleClickDeleteCosto = async(uid) =>{
    await deleteData(uid)
  }

  const handleClickEdit = ({uid,documento,cliente,proceso_cliente,proceso_uni,postulantes,fecha_presupuesto}) =>{
    setValue("uid",uid);
    setValue("documento",documento);
    setValue("cliente",cliente);
    setValue("proceso_cliente",proceso_cliente);
    setValue("proceso_uni",proceso_uni);
    setValue("postulantes",postulantes);
    setValue("fecha_presupuesto",fecha_presupuesto);
    setModalEstructura(prev=>({title:'Editar Costo',show:true}))
  }

  const handleClickDocument = async(costo) =>{

     const actividades = await ListarActividades('costoId',costo.uid)
     await CostoPDF(costo,actividades, igv.value)
         
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-2 content-center">
          <div className="col-span-7">
            <Breadcrumb migajas={migajas}/>
          </div>
          <div className="col-span-3 flex items-center">
              <AutoSearch placeHolder="Buscar documento..." value={search} onChange={(e)=> setSearch(e.target.value)}/>
          </div>
          <div className="col-span-2 flex items-center">
                <BotonGDinamic onClick={handleClickNew} >
                    <PlusSVG/>Nuevo Costo
                </BotonGDinamic>
          </div>
      </div>
      
      <GeneralError code={error}/>
      <GeneralMessage code={success} type="Éxito !" color='green'/>
      <Table  loading={loading.getData} columnas={columnasTabla} numRegistros={data.length}>
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
                          onClick={()=> handleClickEdit(registro)}
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
                          onClick={()=>handleClickDocument(registro)}
                          type="button"
                          className="inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent border-l border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
                        >
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                          Documento
                        </button>
                        {
                          loading[registro.uid] ?
                          (
                            <BotonGDinamicLoading posicion={2}/>
                          ):
                          (
                            <BotonGDinamic 
                              posicion={2}
                              onClick={()=>handleClickDeleteCosto(registro.uid)}  
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
                            </BotonGDinamic>
                          )
                        }
                        
                      </div>

                    </td>
                </tr>
              ))
          }
      </Table>

      <ModalCustom 
            title={modalEstructura.title}
            verModal={modalEstructura.show} 
            onClose={()=>setModalEstructura(prev=>({...prev,show:false}))} 
            textConfirm="Guardar"
            textCancel="Cancelar"
            anchoModal="2xl"
            loading={loading.addData}
            typeButtonConfirm ="button"
            onClick={handleSubmit(onSubmit)}
        >
             <form className="flex flex-col gap-4" >
                <input type="hidden" 
                  {...register("uid")}   
                />
                <FormInput 
                     label="Documento *"
                     type="text"
                     uppercase={true}
                     placeholder="Ingrese documento"
                     error={errors.documento}
                     {...register("documento",{
                      required
                  })}   
                />

                <FormInput 
                     label="Cliente *"
                     type="text"
                     uppercase={false}
                     placeholder="Ingrese cliente"
                     error={errors.cliente}
                     {...register("cliente",{
                      required
                  })}   
                />

                <FormInput 
                     label="Proceso Cliente *"
                     type="text"
                     uppercase={false}
                     error={errors.proceso_cliente}
                     {...register("proceso_cliente",{
                      required
                  })}   
                />
                
                <FormInput 
                     label="Proceso UNI *"
                     type="text"
                     uppercase={false}
                     error={errors.proceso_uni}
                     {...register("proceso_uni",{
                      required
                  })}   
                />
                <div className="grid grid-cols-2 gap-2">
                    <div>
                      <FormInput 
                          label="N° Postulantes *"
                          type="number"
                          uppercase={false}
                          error={errors.postulantes}
                          {...register("postulantes",{
                            required
                        })}   
                      />
                    </div>
                    <div>
                      <FormInput 
                            label="Fecha de Presupuesto *"
                            type="date"
                            uppercase={false}
                            error={errors.fecha_presupuesto}
                            {...register("fecha_presupuesto",{
                              required
                          })}   
                        />
                    </div>
                </div>
                

               
             </form>
        </ModalCustom>
    </>
  )
}

export default Costos