import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import { Stamaprija } from '../model/Stamparija'
import DeleteModal from './DeleteModal';

interface Props {
    stamparije: Stamaprija[],
    trenutnaStamparija: Stamaprija | undefined,
    setTrenutneStamparija: (s: Stamaprija | undefined) => void;
    obrisiStampariju: (s: Stamaprija) => void;
}

export default function StamparijaTabela(props: Props) {
    const [otvorenModal, setOtvorenModal] = React.useState(false);

    return (
        <>
            <DeleteModal
                izvrsi={() => {
                    if (!props.trenutnaStamparija) {
                        return;
                    }
                    props.obrisiStampariju(props.trenutnaStamparija);
                }}
                open={otvorenModal}
                zatvoriModal={() => {
                    setOtvorenModal(false)
                }}
            />
            <Table
                selectable
                celled
                style = {{marginBottom: '3em'}}
            >
                <Table.Header>
                    <Table.Row>
                        <Table.HeaderCell >ID</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Naziv</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Tekuci racun</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Maticni broj</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Delatnost</Table.HeaderCell>
                        <Table.HeaderCell textAlign='center'>Brisanje</Table.HeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {
                        props.stamparije.map((element) => {
                            return (
                                <Table.Row key={element.stamparijaId}
                                    active={element === props.trenutnaStamparija}
                                    onClick={() => {
                                        if (element === props.trenutnaStamparija) {
                                            props.setTrenutneStamparija(undefined);
                                        } else {
                                            props.setTrenutneStamparija(element);
                                        }
                                    }}
                                >
                                    <Table.Cell>{element.stamparijaId}</Table.Cell>
                                    <Table.Cell>{element.nazivStamparije}</Table.Cell>
                                    <Table.Cell>{element.tekuciRacun}</Table.Cell>
                                    <Table.Cell>{element.maticniBroj}</Table.Cell>
                                    <Table.Cell>{element.delatnost.nazivDelatnosti}</Table.Cell>
                                    <Table.Cell>
                                        <Button
                                            fluid
                                            onClick={() => {
                                                setOtvorenModal(true);
                                            }}
                                        >Obrisi</Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })
                    }
                </Table.Body>
            </Table>
        </>
    )
}
