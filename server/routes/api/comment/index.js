import express from 'express';
import controller from './controller';
const router = express.Router();


router.get('/:postId/:lastId', controller.moreread);
router.get('/:postId', controller.read);
router.post('/:postId', controller.writer);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);

export default router;
