import React from 'react'
import {Container, Header} from 'semantic-ui-react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGraduationCap } from '@fortawesome/free-solid-svg-icons'

export default function Footer() {
    return (
        <Container textAlign='center' style = {{marginBottom: '0.5em', marginTop: '3em'}}>
            <Header style = {{fontSize: '1em'}}><FontAwesomeIcon icon={faGraduationCap}/> 2020</Header>
        </Container>
    )
}
