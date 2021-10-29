import { useReducer } from 'react'

import CartContext from './cart-context'

const defaultCartState = {
  items: [],
  totalAmount: 0,
}

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount
    let updatedItems
    if (state.items.find((item) => item.id === action.item.id)) {
      updatedItems = state.items.map((item) =>
        item.id === action.item.id
          ? { ...item, amount: item.amount + action.item.amount }
          : item
      )
    } else {
      updatedItems = [...state.items, action.item]
    }
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }
  if (action.type === 'REMOVE') {
    let updatedItems
    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.id
    )
    if (state.items[existingCartItemIndex].amount === 1) {
      updatedItems = state.items.filter((item) => item.id !== action.id)
    } else {
      updatedItems = [...state.items]
      updatedItems[existingCartItemIndex].amount -= 1
    }
    const updatedTotalAmount =
      state.totalAmount - state.items[existingCartItemIndex].price
    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    }
  }
  if (action.type === 'CLEAR') return defaultCartState
  return defaultCartState
}

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  )

  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: 'ADD', item: item })
  }

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: 'REMOVE', id: id })
  }

  const clearCartHandler = () => {
    dispatchCartAction({ type: 'CLEAR' })
  }

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemToCartHandler,
    removeItem: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  }

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  )
}

export default CartProvider
