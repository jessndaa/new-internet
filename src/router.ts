import express from 'express';
import { Simple } from './routing';
export const router = express.Router();

router.post('/fetcher', Simple.index);