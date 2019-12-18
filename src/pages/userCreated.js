import React from 'react'
import '~/pages/edit.css'
import '~/pages/global.css'
import Card from '~/components/Card'
import Main from '~/components/Main'
import Button from '~/components/Button'
import { navigate } from '@reach/router'

const UserCreatedPage = ({ data, location, pageContext }) => {
  const user = location.state || {}
  console.log(user)
  //   if (!user) {
  //     navigate('email')
  //     return null
  //   }

  return (
    <Main>
      <section className="edit__grid">
        <h2>Created new profile:</h2>
        <hr />
        <Card {...user} />
        <hr />

        <span>
          Your user id is <span className="bold">{user.userId}</span>. You'll
          need it if you want to edit your profile in the future.
        </span>
        <hr />
        <div className="edit__buttons">
          <Button
            className="edit__right-button"
            type="button"
            onClick={() => navigate('/')}
          >
            Ok
          </Button>
        </div>
      </section>
    </Main>
  )
}

export default UserCreatedPage
