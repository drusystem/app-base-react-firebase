import { Button, Modal } from "flowbite-react"
import BotonLoading from "../layouts/BotonLoading"
const ModalCustom = ({
    title,
    verModal,
    onClose,
    onClick = (()=>{}),
    children,
    textConfirm = '',
    textCancel,
    loading = false,
    anchoModal="sm"}) => {

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
                    {
                        textConfirm.length != 0 &&
                        (
                            <Button onClick={onClick}>
                                {textConfirm}
                            </Button>
                        )
                    }
                    
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