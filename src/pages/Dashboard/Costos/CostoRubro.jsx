import { useState } from "react"
import BotonGDinamic from "../../../components/botonGrupal/BotonGDinamic"
import CardHeaderTools from "../../../components/cards/CardHeaderTools"
import CardPanel from "../../../components/cards/CardPanel"
import FormInput from "../../../components/FormInput"
import PlusSVG from "../../../components/iconsSVG/PlusSVG"
import ModalCustom from "../../../components/modal/ModalCustom"

const CostoRubro = () => {

    const [viewModalRubro,setViewModalRubro] = useState(false)
    const [titleModalRubro,setTitleModalRubro] = useState('NUEVO RUBRO')

    const handleClickSaveRubro = () =>{
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
        </CardPanel>

        <ModalCustom 
            title={titleModalRubro}
            verModal={viewModalRubro} 
            onClose={()=>setViewModalRubro(false)} 
            onClick={handleClickSaveRubro}
            textConfirm="Guardar"
            textCancel="Cancelar"
            anchoModal="2xl"
        >
             <form  className="flex flex-col gap-4" >
                <FormInput 
                     label="Actividad *"
                     type="text" 
                     placeholder="Ingrese actividad" 
                />
                <FormInput 
                     label="Responsable *"
                     type="text" 
                     placeholder="Ingrese responsable" 
                />
                <div className="grid grid-cols-4 gap-4">
                    <div>
                        <FormInput 
                            label="Cantidad"
                            type="number" 
                            placeholder="" 
                        />
                    </div>
                    <div >
                        <FormInput 
                            label="P.Unitario"
                            type="number" 
                            placeholder="" 
                        />
                    </div>
                    <div >
                        <FormInput 
                            label="P.Parcial"
                            type="number" 
                            placeholder="" 
                        />
                    </div>
                    <div >
                        <FormInput 
                            label="P.Total"
                            type="number" 
                            placeholder="" 
                        />
                    </div>
                </div>
             </form>
        </ModalCustom>
    </>
    
  )
}

export default CostoRubro