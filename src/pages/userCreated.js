import React from 'react'
import '~/pages/edit.css'
import '~/pages/global.css'
import Card from '~/components/Card'
import Main from '~/components/Main'

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
        <div className="edit__input-section">
          <h2>Created new profile:</h2>
          <Card {...user} />
        </div>
      </section>
    </Main>
  )
}

export default UserCreatedPage
