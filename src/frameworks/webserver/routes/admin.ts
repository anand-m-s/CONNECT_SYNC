import express from 'express'
import adminAuthController from '../../../adapters/controllers/admin/adminAuthController'
import { adminUserManagment } from '../../../adapters/controllers/admin/adminUserManagment'
import { protectAdmin } from '../middleware/adminAuth'
import { adminPostManagment } from '../../../adapters/controllers/admin/adminPostControll'
import { adminCourseController } from '../../../adapters/controllers/admin/adminCourseController'
export const adminRouter = express.Router()


adminRouter.post('/register', adminAuthController.registerAdmin)
adminRouter.post('/login', adminAuthController.loginAdmin)
adminRouter.post('/refresh-token', adminAuthController.refreshToken)
adminRouter.get('/fetchUserData', protectAdmin, adminUserManagment.fetchUserData)
adminRouter.post('/block', protectAdmin, adminUserManagment.userBlock)
adminRouter.get('/getReport', protectAdmin, adminPostManagment.report)
adminRouter.post('/blockReportedPost', protectAdmin, adminPostManagment.blockPost)
adminRouter.get('/getPostData', protectAdmin, adminPostManagment.getPostData)
adminRouter.get('/getReportData', protectAdmin, adminPostManagment.getReportData)
adminRouter.post('/getSignedUrl', protectAdmin, adminCourseController.signedUrl)
adminRouter.post('/createCourse', protectAdmin, adminCourseController.createCourse)
adminRouter.get('/getCourses', protectAdmin, adminCourseController.getCourses)
adminRouter.delete('/deleteCourse', protectAdmin, adminCourseController.deleteCourse)




