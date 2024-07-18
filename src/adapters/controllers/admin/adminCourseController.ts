import { NextFunction, Request, Response } from "express";
import { createPresignedPost } from "../../../utils/s3";
import {CourseData } from "../../../types/admin/adminCourse";
import { adminMeditationUsecases } from "../../../app/usecases/admin/adminCourseUsecases";


export const adminCourseController = {

    signedUrl: async (req: Request, res: Response) => {
        try {
            let { key, type } = req.body
            console.log(key, type)
            key = "public/course" + key;
            const data = await createPresignedPost({ key, contentType: type });
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    createCourse: async (req: Request, res: Response, next: NextFunction) => {
        try {

            const data: CourseData = req.body
            await adminMeditationUsecases.addCourse(data)
            res.status(200).json({ message: 'course added' })
        } catch (error) {
            next(error)
        }
    },
    getCourses: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const courses = await adminMeditationUsecases.getCoursesUsecase()
            console.log(courses!)
            res.status(200).json({ courses })
        } catch (error) {
            next(error)
        }
    },

}