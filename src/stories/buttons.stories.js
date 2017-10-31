import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
// import { linkTo } from '@storybook/addon-links'
import {Button} from '../components'

storiesOf('Button', module)
  // TODO: note
  // TODO: usar Addon Knobs
  .add('Default', () => <Button onClick={action('clicked')} />)
  .add('Primary with Label', () => <Button label='Primary' primary onClick={action('clicked')} />)
  .add('Disabled', () => <Button disabled primary onClick={action('clicked')} />)
