import React, { useState, useEffect } from "react";
import '../styling/CartPage.css'
import { Form, Button } from "react-bootstrap";
import UserCart from "../components/UserCart";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function CartPage() {
  const history = useHistory();
  const [cartList, setCartList] = useState([]);
  const [cartListTotal, setCartListTotal] = useState(0);

  const fetchCartList = () => {
    fetch(`${process.env.REACT_APP_CAPS3BACKEND}/carts/get-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setCartList(data);
      });
  };

  const fetchCartListTotal = () => {
    fetch(`${process.env.REACT_APP_CAPS3BACKEND}/carts/user-cart`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setCartListTotal(data.totalAmount);
      });
  };
  useEffect(() => {
    fetchCartList();
    fetchCartListTotal();
  }, []);

  const orderAll = () => {
    fetch(`${process.env.REACT_APP_CAPS3BACKEND}/orders/multiple-orders`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        Swal.fire({
          title: "Yeeeyyy!!!",
          icon: "success",
          text: "You have successfully checked out your items",
        });
        history.push("/products");
      })
      .catch((err) => {
        Swal.fire({
          title: "Oppsss!!!",
          icon: "error",
          text: err.message,
        });
      });
  };

  return (
    <div className="mb-5 mt-2 d-flex flex-row">
      <UserCart
        cartData={cartList}
        fetchCartList={fetchCartList}
        fetchCartListTotal={fetchCartListTotal}
      />
      <div className="cartpage-checkout-wrapper">
        <div className="cartpage-checkout-container">
          <div className="cartpage-order-summary">
            <p className="cartpage-summary-text">Order Summary</p>
            <div className="cartpage-order-details">
              <div className="d-flex">
                <p className="cartpage-subtotal">
                  Subtotal ({cartList.length}{" "}
                  {cartList.length < 2 ? "item" : "items"})
                </p>
                <span className="cartpage-price ml-auto">
                  &#8369; {cartListTotal.toLocaleString()}.00
                </span>
              </div>

              <div className="d-flex">
                <p className="cartpage-vat">Shipping Fee(free)</p>
                <span className="cartpage-price ml-auto">0.00</span>
              </div>

              <div>
                <div className="d-flex">
                  <p className="cartpage-total">Total</p>
                  <span className="ml-auto cartpage-total-price">
                    &#8369; {cartListTotal.toLocaleString()}.00
                  </span>
                </div>
                <p className="ml-auto">VAT included, where applicable</p>
              </div>
              <button className="cartpage-btn" onClick={() => orderAll()}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
