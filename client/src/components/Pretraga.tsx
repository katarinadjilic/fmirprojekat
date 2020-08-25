import React from 'react'
import { Input } from 'semantic-ui-react'

interface Props {
    text: string,
    setText: (text: string) => void
}

export default function Pretraga(props: Props) {
    return (
        <div>
            <Input
                size='large'
                label='Pretraga'
                labelPosition='left'
                placeholder='Pretrazi...'
                value={props.text}
                onChange={(event, data) => {
                    props.setText(event.currentTarget.value);
                }}
            />
        </div>
    )
}
