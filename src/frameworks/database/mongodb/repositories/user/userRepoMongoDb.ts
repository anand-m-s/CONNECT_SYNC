import { userRegisterInterface, verifiedTagInterface } from "../../../../../types/user/userRegisterInterface";
import User, { UserDocument } from "../../models/user";
import { checkExistingUser } from "../../utils/userChecker";
import bcrypt from 'bcrypt'
import Connection from "../../models/connections";
import Transaction from "../../models/transaction";
import { BadRequestException, InternalServerErrorException } from "../../../../../errors/HttpExeption";
import Otp from "../../models/verify";


export const saveUser = async (data: userRegisterInterface, otp: string) => {
    try {

        const existingUser = await checkExistingUser(data.email, data.userName)
        if (existingUser?.isVerified) {
            throw new BadRequestException('User already exists');
        }
        if (existingUser && !existingUser.isVerified) {
            await Otp.create({ userId: existingUser.id, otp });
            return existingUser;
        }
        const user = new User({ ...data });
        await user.save()
        await Otp.create({ userId: user._id, otp });
        return user;
    } catch (error) {
        throw new InternalServerErrorException((error as Error).message);
    }
}
export const saveUserGoogle = async (data: userRegisterInterface) => {
    try {
        const existingUser = await checkExistingUser(data.email, data.userName)
        if (existingUser?.isBlocked) {
            throw new Error('user Blocked')
        }
        if (existingUser) {
            if (existingUser.isGoogle) {
                let user = {
                    id: existingUser.id,
                    email: existingUser.email,
                    userName: existingUser.userName,
                    profilePic: existingUser.profilePic,
                    verified: existingUser?.verifiedTag,
                    verifiedExp: existingUser?.verifiedTagPurchasedAt
                }
                return user
            } else {
                throw new Error("user already exists with this email.");
            }
        }
        const randomPassword = Math.random().toString(36).slice(-8)
        const hashedPassword = await bcrypt.hash(randomPassword, 10)
        const newUser = await User.create({
            userName: data.userName,
            email: data.email,
            password: hashedPassword,
            isGoogle: true,
            profilePic: data.profilePic,
        })
        await Connection.create({
            userId: newUser._id
        })

        return {
            id: newUser._id,
            email: newUser.email,
            userName: newUser.userName,
            profilePic: newUser.profilePic,
            verified: newUser?.verifiedTag,
            verifiedExp: newUser?.verifiedTagPurchasedAt
        };
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const updatePassword = async (password: string, email: string) => {
    try {
        console.log(password, email)
        const user: any = await User.findOne({ email })
        user.password = password
        await user.save()
        return { message: 'Password updated successfully' };
    } catch (error) {
        throw new Error((error as Error).message);
    }
}

export const verifyTagRepo = async (data: verifiedTagInterface, userId: string) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new BadRequestException("User not found");
        }
        const currentDate = new Date();
        const oneYearAgo = new Date(currentDate.setFullYear(currentDate.getFullYear() - 1));

        if (user.verifiedTagPurchasedAt && user.verifiedTagPurchasedAt > oneYearAgo) {
            throw new BadRequestException("User has already purchased the verified tag ,the deducted amount will be refunded :)");
        }

        const transaction = new Transaction({
            userId: userId,
            amount: data.amount,
            paymentId: data.paymentId,
            paymentMethod: data.payment,
            status: "completed",
        });

        await transaction.save();
        await User.findByIdAndUpdate(userId, {
            $set: {
                verifiedTag: true,
                verifiedTagPurchasedAt: new Date(),
            },
        });
    } catch (error) {
        if (error instanceof BadRequestException) {
            throw error;
        } else {
            throw new InternalServerErrorException((error as Error).message);
        }
    }
};


































// export const verifyTagRepo = async (data: verifiedTagInterface, userId: string) => {
//     try {

//        const transaction = new Transaction({
//             userId: userId,
//             amount: data.amount,
//             paymentId: data.paymentId,
//             paymentMethod: data.payment,
//             status: "completed",
//         });
//         await transaction.save();
//         await User.findByIdAndUpdate(userId, {
//             $set: {
//                 verifiedTag: true,
//                 verifiedTagPurchasedAt: new Date(),
//             },
//         });
//     } catch (error) {
//         throw new Error((error as Error).message);
//     }
// };
