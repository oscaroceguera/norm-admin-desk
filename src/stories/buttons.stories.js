import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, boolean, text } from '@storybook/addon-knobs'
import {Button} from '../components'

const stories = storiesOf('Button', module)

stories.addDecorator(withKnobs)

stories
  .add('Material style', () => {
    return (
      <Button
        disabled={boolean('Disabled', false)}
        label={text('Label', 'Button')}
        primary={boolean('Primary', false)}
        onClick={action('clicked')}
      />
    )
  })
