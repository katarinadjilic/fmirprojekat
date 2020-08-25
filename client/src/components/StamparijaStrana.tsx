import React from 'react'
import { Grid } from 'semantic-ui-react'
import StamparijaTabela from './StamparijaTabela'
import StamparijaForma from './StamparijaForma'
import { Stamaprija } from '../model/Stamparija'
import axios from 'axios';
import Pretraga from './Pretraga'
import '../App.css';

export default function StamparijaStrana() {

    const [stamparije, setStamparije] = React.useState<Stamaprija[]>([]);
    const [selektovanaStamparija, setSelektovanaStamparija] = React.useState<Stamaprija | undefined>(undefined);
    const [pretraga, setPretraga] = React.useState('');

    const sacuvajStapmariju = (st: Stamaprija) => {
        if (!selektovanaStamparija) {
            kreirajStampariju(st);
        } else {
            izmeniStampariju(st);
        }
    }

    const kreirajStampariju = async (st: Stamaprija) => {
        if(st.nazivStamparije === '' || st.tekuciRacun === '' || st.maticniBroj === '' || st.delatnost == null){
            alert('Validation error');
        }
        const data = (await axios.post('http://localhost:5000/stamparija', st)).data;
        if (data.status === 'success') {
            const noStamparija = data.stamparija as Stamaprija;
            setStamparije(prev => {
                return [...prev, noStamparija];
            })
        } else {
            alert(data.status.error);
        }
    }
    const izmeniStampariju = async (st: Stamaprija) => {
        if(st.nazivStamparije === '' || st.tekuciRacun === '' || st.maticniBroj === '' || st.delatnost == null){
            alert('Validation error');
        }
        const data = (await axios.patch(`http://localhost:5000/stamparija/${st.stamparijaId}`, st)).data;
        if (data.status === 'success') {
            const noStamparija = data.stamparija as Stamaprija;
            setStamparije(prev => {
                return prev.map(element => {
                    if (element.stamparijaId === noStamparija.stamparijaId) {
                        return noStamparija
                    } else {
                        return element;
                    }
                })
            })
        } else {
            alert(data.status.error);
        }
    }

    React.useEffect(() => {
        (async () => {
            const podaciSaServera = await axios.get('http://localhost:5000/stamparija');
            const podaci = podaciSaServera.data;
            console.log(podaci);
            setStamparije(podaci);
        })()
    }, [])

    const obrisiStampariju = async (stamparija: Stamaprija) => {
        const podaci = await (await axios.delete(`http://localhost:5000/stamparija/${stamparija.stamparijaId}`)).data;
        if (podaci.status === 'failure') {
            alert(podaci.error);
        } else {
            setStamparije(stamparije.filter(element => element.stamparijaId !== stamparija.stamparijaId));
            setSelektovanaStamparija(undefined);
        }
    }

    const filtrirajStampariju = (st: Stamaprija) => {
        return st.delatnost.nazivDelatnosti.includes(pretraga) || st.maticniBroj.includes(pretraga) || st.nazivStamparije.includes(pretraga) || st.tekuciRacun.includes(pretraga);
    }



    return (
        <Grid columns='16' padded>
            <Grid.Row >
                <Grid.Column width='12' >
                    <Pretraga
                        text={pretraga}
                        setText={setPretraga}
                    />
                </Grid.Column>
            </Grid.Row>

            <Grid.Row>
                <Grid.Column width='16' >
                    <StamparijaTabela
                        stamparije={stamparije.filter(filtrirajStampariju)}
                        trenutnaStamparija={selektovanaStamparija}
                        setTrenutneStamparija={setSelektovanaStamparija}
                        obrisiStampariju={obrisiStampariju}
                    />
                </Grid.Column>
            </Grid.Row>
            
            <Grid.Row>
                <Grid.Column width='10'>
                    <StamparijaForma
                        stamparija={selektovanaStamparija}
                        sacuvajStampariju={sacuvajStapmariju} />
                </Grid.Column>
            </Grid.Row>
        </Grid>
    )
}
