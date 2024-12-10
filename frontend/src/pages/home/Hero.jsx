import React from 'react';

const Hero = () => {
    return (
        <div className="relative flex justify-center items-center">
            <img
                src="/hero.webp"
                aria-label="Hero section showing my garden"
                className="w-[1200px] aspect-[16/9] sm:aspect-[16/5] object-cover"
                alt="Hero Image"
            />
            <h2 className="absolute text-white text-3xl font-bold">
                Hornbrook Manor Farm
            </h2>
        </div>
    );
};

export default Hero;
