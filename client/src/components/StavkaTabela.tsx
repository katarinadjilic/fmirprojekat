import React from 'react'
import { Table, Button } from 'semantic-ui-react'
import { StavkaProfakturaStamparije } from '../model/Profaktura'

interface Props {
    stavke: StavkaProfakturaStamparije[],
    selStavka: StavkaProfakturaStamparije | undefined,
    setSelStavka: (st: StavkaProfakturaStamparije | undefined) => void,
    obrisi: (st: StavkaProfakturaStamparije) => void,
}

const izracunajIznos = (stavke: StavkaProfakturaStamparije[]) => {
    let suma = 0;
    for (const stavka of stavke) {
        suma += stavka.kolicina*stavka.proizvod.cena;
    }
    return suma;
}

export default function StavkaTabela(props: Props) {
    return (
        <Table selectable celled>
            <Table.Header>
                <Table.Row>
                    <Table.HeaderCell textAlign='center'>Proizvod</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Kolicina</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Iznos</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Opis</Table.HeaderCell>
                    <Table.HeaderCell textAlign='center'>Obrisi</Table.HeaderCell>
                </Table.Row>
            </Table.Header>
            <Table.Body>
                {props.stavke.map(element => {
                    return (
                        <Table.Row key={element.rb} active={element === props.selStavka} onClick={() => {
                            if (element === props.selStavka) {
                                props.setSelStavka(undefined)
                            } else { 
                                props.setSelStavka(element);
                            }
                        }} >
                            <Table.Cell>{element.proizvod.naziv}</Table.Cell>
                            <Table.Cell>{element.kolicina}</Table.Cell>
                            <Table.Cell>{element.kolicina * element.proizvod.cena}</Table.Cell>
                            <Table.Cell>{element.opis}</Table.Cell>
                            <Table.Cell>
                                <Button
                                    fluid
                                    onClick={
                                        () => {
                                            props.obrisi(element);
                                        }
                                    }>
                                    Obrisi
                                </Button>
                            </Table.Cell>
                        </Table.Row>
                    )
                })}
                
            </Table.Body>
            <Table.Footer>
                <Table.Row >
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell></Table.HeaderCell>
                    <Table.HeaderCell textAlign='left'>Ukupno: {izracunajIznos(props.stavke)}</Table.HeaderCell>
                </Table.Row>
            </Table.Footer>
        </Table>
    )
}
