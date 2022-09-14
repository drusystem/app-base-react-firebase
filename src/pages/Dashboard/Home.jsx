import Breadcrumb from "../../components/Breadcrumb"
import Saludo from "../../components/Saludo"
import MenuModular from "./MenuModular"


const Home = () => {
  return (
    <>
      <Breadcrumb/>
      <Saludo title="BIENVENIDO ESTIMADO USUARIO" description="Puede elegir entre las opciones siguientes del sistema..."/>
      <MenuModular/>
    </>
  )
}

export default Home