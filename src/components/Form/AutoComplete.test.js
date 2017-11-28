import React from 'react'
import { shallow } from 'enzyme'
import { shallowToJson } from 'enzyme-to-json'
import AutoComplete from './AutoComplete'

const DATA = [
  { id: '9de64059-d62f-4102-a61b-c4022c43d8d9', desc: 'Perro' },
  { id: '11176329-4382-4eae-bd81-de8f886e04da', desc: 'Gato' },
  { id: '3f658795-048f-494b-9a49-ae6626c4f7cc', desc: 'Marciano' },
  { id: 'bcac5fc8-badf-41bb-ad08-3fbcc10492b2', desc: 'Caracol' },
  { id: 'c33b8842-e6d0-40ba-8b29-89bf851031a4', desc: 'México' }
]

/* eslint-disable */
describe('AutomComplete', () => {
  let wrapper

  it('[render without crashing]', () => {
    const data = []
    wrapper = shallow(<AutoComplete data={data} />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  it('[render with all props]', () => {
    const data = []
    wrapper = shallow(<AutoComplete data={data} placeholder={'PLACEHOLDER'} width={'Large'} required />)
    expect(shallowToJson(wrapper)).toMatchSnapshot()
  })

  describe('[when data is not empty] : ', () => {
    beforeEach(() => {
      wrapper = shallow(<AutoComplete data={DATA} />)
    })
    it('state should have data ', () => {
      expect(wrapper.state().data[0].desc).toEqual('Perro')
      expect(wrapper.state().data.length).toEqual(5)
      expect(wrapper.state().data).toMatchSnapshot()
    })
  })

  describe('[autocomplete for "co"] :', () => {
    beforeEach(() => {
      wrapper = shallow(<AutoComplete data={DATA} />)
      const inputAutoComplete = wrapper.find('input')
      const event = {
        preventDefault() {},
        target: {
          value: 'co'
        }
      }
      inputAutoComplete.simulate('change', event)
    })
    it('data source should have 2 lenght (Caracol, México)', () => {
      expect(wrapper.state().dataSource.length).toEqual(2)
      expect(wrapper.state().dataSource[0].desc).toEqual('Caracol')
      expect(wrapper.state().dataSource[1].desc).toEqual('México')
    })
  })

  describe('[autocomplete for "me"]', () => {
    beforeEach(() => {
      wrapper = shallow(<AutoComplete data={DATA} />)
      const inputAutoComplete = wrapper.find('input')
      const event = {
        preventDefault() { },
        target: {
          value: 'me'
        }
      }
      inputAutoComplete.simulate('change', event)
    })
    it('data source should have 1 lenght (México)', () => {
      expect(wrapper.state().dataSource.length).toEqual(1)
      expect(wrapper.state().dataSource[0].desc).toEqual('México')
    })
  })

  describe('[value selected for "me"] : ', () => {
    beforeEach(() => {
      wrapper = shallow(<AutoComplete data={DATA} />)
      const inputAutoComplete = wrapper.find('input')
      const event = {
        preventDefault() { },
        target: {
          value: 'co'
        }
      }
      inputAutoComplete.simulate('change', event)
      
    })
    it('data source should have 1 lenght (México) and valueSelected México', () => {
      // console.log(wrapper.state())
      expect(wrapper.state().dataSource.length).toEqual(2)
      expect(wrapper.state().dataSource[1].desc).toEqual('México')
      const selectedEvent = {
        preventDefault() { },
        target: {
          dataset: {
            itemId: 'c33b8842-e6d0-40ba-8b29-89bf851031a4',
            itemValue: 'México'
          }
        }
      }
      const selectedOption = wrapper.find('li').last()
      selectedOption.simulate('click', selectedEvent)
      expect(wrapper.state().valueSelected.id).toEqual('c33b8842-e6d0-40ba-8b29-89bf851031a4')
      expect(wrapper.state().valueSelected.value).toEqual('México')
    })
  })
})