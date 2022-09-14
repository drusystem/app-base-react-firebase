import { useEffect } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../components/Breadcrumb";
import GeneralError from "../../../components/GeneralError";
import Loading from "../../../components/layouts/Loading";
import { useFirestore } from "../../../hooks/useFirestore";
import CostoCard from "./CostoCard";
import CostoRubro from "./CostoRubro";



const CostoDetalles = () => {

  const {costoId} = useParams();

  const migajas = [
    {
      name:'Costos',
      href:'/dashboard/costos'
    },
    {
      name:'Detalles',
      href: `/dashboard/costos/${costoId}`
    }
  ];
  
  const {item,error:dataError,loading,getItemById} = useFirestore('costos')
  useEffect(()=>{
    getItemById(costoId)
  },[])

  
  return (
    <>
        <Breadcrumb migajas={migajas}/>
        <GeneralError code={dataError}/>
          {
            loading.getItemById ?
            <Loading/>
            :
            (
              <div className="grid grid-cols-3 gap-4">
                <div>
                    <CostoCard item={item}/>
                </div>
                <div className="col-span-2">
                      <CostoRubro costoId={costoId}/>
                </div>
              </div>
            )
          }
    </>
    
  )
}

export default CostoDetalles