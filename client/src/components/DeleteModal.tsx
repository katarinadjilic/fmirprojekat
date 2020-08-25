import React from 'react'
import { Modal, Button } from 'semantic-ui-react'

interface Props {
    open: boolean,
    zatvoriModal: () => void,
    izvrsi: () => void
}

export default function DeleteModal(props: Props) {
    return (
        <Modal
            size='mini'
            open={props.open}
            onClose={props.zatvoriModal}
        >
            <Modal.Header>Da li ste sigurni</Modal.Header>
            <Modal.Actions>
                <Button onClick={() => {
                    props.zatvoriModal()
                }} >Ne</Button>
                <Button onClick={() => {
                    props.izvrsi();
                    props.zatvoriModal();
                }}>Da</Button>
            </Modal.Actions>
        </Modal>
    )
}
