import meditation from "../../models/meditation";



export const courseRepo ={
    getCourseRepo:async()=>{
        try {
            return await meditation.find({})                 
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }
}