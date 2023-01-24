import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { v4 as uuidv4 } from 'uuid'

const BookForm = (props) => {
  // Define state as an object to store all entered details
  // Since same form used to add and edit book, first check if book prop is passed or not
  // If prop passed, set to passed value otherwise an empty string
  // Use lazy initialization so only executed once
  const [book, setBook] = useState(() => {
    return {
      bookname: props.book ? props.book.bookname : '',
      author: props.book ? props.book.author : '',
      quantity: props.book ? props.book.quantity : '',
      price: props.book ? props.book.price : '',
      date: props.book ? props.book.date : ''
    }
  })

  // State for adding error message
  const [errorMsg, setErrorMsg] = useState('')

  // Destructure to refer to each of the property inside the state
  const { bookname, author, price, quantity } = book

  const handleOnSubmit = (event) => {
    event.preventDefault()
    const values = [bookname, author, price, quantity]
    let errorMsg = ''

    // Check if user has entered all details using every array method
    // If all values filled in, create object and call handleOnSubmit method by passing book as an argument, otherwise set error message.
    const allFieldsFilled = values.every((field) => {
      const value = `${field}`.trim()
      return value !== '' && value !== '0'
    })

    if (allFieldsFilled) {
      const book = {
        id: uuidv4(), // Create a unique ID
        bookname,
        author,
        price,
        quantity,
        date: new Date()
      }
      // handleOnSubmit methos is passed as a prop from AddBook component
      props.handleOnSubmit(book)
    } else {
      errorMsg = 'Please fill out all fields.'
    }
    setErrorMsg(errorMsg)
  }

  // Switch statement to change the value of the state based on which input field is changed
  const handleInputChange = (event) => {
    const { name, value } = event.target
    
    switch (name) {
      // For both quantity and price, check for empty value; allows user to delete entered value if needed. Without check, user not able to delete entered value by pressing Ctrl + A + Delete.
      // Check to see if entered value is an integer without decimal. Only update state if not decimal value.
      case 'quantity':
        if (value === '' || parseInt(value) === +value) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }))
        }
        break
      // Check for decimal number with only two digits after decimal point. Only update state if price value matches regex.  
      case 'price':
        if (value === '' || value.match(/^\d{1,}(\.\d{0,2})?$/)) {
          setBook((prevState) => ({
            ...prevState,
            [name]: value
          }))
        }
        break
      // For all other input fields, state updated based on user's entered value.
      default:
        setBook((prevState) => ({
          ...prevState,
          [name]: value
        }))
    }
  }

  // Return form with book name, author, quantity and price input
  return (
    <div className="main-form">
      {errorMsg && <p className="errorMsg">{errorMsg}</p>}
      <Form onSubmit={handleOnSubmit}>
        <Form.Group controlId="name">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="bookname"
            value={bookname}
            placeholder="Enter name of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="author">
          <Form.Label>Book Author</Form.Label>
          <Form.Control
            className="input-control"
            type="text"
            name="author"
            value={author}
            placeholder="Enter name of author"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            className="input-control"
            type="number"
            name="quantity"
            value={quantity}
            placeholder="Enter available quantity"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="price">
          <Form.Label>Book Price</Form.Label>
          <Form.Control 
            className="input-control"
            type="text"
            name="price"
            value={price}
            placeholder="Enter price of book"
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="submit-btn">
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default BookForm