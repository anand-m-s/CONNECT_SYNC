import express from 'express'
import { protectUser } from "../middleware/userAuthMiddleware";
import userCourseController from '../../../adapters/controllers/user/userCourseController';

export const courseRouter = express.Router()


courseRouter.get('/getCourses',protectUser,userCourseController.getCourses)


