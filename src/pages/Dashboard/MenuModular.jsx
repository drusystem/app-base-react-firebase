import { NavLink } from "react-router-dom"
import CardPanel from "../../components/cards/CardPanel"
import ConfigSVG from "../../components/iconsSVG/ConfigSVG";
import CostosSVG from "../../components/iconsSVG/CostosSVG"
import { groupClassTailwind } from "../../utils/groupClassTailwind";

const Modulos = [
    {
        name:'CONFIGURACIONES',
        icon:<ConfigSVG size={12}/>,
        href:'/config/parameters'
    },
    {
        name:'COSTOS',
        icon: <CostosSVG size={12}/>,
        href: '/dashboard/costos'
    }
]
const {optionModulo} = groupClassTailwind();

const MenuModular = () => {
  return (
    <>
        <div className="grid grid-cols-6 gap-4">
                {
                    Modulos.map(({name,icon,href})=>(
                        <CardPanel key={name}>
                            <NavLink className={optionModulo} to={href}>
                                {icon}
                                <span className="font-bold">
                                    {name}
                                </span>
                            </NavLink>
                        </CardPanel>
                    ))
                }
        </div>
    </>
  )
}

export default MenuModular