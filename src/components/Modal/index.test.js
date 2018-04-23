import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import Modal from './index'

describe('Modal', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Modal title='Modal title' show onClose={f => f} />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
  it('should render correctly no show', () => {
    const wrapper = shallow(<Modal title='Modal title' show={false} onClose={f => f} />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})