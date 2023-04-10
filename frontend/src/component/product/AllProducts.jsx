import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { clearErrors, getProduct } from '../../actions/productAction'
import Loading from '../layout/Loader/Loading'
import './AllProducts.css'
import Product from './Product'
import Pagination from "react-js-pagination";
import { useAlert } from "react-alert";
import Typography from '@mui/material/Typography';
import Slider from "@material-ui/core/Slider";
import MetaData from "../layout/Header/Metadata";

const categories = [
    "laptop",
    "watch",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];


const AllProducts = () => {

    const dispatch = useDispatch()
    const alert = useAlert();
    const {loading, error, products, productsCount,resultPerPage} = useSelector(state => state.products)

    const [currentPage,setCurrentPage] = useState(1);
    const  [price,setPrice] = useState([0,250000])
    const [category, setCategory] = useState("");

    const [ratings, setRatings] = useState(0);

    const setCurrentPageNo = (e)=>{
        setCurrentPage(e)
    }

    const {keyword} = useParams();

    const priceHandler = (event,newPrice) =>{
        setPrice(newPrice)
    }

    useEffect(()=>{
        if(error){
            alert.error(error)
            dispatch(clearErrors())
           }
        dispatch(getProduct(keyword,currentPage,price,category,ratings))
    },[dispatch,keyword,alert,error,currentPage,price,category,ratings])
  return <>
    {loading ? <Loading /> : <>

    <MetaData title="PRODUCTS -- ECOMMERCE" />
        <h2 className='productsHeading'>Products</h2>
        <div className="allproducts">
            {
               products && products.map((product)=>(
                    <Product key={product._id} product={product} />
                ))
            }
        </div>

        <div className="filterBox">
        <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="on"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />

        <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>

            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
        </div>

       {
        resultPerPage < productsCount &&(
            <div className="paginationBox">
            <Pagination 
             activePage={currentPage}
             itemsCountPerPage={resultPerPage}
             totalItemsCount={productsCount}
             onChange={setCurrentPageNo}
             nextPageText="Next"
             prevPageText="Prev"
             firstPageText="1st"
             activeClass='pageItemActive'
             activeLinkClass='pageLinkActive'
            
            />
        </div>
        )
       }
    </> }

  </>
}

export default AllProducts