import React from 'react'
import BookForm from './BookForm'

// history prop is automatically passed by React Router to every component mentioned in the <Route />
const AddBook = ({ history, books, setBooks }) => {
  const handleOnSubmit = (book) => {
    // Storing all added books in an array with new book first then spreading previous books
    // Able to use spread operator because books was initialized as an array in AppRouter.js
    setBooks([book, ...books])
    // Redirect to Books List page
    history.push('/')
  }

  return (
    <React.Fragment>
      {/* Display BookForm */}
      <BookForm handleOnSubmit={handleOnSubmit} />
    </React.Fragment>
  )
}

export default AddBook