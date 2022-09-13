import { Button, Modal } from "flowbite-react"
import BotonLoading from "../layouts/BotonLoading"
const ModalCustom = ({title,verModal,onClose,onClick = (()=>{}),children,textConfirm,textCancel,loading,anchoModal="sm",typeButtonConfirm='button'}) => {

  return (
    <Modal
        show={verModal}
        size={anchoModal}
        onClose={onClose}
    >
        <Modal.Header>
            {title}
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
        <Modal.Footer>
        {
            loading ? <BotonLoading proceso="Guardando"/> :(
                <>
                    <Button type={typeButtonConfirm} onClick={onClick}>
                        {textConfirm}
                    </Button>
                    <Button
                        color="gray"
                        onClick={onClose}
                    >
                        {textCancel}
                    </Button>
                </>
            )
        }
        </Modal.Footer>
    </Modal>
  )
}

export default ModalCustom