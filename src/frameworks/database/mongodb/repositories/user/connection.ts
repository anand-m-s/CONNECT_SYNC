import mongoose, { ObjectId } from "mongoose"
import Connection, { connectionInterface } from "../../models/connections"
import Notification from "../../models/notifications";
import { blockedUsersInterface, NotificationInterface } from "../../../../../types/user/userRegisterInterface";
import BlockedList, { BlockedUsersDocument } from "../../models/blockedUsers";
import Chat from "../../models/chat";



export const connection = {
    toggleFollow: async (userId: ObjectId, userIdToToggle: ObjectId) => {
        try {
            const connection: connectionInterface | null = await Connection.findOne({ userId })
            if (!connection) {
                throw new Error(`Connection not found for userId`);
            }
            const isFollowing: Boolean | null = connection.following.includes(userIdToToggle)
            if (isFollowing) {
                await Promise.all([
                    Connection.findOneAndUpdate({ userId },
                        { $pull: { following: userIdToToggle } },
                        { new: true }
                    ),
                    Connection.findOneAndUpdate({ userId: userIdToToggle },
                        { $pull: { followers: userId } },
                        { new: true }
                    ),
                    Notification.findOneAndDelete({
                        user: userIdToToggle,
                        type: 'follow',
                        follower: userId
                    }),
                ])
                return 'unfollowed'
            } else {
                await Promise.all([
                    Connection.findOneAndUpdate({ userId: userId },
                        { $addToSet: { following: userIdToToggle } },
                        { upsert: true, new: true }
                    ),
                    Connection.findOneAndUpdate({ userId: userIdToToggle }, {
                        $addToSet: { followers: userId }
                    }, { upsert: true, new: true }
                    ),
                    Notification.create({
                        user: userIdToToggle,
                        type: 'follow',
                        follower: userId,
                        content: 'started following you.'
                    })
                ])
                return 'following'
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    followingRepo: async (userId: string) => {
        try {
            let data: any = await Connection.findOne({ userId })
                .populate('followers', 'userName profilePic _id')
                .populate('following', 'userName profilePic _id')
            return data
        } catch (error) {
            throw new Error((error as Error).message)

        }
    },
    getNotificationRepo: async (userId: string) => {
        try {
            const data: NotificationInterface[] = await Notification.find({ user: userId })
                .populate({
                    path: 'follower',
                    select: 'userName profilePic',
                })
                .select('user type post comment follower content isRead createdAt updatedAt')
                .sort({ createdAt: -1 }).lean()
            await Notification.updateMany({ user: userId, isRead: false }, { $set: { isRead: true } })
            return data
        } catch (error) {
            throw new Error((error as Error).message)

        }
    },
    markNotificationAsRead: async (userId: string) => {
        try {
            await Notification.updateMany(
                { user: userId },
                { $set: { isRead: true } }
            );

        } catch (error) {
            throw new Error((error as Error).message)

        }
    },
    blockUserRepo: async (currentUserId: string, userToBlock: string) => {
        try {
            let block: any = await BlockedList.findOne({ userId: currentUserId })
            await Chat.updateOne({ users: { $all: [currentUserId, userToBlock] } },
                { $set: { isBlocked: true } }
            );

            if (!block) {
                block = new BlockedList({
                    userId: currentUserId,
                    blockedList: [userToBlock]
                })
            } else {
                if (!block.blockedList.includes(userToBlock)) {
                    block.blockedList.push(userToBlock)
                }
            }
            await Connection.updateOne({
                userId: currentUserId
            }, { $pull: { following: userToBlock, followers: userToBlock } }
            )
            await Connection.updateOne({
                userId: userToBlock
            }, { $pull: { following: currentUserId, followers: currentUserId } }
            )
            await block.save();
        } catch (error) {
            throw new Error((error as Error).message)

        }
    },
    isBlockUserRepo: async (currentUserId: string, userId: string) => {
        try {
            const currentUserBlockList: any = await BlockedList.findOne({ userId: currentUserId });
            const userBlockList: any = await BlockedList.findOne({ userId: userId });

            let message = '';

            if (currentUserBlockList && currentUserBlockList.blockedList.includes(userId)) {
                message = 'You have blocked this user, Unblock to see the profile.';
                return { isBlocked: true, message };
            }

            if (userBlockList && userBlockList.blockedList.includes(currentUserId)) {
                message = 'You have been blocked by this user.';
                return { isBlocked: true, message };
            }

            return { isBlocked: false, message: '' };
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    getBlockedUsersRepo: async (currentUserId: string) => {
        try {
            const block = await BlockedList.findOne({ userId: currentUserId }).populate({
                path: 'blockedList',
                select: 'userName profilePic'
            });
            if (block) {
                return block.blockedList;
            }
            return [];
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    unBlockUserRepo: async (currentUserId: string, unblockUserId: string) => {
        try {
            await BlockedList.updateOne(
                { userId: currentUserId },
                { $pull: { blockedList: unblockUserId } }
            )
            const result = await BlockedList.findOne({
                userId: unblockUserId,
                blockedList: { $elemMatch: { $eq: currentUserId } }
            })
            if (!result) {
                await Chat.updateOne({ users: { $all: [currentUserId, unblockUserId] } },
                    { $set: { isBlocked: false } }
                );
            }
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },

}



