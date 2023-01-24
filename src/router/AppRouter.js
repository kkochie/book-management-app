import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Header from '../components/Header'
import AddBook from '../components/AddBook'
import BooksList from '../components/BooksList'
import EditBook from '../components/EditBook'
import useLocalStorage from '../hooks/useLocalStorage'

const AppRouter = () => {
  const [books, setBooks] = useLocalStorage('books', [])

  return (
    <BrowserRouter>
      <div>
        <Header />
        <div className="main-content">
          <Switch>
            {/* Pass books and setBooks as props to BooksList */}
            <Route 
              render={(props) => (
                <BooksList {...props} books={books} setBooks={setBooks} />
              )} 
              path="/" exact={true} />
            {/* Pass books and setBooks as props along with default props to AddBook so can add the book to local storage */}
            <Route 
              render={(props) => (
                <AddBook {...props} books={books} setBooks={setBooks} />
              )} 
              path="/add" />
            {/* Pass books and setBooks along with default props to EditBook */}
            <Route
              render={(props) => (
                <EditBook {...props} books={books} setBooks={setBooks} />
              )}
              path="/edit/:id"
            />
            {/* Handle all other routes */}
            <Route component={() => <Redirect to="/" />} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default AppRouter