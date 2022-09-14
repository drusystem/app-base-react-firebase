import { addDoc, collection, documentId, getDocs, limit, query, where } from "firebase/firestore/lite"
import { useState } from "react"
import { db, auth } from "../services/firebase"

export const useFirestore = (coleccion) => {
    const [data,setData] = useState([])
    const [item,setItem] = useState({})
    const [error,setError] = useState('')
    const [loading,setLoading] = useState({})

    const getData = async()=>{
        try {
            setLoading(prev=>({...prev,getData:true}));
            const querySnapshot = await getDocs(collection(db,coleccion))
            const results = querySnapshot.docs.map(doc =>({
                id:doc.id,...doc.data()
            }))

            setData(results)

        } catch (error) {
            setError(error.message)
        } finally{
            setLoading(prev=>({...prev,getData:false}));
        }
    }

    const getDataByColumn = async(columna,value)=>{
        try {
            setLoading(prev=>({...prev,getDataByColumn:true}));
            const q = query(collection(db, coleccion), where(columna, "==",value));
            const querySnapshot = await getDocs(q);
            const results = querySnapshot.docs.map(doc =>({
                id:doc.id,...doc.data()
            }))
            setData(results)
        } catch (error) {
            setError(error.message)
        } finally{
            setLoading(prev=>({...prev,getDataByColumn:false}));
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
                uid: auth.currentUser.uid,
                created:new Date(),
                userCreated:auth.currentUser.uid,
                updated:new Date(),
                userUpdated: auth.currentUser.uid
            }
            await addDoc(collection(db, coleccion),newDoc);

            setData([...data,newDoc]);
            
        } catch (error) {
            setError(error.message)
        } finally{
            setLoading(prev=>({...prev,addData:false}));
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
        setData
  }
}
