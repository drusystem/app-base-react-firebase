import { collection, documentId, getDocs, limit, query, where } from "firebase/firestore/lite"
import { useEffect, useState } from "react"
import { db, auth } from "../services/firebase"

export const useFirestore = (coleccion) => {
    const [data,setData] = useState([])
    const [item,setItem] = useState({})
    const [error,setError] = useState()
    const [loading,setLoading] = useState(false)

    const getData = async()=>{
        try {
            setLoading(true);
            const querySnapshot = await getDocs(collection(db,coleccion))
            const results = querySnapshot.docs.map(doc =>({
                id:doc.id,...doc.data()
            }))

            setData(results)

        } catch (error) {
            console.log(error)
            setError(error.message)
        } finally{
            setLoading(false);
        }
    }



    const getItemById = async ( id ) => { 
        try {
            setLoading(true);
            let result = {}
            const queryPosts = query(collection(db,coleccion), where(documentId(), "==", id), limit(1)); 
            const querySnapshot = await getDocs(queryPosts);  

            querySnapshot.forEach((doc) => {  
                result ={id:doc.id,...doc.data()}
            }); 
            setItem(result)

        } catch (error) {
            console.log(error)
            setError(error.message)
        }finally{
            setLoading(false);
        }

    }
    // auth.currentUser.uid
    return {
        data,
        error,
        loading,
        getData,
        item,
        getItemById
  }
}
