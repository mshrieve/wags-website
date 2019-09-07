import { Link } from 'gatsby'
import React from 'react'
import './header.css'

const Header = ({ text, linkPath }) => (
  <>
    <section className="header">
      <h1 className="header_text">{text}</h1>
      {linkPath && (
        <Link className="header_link" to={linkPath}>
          back
        </Link>
      )}
    </section>
  </>
)

export default Header
