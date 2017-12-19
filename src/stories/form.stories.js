import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, boolean, text, select } from '@storybook/addon-knobs'
import { TextField, SelectField, Checkbox, AutoComplete } from '../components'
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

const INPUT_TYPES = {
  label: 'Types',
  options: {
    text: 'Text',
    number: 'Number',
    email: 'Email'
  },
  defaultValue: 'text'
}

const ITEMS = [
  { id: '9de64059-d62f-4102-a61b-c4022c43d8d9', desc: 'value1' },
  { id: '11176329-4382-4eae-bd81-de8f886e04da', desc: 'value2' },
  { id: '3f658795-048f-494b-9a49-ae6626c4f7cc', desc: 'value3' },
  { id: 'bcac5fc8-badf-41bb-ad08-3fbcc10492b2', desc: 'value4' },
  { id: 'c33b8842-e6d0-40ba-8b29-89bf851031a4', desc: 'value5' }
]

const DATA = [
  { id: '9de64059-d62f-4102-a61b-c4022c43d8d9', desc: 'Perro' },
  { id: '11176329-4382-4eae-bd81-de8f886e04da', desc: 'Gato' },
  { id: '3f658795-048f-494b-9a49-ae6626c4f7cc', desc: 'Marciano' },
  { id: 'bcac5fc8-badf-41bb-ad08-3fbcc10492b2', desc: 'Caracol' },
  { id: 'c33b8842-e6d0-40ba-8b29-89bf851031a4', desc: 'México' }
]

const stories = storiesOf('Form', module)
stories.addDecorator(withKnobs)

stories
  .add('TextField', () => (
    <TextField
      width={select(label, options, defaultValue)}
      placeholder={text('Placeholder', 'Nombre')}
      title={text('Nombre', 'Nombre')}
      value={text('Value', '123')}
      type={select(INPUT_TYPES.label, INPUT_TYPES.options, INPUT_TYPES.defaultValue)}
      required={boolean('Required', false)}
      onChange={f => f}
    />
  ))

  .add('SelectField', () => (
    <SelectField
      items={ITEMS}
      title={text('Title', 'Seleccione una opcion')}
      width={select(label, options, defaultValue)}
      required={boolean('Required', false)}
    />
  ))

  .add('Checkbox', () => (
    <Checkbox
      title={text('Title', 'option')}
      value='9de64059-d62f-4102-a61b-c4022c43d8d9'
      required={boolean('Required', false)}
    />
  ))

  .add('AutoComplete', () => (
    <AutoComplete
      data={DATA}
      placeholder={text('Placeholder', 'Ciudad')}
      width={select(label, options, defaultValue)}
      required={boolean('Required', false)}
    />
  ))
  .add('A form structure', () => (
    <div
      style={{
        border: '1px solid black',
        display: 'flex',
        flexWrap: 'wrap',
        width: '700px',
        margin: '1em auto',
        padding: '.5em'
      }}>
      <TextField
        placeholder={'Nombre del esquema'}
        title={'Esquema'}
        value=''
        required
      />
      <TextField
        placeholder={'versión'}
        title={'Versión'}
        width={'Large'}
        value=''
        type={'number'}
      />
      <TextField
        placeholder={'Email'}
        title={'Email'}
        value=''
        type={'email'}
        required
      />
    </div>
  ))
