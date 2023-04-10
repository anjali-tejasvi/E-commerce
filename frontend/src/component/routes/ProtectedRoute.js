import React from 'react'
import { useSelector } from 'react-redux'
import {  Navigate} from 'react-router-dom';

const ProtectedRoute = ({children}) => {
  
    const { isAuthenticated} = useSelector((state)=>state.user);
    if(!isAuthenticated){
        return <Navigate to= "/login" />
    }

    return children
   
}

// const ProtectedAdminRoute = ({children}) => {
  
//     const { role } = useSelector((state)=>state.user.user);
//     console.log(role)
//     if(role !== "admin"){
//         return <Navigate to= "/login" />
//     }

//     return children
   
// }

export { ProtectedRoute}