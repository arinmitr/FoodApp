import React, { useState } from 'react'
import { useRef } from 'react'
import classes from './Checkout.module.css'

const Checkout = (props) => {
  const [formInputsValidity, setFormInputsValidity] = useState({
    name: true,
    street: true,
    city: true,
    postal: true,
  })
  const nameInputRef = useRef()
  const streetInputRef = useRef()
  const cityInputRef = useRef()
  const postalInputRef = useRef()
  const confirmHandler = (event) => {
    event.preventDefault()

    const enteredName = nameInputRef.current.value
    const enteredStreet = streetInputRef.current.value
    const enteredCity = cityInputRef.current.value
    const enteredPostal = postalInputRef.current.value

    const checkEmpty = (value) => value.trim() !== ''
    const checkLength = (value) => value.trim().length === 6

    const nameIsValid = checkEmpty(enteredName)
    const streetIsValid = checkEmpty(enteredStreet)
    const cityIsValid = checkEmpty(enteredCity)
    const postalIsValid = checkLength(enteredPostal)

    setFormInputsValidity({
      name: nameIsValid,
      street: streetIsValid,
      city: cityIsValid,
      postal: postalIsValid,
    })
    const formIsValid =
      nameIsValid && streetIsValid && cityIsValid && postalIsValid

    if (formIsValid) {
      //submit form data
    }
  }
  return (
    <form onSubmit={confirmHandler} className={classes.form}>
      <div
        className={`${classes.control} ${
          formInputsValidity.name ? '' : classes.invalid
        }`}
      >
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputsValidity.name && <p>Please enter a name</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.street ? '' : classes.invalid
        }`}
      >
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputsValidity.street && <p>Please enter a street</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.city ? '' : classes.invalid
        }`}
      >
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputsValidity.city && <p>Please enter a city</p>}
      </div>
      <div
        className={`${classes.control} ${
          formInputsValidity.postal ? '' : classes.invalid
        }`}
      >
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalInputRef} />
        {!formInputsValidity.postal && <p>Please enter a postal code</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button type='submit' className={classes.submit}>
          Confirm
        </button>
      </div>
    </form>
  )
}

export default Checkout
