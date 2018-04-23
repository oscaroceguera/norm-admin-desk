import { sagas as schemasList } from './schemas'
import { sagas as schema } from './schema'
import { sagas as modules } from './modules'
import { sagas as module } from './module'
import { sagas as item } from './item'

export default [
  ...schemasList,
  ...schema,
  ...modules,
  ...module,
  ...item
]
