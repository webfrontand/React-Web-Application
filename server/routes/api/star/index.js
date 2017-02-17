import express from 'express';
import controller from './controller';

const router = express.Router();

router.post('/:id', controller.star);

export default router;
