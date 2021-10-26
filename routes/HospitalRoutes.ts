import * as express from 'express';
const router = express.Router();
import HospitalController from '../controllers/HospitalController';

/*
 * GET
 */
router.get('/balance', HospitalController.balance);

export = router;