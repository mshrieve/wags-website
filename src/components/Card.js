import React from 'react'
import './directory.css'

const Card = ({
  firstName,
  lastName,
  position,
  institution,
  website,
  advisor,
  tag1,
  tag2,
  tag3,
}) => (
  <section className="card">
    <span className="card__name">{[firstName, lastName].join(' ')}</span>
    <span className="card__position">{position} </span>
    <span className="card__institution">{institution}</span>
    {website && (
      <a
        className="card__website"
        href={website.startsWith('http') ? website : `//${website}`}
      >
        website
      </a>
    )}
    <span className="card__tag">{tag1} </span>
    <span className="card__tag">{tag2} </span>
    <span className="card__tag">{tag3} </span>
  </section>
)

export default Card
