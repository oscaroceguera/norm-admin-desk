import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import sinon from 'sinon'

import Button from './index'

/* eslint-disable */
describe('Button', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Button label='guardar' onClick={f => f} />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
  it('should render correctly primary', () => {
    const wrapper = shallow(<Button label='guardar' primary onClick={f => f} />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
  it('should render correctly disabled', () => {
    const wrapper = shallow(<Button label='guardar' disabled onClick={f => f} />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
  it('simulate click event', () => {
    const spy = sinon.spy()
    const wrapper = shallow(<Button onClick={spy} />)
    wrapper.find('button').simulate('click')
    sinon.assert.called(spy)
  })
})