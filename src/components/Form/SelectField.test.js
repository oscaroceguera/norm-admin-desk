import React from 'react'
import ReactDOM from 'react-dom'
import { shallow } from 'enzyme'
import SelectField from './SelectField'
import {shallowToJson} from 'enzyme-to-json'

const ITEMS_DATA = [
  { id: '9de64059-d62f-4102-a61b-c4022c43d8d9', desc: 'value1' },
  { id: '11176329-4382-4eae-bd81-de8f886e04da', desc: 'value2' },
  { id: '3f658795-048f-494b-9a49-ae6626c4f7cc', desc: 'value3' },
  { id: 'bcac5fc8-badf-41bb-ad08-3fbcc10492b2', desc: 'value4' },
  { id: 'c33b8842-e6d0-40ba-8b29-89bf851031a4', desc: 'value5' }
]

/* eslint-disable */
describe('SelectField', () => {
  let wrapper

  it('reders without crashing', () => {
    const items = []
    const div = document.createElement('div')
    ReactDOM.render(
      <SelectField items={items} />,
      div
    )
  })

  describe('when given empty items', () => {
    const items = []

    beforeEach(() => {
      wrapper = shallow(<SelectField items={items} />)
    })
    
    it('should render and empty items', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot()
    })
  })

  describe('when given some items', () => {
    beforeEach(() => {
      wrapper = shallow(<SelectField width='Large' items={ITEMS_DATA} required />)
    })

    it('should render each item in the option', () => {
      expect(shallowToJson(wrapper)).toMatchSnapshot()
    })
  })

})

/* eslint-enable */
