import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch.js";

const Course = () => {
    const { id } = useParams();  // Extract 'id' from the URL
    const [selectedClasses, setSelectedClasses] = useState(1);  // State to track selected number of classes
    const [selectedDate, setSelectedDate] = useState("");  // State to track selected date

    const { data, loading, error } = useFetch(`/courses/${id}?populate=*`);

    console.log(data?.image?.url);


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
        <div className="p-6 max-w-screen-xl mx-auto mb-40">
            {/* Course Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                    <img
                        src={data?.image ? `${import.meta.env.VITE_BACKEND_URL}${data.image.url}` : "/placeholder-image.png"}
                        alt={data?.image_description || "No description available"}
                        className="w-full h-auto object-cover rounded-md"
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
                    <button className="px-6 py-3 bg-primary hover:opacity-90 text-white rounded-md">
                        Add to Basket
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Course;
