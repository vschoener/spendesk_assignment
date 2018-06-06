// @flow

import * as HttpStatus from 'http-status-codes';
import type { $Request, $Response } from 'express';
import WalletService from './wallet.service';

/**
 * Get welcome message
 * @param {Object} req express request
 * @param {Object} res express response
 */
async function createNewWallet(req: $Request, res: $Response): $Response {
  try {
    const wallet = await WalletService.processNewWallet(req.body, req.user);
    return res.status(HttpStatus.CREATED).json(wallet);
  } catch (e) {
    return res.status(HttpStatus.BAD_REQUEST).json({
      error: {
        message: e.message,
      },
    });
  }
}

const WalletController = {
  createNewWallet,
};

export default WalletController;
