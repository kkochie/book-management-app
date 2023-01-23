import React from 'react'
import _ from 'lodash'
import Book from './Book'

const BooksList = ({ books, setBooks }) => {
  // Call setBooks function with filter() to keep only books that do not match with provided book id
  const handleRemoveBook = (id) => {
    setBooks(books.filter((book) => book.id !== id))
  }

  return (
    <React.Fragment>
      <div className="book-list">
        {/* Loop over books array and pass them as props to Book component */}
        {!_.isEmpty(books) ? (
          books.map((book) => (
            <Book key={book.id} {...book} handleRemoveBook={handleRemoveBook} />
          ))
        ) : (
          <p className="message">No books available. Please add some books.</p>
        )}
      </div>
    </React.Fragment>
  )
}

export default BooksList