import React, { useState } from 'react'
import { navigate } from '@reach/router'
import Input from '~/components/Input'
import Button from '~/components/Button'
import querystring from 'querystring'

import './edit.css'
import './global.css'

const IndexPage = ({}) => {
  const [values, setValues] = useState({})
  const handleChange = event =>
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    })

  const handleReject = () => console.log('wrong code or email')

  const handleSubmit = event => {
    event.preventDefault()

    const body = querystring.stringify(values)

    fetch('/.netlify/functions/passcode', {
      method: 'POST',
      body,
    })
      .then(response => console.log(response) || response)
      .then(response => response.json())
      .then(json => console.log('json', json) || json)
      .then(user =>
        user.authenticated ? navigate('edit', { state: user }) : handleReject()
      )
      .catch(error => console.error(error))
  }

  return (
    <main className="edit__main">
      <form className="edit__form" onSubmit={handleSubmit}>
        <section className="edit__grid">
          <section className="edit__input-section">
            <span className="edit__email">hi</span>
            <Input
              name="email"
              value={values['email']}
              onChange={handleChange}
              placeholder="Email"
              tip="Email"
            />
            <Input
              name="userId"
              value={values['userId']}
              onChange={handleChange}
              placeholder="user id"
              tip="user id"
            />
            {/* <hr /> */}
            <Button
              className="edit__login-button"
              type="submit"
              // onClick={() => {}}
            >
              Enter
            </Button>
          </section>
        </section>
      </form>
    </main>
  )
}

export default IndexPage
