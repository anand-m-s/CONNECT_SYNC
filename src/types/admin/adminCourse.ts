import { ObjectId } from "mongoose";


export interface CourseData{
    audio:string;
    caption:string;
    description:string;
    image:string;
    category:string
}

export interface Course {
    _id: ObjectId;
    audio: string;
    caption: string;
    description: string;
    category: string;
    image: string;
    createdAt: Date;
    updatedAt: Date;
    __v: number;
  }