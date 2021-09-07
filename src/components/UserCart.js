import React, { useEffect, useState } from "react";
import Cart from "./Cart";
import { Row, Col } from "react-bootstrap";

export default function UserCart({
  cartData,
  fetchCartList,
  fetchCartListTotal,
}) {
  const [carts, setCarts] = useState([]);

  useEffect(() => {
    const cartArr = cartData.map((cart) => {
      if (cart !== null) {
        return (
          <>
            <Cart
              cartProps={cart}
              fetchCartList={fetchCartList}
              fetchCartListTotal={fetchCartListTotal}
            />
          </>
        );
      } else return null;
    });

    setCarts(cartArr);
  }, [cartData]);
  return <div className="d-flex flex-column">{carts}</div>;
}
