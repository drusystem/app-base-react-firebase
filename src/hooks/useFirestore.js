import { addDoc, collection, deleteDoc, doc, documentId, getDocs, limit, orderBy, query, setDoc, updateDoc, where, writeBatch } from "firebase/firestore/lite"
import { nanoid } from "nanoid"
import { useState } from "react"
import { db, auth } from "../services/firebase"

export const useFirestore = (coleccion) => {
    const [data,setData] = useState([])
    const [initData,setInitData] = useState([])
    const [item,setItem] = useState({})
    const [error,setError] = useState('')
    const [success,setSuccess] = useState('')
    const [loading,setLoading] = useState({})

    const [lastData,setLastData] = useState([])
    const [afterData,setAfterData] = useState([])

    const getData = async()=>{
        try {
            setLoading(prev=>({...prev,getData:true}));
            const querySnapshot = await getDocs(collection(db,coleccion))
            const results = querySnapshot.docs.map(doc =>({
                id:doc.id,...doc.data()
            }))

            setData(results)
            setInitData(results)
        } catch (error) {
            setError(error.message)
        } finally{
            setLoading(prev=>({...prev,getData:false}));
        }
    }

    const searchData = (column,textFilter) =>{
        const dataFiltrada = initData.filter((item)=>{
            return (item[column].includes(textFilter.toString()) ||
                    item[column].includes(textFilter.toString().toUpperCase()))
        })
        setData(dataFiltrada);
    }

    const getDataByColumn = async(columna,value)=>{
        try {

            setLoading(prev=>({...prev,getDataByColumn:true}));
            const q = query(collection(db, coleccion), where(columna, "==",value));
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map(doc =>({
                id:doc.id,...doc.data()
            }))

            results.sort((a, b) => a.uid.localeCompare(b.uid));

            setData(results)
            setLastData(results)
        } catch (error) {
            setError(error.message)
        } finally{
            setLoading(prev=>({...prev,getDataByColumn:false}));
        }
    }


    const getDataByColumnReturn = async(columna,value)=>{
        try {

            setLoading(prev=>({...prev,getDataByColumnReturn:true}));
            const q = query(collection(db, coleccion), where(columna, "==",value));
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map(doc =>({
                id:doc.id,...doc.data()
            }))

            results.sort((a, b) => a.uid.localeCompare(b.uid));

            return results;
            
        } catch (error) {
            setError(error.message)
        } finally{
            setLoading(prev=>({...prev,getDataByColumnReturn:false}));
        }
    }

    const getItemByColumnReturn = async(columna,value)=>{
        try {

            setLoading(prev=>({...prev,getItemByColumn:true}));
            let result = {}
            const q = query(collection(db, coleccion), where(columna, "==",value));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {  
                result ={id:doc.id,...doc.data()}
            }); 

            return result

        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(prev=>({...prev,getItemByColumn:false}));
        }
    }

    const getItemByColumn = async(columna,value)=>{
        try {

            setLoading(prev=>({...prev,getItemByColumn:true}));
            let result = {}
            const q = query(collection(db, coleccion), where(columna, "==",value));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {  
                result ={id:doc.id,...doc.data()}
            }); 

            setItem(result)

            if(JSON.stringify(result) === '{}'){
                setError('recorder-not-found');
            }else{
                setError('');
            }

        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(prev=>({...prev,getItemByColumn:false}));
        }
    }

    const getItemById = async ( id ) => { 

        try {
            setLoading(prev=>({...prev,getItemById:true}));
            let result = {}
            const queryPosts = query(collection(db,coleccion), where(documentId(), "==", id), limit(1)); 
            const querySnapshot = await getDocs(queryPosts);  

            querySnapshot.forEach((doc) => {  
                result ={id:doc.id,...doc.data()}
            }); 

            setItem(result)

            if(JSON.stringify(result) === '{}'){
                setError('recorder-not-found');
            }else{
                setError('');
            }

        } catch (error) {
            setError(error.message)
        }finally{
            setLoading(prev=>({...prev,getItemById:false}));
        }
    }

    const addData = async(objeto) =>{
        try {
            setLoading(prev=>({...prev,addData:true}));
            const newDoc = {
                ...objeto,
                uid: nanoid(6),
                created:new Date(),
                userCreated:auth.currentUser.uid,
                updated:new Date(),
                userUpdated: auth.currentUser.uid,
                enabled:true
            }

            const docRef = doc(db,coleccion,newDoc.uid)
            await setDoc(docRef,newDoc);

            setData([...data,newDoc]);
            setInitData([...initData,newDoc]);
            setSuccess('success');
            
        } catch (error) {
            setError(error.message)
            setSuccess('');
        } finally{
            setLoading(prev=>({...prev,addData:false}));
        }
    }

    const saveLoteDataActividades = async(objetos,costoId) =>{
        try {

            setLoading(prev=>({...prev,saveLoteData:true}));
            let nuevaLista = [];

            const batch = writeBatch(db)

            lastData.forEach(dataAntigua =>{
                const lastRef = doc(db,coleccion,dataAntigua.uid);
                batch.delete(lastRef)
            });
            
            objetos.forEach((objeto,index) =>{
                const objetoConAuditoria = {
                    ...objeto,
                    created:new Date(),
                    userCreated:auth.currentUser.uid,
                    updated:new Date(),
                    userUpdated: auth.currentUser.uid,
                    uid: (index +'_'+nanoid(6))
                }
                nuevaLista.push(objetoConAuditoria);
                
                const refColeccion = doc(db,coleccion,objetoConAuditoria.uid);
                batch.set(refColeccion,objetoConAuditoria)
            });
            
            await batch.commit();

            setSuccess('success');

            setLastData(nuevaLista);
          
        } catch (error) {
            setError(error.message)
            setSuccess('')
        } finally{
            setLoading(prev=>({...prev,saveLoteData:false}));
        }
    }

    const deleteData = async(uid)=>{
        try {
            
            setLoading(prev=>({...prev,[uid]:true}));
            const docRef = doc(db,coleccion,uid)
            await deleteDoc(docRef)

            //regresamos la data guardada sin el filtro
            setData([...initData])
            //listamos todos los datos excepto el eliminado
            setData(data.filter(item=> item.uid !=uid))
            //asignamos como data inicial la nueva lista (para trabajar con el filtro)
            setInitData([...data]);

            setSuccess('deleted');
        } catch (error) {
            setError(error.message)
            setSuccess('');
        } finally{
            setLoading(prev=>({...prev,[uid]:false}));
        }
    }

    const updateData = async(uid,objeto)=>{
        try {

            setLoading(prev=>({...prev,updateData:true}));
            const docRef = doc(db,coleccion,uid)
            const updateObjeto = {
                ...objeto,
                updated:new Date(),
                userUpdated: auth.currentUser.uid
            }
            await updateDoc(docRef,updateObjeto)

            // regresamos a la data sin filtros
            setData([...initData])

            setData(initData.map((item)=>
                item.uid === uid 
                    ? {...item,...updateObjeto}
                    : item
            ));

            setInitData([...data])

            setSuccess('updated');
        } catch (error) {
            setError(error.message)
            setSuccess('');
        } finally{
            setLoading(prev=>({...prev,updateData:false}));
        }
    }

    // auth.currentUser.uid
    return {
        data,
        error,
        loading,
        getData,
        item,
        getItemById,
        addData,
        getDataByColumn,
        setData,
        saveLoteDataActividades,
        success,
        searchData,
        deleteData,
        updateData,
        getItemByColumn,
        getDataByColumnReturn,
        getItemByColumnReturn
  }
}
