import { useEffect, useState } from "react"
import { useForm } from "react-hook-form";
import BotonGDinamic from "../../../components/botonGrupal/BotonGDinamic";
import Breadcrumb from "../../../components/Breadcrumb";
import FormInput from "../../../components/FormInput";
import GeneralError from "../../../components/GeneralError";
import GeneralMessage from "../../../components/GeneralMessage";
import EditSVG from "../../../components/iconsSVG/EditSVG";
import ModalCustom from "../../../components/modal/ModalCustom";
import Table from "../../../components/Table";
import { useFirestore } from "../../../hooks/useFirestore"
import { formValidate } from "../../../utils/formValidate";

const columnasTabla = ['Parámetro','Descripción','Valor','Opciones']
  const migajas = [{
    name:'Parámetros',
    href:'/config/parameters'
  }];

const {required} = formValidate()

const ListParameters = () => {

    const {data,error,loading,getData,success,updateData} = useFirestore("parametros")
    const [verModal,setVerModal] = useState(false);

    const {register,handleSubmit, formState:{errors},reset,setValue} = useForm({
        defaultValues:{
            uid:0,
            name:'',
            note:'',
            value:''
        }
      });

    useEffect(()=>{
        getData()
      },[])

      const handleClickEdit = ({uid,name,note,value}) =>{
        setValue("uid",uid);
        setValue("name",name);
        setValue("note",note);
        setValue("value",value);
        setVerModal(true);
      }

    const onSubmit = async({uid,name,note,value}) => {
    
    await updateData(uid,{
        name: name.toUpperCase(),
        note,
        value
        })
    
    reset()
    setVerModal(false);
    }

  return (
    <>
        <div className="grid grid-cols-12 gap-2 content-center">
            <div className="col-span-7">
                <Breadcrumb migajas={migajas}/>
            </div>
        </div>
      
        <GeneralError code={error}/>
        <GeneralMessage code={success} type="Éxito !" color='green'/> 
        <Table  loading={loading.getData} columnas={columnasTabla} numRegistros={data.length}>
          {
            data.map(registro=>(
                <tr key={`tr_register_${registro.id}`} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td key={`tr_register_${registro.id}_1`} scope="row" className="py-4 px-6">
                        {registro.name}
                    </td>
                    <td key={`tr_register_${registro.id}_2`} scope="row" className="py-4 px-6">
                        {registro.note}
                    </td>
                    <td key={`tr_register_${registro.id}_3`} scope="row" className="py-4 px-6">
                        {registro.value}
                    </td>
                    <td key={`tr_register_${registro.id}_0`} scope="row" className="py-4 px-6">
                        <div className="inline-flex rounded-lg shadow-sm" role="group">
                            <BotonGDinamic onClick={()=> handleClickEdit(registro)}>
                                <EditSVG claseSVG="w-4 h-4 mr-2"/>
                                Editar
                            </BotonGDinamic>
                        </div>
                    </td>
                </tr>
              ))
          }
      </Table>

      <ModalCustom 
            title='Editar Parámetro'
            verModal={verModal} 
            onClose={()=>setVerModal(false)} 
            textConfirm="Actualizar"
            textCancel="Cancelar"
            anchoModal="2xl"
            loading={loading.updateData}
            typeButtonConfirm ="button"
            onClick={handleSubmit(onSubmit)}
        >
             <form className="flex flex-col gap-4" >
                <input type="hidden" 
                  {...register("uid")}   
                />
                <FormInput
                     label="Nombre *"
                     type="text"
                     uppercase={true}
                     placeholder="Ingrese nombre del parámetro"
                     error={errors.name}
                     {...register("name",{
                      required
                  })}   
                />

                <FormInput 
                     label="Descripción *"
                     type="text"
                     uppercase={false}
                     placeholder="Ingrese descripción del parámetro"
                     error={errors.note}
                     {...register("note",{
                      required
                  })}   
                />

                <div className="grid grid-cols-2 gap-2">
                    <div>
                      <FormInput 
                          label="Valor *"
                          type="number"
                          uppercase={false}
                          error={errors.value}
                          {...register("value",{
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

export default ListParameters