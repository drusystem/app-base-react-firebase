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
    const [disabledDesglose,setDisabledDesglose] = useState(false);
    const [nivel,setNivel] = useState({
        level:0,
        indice:null,
        indice2:null,
        indice3:null
    })

    useEffect(()=>{
        if(nivel.level === 3){
            setDesglose(false)
            setDisabledDesglose(true)
        }else{
            setDesglose(true)
            setDisabledDesglose(false)
        }
    },[nivel])

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
            pParcial: (cantidad*pUnitario),
            pTotal,
            items:[],
            nivel: nivel.level,
            desglose
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
            setData(arrayActividades);
        }else{
            let arrayActividades = data.map((actividad,indice) =>{

                if(nivel.indice === indice){

                    let arrayActividadEnLectura =  actividad.items.map((actividadNivel1,index2)=>{
                        if(nivel.indice2 === index2){
                           let arrayActividadNivel2 = actividadNivel1.items.map((actividadNivel2,index3)=>{
                                if(nivel.indice3 === index3){
                                    actividadNivel2.items.push(nuevaActividad)
                                }

                                return actividadNivel2
                            })
                            actividadNivel1.items = arrayActividadNivel2
                        }
                        return actividadNivel1
                    })

                    actividad.items = arrayActividadEnLectura

                }

                return actividad
                
            })
            setData(arrayActividades);
        }
        setViewModalRubro(false);
        reset();
    }

    const handleClickDeleteActividad = (nivel_Actividad,indice,indice2 = null,indice3= null,indice4=null) =>{
        debugger;
        if(nivel_Actividad == 0){
            
            let listaActividades = data.filter((actividad,index) => index != indice)
            setData(listaActividades)

        }else if(nivel_Actividad == 1){

            let listaActividades = data.map((actividad,index) =>{
                if(indice === index){
                     let listaNivel1 = actividad.items.filter((actNivel1,index2)=>index2 != indice2)
                     actividad.items = listaNivel1
                }
                return actividad
            })
            setData(listaActividades);

        }else if (nivel_Actividad == 2){

            let listaActividades = data.map((actividad,index) =>{
                if(indice === index){
                     let listaNivel1 = actividad.items.map((actNivel1,index2)=>{
                        if(indice2 === index2){
                           let listaNivel2 = actNivel1.items.filter(
                            (actividadNivel2,index3)=> indice3 != index3
                           )
                           actNivel1.items = listaNivel2
                        }
                        return actNivel1
                     })
                     actividad.items = listaNivel1
                     
                }
                return actividad
            })
            setData(listaActividades);

        }else if(nivel_Actividad == 3){
            let listaActividades = data.map((actividad,index) =>{
                if(indice === index){
                     let listaNivel1 = actividad.items.map((actNivel1,index2)=>{
                        if(indice2 === index2){
                           let listaNivel2 = actNivel1.items.map((actividadNivel2,index3)=> {
                            
                                if(indice3 === index3){
                                    let listaNivel3 = actividadNivel2.items.filter(
                                    (actividadNivel3,index4)=> indice4 != index4
                                    )
                                    actividadNivel2.items = listaNivel3
                                }
                                return actividadNivel2
                            })
                           actNivel1.items = listaNivel2
                        }
                        return actNivel1
                     })
                     actividad.items = listaNivel1
                     
                }
                return actividad
            })
            setData(listaActividades);
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

    const handleClickAddActividad = (edit,nivel_Actividad,indice,indice2 = null,indice3= null) =>{
        if(edit){
            setTitleModalRubro('EDITAR ACTIVIDAD')
            
        }else{
            setTitleModalRubro('NUEVA ACTIVIDAD')
        }

        setNivel({
            level:nivel_Actividad,
            indice,
            indice2,
            indice3
        })        
        setViewModalRubro(true);
        // setDesglose(true);
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
            <div className="grid grid-cols-12 gap-0 text-center text-sm py-4">
                <div className="col-span-5">
                    ACTIVIDAD
                </div>
                <div className="col-span-2">
                    Responsable
                </div>
                <div>
                    Cantidad
                </div>
                <div>
                    P.Unitario
                </div>
                <div>
                    P.Parcial
                </div>
                <div>
                    Total
                </div>
                <div>
                    Opciones
                </div>
            </div>
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
                                    <li key={index} className="py-2 w-full border-b border-gray-200 dark:border-gray-600">
                                        <div className="grid grid-cols-12 gap-0">
                                            <div className="col-span-5 grid content-center pl-2">
                                                {(index+1)}. {registro.actividad}
                                            </div>
                                            {
                                                registro.desglose ?
                                                (
                                                    <div className="col-span-7 flex flex-row-reverse">
                                                        <button 
                                                            onClick={()=>handleClickAddActividad(false,1,index)}
                                                            title="Agregar actividad"
                                                        >
                                                            <PlusSVG claseSVG="w-6 h-6 mr-2"/>
                                                        </button>
                                                        <button title="Eliminar actividad"
                                                            onClick={()=>handleClickDeleteActividad(0,index)}
                                                        >
                                                            <DeleteSVG claseSVG="w-6 h-6 mr-2"/>
                                                        </button>
                                                    </div>
                                                ): (
                                                    <>
                                                        <div className="col-span-2">
                                                            {registro.responsable}
                                                        </div>
                                                        <div className="text-center">
                                                            {registro.cantidad}
                                                        </div>
                                                        <div className="text-right">
                                                            {registro.pUnitario}
                                                        </div>
                                                        <div className="text-right">
                                                            {registro.pParcial}
                                                        </div>
                                                        <div className="text-right">
                                                            {registro.pTotal}
                                                        </div>
                                                        <div>
                                                            <button title="Eliminar actividad"
                                                                onClick={()=>handleClickDeleteActividad(0,index)}
                                                            >
                                                                <DeleteSVG claseSVG="w-6 h-6 mr-2"/>
                                                            </button>
                                                        </div>
                                                    </>
                                                )
                                            }
                                        </div>
                                        <div key={`listaNivel1_${index}`}>
                                                {
                                                    registro.items.map((item,index2)=>(
                                                        <>
                                                            <div key={`listaNivel1_${index}_${index2}`} className="grid grid-cols-12 gap-0">
                                                                <div className="col-span-5 grid content-center pl-4">
                                                                {
                                                                    item.desglose ? 
                                                                    (
                                                                        <span>
                                                                            {(index+1)}.{(index2+1)}. {item.actividad}
                                                                        </span>
                                                                    ):(
                                                                        <span>
                                                                            {item.actividad}
                                                                        </span>
                                                                    )
                                                                }
                                                                
                                                                </div>
                                                                {
                                                                    item.desglose ?
                                                                    (
                                                                        <div className="col-span-7 flex flex-row-reverse">
                                                                            <button 
                                                                                onClick={()=>handleClickAddActividad(false,2,index,index2)}
                                                                                title="Agregar actividad"
                                                                            >
                                                                                <PlusSVG claseSVG="w-6 h-6 mr-2"/>
                                                                            </button>
                                                                            <button title="Eliminar actividad"
                                                                                onClick={()=>handleClickDeleteActividad(1,index,index2)}
                                                                            >
                                                                                <DeleteSVG claseSVG="w-6 h-6 mr-2"/>
                                                                            </button>
                                                                        </div>
                                                                    ): (
                                                                        <>
                                                                            <div className="col-span-2">
                                                                                {item.responsable}
                                                                            </div>
                                                                            <div className="text-center">
                                                                                {item.cantidad}
                                                                            </div>
                                                                            <div className="text-right">
                                                                                {item.pUnitario}
                                                                            </div>
                                                                            <div className="text-right">
                                                                                {item.pParcial}
                                                                            </div>
                                                                            <div className="text-right">
                                                                                {item.pTotal}
                                                                            </div>
                                                                            <div>
                                                                                <button title="Eliminar actividad"
                                                                                    onClick={()=>handleClickDeleteActividad(1,index,index2)}
                                                                                >
                                                                                    <DeleteSVG claseSVG="w-6 h-6 mr-2"/>
                                                                                </button>
                                                                            </div>
                                                                        </>
                                                                    )
                                                                }
                                                                
                                                            </div>
                                                            <div key={`listaNivel2_${index}_${index2}`}>
                                                                {
                                                                    item.items.map((actividad,index3)=>(
                                                                        <>
                                                                            <div className="grid grid-cols-12 gap-0" key={`listaNivel2_${index}_${index2}_${index3}`}>
                                                                                <div className="col-span-5 grid content-center pl-6">
                                                                                    {
                                                                                        actividad.desglose ? 
                                                                                        (
                                                                                            <span>
                                                                                                {(index+1)}.{(index2+1)}.{(index3+1)}. {actividad.actividad}
                                                                                            </span>
                                                                                        ):(
                                                                                            <span>
                                                                                                {actividad.actividad}
                                                                                            </span>
                                                                                        )
                                                                                    }
                                                                                </div>
                                                                                {
                                                                                    actividad.desglose ?
                                                                                    (
                                                                                        <div className="col-span-7 flex flex-row-reverse">
                                                                                            <button 
                                                                                                onClick={()=>handleClickAddActividad(false,3,index,index2,index3)}
                                                                                                title="Agregar actividad"
                                                                                            >
                                                                                                <PlusSVG claseSVG="w-6 h-6 mr-2"/>
                                                                                            </button>
                                                                                            <button title="Eliminar actividad"
                                                                                                onClick={()=>handleClickDeleteActividad(2,index,index2,index3)}
                                                                                            >
                                                                                                <DeleteSVG claseSVG="w-6 h-6 mr-2"/>
                                                                                            </button>
                                                                                        </div>
                                                                                    ): (
                                                                                        <>
                                                                                            <div className="col-span-2">
                                                                                                {actividad.responsable}
                                                                                            </div>
                                                                                            <div className="text-center">
                                                                                                {actividad.cantidad}
                                                                                            </div>
                                                                                            <div className="text-right">
                                                                                                {actividad.pUnitario}
                                                                                            </div>
                                                                                            <div className="text-right">
                                                                                                {actividad.pParcial}
                                                                                            </div>
                                                                                            <div className="text-right">
                                                                                                {actividad.pTotal}
                                                                                            </div>
                                                                                            <div>
                                                                                                <button title="Eliminar actividad"
                                                                                                    onClick={()=>handleClickDeleteActividad(2,index,index2,index3)}
                                                                                                >
                                                                                                    <DeleteSVG claseSVG="w-6 h-6 mr-2"/>
                                                                                                </button>
                                                                                            </div>
                                                                                        </>
                                                                                    )
                                                                                }
                                                                            </div>
                                                                            <div key={`listaNivel3_${index}_${index2}_${index3}`}>
                                                                                {
                                                                                    actividad.items.map((itemNivel4,index4)=>(
                                                                                        <>
                                                                                            <div className="grid grid-cols-12 gap-0" key={`listaNivel3_${index}_${index2}_${index3}_${index4}`}>
                                                                                                <div className="col-span-5 grid content-center pl-8">
                                                                                                    <span>
                                                                                                        {itemNivel4.actividad}
                                                                                                    </span>
                                                                                                </div>
                                                                                                <div className="col-span-2">
                                                                                                    {itemNivel4.responsable}
                                                                                                </div>
                                                                                                <div className="text-center">
                                                                                                    {itemNivel4.cantidad}
                                                                                                </div>
                                                                                                <div className="text-right">
                                                                                                    {itemNivel4.pUnitario}
                                                                                                </div>
                                                                                                <div className="text-right">
                                                                                                    {itemNivel4.pParcial}
                                                                                                </div>
                                                                                                <div className="text-right">
                                                                                                    {itemNivel4.pTotal}
                                                                                                </div>
                                                                                                <div>
                                                                                                    <button title="Eliminar actividad"
                                                                                                        onClick={()=>handleClickDeleteActividad(3,index,index2,index3,index4)}
                                                                                                    >
                                                                                                        <DeleteSVG claseSVG="w-6 h-6 mr-2"/>
                                                                                                    </button>
                                                                                                </div>
                                                                                            </div>
                                                                                        </>
                                                                                    ))
                                                                                }
                                                                            </div>
                                                                        </>
                                                                    ))
                                                                }
                                                            </div>
                                                        </>
                                                    ))
                                                }
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
                    disabled = {disabledDesglose}
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