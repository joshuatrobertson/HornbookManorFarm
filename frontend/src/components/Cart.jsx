import React, { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {
  clearCart,
  decrementQuantity,
  incrementQuantity,
} from "../redux/CartReducer.js";
import { loadStripe } from "@stripe/stripe-js";
import { makeRequest } from "../hooks/makeRequest.js";

const Cart = () => {
  const products = useSelector((state) => state.cart.products);

  let [cartTotal, setCartTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    // Calculate the total when the component loads
    const total = products.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    setCartTotal(total);
  }, [products]);

  const stripePromise = loadStripe(
    "pk_test_51QUjHnA2zic7NCHEugcxRtWB49RDhqgS1OOB8tBbfszbTFQanXdfUrWp6P9ml886vrI7wYiL5p4OLqlKyhukRnRx00hNQYphd7",
  );

  const handlePayment = async () => {
    try {
      const stripe = await stripePromise;

      const res = await makeRequest.post("/orders", {
        products,
      });

      await stripe.redirectToCheckout({
        sessionId: res.data.stripeSession.id,
      });
    } catch (e) {
      console.log(e);
      return e;
    }
  };

  return (
    <div className="container relative mx-auto my-6">
      {/* Shopping Cart */}
      <div className="shopping-cart border-gray-200 border-2 bg-white w-80 float-right shadow-lg rounded-md p-4">
        <div className="flex justify-between items-center border-b pb-3">
          <div className="flex items-center space-x-2">
            <i className="fa fa-shopping-cart text-xl"></i>
            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">
              {products.length}
            </span>
          </div>
          <div className="text-right">
            <span className="text-gray-500">Total:</span>
            <span className="text-accent font-bold ml-2">£{cartTotal}</span>
          </div>
        </div>

        {/* Make the product list scrollable */}
        <div className="shopping-cart-items mt-4 overflow-y-auto max-h-80">
          <ul className="flex flex-col gap-4">
            {products.map((item, index) => (
              <li key={index} className="flex items-start gap-4 border-b pb-4">
                {/* Image and the label for courses */}
                <div className="relative flex-shrink-0 w-20 h-20">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}${item.image}`}
                    alt={item.imageDescription}
                    className="w-full h-full object-cover rounded"
                  />
                  <span className="absolute bottom-2 left-0 right-0 bg-amber-300 transform rounded-md w-auto mx-1 flex justify-center text-xs">
                    {item.selectedClasses > 1
                      ? `${item.selectedClasses} Courses`
                      : ""}
                  </span>
                </div>

                {/* Text content */}
                <div className="flex flex-col justify-start flex-grow">
                  <span className="block text-gray-700">{item.name}</span>
                  {item.selectedDate && (
                    <span className="block text-gray-700 text-sm">
                      {`${item.selectedDate}`}
                    </span>
                  )}
                  <span className="text-accent">£{item.price}</span>

                  {/* Quantity and Buttons */}
                  <div className="flex gap-3 items-center mt-2">
                    <span className="text-gray-500 text-sm mr-4">
                      Quantity: {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(decrementQuantity(item.id))}
                    >
                      <FaMinus className="w-6 h-6" />
                    </button>
                    <button
                      onClick={() => dispatch(incrementQuantity(item.id))}
                    >
                      <FaPlus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className={`${products.length > 0 ? "block" : "hidden"}`}>
          {/* Checkout button */}
          <button
            onClick={handlePayment}
            className="block bg-accent text-white text-center py-2 mt-6 w-full rounded hover:opacity-80 transition"
          >
            Checkout
          </button>
          {/* Clear Cart button */}
          <button
            onClick={() => {
              dispatch(clearCart());
            }}
            className="block bg-red-200 text-white text-center py-2 mt-3 w-full rounded hover:opacity-80 transition"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
