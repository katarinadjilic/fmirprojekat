import React from 'react'
import {Container, Header} from 'semantic-ui-react'

export default function PocetnaStrana() {
    return (
        <Container>
            <Header
                content = 'Projekat'
                textAlign='center'
                style = {{
                    fontSize: '6em',
                    marginTop: '1em',
                }}
            />
            <Header
                textAlign='center'
                content = 'Fizičko projektovanje informacionih sistema'
                color='grey'
                style={{
                    fontSize: '2.5em',
                    fontWeight: 'normal',
                    marginTop: '1em',
                    marginBottom: '1em'
                }}
            />
            <Header
                textAlign='center'
                content = 'Katarina Ilić'
                color='grey'
                style={{
                    fontSize: '2em',
                    fontWeight: 'normal',
                    marginTop: '1em',
                    marginBottom: '8.5em'
                }}
            />
        </Container>
    )
}
