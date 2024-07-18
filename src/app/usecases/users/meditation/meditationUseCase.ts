import { courseRepo } from "../../../../frameworks/database/mongodb/repositories/user/courseRepo"



export default{

    getCourseUsecase:async()=>{
        try {
            return await courseRepo.getCourseRepo()
        } catch (error) {
            throw new Error((error as Error).message)
        }

    }
}