import { cardValidator } from './card.validator';
import { Card } from './card.model';
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
}
