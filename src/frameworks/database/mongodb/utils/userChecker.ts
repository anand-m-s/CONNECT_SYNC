import User from "../models/user";


export const checkExistingUser = async (email:string,userName:string) => {
    const existingUser = await User.findOne({ $or: [{ email: email }, { userName:userName }] })
    return existingUser
}


export const checkUserName = async(userName:string,id:string)=>{
    const existingUser = await User.find({$or:[{_id:id},{userName:userName}]})
   if(existingUser.length==1){
    return existingUser[0]
   }else{
    throw new Error('Another user has the same username try another!')
   }
}
