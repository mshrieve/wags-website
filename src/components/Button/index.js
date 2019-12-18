import React, { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'
import './button.css'
// import '../index.css'
import Octicon from '@primer/octicons-react'
const Button = ({
  children,
  secondary,
  state,
  onClick,
  type,
  icon,
  className,
}) => (
  <button
    className={classNames(
      className,
      'button',
      secondary ? 'button-secondary' : 'button-main'
    )}
    type={type}
    onClick={onClick}
  >
    <span className="button-text">{children}</span>
    {icon && (
      <span className="button-icon">
        <Octicon size="medium" icon={icon} />
      </span>
    )}
  </button>
)

export default Button
