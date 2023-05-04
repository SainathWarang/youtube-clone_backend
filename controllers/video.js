import User from "../models/user.js"
import Video from "../models/video.js"

export const addVideo = async(req,res,next) =>{
    const newVideo =  new Video({userId:req.user.id,...req.body})
    try {
        const savedVideo = await newVideo.save()
        res.status(200).json(savedVideo)
        
    } catch (error) {
        next(error)
        
    }

}
export const updateVideo = async(req,res,next) =>{
        try {
            const video = new Video.findById(req.params.id)
            if(!video) return next(createError(404,"video not found"))
            if(req.params.id === video.userId){
                const updatedVideo = await Video.findByIdAndUpdate(req.params.id,{
                    $set:req.body
                },{
                    new:true
                })
                res.status(200).json(updatedVideo)
            }
            else{
                return next(createError(403,"you can update only your video"))
            }
        } catch (error) {
        next(error)
        }
}
        


export const getVideo = async(req,res,next) =>{
        try {
           const video = await Video.findById(req.params.id)
           res.status(200).json(video)
        }       
        catch (error) {
        next(error)
        
        }
}

export const addView = async(req,res,next) =>{
        try {
           const video = await Video.findByIdAndUpdate(req.params.id,{
            $inc:{views:1}
           })
           res.status(200).json("thew views has been increased")
        }       
        catch (error) {
        next(error)
        
        }
}
export const Random = async(req,res,next) =>{
        try {
           const videos = await Video.aggregate([{$sample:{size:40}}])
           res.status(200).json(videos)
        }       

        catch (error) {
        next(error)
        
        }
}
export const Trend = async(req,res,next) =>{
        try {
           const videos = await Video.find().sort({views:-1})
           res.status(200).json(videos)
        }       
        catch (error) {
        next(error)
        
        }
}
export const Sub = async(req,res,next) =>{
        try {
         const user = await User.findById(req.user.id)
        const subscribedChannels = user.subscribedUsers        

        const list = await Promise.all(
            subscribedChannels.map(channelId => {
                return Video.find({userId:channelId})
            })
        )
        res.status(200).json(list.flat().sort((a,b)=> b.createdAt - a.createdAt))
        
        }       
        catch (error) {
        next(error)
        
        }
}



export const deleteVideo = async(req,res,next) =>{
        try {
            const video = new Video.findById(req.params.id)
            if(!video) return next(createError(404,"video not found"))
            if(req.params.id === video.userId){
                await Video.findByIdAndDelete(req.params.id)
                res.status(200).json("video has been deleted...")
            }
            else{
                return next(createError(403,"you can delete only your video"))
        
               } 
        
    } catch (error) {
        next(error)
        
    }


}

export const searchByTags = async(req,res,next) =>{
    const tags = req.query.tags.split(",")
    try {
       const videos = await Video.find({tags:{$in:tags}}).limit(20)
       res.status(200).json(videos)
    }       
    catch (error) {
    next(error)
    
    }
}

export const Search = async(req,res,next) =>{
    try {
        const query = req.query.q
       const videos = await Video.find({title:{$regex:query,$options:"i"}}).limit(40)
       res.status(200).json(videos)
    }       
    catch (error) {
    next(error)
    
    }
}