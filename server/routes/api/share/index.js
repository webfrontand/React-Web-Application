import express from 'express';
import controller from './controller';


const router = express.Router();

router.post('/:id', controller.share);
router.put('/:postId/:index/:messageId/:person', controller.permission);
router.put('/reject/:messageId', controller.reject);

export default router;
