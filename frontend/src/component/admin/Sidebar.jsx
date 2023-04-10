import React from 'react'
import './sidebar.css'
import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
// import  TreeView  from "@material-ui/lab/TreeView/TreeView";
// import TreeItem  from "@material-ui/lab/TreeItem/TreeItem";
import {MdRateReview,MdPeople, MdDashboard,MdListAlt,MdPostAdd,MdAddCircle }from "react-icons/md";



const Sidebar = () => {
  return (
    <div className="sidebar">
    <Link to="/">
      <img src={logo} alt="Ecommerce" />
    </Link>
    <Link to="/admin/dashboard">
      <p>
        <MdDashboard /> Dashboard
      </p>
    </Link>
    <Link to="/admin/products">
    <MdPostAdd /> All Products
    </Link>
    <Link to="/admin/product">
    {<MdAddCircle />} Create
    </Link>
    {/* <Link>
      <TreeView
        defaultCollapseIcon={<MdExpandMore />}
        defaultExpandIcon={<MdImportExport />}
      >
        <TreeItem nodeId="1" label="Products">
          <Link to="/admin/products">
            <TreeItem nodeId="2" label="All" icon={<MdPostAdd />} />
          </Link>

          <Link to="/admin/product">
            <TreeItem nodeId="3" label="Create" icon={<MdAddCircle />} />
          </Link>
        </TreeItem>
      </TreeView>
    </Link> */}
    <Link to="/admin/orders">
      <p>
        <MdListAlt />
        Orders
      </p>
    </Link>
    <Link to="/admin/users">
      <p>
        <MdPeople /> Users
      </p>
    </Link>
    <Link to="/admin/reviews">
      <p>
        <MdRateReview />
        Reviews
      </p>
    </Link>
  </div>
  )
}

export default Sidebar