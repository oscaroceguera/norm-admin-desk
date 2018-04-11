import React from 'react'
import {shallow} from 'enzyme'
import TextField from './TextField'
import { shallowToJson } from 'enzyme-to-json'


describe('TextField', () => {
  it('should render correctly by default values', () => {
    const output = shallow(<TextField />)
    expect(shallowToJson(output)).toMatchSnapshot()
  })

  it('should render correctly for text', () => {
    const output = shallow(
      <TextField
        width='Medium'
        placeholder='Nombre'
        title='Nombre'
        type='text'
        value='oscar'
        requiredTitle='Nombre requerido'
        required={true}
      />)
    
    expect(shallowToJson(output)).toMatchSnapshot()
  })

  it('should Email is correctly', () => {
    const output = shallow(
      <TextField
        width='Medium'
        placeholder='Email'
        title='Email'
        type='email'
        value='oscar@email.com'
        required={true}
      />)

    expect(shallowToJson(output)).toMatchSnapshot() 
  })

  it('should Email is not correctly', () => {
    const output = shallow(
      <TextField
        width='Medium'
        placeholder='Email'
        title='Email'
        type='email'
        value='oscar@email'
        required={true}
      />)

    expect(shallowToJson(output)).toMatchSnapshot()
  })

  it('should Email is value null', () => {
    const output = shallow(
      <TextField
        width='Medium'
        placeholder='Email'
        title='Email'
        type='email'
        value={null}
        required={true}
      />)

    expect(shallowToJson(output)).toMatchSnapshot()
  })

  it('should number type is incorrect', () => {
    const output = shallow(
      <TextField
        width='Large'
        placeholder='Edad'
        title='Edad'
        type='number'
        value='oscar'
      />)

    expect(shallowToJson(output)).toMatchSnapshot()
  })

  it('should number type is null and required', () => {
    const output = shallow(
      <TextField
        width='Large'
        placeholder='Edad'
        title='Edad'
        type='number'
        value={null}
        required={true}
      />)

    expect(shallowToJson(output)).toMatchSnapshot()
  })

  it('should number type is correctly', () => {
    const output = shallow(
      <TextField
        width='Large'
        placeholder='Edad'
        title='Edad'
        type='number'
        value='12333'
        required={true}
      />)

    expect(shallowToJson(output)).toMatchSnapshot()
  })

})