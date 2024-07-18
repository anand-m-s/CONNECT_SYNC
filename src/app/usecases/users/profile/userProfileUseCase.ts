import { UserDocument } from "../../../../frameworks/database/mongodb/models/user"
import { getUser } from "../../../../frameworks/database/mongodb/repositories/user/getUser"
import { connection } from '../../../../frameworks/database/mongodb/repositories/user/connection'
import { ObjectId } from "mongoose"
export default {
    getUserDetails: async (data: { id: string, current: string }) => {
        try {

            return await getUser.getUserDetails(data.id, data.current)

        } catch (error) {

            throw new Error((error as Error).message)
        }
    },

    updateProfileUseCase: async (data: UserDocument, userId: string) => {
        try {
            const user = await getUser.updateProfile(data, userId)
            if (user) {
                const updatedUser = {
                    userName: user.userName,
                    phone: user.phone,
                    bio: user.bio,
                    profilePic: user.profilePic
                }
                return { message: 'user profile updated', updatedUser }
            } else {
                throw new Error('User not found');
            }

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getAllUserDetails: async (searchTerm: string) => {
        try {
            const users = await getUser.getAllUsers(searchTerm)
       
            return users

        } catch (error) {

            throw new Error((error as Error).message)
        }
    },
    toggleFollow: async (userId: ObjectId, userIdToToggle: ObjectId) => {
        try {
            return await connection.toggleFollow(userId, userIdToToggle)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    followingUseCase: async (userId: string) => {
        try {
            const data = await connection.followingRepo(userId)
            return data

        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getNotificationUseCase: async (userId: string) => {
        try {
            const data = await connection.getNotificationRepo(userId)
            const newNotifications = data.filter(noti => !noti.isRead).length
            return { data, newNotifications }
        } catch (error) {

            throw new Error((error as Error).message)
        }
    },
    notificationReadedUsecase: async (userId: string) => {
        try {
            await connection.markNotificationAsRead(userId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    blockUserUsecase: async (currentUserId:string,userToBlock:string) => {
        try {
            await connection.blockUserRepo(currentUserId,userToBlock)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    isBlockUserUsecase: async (currentUserId:string,userId:string) => {
        try {
            return await connection.isBlockUserRepo(currentUserId,userId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    blockedUsers: async (currentUserId:string) => {
        try {
            return await connection.getBlockedUsersRepo(currentUserId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    unBlockedUsers: async (currentUserId:string,unblockUserId:string) => {
        try {
             await connection.unBlockUserRepo(currentUserId,unblockUserId)
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

}