// @flow

import { Router } from 'express';

// Import all Controller (Micro service shouldn't have much right ?)
import HomeController from './home/home.controller';
import WalletController from './wallet/wallet.controller';

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
router.get('/', HomeController.index);

/**
 * @api {post} / Create new wallet
 *
 * @apiName CreateWallet
 * @apiVersion 1
 *
 * @apiPermission User and Company Id request (JWT Token in real case would contains these value)
 * @apiHeader {integer} Client-Id The client identifier.
 * @apiHeader {integer} Company-Id The company identifier.
 *
 * @apiGroup Wallet
 *
 * @apiDescription Create a new wallet for an user. If it's the first one, it will be the master wallet
 *
 * @apiSuccess {integer} id Identifier of the wallet
 * @apiSuccess {string} balance Current balance of the wallet
 * @apiSuccess {currency} string Currency of the wallet
 * @apiSuccess {isMaster} boolean Is the main wallet
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    id: '42',
 *    balance: 0,
 *    currency: 'USD',
 *    isMaster: true,
 *  }
 *
 */
router.post('/wallets', WalletController.createNewWallet);

export default router;
