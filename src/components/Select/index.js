import React from 'react'
import Select, { components } from 'react-select'
import Creatable from 'react-select/creatable'
import Octicon, { ChevronDown, Zap } from '@primer/octicons-react'
import './select.css'

const DropdownIndicator = props => {
  return (
    <components.DropdownIndicator {...props}>
      <Octicon size='medium' icon={ChevronDown} />
    </components.DropdownIndicator>
  )
}

const SelectComponent = props => (
  <Creatable
    {...props}
    classNamePrefix='select'
    components={{ DropdownIndicator }}
  />
)

export default SelectComponent
