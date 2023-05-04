import express from 'express'
const router = express.Router()
import { deleteUser, dislike, getUser, like, subscribe, unsubscribe, update } from '../controllers/user.js'
import { verifyToken } from '../verifyToken.js'
router.put('/:id', verifyToken, update)
router.delete('/:id',verifyToken, deleteUser)
router.get('/find/:id', getUser)
router.put('/sub/:id',verifyToken, subscribe)
router.put('/unsub/:id',verifyToken, unsubscribe)
router.put('/like/:videoId',verifyToken, like)
router.put('/dislike/:videoId',verifyToken, dislike)
export default router