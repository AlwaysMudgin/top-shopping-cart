import { useState } from 'react';
import { Outlet } from 'react-router';
import Header from './components/Header';

function App() {
  const [productData, setProductData] = useState(null);
  const [cart, setCart] = useState([]);

  return (
    <>
      <Header cartSize={cart.length} />
      <Outlet />
    </>
  );
}

export default App;
