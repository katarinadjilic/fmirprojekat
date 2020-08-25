import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import { ProfakturaStamparije} from '../model/Profaktura'
import DeleteModal from './DeleteModal';

interface Props {
    profakture: ProfakturaStamparije[],
    selProfaktura: ProfakturaStamparije | undefined,
    setSelProfaktura: (p: ProfakturaStamparije | undefined) => void,
    obrisiProfakturu: (p: ProfakturaStamparije) => void
}

export default function ProfakturaTabela(props: Props) {
    const [otvorenModal, setOtvorenModal] = React.useState(false);
    
    return (
        <>
            <DeleteModal
                izvrsi={() => {
                    if (!props.selProfaktura) {
                        return;
                    }
                    props.obrisiProfakturu(props.selProfaktura);
                }}
                open={otvorenModal}
                zatvoriModal={() => {
                    setOtvorenModal(false)
                }}
            />
            <Table selectable celled style = {{marginBottom: '3em'}}>
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell>ID</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Stamparija</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Banka</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Datum</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Faza</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Obrisi</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {props.profakture.map(element => {
                        return (
                            <Table.Row key={element.profakturaId} active={element === props.selProfaktura} onClick={() => {
                                if (props.selProfaktura === element) {
                                    props.setSelProfaktura(undefined)
                                } else {
                                    props.setSelProfaktura(element);
                                }
                            }} >
                                <Table.Cell>
                                    {element.profakturaId}
                                </Table.Cell>
                                <Table.Cell>
                                    {element.stamparija.nazivStamparije}
                                </Table.Cell>
                                <Table.Cell>
                                    {element.banka.nazivBanke}
                                </Table.Cell>
                                <Table.Cell>
                                    {element.datum.toISOString().substr(0, 10)}
                                </Table.Cell>
                                <Table.Cell>
                                    {element.faza}
                                </Table.Cell>
                                <Table.Cell>
                                    <Button
                                        fluid
                                        onClick={() => {
                                            setOtvorenModal(true);
                                        }}
                                    >
                                        Obrisi
                                </Button>
                                </Table.Cell>
                            </Table.Row>
                        )
                    })}
                </Table.Body>
            </Table>
        </>
    )
}
