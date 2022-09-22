import { useState,useEffect } from "react"
import CardHeader from "../../../components/cards/CardHeader"
import CardItem from "../../../components/cards/CardItem"

const CostoCard = ({item}) => {
    
    const {cliente,documento,fecha_presupuesto,postulantes,proceso_cliente,proceso_uni} = item;
    const [fecha,setFecha] = useState('');

    useEffect(()=>{
        if(fecha_presupuesto){
            let fechaSeteada;
            if(fecha_presupuesto.toString().length == 10){
                const fechaFormateada = fecha_presupuesto.split("-").reverse().join('/');
                fechaSeteada = fechaFormateada       

            }else{
                fechaSeteada = fecha_presupuesto.toDate().toLocaleDateString('es-ES');
                
            }
            setFecha(fechaSeteada)
            
        }else{
            setFecha('Hubo problemas al obtener la fecha')
        }
    },[fecha_presupuesto])

  return (
    <div className="p-4 bg-white rounded-lg border shadow-md sm:p-6 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader title={documento}/>
        <CardItem label='Proceso UNI' description={proceso_uni}/>
        <CardItem label='Cliente' description={cliente}/>
        <CardItem label='Proceso Cliente' description={proceso_cliente}/>
        <div className="grid grid-cols-2 gap-4">
            <div>
                <CardItem label='N° Postulantes' description={postulantes}/>
            </div>
            <div>
            <CardItem label='Fecha Presupuesto' description={fecha}/>
            </div>
        </div>
    </div>

  )
}

export default CostoCard