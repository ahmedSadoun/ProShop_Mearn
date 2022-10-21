import React, { useSelector } from "react";
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
import MyOrderList from './components/MyOrderList'
import UpdateUserProfile from './components/UpdateProfile'
import ListUsersScreen from './screens/ListUsersScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProtectedAdminRoutes from "./Admin/ProtectedAdminRoutes";
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
            <Route path='/updateuserprofile' element={<UpdateUserProfile />} exact />
            <Route path='/myorderlist' element={<MyOrderList />} exact />
            <Route path='/order/:id' element={<OrderScreen />} exact />
            <Route path='/login' element={<LoginScreen />} exact />
            <Route path='/product/:id' element={<ProductScreen />} />
            {/* this means that the id is optional  */}
            <Route path='/cart/:id?' element={<CartScreen />} />
            <Route path='/cart/:id' element={<CartScreen />} />
            <Route path='/cart' element={<CartScreen />} />
            <Route path='/register' element={<RegisterScreen />} />
            <Route path='/profile' element={<ProfileScreen />} />
            {/* these are a protected routes. Only the ADMIN can access them */}
            <Route element={<ProtectedAdminRoutes />}>
              <Route path='/admin/user/:id/edit' component={<UserEditScreen />} />
              <Route path='/admin/userlist' element={<ListUsersScreen />} />
            </Route>
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>

  );
}

export default App;
