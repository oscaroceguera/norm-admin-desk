import React from 'react'
import {shallow} from 'enzyme'
import toJson from 'enzyme-to-json'
import sinon from 'sinon'

import Button from './'

describe('Button', () => {
  it ('should render correctly', () => {
    const output = shallow(<Button label='guardar' />)
    expect(toJson(output)).toMatchSnapshot()
  })

  it('simulate click event', () => {
    const spy = sinon.spy()
    const wrapper = shallow(<Button onClick={spy} />)
    wrapper.find('button').simulate('click')
    sinon.assert.called(spy)
  })
})