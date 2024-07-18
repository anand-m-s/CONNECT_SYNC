import mongoose, { Schema, Document } from "mongoose";

export interface BlockedUsersDocument extends Document {
    userId: Schema.Types.ObjectId;
    blockedList: Schema.Types.ObjectId[];
}


const blockedUsers: Schema<BlockedUsersDocument> = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    blockedList: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
});

const BlockedList = mongoose.model<BlockedUsersDocument>('BlockedList', blockedUsers);

export default BlockedList;
