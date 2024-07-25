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
    getCourseRepo: async (skip: number, limit: number) => {
        try {
            const [totalCourses, courses] = await Promise.all([
                meditation.countDocuments(),  // Get total number of documents
                meditation.find({}).skip(skip).limit(limit)  // Get paginated courses
            ]);

            return { totalCourses, courses }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    deleteCourseRepo: async (courseId: string) => {
        try {
            await meditation.findByIdAndDelete({ _id: courseId })
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}