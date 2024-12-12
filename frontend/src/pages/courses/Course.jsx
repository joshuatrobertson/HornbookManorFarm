import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/CartReducer.js";

const Course = () => {
    const { id } = useParams();  // Extract 'id' from the URL
    const [selectedClasses, setSelectedClasses] = useState(1);  // State to track selected number of classes
    const [selectedDate, setSelectedDate] = useState("");  // State to track selected date
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);  // State for showing modal
    const { data, loading, error } = useFetch(`/courses/${id}?populate=*`);
    const dispatch = useDispatch();

    // Handle adding to cart
    const handleAddToCart = () => {
        // Check if required fields are selected only if they exist in the course
        const hasDate = data.available_dates?.length > 0;
        const hasClasses = data.pricing_tiers?.length > 1;

        if ((hasClasses && !selectedClasses) || (hasDate && !selectedDate)) {
            setShowModal(true);  // Show pop-up if any required field is missing
            return;
        }

        const variation = {
            id: data.id, // Base product ID
            selectedClasses: selectedClasses, // Selected number of classes if available
            selectedDate: selectedDate, // Selected date if available
            quantity: quantity || 1, // Default to 1 or whatever quantity is selected
            price: getPrice(),
            name: data.name,
            description: data.description,
            image: data.image.url,
            imageDescription: data.image_description,
        };

        console.log("Dispatching addToCart with variation:", variation);
        dispatch(addToCart(variation));
    };

    // Get the price based on the selected number of classes
    const getPrice = () => {
        if (data?.pricing_tiers?.length === 1) {
            // If there's only one pricing tier, return its price directly
            return data.pricing_tiers[0].price;
        }

        if (data?.pricing_tiers?.length > 1) {
            // If there are multiple pricing tiers, find the selected one based on the number of classes
            const selected = data.pricing_tiers.find(
                (option) => Number(option.number_of_classes) === selectedClasses
            );
            return selected ? selected.price : "N/A";  // Return the selected price or "N/A" if not found
        }

        // If there are no pricing tiers, fallback to course's default price
        return "Error fetching price";
    };

    // Handle selecting the number of classes
    const handleClassChange = (classes) => {
        setSelectedClasses(classes);
    };

    // Handle selecting the date
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    if (!data) return <div>Loading...</div>;  // Show loading while the course is fetched

    return (
        <div className="p-6 max-w-screen-xl mx-auto mb-10 sm:mb-20">
            {/* Modal for missing selection */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-md shadow-lg">
                        <h2 className="text-xl font-semibold mb-4">Please make your selections</h2>
                        <p className="text-gray-600">You need to select both the number of classes and a date before adding the course to your basket.</p>
                        <button
                            className="mt-4 px-6 py-2 bg-primary text-white rounded-md"
                            onClick={() => setShowModal(false)}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}

            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <img
                        className="w-full h-auto object-cover rounded-md"
                        src={`${import.meta.env.VITE_BACKEND_URL}${data?.image?.url}`}
                        alt={data.image_description}
                    />
                </div>
                <div>
                    <h1 className="text-2xl font-bold mb-4">{data.name}</h1>
                    <p className="text-gray-600 max-w-md mb-4">{data.description}</p>

                    {/* Number of Classes Selector */}
                    {data.pricing_tiers?.length > 1 && (
                        <div className="mb-4">
                            <h2 className="font-semibold mb-2">Select Number of Classes:</h2>
                            <div className="flex space-x-4">
                                {data.pricing_tiers.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedClasses(option.number_of_classes)}
                                        className={`p-2 w-10 h-10 rounded-md ${Number(selectedClasses) === Number(option.number_of_classes) ? 'bg-primary text-white' : 'border-gray-300 hover:bg-primary hover:bg-opacity-20'}`}
                                    >
                                        {option.number_of_classes}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Dates Selector */}
                    {data.available_dates?.length > 0 && (
                        <div className="">
                            <h2 className="font-semibold mb-2">Select a Date:</h2>
                            <div className="flex space-x-4">
                                {data.available_dates.map((date, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleDateChange(date.date)}
                                        className={`p-2 mb-6 rounded-md ${selectedDate === String(date.date) ? 'bg-primary text-white' : 'border-gray-300 hover:bg-primary hover:bg-opacity-20'}`}
                                    >
                                        {date.date}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Price */}
                    <div className="mb-4">
                        <p className="text-gray-700 text-2xl">{`£${getPrice()}`}</p>
                    </div>

                    {/* Add to Basket Button */}
                    <button onClick={handleAddToCart} className="px-6 py-3 bg-primary hover:opacity-90 text-white rounded-md">
                        Add to Basket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Course;
