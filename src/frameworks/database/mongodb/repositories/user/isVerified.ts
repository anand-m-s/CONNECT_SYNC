import User from "../../models/user";
import Connection from "../../models/connections";
import Otp from "../../models/verify";

export const verifyUser = async (email: string, otp: string) => {
    try {
        console.log(otp)
        console.log(email)
        const user = await User.findOne({ email });
        const verifyOtp = await Otp.findOne({ userId: user?._id });
        if (!verifyOtp) {
            throw new Error('OTP not found');
        }
        const otpAge = Date.now() - new Date(verifyOtp.createdAt).getTime();
        const otpExpirationTime = 1 * 60 * 1000;
        if (otpAge > otpExpirationTime) {
            throw new Error('OTP expired');
        }
        console.log(verifyOtp.otp)
        if (verifyOtp.otp !== otp) {
            throw new Error('Invalid OTP');
        }
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { isVerified: true },
            { new: true }
        );
        if (!updatedUser) {
            throw new Error('User not found');
        }
        const userResponse = {
            id: updatedUser.id,
            email: updatedUser.email,
            userName: updatedUser.userName
        };
        await Connection.create({ userId: updatedUser.id });
        return userResponse;
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const forgotPassword = async (email: string, otp: string) => {
    try {
        const user = await User.findOne({ email: email })
        if (!user) {
            return { message: 'User does not exist' };
        }
        if (user.isGoogle) {
            return { message: 'User logged in via Google' };
        }
        await Otp.findOneAndDelete({ userId: user?._id });
        await Otp.create({
            userId: user?._id,
            otp: otp
        })
        return {
            email: user.email,
            userName: user.userName,
            message: 'Verify OTP now',
        };
    } catch (error) {
        throw new Error((error as Error).message)
    }
}

export const resendOtp = async (email: string, otp: string) => {
    try {
        const user = await User.findOne({ email: email })
        await Otp.findOneAndDelete({ userId: user?._id });

        // Create a new OTP
        await Otp.create({
            userId: user?._id,
            otp: otp
        });
    } catch (error) {
        throw new Error((error as Error).message)
    }
}



