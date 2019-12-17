import React from 'react'
import './directory.css'

const Card = ({ firstName, lastName, position, institution, website }) => (
  <section className="card">
    <span className="card__name">{[firstName, lastName].join(' ')}</span>
    <span className="card__institution">{institution}</span>
    <span className="card__position">{position} </span>
    {website && (
      <a
        className="card__website"
        href={website.startsWith('http') ? website : `//${website}`}
      >
        website
      </a>
    )}
  </section>
)

export default Card
