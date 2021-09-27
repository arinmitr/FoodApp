import React, { useState } from 'react'

import CartProvider from './store/CartProvider'
import Meals from './components/Meals/Meals'
import Header from './components/Layout/Header'
import Cart from './components/Cart/Cart'
function App() {
  const [cartIsShown, setCartIsShown] = useState(false)

  const showCartHandler = () => {
    setCartIsShown(true)
  }

  const hideCartHandler = () => {
    setCartIsShown(false)
  }
  return (

    <CartProvider>
      <Cart />
      <Header />
      {cartIsShown && <Cart onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />
      </main>
    </CartProvider>
  )
}

export default App
