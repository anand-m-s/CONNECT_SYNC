import mongoose, { Schema, Document } from 'mongoose';

export interface OtpDocument extends Document {
    userId:Schema.Types.ObjectId
    otp: string;
    createdAt: Date;
}

const otpSchema: Schema<OtpDocument> = new Schema(
    {
        userId:{
            type:Schema.ObjectId,
            required:true
        },
        otp: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            expires: 65
        }
    },
);

const Otp = mongoose.model<OtpDocument>('Otp', otpSchema);
export default Otp;
