import express from 'express'
import userAuthController from '../../../adapters/controllers/user/userAuthController'
import userPostController from '../../../adapters/controllers/user/userPostController'
import userProfileController from '../../../adapters/controllers/user/userProfileController'
import { protectUser } from '../middleware/userAuthMiddleware'
export const userRouter = express.Router()

userRouter.post('/register', userAuthController.registerUser)
userRouter.post('/verifyOtp', userAuthController.verifyOtp)
userRouter.post('/login', userAuthController.loginUser)
userRouter.post('/googleAUth', userAuthController.googleAuth)
userRouter.post('/resendOtp', userAuthController.resendOtp)
userRouter.post('/forgotPassword', userAuthController.forgotPassword)
userRouter.post('/updatePassword', userAuthController.updatePassword)
userRouter.post('/savePost', protectUser, userPostController.savePost)
userRouter.get('/getUserPost', protectUser, userPostController.getUserPost)
userRouter.put('/editProfile', protectUser, userProfileController.updateProfile)
userRouter.get('/getUserDetails', protectUser, userProfileController.getUserDetails)
userRouter.get('/getAllUsers', userProfileController.getAllUserDetails)
userRouter.post('/followToggle', protectUser, userProfileController.followToggle)
userRouter.get('/userFeedPost', protectUser, userPostController.userFeedPost)
userRouter.delete('/deletePost/:postId', protectUser, userPostController.deletePost)
userRouter.put('/editPost', protectUser, userPostController.editPost)
userRouter.get('/following', protectUser, userProfileController.followingData)
userRouter.get('/fetchAllComments', protectUser, userPostController.allComments)
userRouter.post('/AddComment', protectUser, userPostController.addComment)
userRouter.post('/addReply', protectUser, userPostController.addReply)
userRouter.post('/likePost', protectUser, userPostController.postLike)
userRouter.get('/likeStatus', protectUser, userPostController.isLiked)
userRouter.post('/report', protectUser, userPostController.postReport)
