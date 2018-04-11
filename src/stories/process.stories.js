import React from 'react'
import './styles.css'
import { storiesOf } from '@storybook/react'
import { withKnobs, text } from '@storybook/addon-knobs'
import { Loading } from '../components'

const stories = storiesOf('Loading', module)

stories.addDecorator(withKnobs)

stories
  .add('Loading default', () => <Loading />)
  .add('Loading with width', () => <Loading width={text('Label', '200px')} />)
