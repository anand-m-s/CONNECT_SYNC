import { Request, Response } from "express";
import meditationUseCase from "../../../app/usecases/users/meditation/meditationUseCase";


export default {
    getCourses: async (req: Request, res: Response) => {
        try {
            const course = await meditationUseCase.getCourseUsecase()
            res.status(200).json({course})
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    }
}