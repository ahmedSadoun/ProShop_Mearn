import React from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap'
import Header from './components/Header'
import Footer from './components/Footer'
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/productScreen';
import CartScreen from './screens/CartScreen.js';
import LoginScreen from './screens/loginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ProfileScreen from './screens/ProfileScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Routes>
            <Route path='/' element={<HomeScreen />} exact />
            <Route path='/shipping' element={<ShippingScreen />} exact />
            <Route path='/payment' element={<PaymentScreen />} exact />
            <Route path='/placeorder' element={<PlaceOrderScreen />} exact />
            <Route path='/order/:id' element={<OrderScreen />} exact />
            <Route path='/login' element={<LoginScreen />} exact />
            <Route path='/product/:id' element={<ProductScreen />} />
            {/* this means that the id is optional  */}
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
