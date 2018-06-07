// @flow

import { Router } from 'express';

// Import all Controller (Micro service shouldn't have much right ?)
import HomeController from './home/home.controller';
import WalletController from './wallet/wallet.controller';
import CardController from './card/card.controller';

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
 * @api {get} / List all user wallets
 *
 * @apiName ListUserWallets
 * @apiVersion 1
 *
 * @apiPermission User and Company Id request (JWT Token in real case would contains these value)
 * @apiHeader {integer} Client-Id The client identifier.
 * @apiHeader {integer} Company-Id The company identifier.
 *
 * @apiGroup Wallets
 *
 * @apiDescription List all user wallets
 *
 * @apiSuccess {array} Object card
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    [{"balance": 0,
 *    "isMaster": true,
 *    "_id": "5b18e3943dfef4091512157f",
 *    "companyId": 1,
 *    "userId": 1,
 *    "currency": "EUR",
 *    "createdAt": "2018-06-07T07:49:40.588Z",
 *    "updatedAt": "2018-06-07T07:49:40.588Z",
 *  ], ...}
 *
 */
router.get('/wallets', WalletController.getWallets);

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
 * @apiGroup Wallets
 *
 * @apiDescription Create a new wallet for an user. If it's the first one, it will be the master wallet
 *
 * @apiSuccess {integer} id Identifier of the wallet
 * @apiSuccess {string} balance Current balance of the wallet
 * @apiSuccess {currency} string Currency of the wallet (EUR|USD|GBP)
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

/**
 * @api {post} / Create new Cards
 *
 * @apiName CreateCards
 * @apiVersion 1
 *
 * @apiPermission User and Company Id request (JWT Token in real case would contains these value)
 * @apiHeader {integer} Client-Id The client identifier.
 * @apiHeader {integer} Company-Id The company identifier.
 *
 * @apiGroup Cards
 *
 * @apiDescription Create a new card for an user.
 *
 * @apiSuccess {string} walletId Identifier of the wallet
 * @apiSuccess {number} balance Balance of card
 * @apiSuccess {integer} numbers Card numbers
 * @apiSuccess {string} expirationDate Card expiration (ex: 04/2018)
 * @apiSuccess {ccv} number ccv card numbers
 * @apiSuccess {status} string {Optional} Status of the card (BLOCKED|ENABLED)
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    "balance": 0,
 *    "numbers": 1234567812341234,
 *    "status": "ENABLED",
 *    "_id": "5b18e3943dfef4091512157f",
 *    "expirationDate": "07/2018",
 *    "ccv": 231,
 *    "walletId": "5b18e0bd2681840761763686",
 *    "currency": "EUR",
 *    "createdAt": "2018-06-07T07:49:40.588Z",
 *    "updatedAt": "2018-06-07T07:49:40.588Z",
 *  }
 *
 */
router.post('/cards', CardController.createNewCard);

/**
 * @api {get} / List all user cards
 *
 * @apiName ListUserCards
 * @apiVersion 1
 *
 * @apiPermission User and Company Id request (JWT Token in real case would contains these value)
 * @apiHeader {integer} Client-Id The client identifier.
 * @apiHeader {integer} Company-Id The company identifier.
 *
 * @apiGroup Cards
 *
 * @apiDescription List all user cards
 *
 * @apiSuccess {array} Object card
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    [{"balance": 0,
 *    "numbers": 1234567812341234,
 *    "status": "ENABLED",
 *    "_id": "5b18e3943dfef4091512157f",
 *    "expirationDate": "07/2018",
 *    "ccv": 231,
 *    "walletId": "5b18e0bd2681840761763686",
 *    "currency": "EUR",
 *    "createdAt": "2018-06-07T07:49:40.588Z",
 *    "updatedAt": "2018-06-07T07:49:40.588Z",
 *  ], ...}
 *
 */
router.get('/cards', CardController.getCards);

/**
 * @api {post} / Load money from wallet
 *
 * @apiName LoadMoneyFromWallet
 * @apiVersion 1
 *
 * @apiPermission User and Company Id request (JWT Token in real case would contains these value)
 * @apiHeader {integer} Client-Id The client identifier.
 * @apiHeader {integer} Company-Id The company identifier.
 *
 * @apiGroup Cards
 *
 * @apiDescription Load money in the card from a wallet
 *
 * @apiSuccess {success} string Message success
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 200 OK
 *  {
 *    {"success": "Card Loaded"
 *  }
 *
 */
router.post('/cards/load/:cardId', CardController.loadMoneyFromWallet);

export default router;
