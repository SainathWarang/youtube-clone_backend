import express from 'express'
import { signin, signup } from '../controllers/auth.js'
const router = express.Router()
router.post('/signin',signin)
router.post('/signup',signup)
router.post('/google',)
export default router