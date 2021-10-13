//import Input from '../../UI/Input'
import React, { useRef } from 'react'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
  const amountInputRef = useRef()

  const submitHandler = (event) => {
    event.preventDefault()
    const enteredAmount = amountInputRef.current.value
    const enteredAmountNumber = +enteredAmount
    props.onAddToCart(enteredAmountNumber)
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.input}>
        <label htmlFor='amount'>Amount</label>
        <input
          ref={amountInputRef}
          id='amount'
          type='number'
          step='1'
          min='1'
          max='5'
          defaultValue='1'
        />
      </div>
      <button>+ Add</button>
    </form>
  )
}

export default MealItemForm
