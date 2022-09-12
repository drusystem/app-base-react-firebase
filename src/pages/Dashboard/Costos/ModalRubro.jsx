import { Button, Modal } from "flowbite-react"

const ModalRubro = ({title,onClick,onClose}) => {
  return (
    <Modal
        show={true}
        size="sm"
        onClose={onClose}
    >
        <Modal.Header>
            {title}
        </Modal.Header>
        <Modal.Body>
        <div className="space-y-6 p-6">
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
            </p>
        </div>
        </Modal.Body>
        <Modal.Footer>
        <Button onClick={onClick}>
            I accept
        </Button>
        <Button
            color="gray"
            onClick={onClick}
        >
            Decline
        </Button>
        </Modal.Footer>
    </Modal>
  )
}

export default ModalRubro