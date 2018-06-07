// @flow

import * as HttpStatus from 'http-status-codes';
import type { $Request, $Response } from 'express';
import CardService from './card.service';

/**
 * Create new card
 * @param {Object} req express request
 * @param {Object} res express response
 */
async function createNewCard(req: $Request, res: $Response): $Response {
  try {
    const card = await CardService.processNewCard(req.body, req.user);
    return res.status(HttpStatus.CREATED).json(card);
  } catch (e) {
    // We should throw a BadRequestError and let middleware handle it
    return res.status(HttpStatus.BAD_REQUEST).json({
      error: {
        message: e.message,
      },
    });
  }
}

/**
 * Get all cards
 * @param {Object} req express request
 * @param {Object} res express response
 */
async function getCards(req: $Request, res: $Response): $Response {
  try {
    const cards = await CardService.getCardsFromUser(req.user);
    return res.status(HttpStatus.OK).json(cards);
  } catch (e) {
    // We should throw a BadRequestError and let middleware handle it
    return res.status(HttpStatus.BAD_REQUEST).json({
      error: {
        message: e.message,
      },
    });
  }
}

/*
* Load money from wallet
* @param {Object} req express request
* @param {Object} res express response
*/
async function loadMoneyFromWallet(req: $Request, res: $Response): $Response {
  try {
    await CardService.processLoadFromWallet(req.user, req.params.cardId, req.body.amount);
    return res.status(HttpStatus.OK).json({ succeed: 'Card loaded' });
  } catch (e) {
    // We should throw a BadRequestError and let middleware handle it
    return res.status(HttpStatus.BAD_REQUEST).json({
      error: {
        message: e.message,
      },
    });
  }
}

/*
* Block a card
* @param {Object} req express request
* @param {Object} res express response
*/
async function blockCard(req: $Request, res: $Response): $Response {
  try {
    await CardService.blockCard(req.user, req.params.cardId);
    return res.status(HttpStatus.OK).json({ succeed: 'Card blocked, fund have transferred to the wallet' });
  } catch (e) {
    // We should throw a BadRequestError and let middleware handle it
    return res.status(HttpStatus.BAD_REQUEST).json({
      error: {
        message: e.message,
      },
    });
  }
}

/*
* Unblock a card
* @param {Object} req express request
* @param {Object} res express response
*/
async function unBlockCard(req: $Request, res: $Response): $Response {
  try {
    await CardService.unBlockCard(req.user, req.params.cardId);
    return res.status(HttpStatus.OK).json({ succeed: 'Card unblocked, you can use it again' });
  } catch (e) {
    // We should throw a BadRequestError and let middleware handle it
    return res.status(HttpStatus.BAD_REQUEST).json({
      error: {
        message: e.message,
      },
    });
  }
}

const CardController = {
  createNewCard,
  getCards,
  loadMoneyFromWallet,
  blockCard,
  unBlockCard,
};

export default CardController;
