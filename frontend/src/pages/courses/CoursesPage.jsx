import React, { useState } from "react";
import { useDispatch } from "react-redux";
import useFetch from "../../hooks/useFetch.js";
import {
  addToCart,
  decrementQuantity,
  incrementQuantity,
} from "../../redux/CartReducer.js";
import { FaMinus, FaPlus } from "react-icons/fa6";

const CoursesPage = () => {
  const { data, loading, error } = useFetch("/courses?populate=*");
  const dispatch = useDispatch();
  let [quantity, setQuantity] = useState({});

  const [selectedOptions, setSelectedOptions] = useState({});

  const handleAddToCart = (course) => {
    const { selectedClasses, selectedDate } = selectedOptions[course.id] || {};
    const hasClasses = course.pricing_tiers?.length > 1;
    const hasDates = course.available_dates?.length > 0;

    if ((hasClasses && !selectedClasses) || (hasDates && !selectedDate)) {
      alert("Please select both the number of classes and a date.");
      return;
    }

    const variation = {
      id: course.id,
      name: course.name,
      quantity: quantity[course.id] || 1,
      description: course.description,
      price: getPrice(course, selectedClasses),
      image: course.image.url,
      imageDescription: course.image_description,
      selectedClasses: selectedClasses,
      selectedDate: selectedDate,
    };
    dispatch(addToCart(variation));
  };

  const getPrice = (course, selectedClasses) => {
    if (course.pricing_tiers?.length === 1) {
      return course.pricing_tiers[0].price;
    }
    if (course.pricing_tiers?.length > 1) {
      const selectedTier = course.pricing_tiers.find(
        (tier) => Number(tier.number_of_classes) === Number(selectedClasses),
      );
      return selectedTier ? selectedTier.price : "N/A";
    }
    return "Price not available";
  };

  const handleOptionChange = (courseId, key, value) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [courseId]: { ...prev[courseId], [key]: value },
    }));
  };

  const handleIncrement = (courseId) => {
    setQuantity((prev) => ({
      ...prev,
      [courseId]: (prev[courseId] || 1) + 1,
    }));
  };

  const handleDecrement = (courseId) => {
    setQuantity((prev) => ({
      ...prev,
      [courseId]: Math.max((prev[courseId] || 1) - 1, 1), // Prevent quantity from going below 1
    }));
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading courses</div>;

  return (
    <div>
      {/* Header Section */}
      <header className="w-full bg-gradient-to-r from-white via-accent/30 to-white text-gray-800 p-12 mb-12 text-center">
        <h1 className="text-4xl font-bold mb-2">All Courses</h1>
        <p className="text-md font-thin">
          Check out the full list of courses below
        </p>
      </header>

      {/* Main Content */}
      <div className="p-6 md:px-20 max-w-screen-xl mx-auto">
        <div className="grid grid-cols-1 gap-8">
          {data?.map((course) => (
            <div key={course.id}>
              <div className="border-t mb-6 border-gray-300"></div>
              <div className="bg-white py-4 rounded-lg lg:flex lg:items-start lg:gap-8">
                <div className="w-full lg:w-1/2">
                  <img
                    className="w-full h-auto object-cover rounded-lg"
                    src={`${import.meta.env.VITE_BACKEND_URL}${course.image.url}`}
                    alt={course.image_description || course.name}
                  />
                </div>
                <div className="w-full lg:w-1/2 mt-4 lg:mt-0">
                  <h2 className="text-xl font-semibold mb-2">{course.name}</h2>
                  <p className="text-gray-600 mb-4">{course.description}</p>

                  {course.pricing_tiers?.length > 1 && (
                    <div className="mb-4">
                      <h2 className="font-semibold mb-2">
                        Select Number of Classes:
                      </h2>
                      <select
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                        onChange={(e) =>
                          handleOptionChange(
                            course.id,
                            "selectedClasses",
                            e.target.value,
                          )
                        }
                        value={
                          selectedOptions[course.id]?.selectedClasses || ""
                        }
                      >
                        <option value="" disabled className="text-gray-400">
                          Select Classes
                        </option>
                        {course.pricing_tiers.map((tier, index) => (
                          <option key={index} value={tier.number_of_classes}>
                            {tier.number_of_classes}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {course.available_dates?.length > 0 && (
                    <div className="mb-4">
                      <h2 className="font-semibold mb-2">Select a Date:</h2>
                      <select
                        className="w-full p-3 bg-gray-50 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-accent focus:border-accent transition"
                        onChange={(e) =>
                          handleOptionChange(
                            course.id,
                            "selectedDate",
                            e.target.value,
                          )
                        }
                        value={selectedOptions[course.id]?.selectedDate || ""}
                      >
                        <option value="" disabled className="text-gray-400">
                          Select Date
                        </option>
                        {course.available_dates.map((date, index) => (
                          <option key={index} value={date.date}>
                            {date.date}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <div className="mb-4">
                    <p className="text-gray-700 text-lg font-bold">
                      £
                      {getPrice(
                        course,
                        selectedOptions[course.id]?.selectedClasses,
                      )}
                    </p>
                  </div>

                  <div className={"flex items-center gap-2"}>
                    <button
                      onClick={() => handleAddToCart(course)}
                      className="px-6 py-3 bg-primary text-white rounded-md hover:bg-opacity-90 transition-all"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => {
                        handleDecrement(course.id);
                      }}
                    >
                      <FaMinus className="w-6 h-6" />
                    </button>
                    {quantity[course.id] || 1}
                    <button
                      onClick={() => {
                        handleIncrement(course.id);
                      }}
                    >
                      <FaPlus className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
