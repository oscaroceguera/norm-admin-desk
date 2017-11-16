import {deburr} from 'lodash/string'

const searchData = (data, value) => {
  if (value.length === 0) {
    return []
  }
  const lowerValue = value.toLowerCase()
<<<<<<< HEAD
  return data.filter(x => deburr(x.desc.toLowerCase()).includes(lowerValue))
=======
  return data.filter(x => x.desc.toLowerCase().includes(lowerValue))
>>>>>>> f71b5f952f53ef76b392b93e1ab5dbdca53deb16
}

export default searchData
