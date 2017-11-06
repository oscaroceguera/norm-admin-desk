import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import { TextField, SelectField } from '../components'
import './styles.css'

const { label, options, defaultValue } = {
  label: 'Widths',
  options: {
    Small: 'Small',
    Medium: 'Medium',
    Large: 'Large',
    FullWidth: 'FullWidth'
  },
  defaultValue: 'Medium'
}

const ITEMS = [
  { id: '9de64059-d62f-4102-a61b-c4022c43d8d9', desc: 'value1' },
  { id: '11176329-4382-4eae-bd81-de8f886e04da', desc: 'value2' },
  { id: '3f658795-048f-494b-9a49-ae6626c4f7cc', desc: 'value3' },
  { id: 'bcac5fc8-badf-41bb-ad08-3fbcc10492b2', desc: 'value4' },
  { id: 'c33b8842-e6d0-40ba-8b29-89bf851031a4', desc: 'value5' }
]

const stories = storiesOf('Form', module)
stories.addDecorator(withKnobs)

stories
  .add('TextField', () => {
    return (
      <TextField
        width={select(label, options, defaultValue)}
        placeholder={text('Placeholder')}
        title={text('Title', 'Email')}
      />
    )
  })

  .add('SelectField', () => {
    return (
      <SelectField
        items={ITEMS}
        title={text('Title', 'Seleccione una opción')}
        width={select(label, options, defaultValue)}
      />
    )
  })
