// @flow

import * as HttpStatus from 'http-status-codes';
import type { $Request, $Response } from 'express';
import WalletService from './wallet.service';

/**
 * Get welcome message
 * @param {Object} req express request
 * @param {Object} res express response
 */
async function createNewWallet(req: $Request, res: $Response, next: any): $Response {
  try {
    const wallet = await WalletService.processNewWallet(req.body, req.user);
    return res.status(HttpStatus.CREATED).json(wallet);
  } catch (e) {
    return next(e);
  }
}

/**
 * Get all wallets
 * @param {Object} req express request
 * @param {Object} res express response
 */
async function getWallets(req: $Request, res: $Response): $Response {
  try {
    const wallets = await WalletService.getWalletsFromUser(req.user);
    return res.status(HttpStatus.OK).json(wallets);
  } catch (e) {
    // We should throw a BadRequestError and let middleware handle it
    return res.status(HttpStatus.BAD_REQUEST).json({
      error: {
        message: e.message,
      },
    });
  }
}

const WalletController = {
  createNewWallet,
  getWallets,
};

export default WalletController;
