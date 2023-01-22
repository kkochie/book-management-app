import React from 'react'
import { NavLink } from 'react-router-dom'

const Header = () => {
  return (
    <header>
      <h1>Book Management App</h1>
      <hr />
      <div className="links">
        {/* link to see all books */}
        <NavLink to="/" className="link" activeClassName="active" exact>
          Books List
        </NavLink>
        {/* link to add a new book */}
        <NavLink to="/add" className="link" activeClassName="active">
          Add Book
        </NavLink>
      </div>
    </header>
  )
}

export default Header