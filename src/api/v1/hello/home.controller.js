// @flow

import * as HttpStatus from 'http-status-codes';
import type { $Request, $Response } from 'express';

/**
 * Get welcome message
 * @param {Object} req express request
 * @param {Object} res express response
 */
function index(req: $Request, res: $Response): $Response {
  return res.status(HttpStatus.OK).json({ version: '1' });
}

const homeController = {
  index,
};

export default homeController;
