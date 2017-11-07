const searchData = (data, value) => {
  class SearchData {
    constructor (data, value) {
      this.data = data
      this.value = value
    }

    filter () {
      const {data, value} = this
      return data.filter(x => x.desc.toLowerCase().indexOf(value.toLowerCase()) > -1)
    }

    get getSource () {
      if (this.value.length < 1) {
        return []
      }
      return this.filter()
    }
  }

  const searchData = new SearchData(data, value)
  return searchData.getSource
}

export default searchData
