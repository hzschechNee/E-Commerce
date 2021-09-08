import React, { useState, useEffect } from "react";
import UserOrder from "../components/UserOrders";

import { Link } from "react-router-dom";

export default function OrderPage() {
  const [orderList, setOrderList] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_CAPS3BACKEND}/orders/history`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setOrderList(data);
      });
  }, []);

  return (
    <>
    <div className="border-bottom border-dark container ">
      <h1 className="text-center">My Orders</h1>
    </div>
    <div>
      <UserOrder orderData={orderList} />
    </div>
    <div className="container d-flex justify-content-end"> 
      <Link className="btn btn-danger text-center" to="/products">Browse products.</Link>
    </div>
    </>
  );
}