import { useState, useEffect } from 'react'

const useLocalStorage = (key, initialValue) => {
  // Lazy initialization used so useState code only executed once, even if useLocalStorage hook called multiple times on every rerender
  // Initally checking to see if any value in local storage with the provided key and return value by parsing it using JSON.parse method
  const [value, setValue] = useState(() => {
    try {
      const localValue = window.localStorage.getItem(key)
      return localValue ? JSON.parse(localValue) : initialValue
    } catch (error) {
      return initialValue
    }
  })
  
  // If any change in the key or value, update local storage
  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])
  
  // Return value stored in local storage and setValue function which is called to update the localStorage data
  return [value, setValue]
}

export default useLocalStorage
