import isNumber from './isNumber'
import isEmail from './isEmail'

export const reqForType = (type, value) => {
  if (value === '') return true
  if (type === 'email') return isEmail(value)
  if (type === 'number') return isNumber(value)
}

export default function reqForText (required, value) {
  return required && value === ''
}
