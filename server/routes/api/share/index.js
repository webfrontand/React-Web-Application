import express from 'express';
import controller from './controller';


const router = express.Router();

router.post('/:id', controller.share);
router.put('/:postId/:index/', controller.permission);

export default router;
