import { adminCourseRepo } from "../../../frameworks/database/mongodb/repositories/admin/adminCourseRepo";
import { adminRepo } from "../../../frameworks/database/mongodb/repositories/admin/adminRepoMongodb";
import { CourseData } from "../../../types/admin/adminCourse";


export const adminMeditationUsecases = {

    addCourse: async (data: CourseData) => {
        try {
            await adminCourseRepo.addCourseRepo(data)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    getCoursesUsecase: async (skip:number,limit:number) => {
        try {
            return await adminCourseRepo.getCourseRepo(skip,limit)
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    deleteCourseUsecase:async(courseId:string)=>{
        try {
            await adminCourseRepo.deleteCourseRepo(courseId)
        } catch (error) {
            
            throw new Error((error as Error).message);
        }
    }



}