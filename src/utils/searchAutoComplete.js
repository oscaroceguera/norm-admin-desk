import {deburr} from 'lodash/string'

const searchData = (data, value) => {
  if (value.length === 0) {
    return []
  }
  const lowerValue = value.toLowerCase()
  return data.filter(x => x.desc.toLowerCase().includes(lowerValue))
}

export default searchData
