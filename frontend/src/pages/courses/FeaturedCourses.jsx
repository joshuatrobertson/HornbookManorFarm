import React from "react";
import CourseCard from "./CourseCard.jsx";
import useFetch from "../../hooks/useFetch.js";
import { NavLink } from "react-router-dom";

const FeaturedCourses = ({ type }) => {
  // Filter by type = "featured"
  const { data, loading, error } = useFetch(
    `/courses?populate=*&[filters][featured][$eq]=true`,
  );

  if (error) {
    return <div>Error loading courses.</div>;
  }

  return (
    <section className="py-10 sm:py-20">
      <h2 className="text-3xl font-bold text-center mb-4">Featured Courses</h2>
      <div className="overflow-x-auto p-4">
        <div className="flex gap-6 lg:justify-center lg:flex-nowrap">
          {loading ? (
            <div>Loading...</div>
          ) : (
            data.map((course) => (
              <div key={course.id}>
                <CourseCard item={course} />
              </div>
            ))
          )}
        </div>
        <div className={"mt-10 flex justify-center"}>
          Please see the full list of courses&nbsp;
          <NavLink to={"/courses"} className={"text-blue-600 hover:underline"}>
            here
          </NavLink>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
