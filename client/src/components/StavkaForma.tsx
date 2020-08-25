import React from 'react'
import { Form, DropdownItemProps } from 'semantic-ui-react'
import { Proizvod } from '../model/Proizvod';
import axios from 'axios'
import { StavkaProfakturaStamparije, ProfakturaStamparije } from '../model/Profaktura';

interface Props {
    stavka: StavkaProfakturaStamparije | undefined,
    dodaj: (st: StavkaProfakturaStamparije) => void,
    izmeni: (st: StavkaProfakturaStamparije) => void,
    profaktura: ProfakturaStamparije | undefined,
    setSelStavka: (st: StavkaProfakturaStamparije | undefined) => void;
}

export default function StavkaForma(props: Props) {

    const [proizvodi, setProizvodi] = React.useState<Proizvod[]>([]);
    const [selProizvod, setSelProizvod] = React.useState<Proizvod | undefined>(undefined);
    const [kolicina, setKolicina] = React.useState(0);
    const [opis, setOpis] = React.useState('');

    React.useEffect(() => {
        if (props.stavka) {
            setSelProizvod(props.stavka.proizvod);
            setKolicina(props.stavka.kolicina);
            setOpis(props.stavka.opis);
        } else {
            setSelProizvod(undefined);
            setKolicina(0);
            setOpis('')
        }
    }, [props.stavka])

    React.useEffect(() => {
        (async () => {
            const data = (await axios.get('http://localhost:5000/proizvod')).data as Proizvod[];
            setProizvodi(data);
        })()
    }, []);



    return (
        <Form>
            {props.stavka && (
                <Form.Input
                    readonly
                    label='Rb'
                    labelPosition='left'
                >{props.stavka.rb}</Form.Input>
            )}
            <Form.Dropdown
                label='Proizvod'
                value={selProizvod?.proizvodId || 0}
                options={proizvodi.map((element): DropdownItemProps => {
                    return {
                        value: element.proizvodId,
                        text: element.naziv,
                        onClick: () => {
                            setSelProizvod(element)
                        }
                    }
                })}
            />
            <Form.Input
                type='number'
                label='Kolicina'
                value={kolicina}
                onChange={(event, data) => {
                    setKolicina(parseInt(event.currentTarget.value));
                }}
            />
            <Form.Input
                type='number'
                label='Iznos'
                readonly
                value={selProizvod ? selProizvod.cena * kolicina : 0}
            />
            <Form.TextArea
                label='Opis'
                placeholder='Opis...'
                value={opis}
                onChange={(event, data) => {
                    setOpis(event.currentTarget.value);
                }}
            />
            <Form.Button
                onClick={
                    () => {
                        if (!selProizvod) {
                            return;
                        }
                        if (props.stavka) {
                            props.izmeni({
                                kolicina: kolicina,
                                opis: opis,
                                profaktura: props.stavka.profaktura,
                                proizvod: selProizvod,
                                rb: props.stavka.rb,
                                statusAkcije: 'izmenjena'
                            })
                        } else {
                            props.dodaj({
                                kolicina: kolicina,
                                opis: opis,
                                proizvod: selProizvod,
                                rb: 0,
                                profaktura: props.profaktura,
                                statusAkcije: 'dodata'
                            })
                        }
                        props.setSelStavka(undefined);
                    }
                }
            >{props.stavka ? 'Izmeni' : 'Dodaj'}</Form.Button>
        </Form>
    )
}
