import axios from 'axios'
import React from 'react'
import { Grid } from 'semantic-ui-react'
import { ProfakturaStamparije, StavkaProfakturaStamparije } from '../model/Profaktura'
import ProfakturaForma from './ProfakturaForma'
import ProfakturaTabela from './ProfakturaTabela'
import StavkaForma from './StavkaForma'
import StavkaTabela from './StavkaTabela'
import Pretraga from './Pretraga'

export default function ProfakturaStrana() {

    const [prokfature, setProkfature] = React.useState<ProfakturaStamparije[]>([]);
    const [selProkfaktura, setSelProfaktura] = React.useState<ProfakturaStamparije | undefined>(undefined);
    const [selStavka, setSelStavka] = React.useState<StavkaProfakturaStamparije | undefined>(undefined);
    const [pretraga, setPretraga] = React.useState('');
    const [stavke, setStavke] = React.useState<StavkaProfakturaStamparije[]>([]);
    const [brojac, setBrojac] = React.useState(-1);

    const izmeniProfakturu = async (profaktura: ProfakturaStamparije) => {
        if(profaktura.banka == null || profaktura.stamparija == null || profaktura.faza === ''){
            alert('Validation error');
        }
        const data = (await axios.patch(`http://localhost:5000/profakturaStamparije/${profaktura.profakturaId}`, { ...profaktura, stavke: stavke } as ProfakturaStamparije)).data;
        //console.log(data);
        if (data.status === 'success') {
            const pr = data.profaktura as ProfakturaStamparije
            setSelProfaktura(undefined);
            setStavke([]);
            setProkfature(prev => {
                return prev.map(element => {
                    if (element.profakturaId === pr.profakturaId) {
                        return { ...pr, stavke: [], datum: new Date(pr.datum) }
                    };
                    return element;
                })
            })
        }

    }
    const kreirajProfakturu = async (profaktura: Partial<ProfakturaStamparije>) => {
        if(profaktura.banka == null || profaktura.stamparija == null || profaktura.faza === ''){
            alert('Validation error');
        }
        //console.log(stavke);
        const data = (await axios.post('http://localhost:5000/profakturaStamparije', { ...profaktura, stavke: stavke } as Partial<ProfakturaStamparije>)).data;
        //console.log(data);
        if (data.status === 'success') {
            const pr = data.profaktura as ProfakturaStamparije
            setSelProfaktura(undefined);
            setStavke([]);
            setProkfature(prev => {
                return [...prev, { ...pr, stavke: [], datum: new Date(pr.datum) }];
            })
        }
    }

    const obrisiProfakturu = async (profaktura: ProfakturaStamparije) => {
        const data = (await axios.delete(`http://localhost:5000/profakturaStamparije/${profaktura.profakturaId}`)).data;
        //console.log(data);
        if (data.status === 'success') {
            setProkfature(prev => {
                return prev.filter(element => element !== profaktura);
            })
            setSelProfaktura(undefined);
        } else {
            console.log(data);
        }
    }

    const obrisiStavku = (st: StavkaProfakturaStamparije) => {
        setStavke(prev => {
            if (st.rb > 0) {
                return prev.map(element => {
                    if (element.rb === st.rb) {
                        return { ...element, statusAkcije: 'obrisana' }
                    }
                    return element;
                })
            }
            return prev.filter(element => element.rb !== st.rb)
        })
    }
    const dodajStavku = (st: StavkaProfakturaStamparije) => {
        if(st.proizvod == null || st.kolicina === 0){
            alert('Validation error')
        }
        setStavke(prev => {
            return [...prev, { ...st, rb: brojac }];
        });
        setBrojac(prev => prev - 1)
    }
    const izmeniStavku = (st: StavkaProfakturaStamparije) => {
        if(st.proizvod == null || st.kolicina === 0){
            alert('Validation error')
        }
        setStavke(prev => {
            return prev.map(element => {
                if (element.rb === st.rb) {
                    return st;
                }
                return { ...element }
            })
        })
    }

    React.useEffect(() => {
        (async () => {
            if (!selProkfaktura) {
                setStavke([]);
                return;
            }
            const data = (await axios.get(`http://localhost:5000/profakturaStamparije/${selProkfaktura?.profakturaId}/stavke`)).data as StavkaProfakturaStamparije[];
            const stavke = data.map(element => {
                return { ...element, profaktura: selProkfaktura }
            })
            setStavke(stavke);
        })()
    }, [selProkfaktura])

    React.useEffect(() => {
        (async () => {
            const data = await (await axios.get('http://localhost:5000/profakturaStamparije')).data as ProfakturaStamparije[];
            const profakture = data.map(element => {
                return { ...element, stavke: [], datum: new Date(element.datum) }
            });
            setProkfature(profakture);
        })()
    }, []);
    
    const setSelProfaktura2 = (profaktura: ProfakturaStamparije | undefined) => {

        setSelProfaktura(profaktura);
        setSelStavka(undefined);
    }
    
    const odgovarajucaProfaktura = (profaktura: ProfakturaStamparije) => {
        return profaktura.faza.includes(pretraga) || profaktura.banka.nazivBanke.includes(pretraga) || profaktura.stamparija.nazivStamparije.includes(pretraga);
    }




    return (
        <Grid padded columns='16'>
            <Grid.Row>
                <Grid.Column width='8' >
                    <Pretraga
                        setText={setPretraga}
                        text={pretraga}
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width='16' >
                    <ProfakturaTabela
                        obrisiProfakturu={obrisiProfakturu}
                        profakture={prokfature.filter(odgovarajucaProfaktura)}
                        selProfaktura={selProkfaktura}
                        setSelProfaktura={setSelProfaktura2}
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width='10' >
                    <ProfakturaForma
                        izmeni={izmeniProfakturu}
                        profaktura={selProkfaktura}
                        dodaj={kreirajProfakturu}
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width='10'>
                    <StavkaTabela
                        obrisi={obrisiStavku}
                        stavke={stavke.filter(element => element.statusAkcije !== 'obrisana')}
                        selStavka={selStavka}
                        setSelStavka={setSelStavka}
                    />
                </Grid.Column>
                <Grid.Column width='6' >
                    <StavkaForma
                        profaktura={selProkfaktura}
                        dodaj={dodajStavku}
                        izmeni={izmeniStavku}
                        stavka={selStavka}
                        setSelStavka={setSelStavka}
                    />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
