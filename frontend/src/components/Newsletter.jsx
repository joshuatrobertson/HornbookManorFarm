import React, { useState } from "react";
import useFetch from "../hooks/useFetch.js";

const Newsletter = () => {
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [e, setE] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic email validation
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setE("Please enter a valid email.");
            return;
        }

        // Mock API call or form submission
        console.log("Email submitted:", email);
        setIsSubscribed(true);
        setEmail(""); // Clear the input after submission
        setE(""); // Clear any previous errors
    };

    const { data, loading, error } = useFetch(`/newsletter?populate=*`);

    console.log(`DATA: ${data?.data}`);


    return (
        <div className="flex flex-col items-center justify-center p-4 max-w-sm mx-auto rounded-lg">
            <h2 className="text-xl xl:text-2xl mb-4">Sign Up for Our Newsletter</h2>

            {isSubscribed ? (
                <p className="text-green-500">Thank you for subscribing!</p>
            ) : (
                <form onSubmit={handleSubmit} className="w-full flex flex-col md:flex-row gap-4">
                    <div className="">
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            className="w-full h-10 px-4 py-2 border border-gray-300 rounded-md"
                        />
                    </div>
                    {e && <p className="text-red-500 text-sm">{e}</p>}
                    <button
                        type="submit"
                        className="md:w-40 h-10 py-2 bg-primary w-full text-white rounded-md hover:opacity-85"
                    >
                        Sign Up
                    </button>
                </form>

            )}
            <div className={"pt-4 flex gap-4"}>
                <p>Already subscribed?</p>
                {data?.latest_newsletter ? (
                    <a
                        href={`${import.meta.env.VITE_BACKEND_URL}${data.latest_newsletter.url}`}
                        className="underline text-blue-600 cursor-pointer"
                    >
                        Download here
                    </a>
                ) : (
                    <p>No newsletter available</p>
                )}
            </div>
        </div>
    );
};

export default Newsletter;
