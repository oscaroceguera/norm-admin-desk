import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text, select } from '@storybook/addon-knobs'
import { TextField } from '../components'

const SELECT_OPTIONS = {
  label: 'Widths',
  options: {
    Small: 'Small',
    Medium: 'Medium',
    Large: 'Large',
    FullWidth: 'FullWidth'
  },
  defaultValue: 'Medium'
}

const stories = storiesOf('Form', module)
stories.addDecorator(withKnobs)

stories
  .add('TextField', () => {
    const { label, options, defaultValue } = SELECT_OPTIONS
    return (
      <TextField
        width={select(label, options, defaultValue)}
        placeholder={text('Placeholder')}
        title={text('Title', 'Email')}
      />
    )
  })
