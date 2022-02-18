import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import commerce from './lib/commerce';
import { Navbar, Products, Cart, Checkout } from './components';
import { createTheme, ThemeProvider, CssBaseline } from '@material-ui/core';

const App = () => {

  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});
  const [order, setOrder] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isFinished, setIsFinished] = useState(false);

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();
    setProducts(data);
  }

  const fetchCart = async () => {
    setCart(await commerce.cart.retrieve());
  }

  const handleCardAdd = async (productId, quantity) => {
    const { cart} = await commerce.cart.add(productId, quantity);

    setCart(cart);
  }

  const handleItemQtyUpdate = async (productId, quantity) => {
    const { cart } = await commerce.cart.update(productId, {quantity});

    setCart(cart);
  }

  const handleRemoveCartItem = async (productId) => {
    const { cart } = await commerce.cart.remove(productId);

    setCart(cart);
  }

  const handleEmptyCart = async () => {
    const { cart } = await commerce.cart.empty();

    setCart(cart);
  }

  const refreshCart = async () => {
    const newCart = await commerce.cart.refresh();

    handleEmptyCart();
  }

  const handleCaptureCheckout = async (checkoutTokenId, order) => {
    try {
      const newOrder = await commerce.checkout.capture(checkoutTokenId, order);

      setOrder(newOrder);
      refreshCart();
    } catch (error) {
      setErrorMessage(error.data.error.message);
    }
  }

  // show confirmation message anyway for testing purpose
  const timeout = () => {
    setTimeout(() => {
      setIsFinished(true);

      refreshCart();
    }, 3000);
  }
  
  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  return (
    <Router>
      <div>
        <CssBaseline />
        <Navbar totalItems={cart.total_items} />
        <Switch>
          <Route path='/' exact>
            <Products products={products} onAddToCart={handleCardAdd} />
          </Route>
          
          <Route path='/cart' exact>
            <Cart 
              cart={cart} 
              handleItemQtyUpdate={handleItemQtyUpdate}
              handleRemoveCartItem={handleRemoveCartItem} 
              handleEmptyCart={handleEmptyCart}
            />
          </Route>
          <Route path='/checkout' exact>
            <Checkout 
              cart={cart}
              onCaptureCheckout={handleCaptureCheckout}  
              error={errorMessage}
              order={order}
              timeout={timeout}
              isFinished
            />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}

export default App