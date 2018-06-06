// @flow

import { Router } from 'express';

// Import all Controller (Micro service shouldn't have much right ?)
import homeController from './hello/home.controller';

const router: Router = Router();

// List all route here

/**
 * @api {get} / Get index
 *
 * @apiName GetIndex
 * @apiVersion 1
 *
 * @apiGroup Home
 *
 * @apiDescription returns the api version
 *
 * @apiSuccess {String} version Api version
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    version: '1'
 *  }
 *
 */
router.get('/', homeController.index);

export default router;
