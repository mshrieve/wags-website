import React from 'react'
import './directory.css'

const Directory = ({ people }) => (
  <section className="directory_grid">
    {people.map(person => (
      <PersonItem key={person.id} {...person} />
    ))}
  </section>
)

const PersonItem = ({
  firstname,
  lastname,
  position,
  institution,
  website,
}) => (
  <section className="directory_person">
    <span className="directory_name">{[firstname, lastname].join(' ')}</span>
    <span className="directory_institution">{institution}</span>
    <span className="directory_position">{position} </span>
    {website && (
      <a className="directory_website" href={website}>
        website
      </a>
    )}
  </section>
)

export default Directory
