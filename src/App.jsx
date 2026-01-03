import { useState } from 'react';
import { Outlet } from 'react-router';
import { addToCart, subtractFromCart, setCartAmount } from './utils';
import Header from './components/Header';

function App() {
  const [cart, setCart] = useState([]);
  console.log('cart: ', cart);

  const updateCart = (product, change, amount) => {
    const nextCart = [...cart];
    if (change === 'add') {
      setCart(addToCart(nextCart, product));
    }
    if (change === 'remove') {
      setCart(subtractFromCart(nextCart, product));
    }
    if (change === 'set') {
      setCart(setCartAmount(nextCart, product, amount));
    }
  };

  const countCartItems = () => {
    if (cart.length === 0) return 0;
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  };

  const cartSize = countCartItems();

  return (
    <>
      <Header cartSize={cartSize} />
      <Outlet context={[cart, updateCart]} />
    </>
  );
}

export default App;
