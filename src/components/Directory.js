import React from 'react'
import './directory.css'
import Card from './Card'

const Directory = ({ people }) => (
  <section className="directory_grid">
    {people.map(person => (
      <Card key={person.id} {...person} />
    ))}
  </section>
)

export default Directory
