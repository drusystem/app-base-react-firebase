import { useState,useEffect } from "react"
import { useForm } from "react-hook-form"
import BotonGDinamic from "../../../components/botonGrupal/BotonGDinamic"
import CardHeaderTools from "../../../components/cards/CardHeaderTools"
import CardPanel from "../../../components/cards/CardPanel"
import FormInput from "../../../components/FormInput"
import GeneralError from "../../../components/GeneralError"
import PlusSVG from "../../../components/iconsSVG/PlusSVG"
import UlCustom from "../../../components/listas/UlCustom"
import ModalCustom from "../../../components/modal/ModalCustom"
import { useFirestore } from "../../../hooks/useFirestore"
import { formValidate } from "../../../utils/formValidate"

const CostoRubro = ({costoId}) => {

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
        setData([...data,{
            actividad:actividad.toUpperCase(),responsable,cantidad,pUnitario,pParcial,pTotal,items:[]
        }])
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


    const handleClickOpenModal = (edit) =>{
        if(edit){
            setTitleModalRubro('EDITAR ACTIVIDAD')
            
        }else{
            setTitleModalRubro('NUEVA ACTIVIDAD')
        }
        setViewModalRubro(true);
    }

  return (
    <>
        <CardPanel>
            <CardHeaderTools title="ACTIVIDADES REGISTRADAS">
                <BotonGDinamic onClick={()=>handleClickOpenModal(false)}>
                    <PlusSVG/>Nueva actividad
                </BotonGDinamic>
            </CardHeaderTools>
            <GeneralError code={error}/>
            <UlCustom classAdicional="list-decimal mx-4">
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
                                                <BotonGDinamic onClick={()=>handleClickItem(index)}>
                                                    <PlusSVG claseSVG="w-4 h-4"/>
                                                </BotonGDinamic>
                                            </div>
                                        </div>
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
                     placeholder="Ingrese actividad"
                     error={errors.actividad}
                     {...register("actividad",{
                        required
                    })} 
                    />
                <FormInput 
                     label="Responsable *"
                     type="text" 
                     placeholder="Ingrese responsable"
                     uppercase={false}
                     {...register("responsable")}
                />
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <FormInput 
                            label="Cantidad"
                            type="number" 
                            placeholder="" 
                            {...register("cantidad")}
                        />
                    </div>
                    <div >
                        <FormInput 
                            label="P.Unitario"
                            type="number" 
                            placeholder="" 
                            {...register("pUnitario")}
                        />
                    </div>
                    <div >
                        <FormInput 
                            label="P.Parcial"
                            type="number" 
                            placeholder="" 
                            {...register("pParcial")}
                        />
                    </div>
                    <div >
                        <FormInput 
                            label="P.Total"
                            type="number" 
                            placeholder="" 
                            {...register("pTotal")}
                        />
                    </div>
                </div>
             </form>
        </ModalCustom>
    </>
    
  )
}

export default CostoRubro