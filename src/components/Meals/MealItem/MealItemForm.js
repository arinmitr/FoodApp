//import Input from '../../UI/Input'
import React, { useState } from 'react'
import classes from './MealItemForm.module.css'

const MealItemForm = (props) => {
  const [amount, setAmount] = useState(1)
  const amountChangeHandler = (event) => {
    setAmount(event.target.value)
  }
  const submitHandler = (event) => {
    event.preventDefault()
    //console.log(amount)
    props.onAddToCart(amount)
  }
  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.input}>
        <label htmlFor='amount'>Amount</label>
        <input
          id='amount'
          type='number'
          step='1'
          min='1'
          max='5'
          value={amount}
          onChange={amountChangeHandler}
        />
      </div>
      <button>+ Add</button>
    </form>
  )
}

export default MealItemForm
