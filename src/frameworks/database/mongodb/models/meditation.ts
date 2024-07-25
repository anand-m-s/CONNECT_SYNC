import mongoose,{Schema,Document} from "mongoose";


export interface meditationDocument extends Document{
    audio:string;
    caption:string;
    description:string;
    category:Enumerator;
    image:string;
}

const meditationSchema :Schema<meditationDocument> = new Schema({
    audio:{
        type:String,
        required:true,
    },
    caption:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        enum:["mindfulness", "sleep","breathing","visualization"],
        required:true
    },
    image:{
        type:String,
        required:true
    }
},{timestamps:true})


const meditation = mongoose.model('meditation',meditationSchema)

export default meditation;