import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'

import Icon from './index'

describe('Icon', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Icon name='add' />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
  it('should render correctly with', () => {
    const wrapper = shallow(<Icon name='add' width='1928px' />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })
})