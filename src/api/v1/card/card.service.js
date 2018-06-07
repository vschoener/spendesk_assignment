import { cardValidator } from './card.validator';
import {Card, CARD_STATUS} from './card.model';
import { Wallet } from '../wallet/wallet.model';
import WalletService from '../wallet/wallet.service';

export default class CardService {
  /**
   * Process new card for user
   * @param dataCard
   * @param user
   * @returns {Promise<*>}
   */
  static async processNewCard(dataCard: Object, user: Object): Promise<void> {
    await cardValidator.validate(dataCard);
    const wallet = await WalletService.getWalletFromId(dataCard.walletId);

    if (!wallet) {
      throw new Error('"wallet" doesn\'t exist');
    }

    const card = new Card(dataCard);
    card.userId = user.id;
    card.currency = wallet.currency;

    return card.save();
  }

  /**
   * List cards from user
   * @param user
   * @returns {Promise<*>}
   */
  static async getCardsFromUser(user: Object): Promise<Array<Card>> {
    return Card.find({ userId: user.id });
  }

  static async getCardFromId(cardId: string) {
    return Card.findOne({ _id: cardId });
  }

  /**
   * Load money in the card from its wallet
   * @param user
   * @param cardId
   * @param amount
   * @returns {Promise<void>}
   */
  static async processLoadFromWallet(user: Object, cardId: string, amount: number) {
    const card: Card = await CardService.getCardFromId(cardId);
    const wallet: Wallet = await WalletService.getWalletFromId(card.walletId);

    if (card.userId !== user.id) {
      throw new Error('You don\'t own this card');
    }

    if (card.status === CARD_STATUS.BLOCKED) {
      throw new Error('The card is blocked, you can\'t transfer money');
    }

    if (wallet.balance < amount) {
      throw new Error('Insufficient balance on the wallet');
    }

    // TODO: Create a history of ({walletId, cardId, amount}
    card.balance += amount;
    wallet.balance -= amount;

    await card.save();
    return wallet.save();
  }

  /**
   * Block a user card
   * @param user
   * @param cardId
   * @returns {Promise<void>}
   */
  static async blockCard(user: Object, cardId: string) {
    const card: Card = await CardService.getCardFromId(cardId);
    const wallet: Wallet = await WalletService.getWalletFromId(card.walletId);

    if (card.userId !== user.id) {
      throw new Error('You don\'t own this card');
    }

    if (card.status === CARD_STATUS.BLOCKED) {
      throw new Error('Card is already blocked');
    }

    // TODO: Create a history of ({walletId, cardId, amount}
    wallet.balance += card.balance;
    card.balance = 0;
    card.status = CARD_STATUS.BLOCKED;

    await card.save();
    return wallet.save();
  }
}
