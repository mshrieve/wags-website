import React from 'react'
import './directory.css'

import Main from './Main'

const Directory = ({ people }) => (
  <Main>
    <section className="grid">
      {people.map(person => (
        <PersonItem key={person.id} {...person} />
      ))}
    </section>
  </Main>
)

const PersonItem = ({ firstname, lastname, position, institution }) => (
  <section className="item">
    <span>{[firstname, lastname].join(' ')}</span>
    <span className="position">{position}</span>
    <span className="institution">{institution}</span>
  </section>
)

export default Directory
