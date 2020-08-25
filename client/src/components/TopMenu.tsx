import React from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

export default function TopMenu() {
    return (
        <Menu>
            <Menu.Item
                as={Link} to='/'
            >Pocetna strana</Menu.Item>
            <Menu.Item
                as={Link} to='/stamparija'
            >Stamparija</Menu.Item>
            <Menu.Item
                as={Link} to='/profaktura'
            >Profakture</Menu.Item>
        </Menu>
    )
}
