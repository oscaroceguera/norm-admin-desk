import React from 'react'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { Loading, Downloading } from '../components'

const stories = storiesOf('Progress', module)

stories.addDecorator(withKnobs)

stories
  .add('Loading default', () => <Loading />)
  .add('Loading with width', () => <Loading width={text('Label', '200px')} />)
  .add('Downloading', () => <Downloading />)
