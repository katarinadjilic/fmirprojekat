import React from 'react'
import { Form, DropdownItemProps } from 'semantic-ui-react'
import { ProfakturaStamparije } from '../model/Profaktura'
import { Stamaprija } from '../model/Stamparija'
import { Banka } from '../model/Banka';
import axios from 'axios'

interface Props {
    profaktura: ProfakturaStamparije | undefined,
    izmeni: (profaktura: ProfakturaStamparije) => void,
    dodaj: (profaktura: Partial<ProfakturaStamparije>) => void
}

export default function ProfakturaForma(props: Props) {
    const [stamparije, setStamparije] = React.useState<Stamaprija[]>([]);
    const [banke, setBanke] = React.useState<Banka[]>([]);
    const [selStamparija, setSelStamparija] = React.useState<Stamaprija | undefined>(undefined);
    const [selBanka, setSelBanka] = React.useState<Banka | undefined>(undefined);
    const [datum, setDatum] = React.useState<Date | undefined>(undefined);
    const [faza, setFaza] = React.useState('');

    React.useEffect(() => {
        if (props.profaktura) {
            setSelBanka(props.profaktura.banka);
            setSelStamparija(props.profaktura.stamparija);
            setDatum(props.profaktura.datum);
            setFaza(props.profaktura.faza);
        } else {
            setSelBanka(undefined);
            setSelStamparija(undefined);
            setDatum(undefined);
            setFaza('');
        }
    }, [props.profaktura])

    React.useEffect(() => {
        (async () => {
            const data = (await axios.get('http://localhost:5000/banka')).data as Banka[];
            setBanke(data);
        })()
    }, []);
    React.useEffect(() => {
        (async () => {
            const data = (await axios.get('http://localhost:5000/stamparija')).data as Stamaprija[];
            setStamparije(data);
        })()
    }, []);

    
    return (
        <Form style = {{marginBottom: '3em'}}>
            {props.profaktura && (
                <Form.Input
                    readonly
                    label='Id'
                    labelPosition='left'

                >{props.profaktura.profakturaId}</Form.Input>
            )}
            <Form.Dropdown
                label='Stamparija'
                labelPosition='left'
                value={selStamparija?.stamparijaId || 0}
                options={stamparije.map((element): DropdownItemProps => {
                    return {
                        value: element.stamparijaId,
                        text: element.nazivStamparije,
                        onClick: () => {
                            setSelStamparija(element);
                        }
                    }
                })}
            />
            <Form.Dropdown
                label='Banka'
                labelPosition='left'
                value={selBanka?.bankaId || 0}
                options={banke.map((element): DropdownItemProps => {
                    return {
                        value: element.bankaId,
                        text: element.nazivBanke,
                        onClick: () => {
                            setSelBanka(element);
                        }
                    }
                })}
            />
            <Form.Input
                type='date'
                labelPosition='left'
                label='Datum'
                value={datum?.toISOString().substr(0, 10)}
                onChange={(event, data) => {
                    setDatum(new Date(event.currentTarget.value));
                }}
            />
            <Form.Input
                labelPosition='left'
                label='Faza'
                value={faza}
                onChange={(event, data) => {
                    setFaza(event.currentTarget.value);
                }}
            />
            <Form.Button
                onClick={
                    () => {
                        if (!selBanka || !datum || !selStamparija) {
                            return;
                        }
                        if (props.profaktura) {
                            props.izmeni({
                                banka: selBanka,
                                datum: datum,
                                faza: faza,
                                profakturaId: props.profaktura.profakturaId,
                                stamparija: selStamparija,
                                stavke: []
                            });
                        } else {
                            props.dodaj({
                                banka: selBanka,
                                datum: datum,
                                faza: faza,
                                profakturaId: undefined,
                                stamparija: selStamparija,
                                stavke: []
                            })
                        }
                    }
                }>
                {props.profaktura ? 'Izmeni' : 'Dodaj'}
            </Form.Button>
        </Form>
    )
}
