import React from 'react'
import Select, { components } from 'react-select'
import Creatable from 'react-select/creatable'
import Octicon, { ChevronDown, Zap } from '@primer/octicons-react'
import './select.css'

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <Octicon
        className={'select__dropdown-indicator'}
        size="medium"
        icon={ChevronDown}
      />
    </components.DropdownIndicator>
  )
}
const makeOption = value =>
  value
    ? {
        value,
        label: value,
      }
    : null

const SelectComponent = ({
  options = [],
  onChange,
  value,
  name,
  creatable,
  placeholder,
  ...props
}) => {
  // we pass through only value, letting label = value
  const handleChange = option =>
    onChange({ target: { name, value: option.value } })
  const Component = creatable ? Creatable : Select
  return (
    <Component
      {...props}
      name={name}
      options={options.filter(option => option.length > 0).map(makeOption)}
      value={makeOption(value)}
      onChange={handleChange}
      placeholder={placeholder || name}
      classNamePrefix="select"
      components={{ DropdownIndicator }}
      // theme={theme => ({
      //   ...theme,
      //   colors,
      // })}
    />
  )
}

export { makeOption }

export default SelectComponent
