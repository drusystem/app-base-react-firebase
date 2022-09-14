import { NavLink } from "react-router-dom"
import { groupClassTailwind } from "../utils/groupClassTailwind"
import HomeSVG from "../components/iconsSVG/HomeSVG";
import ArrowBreadcrumbSVG from "./iconsSVG/ArrowBreadcrumbSVG";

const {optionBreadcrumb} = groupClassTailwind();

const Breadcrumb = ({migajas=[]}) => {
  return (
    
    <>
        <nav
            className="flex px-5 py-3 my-3 flex-auto text-gray-700 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
            aria-label="Breadcrumb"
        >
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
            <li className="inline-flex items-center">
                <NavLink className={optionBreadcrumb} to="/dashboard">
                        <HomeSVG className="w-4 h-4 mr-2"/>
                        Inicio
                </NavLink>
            </li>
            
            {
                migajas.map(({name,href})=>(
                    <li key={name} className="inline-flex items-center">
                        <ArrowBreadcrumbSVG/>
                        <NavLink className={optionBreadcrumb} to={href}>
                                {name}
                        </NavLink>
                    </li>
                ))
            }
            
            </ol>
        </nav>
        </>

  )
}

export default Breadcrumb