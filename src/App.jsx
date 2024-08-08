import Header from "./components/Header/Header";
import Guitar from "./components/Guitar/Guitar";
import { useState, useEffect } from "react";
import { db } from "./data/db";

function App() {

const initialCart = () => {
  const localStorageCart = localStorage.getItem("cart")
  return localStorageCart ? JSON.parse(localStorageCart) : []
}

  const [data] = useState(db)
  const [cart, setCart] = useState(initialCart)

  const addToCart = (item) => {

    const itemExist = cart.findIndex(guitar => guitar.id === item.id)
    if(itemExist >= 0) {
      if(cart[itemExist].quantity >= maxItems) return
      const updatedCart = [...cart]
      updatedCart[itemExist].quantity++
      setCart(updatedCart)
    } else {
      item.quantity = 1
      console.log('No existe, se agrega')
      setCart([...cart, item])
    }
  }

  const removeFromCart = (id) => {
    setCart(prevCart => prevCart.filter(guitar => guitar.id !== id))
  }

  const maxItems = 5
  const minItems = 1

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const increaseQuantity = ((id) => {
    const updatedCart = cart.map((item) => {
      if(item.id === id && item.quantity < maxItems){
        return {
          ...item,
          quantity: item.quantity + 1
        }
      }
      return item
    })
    setCart(updatedCart)
  })

  const decreaseQuantity = ((id) => {
    const updatedCart = cart.map((item) => {
      if(item.id === id && item.quantity !== minItems) {
        return {
          ...item,
          quantity: item.quantity -1
        }
      }
      return item
    })
    setCart(updatedCart)
  })

  const emptyCart = () => {setCart([])}

  return (
    <>
    <Header 
      cart={cart}
      removeFromCart={removeFromCart}
      increaseQuantity={increaseQuantity}
      decreaseQuantity={decreaseQuantity}
      emptyCart={emptyCart}
    />  
   

    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => (
              <Guitar 
                key={guitar.id}
                guitar={guitar}
                setCart = {setCart}
                addToCart = {addToCart}
              />
            )
          )}
            

            
        </div>
    </main>


    <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
            <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - Todos los derechos Reservados</p>
        </div>
    </footer>
    </>
  )
}

export default App
