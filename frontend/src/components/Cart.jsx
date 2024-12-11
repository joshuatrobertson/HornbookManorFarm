import React, {useEffect, useState} from "react";
import basketItems from "../../../public/basket.json";
import { FaMinus, FaPlus } from "react-icons/fa6";

const Cart = () => {

    let [cartTotal, setCartTotal] = useState(0);

    const numberOfItems = basketItems.reduce((acc, item) => acc + item.quantity, 0);

    useEffect(() => {
        // Calculate the total when the component loads
        const total = basketItems.reduce(
            (acc, item) => acc + item.price * item.quantity,
            0
        );
        setCartTotal(total);
    }, []);


    return (
        <div className="container relative mx-auto my-6 ">
            {/* Shopping Cart */}
                           <div className="shopping-cart border-gray-200 border-2 bg-white w-80 float-right shadow-lg rounded-md p-4">
                    <div className="shopping-cart-header flex justify-between items-center border-b pb-3">
                        <div className="flex items-center space-x-2">
                            <i className="fa fa-shopping-cart text-xl"></i>
                            <span className="bg-blue-500 text-white text-xs rounded-full px-2 py-1">{numberOfItems}</span>
                        </div>
                        <div className="shopping-cart-total text-right">
                            <span className="text-gray-500">Total:</span>
                            <span className="text-accent font-bold ml-2">£{cartTotal}</span>
                        </div>
                    </div>

                    <ul className="shopping-cart-items mt-4 space-y-4">
                        {basketItems.map((item, index) => (
                            <li key={index} className="flex items-center space-x-4">
                                <img
                                    src={item.image}
                                    alt={item.imageDesc}
                                    className="w-12 h-12 object-cover rounded"
                                />
                                <div>
                                    <span className="block text-gray-700">{item.name}</span>
                                    <span className="text-accent">£{item.price}</span>
                                    <div className={"flex gap-3 items-center"}>
                                        <span className="block text-gray-500 text-sm mr-4">Quantity: {item.quantity}</span>
                                        <button><FaMinus/></button>
                                        <button><FaPlus/></button>
                                    </div>

                                </div>
                            </li>

                        ))}

                    </ul>

                    <a
                        href="#"
                        className="block bg-accent text-white text-center py-2 mt-6 rounded hover:opacity-80 transition"
                    >
                        Checkout
                    </a>
                </div>
        </div>
    );
};

export default Cart;
