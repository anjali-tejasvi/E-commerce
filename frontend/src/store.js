import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension'
import { newProductReducer, newReviewReducer, productDetailsReducer, productReducer, productsReducers } from './reducers/productReducers';
import { forgotPasswordReducer, profileReducer, userReducer } from './reducers/userReducer';
import { cartReducer } from './reducers/cartReducer';
import { myOrdersReducer, newOrderReducer, orderDetailsReducer } from './reducers/orderReducer';

const reducer = combineReducers({
    products:productsReducers,
    productDetails:productDetailsReducer,
    user:userReducer,
    profile:profileReducer,
    forgotPassword:forgotPasswordReducer,
    cart:cartReducer,
    newOrder:newOrderReducer,
    myOrders: myOrdersReducer,
    orderDetails: orderDetailsReducer,
    newReview: newReviewReducer,
    newProduct: newProductReducer,
    product:productReducer,
});

const middleware =  [thunk];
let initialState = {
    cart:{
        cartItems: localStorage.getItem("cartItems") ?
        JSON.parse(localStorage.getItem("cartItems"))
        : [],
        shippingInfo: localStorage.getItem("shippingInfo")
        ? JSON.parse(localStorage.getItem("shippingInfo"))
        :{},
    }
};
const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;