import { walletValidator } from './wallet.validator';
import { Wallet } from './wallet.model';
import {Card} from '../card/card.model';

export default class WalletService {
  static async processNewWallet(dataWallet: Object, user: Object): Promise<void> {
    await walletValidator.validate(dataWallet);

    const wallet = new Wallet(dataWallet);
    if (wallet.isMaster) {
      const masterWallet = await WalletService.getMasterWallet();

      if (masterWallet) {
        throw new Error('Master wallet already exists, please request without or contact us');
      }
    }

    wallet.userId = user.id;
    wallet.companyId = user.companyId;

    return wallet.save();
  }

  /**
   * Get a Wallet from user
   * @param user
   * @returns {Promise<*>}
   */
  static async getWalletFromUser(user: Object) {
    return Wallet.findOne({ userId: user.id, companyId: user.companyId });
  }

  /**
   * Get the Master Wallet
   * @returns {Promise<*>}
   */
  static async getMasterWallet() {
    return Wallet.findOne({ isMaster: true });
  }

  /**
   * Get Wallet from an id
   * @param walletId
   * @returns {Promise<*>}
   */
  static async getWalletFromId(walletId: string) {
    return Wallet.findOne({ _id: walletId });
  }

  /**
   * List cards from user
   * @param user
   * @returns {Promise<*>}
   */
  static async getWalletsFromUser(user: Object): Promise<Array<Card>> {
    return Wallet.find({ userId: user.id });
  }
}
