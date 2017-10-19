function * defaultSaga () {
  yield console.log('Hola soy la saga B')
}

export const sagas = [
  defaultSaga
]
