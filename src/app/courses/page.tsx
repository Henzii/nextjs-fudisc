"use server";

import { getCourses } from "@/services/courses";

const Gallery = async () => {
    const courses = await getCourses(10, 0);
    return (
        <section className="p-2 md:p-6 lg:p-8 max-w-5xl m-auto">
            <h2>Courses</h2>
            {courses.map(course => {
                return (<div key={course.id}>{course.name} {course.distance.string}</div>)
            })}
        </section>
    )
}

export default Gallery