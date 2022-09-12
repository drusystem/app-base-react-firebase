import { Button, Modal } from "flowbite-react"
const ModalCustom = ({title,verModal,onClose,onClick,children,textConfirm,textCancel,anchoModal="sm"}) => {

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
        <Button onClick={onClick}>
            {textConfirm}
        </Button>
        <Button
            color="gray"
            onClick={onClose}
        >
            {textCancel}
        </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalCustom