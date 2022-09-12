import { useEffect } from "react";
import { useState } from "react";

const BotonGDefault = ({posicion,children,onClick}) => {

    const [claseRedondeo,setClaseRedondeo] = useState('inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700');

    useEffect(()=>{
        switch (posicion) {
            case 1:
                setClaseRedondeo('inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700')
                break;
            case 2:
                setClaseRedondeo('inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent border-t border-b border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700')
            case 3:
                setClaseRedondeo('inline-flex items-center py-2 px-4 text-sm font-medium text-gray-900 bg-transparent rounded-r-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700')
            default:
                break;
        }
    },[])

    return (
      <button className={claseRedondeo} onClick={onClick}>
          {children}
      </button>
    )
  }
  
  export default BotonGDefault