import React from 'react'
import { Form, DropdownItemProps } from 'semantic-ui-react'
import axios from 'axios'
import { Delatnost } from '../model/Delatnost'
import { Stamaprija } from '../model/Stamparija';
import DeleteModal from './DeleteModal';

interface Props {
    stamparija?: Stamaprija,
    sacuvajStampariju: (st: Stamaprija) => void
}

export default function StamparijaForma(props: Props) {
    const [delatnosti, setDelatnosti] = React.useState<Delatnost[]>([]);
    const [naziv, setNaziv] = React.useState('');
    const [tekuciRacun, setTekuciRacun] = React.useState('');
    const [maticniBroj, setMaticniBroj] = React.useState('');
    const [delatnost, setDelatnost] = React.useState<Delatnost | undefined>(undefined);
    const [otvorenModal, setOtvorenModal] = React.useState(false);

    React.useEffect(() => {
        (async () => {
            const podaci = (await axios.get('http://localhost:5000/delatnost')).data;
            setDelatnosti(podaci);
        })()
    }, []);

    React.useEffect(() => {
        setNaziv(props.stamparija?.nazivStamparije || '');
        setTekuciRacun(props.stamparija?.tekuciRacun || '');
        setMaticniBroj(props.stamparija?.maticniBroj || '');
        setDelatnost(props.stamparija?.delatnost);
    }, [props.stamparija])

    return (
        <>
            <DeleteModal
                izvrsi={() => {
                    if (!delatnost) {
                        return;
                    }
                    props.sacuvajStampariju({ delatnost: delatnost, maticniBroj: maticniBroj, nazivStamparije: naziv, tekuciRacun: tekuciRacun, stamparijaId: props.stamparija?.stamparijaId })
                }}
                open={otvorenModal}
                zatvoriModal={() => {
                    setOtvorenModal(false)

                }}
            />
            <Form>
                {props.stamparija && (
                    <Form.Input
                        inverted
                        label='ID'
                        labelPosition='left'
                        readonly

                    >{props.stamparija.stamparijaId}</Form.Input>
                )}
                <Form.Input
                    label='Naziv'
                    labelPosition='left'
                    value={naziv}
                    onChange={(event, data) => {
                        setNaziv(event.currentTarget.value);
                    }}
                />
                <Form.Input
                    label='Tekuci racun'
                    labelPosition='left'
                    value={tekuciRacun}
                    onChange={(event, data) => {
                        setTekuciRacun(event.currentTarget.value);
                    }}
                />
                <Form.Input
                    label='Maticni broj'
                    labelPosition='left'
                    value={maticniBroj}
                    onChange={(event, data) => {
                        setMaticniBroj(event.currentTarget.value);
                    }}
                />
                <Form.Dropdown
                    label='Delatnost'
                    placeholder='Delatnost...'
                    fluid
                    value={delatnost?.sifraDelatnosti || 0}
                    options={
                        delatnosti.map((element): DropdownItemProps => {
                            return {
                                text: element.nazivDelatnosti,
                                value: element.sifraDelatnosti,
                                onClick: () => {
                                    setDelatnost(element);
                                }
                            }
                        })
                    }

                />
                <Form.Button onClick={() => {
                    setOtvorenModal(true);
                }} >{
                        props.stamparija ? 'Izmeni' : 'Dodaj'
                    }</Form.Button>
            </Form>
        </>
    )
}
