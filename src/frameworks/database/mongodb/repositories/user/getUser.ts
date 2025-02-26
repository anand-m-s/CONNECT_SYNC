import User, { UserDocument } from "../../models/user";
import { checkUserName } from "../../utils/userChecker";
import Connection, { connectionDocument } from "../../models/connections";

export const getUser = {
    getUserByEmail: async (email: string) => {
        try {
            return await User.findOne({ email })
        } catch (error) {
            throw new Error((error as Error).message)
        }
    },
    getUserDetails: async (id: string, current: string) => {
        try {            
            const [user, isFollow, connectionData] = await Promise.all([
                User.findById(id),
                Connection.findOne({ userId: current }),
                Connection.findOne({ userId: id })
            ])
            if (user) {
                const isFollowing: Boolean | null = isFollow && isFollow.following.includes(user._id)
                let data = {
                    id: user.id,
                    userName: user.userName,
                    bio: user.bio,
                    phone: user.phone,
                    profilePic: user.profilePic,
                    isFollowing: isFollowing,
                    following: connectionData?.followers.length,
                    followers: connectionData?.following.length,
                    verified: user.verifiedTag,
                    verifyTagExp: user.verifiedTagPurchasedAt
                }
                return data
            } else {
                throw new Error('user not found')
            }
        } catch (error) {
            throw new Error((error as Error).message);
        }
    },
    updateProfile: async (data: UserDocument, userId: string) => {
        try {
            const existingUser = await checkUserName(data.userName, userId)
            if (existingUser) {
                existingUser.bio = data.bio || '',
                    existingUser.userName = data.userName,
                    existingUser.phone = data.phone || '',
                    existingUser.profilePic = data.profilePic ? data.profilePic : existingUser.profilePic
                await existingUser?.save()
                return existingUser
            } else {
                throw new Error('Another user have the same username try another one :)')
            }
        } catch (error) {
            throw new Error((error as Error).message);

        }
    },
    getAllUsers: async (searchTerm: string) => {
        try {
            const query = searchTerm
                ? { userName: { $regex: searchTerm, $options: 'i' } }
                : {};
            const allUsers = await User.find(query).lean();
        
            return allUsers
        } catch (error) {
            throw new Error((error as Error).message);
        }
    }

}



