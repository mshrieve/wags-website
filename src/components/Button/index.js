import React, { ButtonHTMLAttributes } from 'react'
import classNames from 'classnames'
import './button.css'
// import '../index.css'
import Octicon from '@primer/octicons-react'
const Button = ({ children, state, onClick, type, icon, className }) => (
  <button
    className={classNames(className, {
      button: true,
      'grid-button--active': state === 'active',
      'grid-button--inactive': state === 'inactive',
    })}
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
