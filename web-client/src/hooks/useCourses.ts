import { useState } from "react";
import { Course, CourseGroup } from "../models/Course";
import { API_ENDPOINT_URL } from "./config";
import { useAppSelector } from "../store";
import { Teacher } from "../models/Teacher";

interface CourseGroupData {
    name: string,
    teachers: string[]
}

interface CourseData {
    id: string;
    name: string;
    acronym: string;
    has_division: boolean;

    course_groups: CourseGroupData[];
}

export const useCourses = (uuid: string):[
    courses: Course[],
    updateCourses: () => void,
    addCourse: (course: Course) => void,
    removeCourse: (uuid: string) => void
] => {

    const [courses, setCourses] = useState<Course[]>([]);

    const teachers = useAppSelector((state) => state.teachers.list);

    const fetchCourses = () => {
        fetch(API_ENDPOINT_URL+"/api/v1/schedules/"+uuid+"/courses/")
            .then((res) => res.text())
            .then((res) => JSON.parse(res) as CourseData[])
            .then((res) => {
                const newCourses = res.map((element) => {
                    return ({
                        uuid: element.id,
                        name: element.name,
                        isDivision: element.has_division,
                        acronym: element.acronym,

                        groups: element.course_groups.map((element) => {
                            return ({
                                name: element.name,
                                teachers: element.teachers.map((element) => {
                                    for (const teacher of teachers) {
                                        if (teacher.uuid === element) return teacher
                                    }

                                    return new Teacher("NA", "NA")
                                })
                            } as CourseGroup);
                        })
                    } as Course);
                })

                setCourses(newCourses);
            })
    }

    const addCourse = (course: Course) => {

        const options = {
            method: "POST",
            body: JSON.stringify({
                name: course.name,
                acronym: course.acronym,
                has_division: course.isDivision,
                course_groups: course.groups.map((element) => {
                    return ({
                        name: element.name,
                        teachers: element.teachers.map((element) => {
                            return element.uuid as string
                        })
                    })
                })
            }),
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors' as RequestMode
        };

        fetch(API_ENDPOINT_URL + "/api/v1/schedules/" + uuid + "/courses/", options)
            .then(() => {
                fetchCourses();
            })
    }

    const removeCourse = (courseUuid: string) => {

        const options = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            mode: 'cors' as RequestMode
        };

        fetch(API_ENDPOINT_URL + "/api/v1/schedules/" + uuid + "/courses/" + courseUuid + "/", options)
            .then(() => {
                fetchCourses();
            })
    }

    return [courses, fetchCourses, addCourse, removeCourse];
}