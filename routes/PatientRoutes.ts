import * as express from 'express';
const router = express.Router();
import PatientController from '../controllers/PatientController';

/*
 * GET
 */
router.get('/', PatientController.list);

/*
 * GET
 */
router.get('/:id', PatientController.show);

/*
 * POST
 */
router.post('/', PatientController.create);

/*
 * PUT
 */
router.put('/:id', PatientController.update);

/*
 * DELETE
 */
router.delete('/:id', PatientController.remove);

export = router;
