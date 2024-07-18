import { Response, Request, NextFunction } from "express";
import userProfileUseCase from "../../../app/usecases/users/profile/userProfileUseCase";


export default {
    getUserDetails: async (req: Request, res: Response) => {
        try {

            const userId = req.query.id as string
            const currentUser = req.user.userId
            const userDetails = await userProfileUseCase.getUserDetails({ id: userId, current: currentUser });
            res.json(userDetails)

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },

    updateProfile: async (req: Request, res: Response) => {
        try {
            const data = req.body
            const userId = req.user.userId as string
            const updatedUser = await userProfileUseCase.updateProfileUseCase(data, userId);
            res.json(updatedUser);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }

    },
    getAllUserDetails: async (req: Request, res: Response) => {
        try {
            const searchTerm = req.query.searchTerm as string;


            res.json(await userProfileUseCase.getAllUserDetails(searchTerm))
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    followToggle: async (req: Request, res: Response) => {
        try {
            const userId = req.user.userId
            const { userIdToToggle } = req.body
            console.log(userId, 'userId')
            console.log(userIdToToggle, 'userIdto toggle')
            if (userId && userIdToToggle) {
                const message = await userProfileUseCase.toggleFollow(userId, userIdToToggle)
                console.log(message)
                res.status(200).json({ message: message })
            } else {
                res.status(400).json({ error: 'User ID not found' });
            }
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    followingData: async (req: Request, res: Response) => {
        try {
            const userId = req.query.userId as string

            const data = await userProfileUseCase.followingUseCase(userId)

            res.status(200).json({ data })

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })
        }
    },
    getNotification: async (req: Request, res: Response) => {
        try {
            const userId = req.user.userId as string
            const { data, newNotifications } = await userProfileUseCase.getNotificationUseCase(userId)

            res.json({ data, newNotifications })

        } catch (error) {

            res.status(500).json({ error: (error as Error).message })

        }
    },
    notificationMarked: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.user.userId
            await userProfileUseCase.notificationReadedUsecase(userId)

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })

        }
    },
    blockUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUserId = req.user.userId
            const userToBlock = req.query.id as string
            console.log(currentUserId)
            console.log(userToBlock)
            await userProfileUseCase.blockUserUsecase(currentUserId, userToBlock)
            res.status(200).json({ message: "User blocked successfully" });

        } catch (error) {
            res.status(500).json({ error: (error as Error).message })

        }
    },
    isBlock: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUserId = req.user.userId
            const userId = req.query.id as string
            const isBlocked = await userProfileUseCase.isBlockUserUsecase(currentUserId, userId)
            res.status(200).json({ isBlocked })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })

        }
    },
    getAllBLockedUsers: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUserId = req.user.userId
            const blockedUsers = await userProfileUseCase.blockedUsers(currentUserId)
            res.status(200).json({ blockedUsers })
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })

        }
    },
    unblockUser: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const currentUserId = req.user.userId
            const unblockUserId = req.query.id as string;
            await userProfileUseCase.unBlockedUsers(currentUserId, unblockUserId)
            res.status(200).json({ message: "User successfully unblocked."});
        } catch (error) {
            res.status(500).json({ error: (error as Error).message })

        }
    },

}