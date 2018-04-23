import React from 'react'
import PropTypes from 'prop-types'

import Delete from './delete.svg'
import Plus from './plus.svg'
import Add from './add.svg'
import ArrowDown from './arrow-down.svg'
import ArrowDownBlack from './arrow-down-black.svg'
import ArrowUp from './arrow-up.svg'
import Close from './close.svg'
import Loading from './loading.svg'
import NoMatch from './url-fail.svg'

const ICONS = {
  delete: Delete,
  plus: Plus,
  add: Add,
  arrowDown: ArrowDown,
  arrowUp: ArrowUp,
  arrowDownBlack: ArrowDownBlack,
  close: Close,
  loading: Loading,
  noMatch: NoMatch
}

const Icon = ({ name, width, onClick, className }) => (
  <img
    src={ICONS[name]}
    width={width}
    alt={`${name}-icon`}
    onClick={onClick}
    className={className}
  />
)

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  width: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.any
}

Icon.defaultProps = {
  onClick: f => f,
  width: '30px',
  className: null
}

export default Icon
