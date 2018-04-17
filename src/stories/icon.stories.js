import React from 'react'
import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { withKnobs, select, text } from '@storybook/addon-knobs'

import styles from './icon.css'

import { Icon } from '../components'

const { label, options, defaultValue } = {
  label: 'Icons',
  options: {
    delete: 'delete',
    plus: 'plus',
    add: 'add',
    arrowDown: 'arrowDown',
    arrowUp: 'arrowUp',
    arrowDownBlack: 'arrowDownBlack',
    close: 'close',
    loading: 'loading'
  },
  defaultValue: 'delete'
}

const stories = storiesOf('Icon', module)
stories.addDecorator(withKnobs)

stories
  .add('default', () => (
    <Icon name={select(label, options, defaultValue)} />
  ))
  .add('with size', () => (
    <Icon
      name={select(label, options, defaultValue)}
      width={text('width', '30px')}
    />
  ))
  .add('with className', () => (
    <Icon
      name={select(label, options, defaultValue)}
      width={text('width', '30px')}
      className={styles.loader}
    />
  ))
  .add('with event', () => (
    <Icon
      name={select(label, options, defaultValue)}
      width={text('width', '30px')}
      onClick={action('clicked')}
    />
  ))
