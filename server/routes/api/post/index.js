import express from 'express';
import controller from './controller';


const router = express.Router();

router.post('/', controller.writer);
router.delete('/:id', controller.delete);
router.put('/:id', controller.update);

export default router;
