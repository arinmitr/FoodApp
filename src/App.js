import React from 'react'

import Meals from './components/Meals/Meals'
import Header from './components/Layout/Header'
import Cart from './components/Cart/Cart'
function App() {
  return (
    <>
      <Cart />
      <Header />
      <main>
        <Meals />
      </main>
    </>
  )
}

export default App
