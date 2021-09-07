import React from "react";
import '../styling/OrderStyle.css';

import { Popover, Overlay, OverlayTrigger, Button } from "react-bootstrap";

export default function Order({ orderProps }) {
  const {
    name,
    price,
    quantity,
    description,
  } = orderProps;

  const totalAmount = price * quantity;


  return (
  
      <div className="orderStyle border my-3 text-center container">
        <h5>{name}</h5>
        <p>{description}</p>
        <p>₱ {price.toLocaleString()}.00</p>
        <small>Total ₱{totalAmount.toLocaleString()}.00</small>
      </div>
  

  );
}
