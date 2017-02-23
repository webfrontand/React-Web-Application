import express from 'express';
import controller from './controller';


const router = express.Router();


router.get('/:what/:from/:messageid', controller.reject);

export default router;
