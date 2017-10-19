function * defaultSaga () {
  yield console.log('Hola soy la saga A')
}

export const sagas = [
  defaultSaga
]
