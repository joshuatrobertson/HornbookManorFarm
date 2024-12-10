import FeaturedCourses from "../courses/FeaturedCourses.jsx";
import Hero from "./Hero.jsx";

const HomePage = () => {

    return (
        <div className={"px-6 by-6"}>
            <Hero/>
            <FeaturedCourses type="featured" />
        </div>
    );
};

export default HomePage;
