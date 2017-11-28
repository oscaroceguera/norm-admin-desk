import React from 'react'
import {shallow} from 'enzyme'
import Checkbox from './Checkbox'
import {shallowToJson} from 'enzyme-to-json'

/* eslint-disable */
describe('Checkbox', () => {
  let checkbox

  it('render without crashing', () => {
    checkbox = shallow(<Checkbox value='value1' />)
    expect(shallowToJson(checkbox)).toMatchSnapshot()
  })

  describe('render with title', () => {
    beforeEach(() => {
      checkbox = shallow(<Checkbox value='value1' title='valor uno' />)
    })
    it('- The title', () => {
      expect(checkbox.find('label').text()).toEqual('valor uno')
      expect(checkbox.find('label').text()).toMatchSnapshot()
      expect(shallowToJson(checkbox)).toMatchSnapshot()
    })
  })

})