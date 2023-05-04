import { createError } from "../error.js"
import User from "../models/user.js"
import Video from "../models/video.js"

//update user
export const update = async(req,res,next) => {
    if(req.params.id === req.user.id){
        try {
            const updateduser = await User.findByIdAndUpdate(req.params.id,{
                $set:req.body
            },{
                new:true
            })
            res.status(200).json(updateduser)
            
        } catch (error) {
            next(error)
            
        }
    }
    else{
        return next(createError(403,"you can update only your account")) 
        }
}

//delete user
export const deleteUser = async(req,res,next) => {
    if(req.params.id === req.user.id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("user has been deleted")
            
        } catch (error) {
            next(error)
            
        }
    }
    else{
        return next(createError(403,"you can delete only your account")) 
        }
}

//get user
export const getUser = async(req,res,next) => {
    try {
        const user = await User.findById(req.params.id)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

//subscribe user
export const subscribe = async(req,res,next) => {
      try 
      {
        await User.findByIdAndUpdate(req.user.id,{
            $push:{subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
         $inc : {subScribers:1}   
        })
        res.status(200).json("subscription successfull.")
        
    } catch (error) {
         next(error)
        
    }
}

//unsubscribe user
export const unsubscribe = async(req,res,next) => {
      try {
        await User.findByIdAndUpdate(req.user.id,
            {
            $pull:{subscribedUsers:req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id,{
            $inc:{subscribers:-1},
        })
        re.status(200).json("unsubscription successfull..")
    } catch (error) {
         next(error)
        
    }
}

//like  to videos user
export const like = async(req,res,next) => {
    const id = req.user.id
    const videoId = req.params.videoId
      try {
        await  Video.findByIdAndUpdate(videoId,{
            $addToSet:{likes:id},
            $pull:{dislikes:id}
        })
        res.status(200).json("the video has been liked.")
        
    } catch (error) {
         next(error)
        
    }
}

//user is dislike to video 
export const dislike = async(req,res,next) => {
    const id = req.user.id
    const videoId = req.params.videoId
      try {
        await  Video.findByIdAndUpdate(videoId,{
            $addToSet:{dislikes:id},
            $pull:{likes:id}
        })
        res.status(200).json("the video has been disliked.")
        
    } catch (error) {
         next(error)
        
    }
}
