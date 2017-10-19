import {sagas as sagaA} from './SagaA'
import {sagas as sagaB} from './SagaB'

export default [
  ...sagaA,
  ...sagaB
]
