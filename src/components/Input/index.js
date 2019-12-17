import React from 'react'
import './input.css'
import classNames from 'classnames'

const Input = ({ value, ...props }) => {
  return (
    <section className="input__grid">
      <input className="input__main" value={value || ''} {...props} />

      <span className={classNames('input__tip', value && 'input__tip-visible')}>
        {props.tip || props.placeholder || props.name}
      </span>
    </section>
  )
}

export default Input
