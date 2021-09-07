import React, { useState, useEffect } from "react";
import "../styling/CartStyle.css";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

export default function Cart({ cartProps, fetchCartList, fetchCartListTotal }) {
  const history = useHistory();
  const {
    name,
    price,
    productId,
    quantity,
    description,
  } = cartProps;

  const [editQuantity, setEditQuantity] = useState(quantity);
  const [decrementBtn, setDecrementBtn] = useState(false);
  const [totalAmount, setTotalAmount] = useState(editQuantity * price);

  useEffect(() => {
    if (editQuantity < 2) {
      setDecrementBtn(true);
      setTotalAmount(editQuantity * price);
    } else {
      setDecrementBtn(false);
      setTotalAmount(editQuantity * price);
    }
  }, [editQuantity, totalAmount]);

  const incrementQty = () => {
    setEditQuantity(editQuantity + 1);
    addToCart(1);
  };

  const decrementQty = () => {
    setEditQuantity(editQuantity - 1);
    addToCart(-1);
  };

  const addToCart = (quantity) => {
    fetch(`http://localhost:8000/carts/add-cart/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        fetchCartListTotal();
      })
      .catch((err) => console.log(`ERROR ERROR ERROR ${err}`));
  };

  const orderProduct = () => {
    fetch(`http://localhost:8000/orders/create-order/${productId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({
        quantity: editQuantity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          Swal.fire({
            title: "Ngek!!!",
            icon: "Error",
            text: "Something went wrong",
          });
        } else {
          Swal.fire({
            title: "yippeeeyyy!!!",
            icon: "success",
            text: "Order done!",
          });
          history.push("/products");
        }
      })
      .catch((err) => console.log(`ERROR ERROR ERROR ${err}`));
  };

  const deleteCart = () => {
    fetch(`http://localhost:8000/carts/delete-cart/${productId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.notInCart) {
          Swal.fire({
            title: "Yeeeyyy!!!",
            icon: "success",
            text: `You have successfully removed ${name}`,
          });
          fetchCartList();
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "Oppss!!!",
          icon: "error",
          text: `Something went wrong ${err.message}`,
        });
      });
  };

  return (
    <div className="cart-wrapper">
      <div className="cart-carts-container">
        <div className="d-flex align-items-center cart-item-container">
          <div className="cart-body">
            <p className="cart-description">{`${description.substr(
              0,
              50
            )}...`}</p>
            <p className="brand">
              Name: <a href="www.google.com">{name}</a>
            </p>
          </div>
          <div className="d-flex flex-column justify-content-end cart-price-div">
            <p className="cart-price">₱ {price}</p>

            <div clasName="d-flex flex-row">
              <span className="mr-2">
                <i class="far fa-heart"></i>
              </span>
              <span>
                <i onClick={() => deleteCart()} class="fas fa-trash-alt"></i>
              </span>
            </div>
          </div>
          <div className="cart-item-total-div d-flex flex-column">
            <div className="cart-qty mb-1">
              <button
                disabled={decrementBtn}
                className="specific-decrement"
                onClick={() => decrementQty()}
              >
                <i class="fas fa-minus"></i>
              </button>
              <span className="m-2">{editQuantity}</span>
              <button
                className="specific-increment"
                onClick={() => incrementQty()}
              >
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div className="cart-item-total mt-1">
              <small>Total ₱{totalAmount.toLocaleString()}</small>
            </div>

            <button className="cart-btn" onClick={() => orderProduct()}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
