import express from 'express'
import { Random, Search, Sub, Trend, addVideo, addView, deleteVideo, getVideo, searchByTags, updateVideo } from '../controllers/video.js'
import { verifyToken } from '../verifyToken.js'
const router = express.Router()

//create a video
router.post('/', verifyToken, addVideo)
router.put('/:id', verifyToken, updateVideo)
router.delete('/:id', verifyToken, deleteVideo)
router.get('/sub', verifyToken, Sub)
router.put('/view/:id', addView)
router.get('/find/:id', getVideo)
router.get('/trend', Trend)
router.get('/random', Random)
router.get('/tags', searchByTags)
router.get('/search', Search)

export default router