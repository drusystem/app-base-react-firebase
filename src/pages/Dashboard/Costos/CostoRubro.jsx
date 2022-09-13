import { useState,useEffect } from "react"
import { useForm } from "react-hook-form"
import BotonGDinamic from "../../../components/botonGrupal/BotonGDinamic"
import CardHeaderTools from "../../../components/cards/CardHeaderTools"
import CardPanel from "../../../components/cards/CardPanel"
import FormError from "../../../components/FormError"
import FormInput from "../../../components/FormInput"
import GeneralError from "../../../components/GeneralError"
import PlusSVG from "../../../components/iconsSVG/PlusSVG"
import LiCustom from "../../../components/listas/LiCustom"
import UlCustom from "../../../components/listas/UlCustom"
import ModalCustom from "../../../components/modal/ModalCustom"
import { useFirestore } from "../../../hooks/useFirestore"
import { formValidate } from "../../../utils/formValidate"

const CostoRubro = ({costoId}) => {

    const [viewModalRubro,setViewModalRubro] = useState(false)
    const [titleModalRubro,setTitleModalRubro] = useState('NUEVO RUBRO')
    const {data,error,loading,getDataByColumn,addData} = useFirestore('actividad');
    const {register,handleSubmit, formState:{errors},getValues, setError} = useForm();
    const {required} = formValidate()
    useEffect(()=>{
        getDataByColumn('costoId',costoId);
    },[])

    const onSubmit = async({actividad,responsable,cantidad,pUnitario,pParcial,pTotal}) => {
        
        await addData({
            costoId,
            actividad,
            responsable,
            cantidad,
            pUnitario,
            pParcial,
            pTotal
        })
        setViewModalRubro(false);
    }


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
            <UlCustom>
                {
                    loading.getDataByColumn?
                    (
                        <LiCustom>Cargando actividades...</LiCustom>
                    ):(
                        data.length === 0 ?
                            (
                                <LiCustom>No hay registros</LiCustom>
                            ):(
                                data.map(registro=>(
                                    <LiCustom>{registro.actividad}</LiCustom>
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
            typeButtonConfirm ="submit"
        >
             <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" >
                <FormInput 
                     label="Actividad *"
                     type="text" 
                     placeholder="Ingrese actividad"
                     {...register("actividad",{
                        required
                    })} 
                />
                <FormError error={errors.actividad}/>
                <FormInput 
                     label="Responsable *"
                     type="text" 
                     placeholder="Ingrese responsable" 
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