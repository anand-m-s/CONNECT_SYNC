import { CourseData } from "../../../../../types/admin/adminCourse";
import meditation from "../../models/meditation";


export const adminCourseRepo = {

    addCourseRepo: async (data: CourseData) => {
        try {
         
            meditation.create({
                ...data
            })
            return

        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    getCourseRepo: async () => {
        try {
            return await meditation.find({})                 
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}