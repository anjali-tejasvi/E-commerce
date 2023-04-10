import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Header from "./component/layout/Header/Header.js"
import WebFont from 'webfontloader'
import React, { useEffect, useState } from 'react';
import Footer from './component/layout/footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/product/ProductDetails';
import AllProducts from './component/product/AllProducts.jsx';
import Search from './component/product/Search.jsx';
import LoginSignUp from './component/user/LoginSignUp';
import store from './store'
import { LoadUser } from './actions/userAction';
import UserOptions from './component/layout/Header/UserOptions.js'
import { useSelector } from 'react-redux';
import Profile from './component/user/Profile.jsx'
import UpdateProfile from './component/user/UpdateProfile.jsx';
import UpdatePassword from './component/user/UpdatePassword.jsx';
import ForgotPassword from './component/user/ForgotPassword.jsx';
import ResetPassword from './component/user/ResetPassword.jsx';
import Cart from './component/Cart/Cart.jsx'
import {ProtectedRoute} from './component/routes/ProtectedRoute';
import Shipping from './component/Cart/Shipping.jsx';
import ConfirmOrder from './component/Cart/ConfirmOrder.jsx';
import Payment from './component/Cart/Payment.jsx';
import Success from './component/Cart/Success.jsx';
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import MyOrders from './component/Order/MyOrders.jsx';
import OrderDetails from './component/Order/OrderDetails.jsx';
import Dashboard from './component/admin/Dashboard.jsx';
import ProductList from './component/admin/ProductList.jsx';
import NewProduct from './component/admin/NewProduct';
import UpdateProduct from './component/admin/UpdateProduct.jsx';

function App() {


  const { isAuthenticated,user } = useSelector(state=>state.user)

  const [stripeApiKey, setStripeApiKey] = useState("");


  async function getStripeApiKey(){
    const {data} = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{
    WebFont.load({
      google:{
        families:['Roboto','Dorid Sans','Chilanka'],
      }
    })

    store.dispatch(LoadUser())

    getStripeApiKey();
  },[]);

  
  return (
  <>
   <Router>
   <Header />

   {
    isAuthenticated && <UserOptions user={user} />
   }
   <Routes>
   <Route path='/' element={<Home />} />
   <Route path='/product/:id' element={<ProductDetails />} />
   <Route path='/products' element={<AllProducts />} />
   <Route path='/products/:keyword' element={<AllProducts />} />
   <Route path='/search' element={<Search />} />
   <Route path='/login' element={<LoginSignUp />} />
   <Route path='/account' element={<ProtectedRoute>
    <Profile />
    </ProtectedRoute>
      } />
   <Route path='/me/update' 
   element={
    <ProtectedRoute>
    <UpdateProfile />
    </ProtectedRoute>
      } />
   <Route path='/password/update' 
   element={
    <ProtectedRoute>
    <UpdatePassword />
    </ProtectedRoute>
      } />
   <Route path='/password/forgot' element={<ForgotPassword />} />
   <Route path='/password/reset/:token' element={<ResetPassword />} />
   <Route path='/cart' element={<Cart />} />

   <Route path='/login/shipping' 
   element={
    <ProtectedRoute>
    <Shipping />
    </ProtectedRoute>
      } />

  


     {stripeApiKey && (
       <Route path='/process/payment' 
       element={
      <ProtectedRoute>
      <Elements stripe={loadStripe(stripeApiKey)}>
      <Payment />
      </Elements>
      </ProtectedRoute>
        } />
     )}
     
   
     <Route path='/success' 
   element={
    <ProtectedRoute>
    <Success />
    </ProtectedRoute>
      } />

     <Route path='/orders' 
   element={
    <ProtectedRoute>
    <MyOrders />
    </ProtectedRoute>
      } />


 <Route path='/order/confirm' 
   element={
    <ProtectedRoute>
    <ConfirmOrder />
    </ProtectedRoute>
      } />


     <Route path='/order/:id' 
   element={
    <ProtectedRoute>
    <OrderDetails />
    </ProtectedRoute>
      } />



{/* admin routs --> I will make a protected route for that */}


     {/* <Route path='/admin/dashboard' 
   element={
    <ProtectedAdminRoute>
    <Dashboard />
    </ProtectedAdminRoute>
      } /> */}


     <Route path='/admin/dashboard' 
     element={
     <ProtectedRoute>
     <Dashboard />
     </ProtectedRoute>
      } />


     <Route path='/admin/products' 
     element={
     <ProtectedRoute>
     <ProductList />
     </ProtectedRoute>
      } />

     <Route path='/admin/product' 
     element={
     <ProtectedRoute>
     <NewProduct />
     </ProtectedRoute>
      } />

     <Route path='/admin/product/:id' 
     element={
     <ProtectedRoute>
     <UpdateProduct />
     </ProtectedRoute>
      } />





   </Routes>
   <Footer />
   </Router>
  </>
  );
}

export default App;

