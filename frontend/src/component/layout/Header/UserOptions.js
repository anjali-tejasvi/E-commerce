import React, { useState } from 'react'
import './userOption.css'
import { SpeedDial, SpeedDialAction } from "@material-ui/lab";
import { MdDashboard, MdExitToApp, MdListAlt, MdPerson } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { useAlert } from "react-alert";
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../../../actions/userAction';
import { Backdrop } from '@material-ui/core';
import { CgShoppingCart } from 'react-icons/cg';


const UserOptions = ({user}) => {

    const [open, setOpen] = useState(false);
    const navigate = useNavigate();
    const alert = useAlert();
    const {cartItems } =  useSelector((state)=> state.cart);
    const dispatch = useDispatch();

    const options = [
        {
            icon: <MdListAlt />,
            name: "Orders", 
            func:orders
        },
        {
            icon: <MdPerson />,
            name: "Profile", 
            func:account
        },
        {
            icon: <CgShoppingCart style={{color: cartItems.length >0 ? "tomato" : "unset"
            }} />,
            name: `Cart(${cartItems.length})`, 
            func:cart
        },
        
        {
            icon: <MdExitToApp />,
            name: "Logout", 
            func:logoutUser
        },
      
    ];

    if(user.role === 'admin'){
        options.unshift({
            icon: <MdDashboard />,
            name:"Dashboard",
            func:dashboard,
        })
    }

    function dashboard(){
        navigate('/admin/dashboard');
    }

    function orders(){
        navigate('/orders');
    }

    function account(){
        navigate('/account');
    }
    function cart(){
        navigate('/cart')
    }
    function logoutUser(){
        dispatch(logout())
        alert.success("Logout Succesfully")
        
    }


  return <>
  <Backdrop open={open} style={{zIndex: "10"}}/>
    <SpeedDial 
        ariaLabel='SpeedDial tooltip example'
        onClose={() => setOpen(false)}
        onOpen={()=> setOpen(true)}
        open={open}
        style={{zIndex: "11"}}
        className="speedDial"
        direction="down"
        icon={
        <img
         className='speedDialIcon'
         src={user.avatar.url ? user.avatar.url: "/Profile.png"}
         alt="Profile"
        />
        }
    >
        {
            options.map((item)=>(
                <SpeedDialAction key={item.name} icon={item.icon} tooltipTitle={item.name} onClick={item.func}/>
            ))
        }
    </SpeedDial>
  </>
}

export default UserOptions