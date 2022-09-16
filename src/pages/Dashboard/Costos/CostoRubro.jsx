import { useState,useEffect } from "react"
import { useForm } from "react-hook-form"
import BotonGDinamic from "../../../components/botonGrupal/BotonGDinamic"
import CardHeaderTools from "../../../components/cards/CardHeaderTools"
import CardPanel from "../../../components/cards/CardPanel"
import FormInput from "../../../components/FormInput"
import FormInputYesNo from "../../../components/FormInputYesNo"
import GeneralError from "../../../components/GeneralError"
import DeleteSVG from "../../../components/iconsSVG/DeleteSVG"
import EditSVG from "../../../components/iconsSVG/EditSVG"
import PlusSVG from "../../../components/iconsSVG/PlusSVG"
import UlCustom from "../../../components/listas/UlCustom"
import ModalCustom from "../../../components/modal/ModalCustom"
import { useFirestore } from "../../../hooks/useFirestore"
import { formValidate } from "../../../utils/formValidate"

const CostoRubro = ({costoId}) => {

    const [desglose,setDesglose] = useState(true)
    const [nivel,setNivel] = useState({
        level:0,
        indice:null,
        indice2:null
    })
    const [viewModalRubro,setViewModalRubro] = useState(false)
    const [titleModalRubro,setTitleModalRubro] = useState('NUEVO RUBRO')
    const {data,setData,error,loading,getDataByColumn,addData} = useFirestore('actividad');
    const {register,handleSubmit, formState:{errors},reset} = useForm({
        defaultValues:{
            actividad:'',
            responsable:'',
            cantidad:'',
            pUnitario:'',
            pParcial:'',
            pTotal:''
        }
    });
    const {required} = formValidate()
    useEffect(()=>{
        getDataByColumn('costoId',costoId);
    },[])

    const onSubmit = ({actividad,responsable,cantidad,pUnitario,pParcial,pTotal}) =>{
        // actividad:actividad.toUpperCase(),
        const nuevaActividad = {
            actividad,
            responsable,
            cantidad,
            pUnitario,
            pParcial,
            pTotal,
            items:[],
            nivel: nivel.level
        }

        if(nivel.level == 0){
            setData([...data, nuevaActividad])
        }else if(nivel.level == 1){
            let arrayActividades = data.map((actividad,indice) =>{
                if(nivel.indice === indice){
                    actividad.items.push(nuevaActividad) 
                }
                return actividad
            })
            setData(arrayActividades);
        }else if (nivel.level == 2){
            let arrayActividades = data.map((actividad,indice) =>{

                if(nivel.indice === indice){

                    let arrayActividadEnLectura =  actividad.items.map((actividadNivel1,index2)=>{
                        if(nivel.indice2 === index2){
                            actividadNivel1.items.push(nuevaActividad);
                        }
                        return actividadNivel1
                    })

                    actividad.items = arrayActividadEnLectura

                }

                return actividad
                
            })
            debugger;
            setData(arrayActividades);
        }else{

        }
        

        setViewModalRubro(false);
        reset();
    }

    const handleClickItem = (indexActividad)=>{
        const objetoEntrante = {
            actividad:'Sub actividad',
            responsable:'ExISTE responsable',
            cantidad:2,
            pUnitario:3,
            pParcial:6,
            pTotal:6,
            items:[]
        }
        const nuevoArray = data.map((element,index) =>{
            if(index ===indexActividad ){
                element.items = [...element.items,objetoEntrante]
            }
            return element;
        })

        setData(nuevoArray);
    }

    // const onSubmit = async({actividad,responsable,cantidad,pUnitario,pParcial,pTotal}) => {
        
    //     await addData({
    //         costoId,
    //         actividad,
    //         responsable,
    //         cantidad,
    //         pUnitario,
    //         pParcial,
    //         pTotal
    //     })
    //     setViewModalRubro(false);
    // }
    const handleChangeYesNo = () =>{
        setDesglose(!desglose)
    }

    const handleClickAddActividad = (edit,nivel_Actividad,indice,indice2 = null) =>{
        if(edit){
            setTitleModalRubro('EDITAR ACTIVIDAD')
            
        }else{
            setTitleModalRubro('NUEVA ACTIVIDAD')
        }

        setNivel({
            level:nivel_Actividad,
            indice,
            indice2
        })
        
        setViewModalRubro(true);
        setDesglose(true);
    }

  return (
    <>
        <CardPanel>
            <CardHeaderTools title="ACTIVIDADES REGISTRADAS">
                <BotonGDinamic onClick={()=>handleClickAddActividad(false,0,null)}>
                    <PlusSVG/>Nueva actividad
                </BotonGDinamic>
            </CardHeaderTools>
            <GeneralError code={error}/>
            <UlCustom>
                {
                    loading.getDataByColumn?
                    (
                        <li key="loadingRecord" className="text-center py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
                            Cargando actividades...
                        </li>
                    ):(
                        data.length === 0 ?
                            (
                                <>
                                    <li key="notRecord" className="text-center py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">No hay actividades registradas</li>
                                </>
                            ):(
                                data.map((registro,index)=>(
                                    <li key={index} className="py-2 px-4 w-full border-b border-gray-200 dark:border-gray-600">
                                        <div className="grid grid-cols-3 gap-2">
                                            <div className="col-span-2 grid content-center">
                                                {registro.actividad}
                                            </div>
                                            <div className="flex flex-row-reverse">
                                                <button 
                                                    onClick={()=>handleClickAddActividad(false,1,index)}
                                                    title="Agregar actividad"
                                                >
                                                    <PlusSVG claseSVG="w-6 h-6 mr-2"/>
                                                </button>
                                                <button title="Editar actividad">
                                                    <EditSVG claseSVG="w-6 h-6 mr-2"/>
                                                </button>
                                                <button title="Eliminar actividad">
                                                    <DeleteSVG claseSVG="w-6 h-6 mr-2"/>
                                                </button>
                                            </div>
                                        </div>
                                        {
                                            registro.items.length > 0 &&
                                            (
                                            <div className="pl-2">

                                                <div key={`listaNivel1_${index}`}>
                                                    {
                                                        registro.items.map((item,index2)=>(
                                                            <div key={`listaNivel1_${index}_${index2}`} className="grid grid-cols-3 gap-2">
                                                                <div className="col-span-2 grid content-center">
                                                                    {item.actividad}
                                                                </div>
                                                                <div className="flex flex-row-reverse">
                                                                    <button 
                                                                        onClick={()=>handleClickAddActividad(false,2,index,index2)}
                                                                        title="Agregar actividad"
                                                                    >
                                                                        <PlusSVG claseSVG="w-6 h-6 mr-2"/>
                                                                    </button>
                                                                    <button title="Editar actividad">
                                                                        <EditSVG claseSVG="w-6 h-6 mr-2"/>
                                                                    </button>
                                                                    <button title="Eliminar actividad">
                                                                        <DeleteSVG claseSVG="w-6 h-6 mr-2"/>
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        ))
                                                    }
                                                </div>
                                              </div>
                                            )
                                            
                                        }
                                    </li>
                                ))
                            )
                    )
                }
            </UlCustom>
        </CardPanel>

        <ModalCustom 
            title={titleModalRubro}
            verModal={viewModalRubro} 
            onClose={()=>setViewModalRubro(false)} 
            textConfirm="Guardar"
            textCancel="Cancelar"
            anchoModal="2xl"
            loading={loading.addData}
            typeButtonConfirm ="button"
            onClick={handleSubmit(onSubmit)}
        >
             <form className="flex flex-col gap-4" >
                <FormInput 
                     label="Actividad *"
                     type="text"
                     uppercase={false}
                     placeholder="Ingrese actividad"
                     error={errors.actividad}
                     {...register("actividad",{
                        required
                    })} 
                    />

                <FormInputYesNo 
                    opcion1="SI" 
                    opcion2="NO"
                    desglose={desglose}
                    label="¿ La actividad tendrá un desglose en sub-actividades ?"
                    {...register("actividadFinal",{
                        onChange :handleChangeYesNo
                    })}
                />
                {
                    !desglose && (
                        <>
                             <FormInput 
                                label="Responsable *"
                                type="text" 
                                placeholder="Ingrese responsable"
                                error={errors.responsable}
                                uppercase={false}
                                {...register("responsable",{required})}
                            />
                            <div className="grid grid-cols-4 gap-4">
                                <div>
                                    <FormInput 
                                        label="Cantidad *"
                                        type="number" 
                                        error={errors.cantidad}
                                        {...register("cantidad",{required})}
                                    />
                                </div>
                                <div >
                                    <FormInput 
                                        label="P.Unitario *"
                                        type="number" 
                                        error={errors.pUnitario}
                                        {...register("pUnitario",{required})}
                                    />
                                </div>
                                <div >
                                    <FormInput 
                                        label="P.Parcial *"
                                        type="number" 
                                        error={errors.pParcial}
                                        {...register("pParcial",{required})}
                                    />
                                </div>
                                <div >
                                    <FormInput 
                                        label="P.Total *"
                                        type="number" 
                                        error={errors.pTotal}
                                        {...register("pTotal",{required})}
                                    />
                                </div>
                            </div>
                        </>
                    )
                }
               
             </form>
        </ModalCustom>
    </>
    
  )
}

export default CostoRubro