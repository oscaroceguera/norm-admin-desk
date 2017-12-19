export default function isNumber (value) {
  return !isNaN(parseInt(value, 10)) && isFinite(value)
}