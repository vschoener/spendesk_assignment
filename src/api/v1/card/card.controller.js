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

const CardController = {
  createNewCard,
  getCards,
};

export default CardController;
