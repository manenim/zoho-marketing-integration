import express from 'express';
import axios from 'axios';
import { addProspect, tokenMiddleware } from '../controllers/waitlist.js';

const router = express.Router();


router.post('/add', tokenMiddleware, addProspect);

export default router;  