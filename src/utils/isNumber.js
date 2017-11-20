export default function isNumber (value) {
  return !isNaN(parseInt(value)) && isFinite(value)
}