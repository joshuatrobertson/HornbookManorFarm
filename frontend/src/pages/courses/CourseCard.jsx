import React from "react";
import { Link } from "react-router-dom";

const CourseCard = ({item}) => {
    // Helper function to check if the course is "Just Added"
    const isJustAdded = () => {
        const twoWeeksInMs = 14 * 24 * 60 * 60 * 1000; // 2 weeks in milliseconds
        const currentDate = new Date();
        const uploadDate = new Date(item.publishedAt);
        return currentDate - uploadDate <= twoWeeksInMs;
    };

    return (
        <Link to={`/courses/${item.documentId}`} className="relative flex flex-col mx-4 w-80 bg-white rounded-lg overflow-hidden shadow-md h-full">
            {/* Just Added Badge */}
            {isJustAdded() && (
                <div className="absolute top-2 right-2 bg-green-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow-lg">
                    Just Added!
                </div>
            )}


            {/* Course Image */}
            <img
                className="w-full h-48 object-cover"
                src={`${import.meta.env.VITE_BACKEND_URL}${item.image.url}`}
                alt={item.image_description}
            />

            <div className="flex flex-col justify-between mx-4 my-2 h-full">
                {/* Course Name */}
                <p className="mt-2 font-bold text-gray-600">{item.name}</p>

                {/* Course Description */}
                <p className="mt-1 text-gray-400 h-auto mb-4 flex-grow">{item.description}</p>

                {/* Course Price */}
                {item.pricing_tiers.length > 1 ? (
                    <p className="text-center text-xl mb-4 text-md text-gray-900 w-full mt-auto">{`Prices from £${item.pricing_tiers[0].price}`}</p>
                ) : (
                    <p className="text-center text-xl mb-4 text-md text-gray-900 w-full mt-auto">{`£${item.pricing_tiers[0].price}`}</p>
                )}
            </div>
        </Link>
    );
};

export default CourseCard;
