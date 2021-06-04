import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";
import AOS from "aos";
import "aos/dist/aos.css";
import { Redirect } from "react-router-dom";
export default function Cartscreen() {
  AOS.init();
  const [redirect, setRedirect] = useState(false);
  const cartstate = useSelector((state) => state.cartReducer);
  const cartItems = cartstate.cartItems;
  var subtotal = cartItems.reduce((x, item) => x + item.price, 0);
  const dispatch = useDispatch();

  const orderstate = useSelector((state) => state.placeOrderReducer);
  const { success } = orderstate;

  if (success) {
    localStorage.removeItem("cartItems");
    cartItems.map((item) => {
      dispatch(deleteFromCart(item));
    });
    setTimeout(() => {
      setRedirect(true);
    }, 2000);
  }
  if (redirect) {
    return <Redirect to="/orders" />;
  }
  return (
    <div>
      <div className="row justify-content-center p-2" data-aos="fade-down">
        <div className="col-md-6">
          <h2 style={{ fontSize: "40px" }}>My Cart</h2>

          {cartItems.map((item) => {
            return (
              <div className="flex-container">
                <div className="text-left m-1 w-100">
                  <h1>
                    {item.name} [{item.varient}]
                  </h1>
                  <h1>
                    Price : {item.quantity} * {item.prices[0][item.varient]} ={" "}
                    {item.price}
                  </h1>
                  <h1 style={{ display: "inline" }}>Quantity : </h1>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity + 1, item.varient)
                      );
                    }}
                  ></i>
                  <b>{item.quantity}</b>
                  <i
                    className="fa fa-minus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(item, item.quantity - 1, item.varient)
                      );
                    }}
                  ></i>
                  <hr />
                </div>

                <div className="m-1 w-100">
                  <img
                    src={item.image}
                    style={{ height: "80px", height: "80px" }}
                  />
                </div>
                <div className="m-1 w-100">
                  <i
                    className="fa fa-trash mt-5"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(deleteFromCart(item));
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-md-4 text-right">
          <h2 style={{ fontSize: "45px" }}>SubTotal : {subtotal} /-</h2>
          <Checkout subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
