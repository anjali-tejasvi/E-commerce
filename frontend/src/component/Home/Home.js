import React, { Fragment, useEffect } from 'react'
import {CgMouse} from'react-icons/cg';
import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, getProduct } from '../../actions/productAction';
import Metadata from '../layout/Header/Metadata';
import Loading from '../layout/Loader/Loading';
import Product from '../product/Product';
import './Home.css';
import {useAlert} from "react-alert"

const Home = () => {

  const alert = useAlert();

  const dispatch = useDispatch();

  const {loading, error,products} = useSelector(state=>state.products)

  useEffect(() =>{
   
    if(error){
      alert.error(error)
      dispatch(clearErrors())
     }
    dispatch(getProduct());
  },[dispatch,error,alert])

  return <>
  {
    loading? <Loading />: <>
    <Metadata title={"ECOMMERCE"} />
  <div className='banner'>
  <p>Welcome to Ecommerce</p>
  <h1>FIND AMAZING PRODUCTS BELOW</h1>

  <a href='#container'>
    <button>
        Scroll <CgMouse />
    </button>
  </a>
  </div>
  <h2 className='homeHeading'>Featured Products</h2>
  <div className='container' id='container'>
   {
    products && products.map((product)=>(
      <Product key={product._id} product={product}/>
    ))
   }
  </div>
    </>
  }
  
  </>
}

export default Home