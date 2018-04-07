import React from 'react'
import './styles.css'
import { storiesOf } from '@storybook/react'
import { ErrorMessage } from '../components'

const stories = storiesOf('Warnings', module)

stories.add('Warning ', () => <ErrorMessage msg='Error: lorem ipsum....!' />)
