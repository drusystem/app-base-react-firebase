import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import Loading from "../../../components/layouts/Loading";
import { useFirestore } from "../../../hooks/useFirestore";
import CostoCard from "./CostoCard";
import CostoRubro from "./CostoRubro";



const CostoDetalles = () => {

  const migajas = ['Costos','Detalles'];
  const {costoId} = useParams();
  const {item,error:dataError,loading,getItemById} = useFirestore('costos')
  useEffect(()=>{
    getItemById(costoId)
  },[])

  
  return (
    <>
        <Breadcrumb migajas={migajas}/>
          {
            loading ?
            <Loading/>
            :
            (
              <div className="grid grid-cols-3 gap-4">
                <div>
                    <CostoCard item={item}/>
                </div>
                <div className="col-span-2">
                      <CostoRubro item={item}/>
                </div>
              </div>
            )
          }
    </>
    
  )
}

export default CostoDetalles