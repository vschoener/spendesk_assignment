import { walletValidator } from './wallet.validator';
import { Wallet } from './wallet.model';

export default class WalletService {
  /**
   * Create a new wallet for user
   * @param dataWallet
   * @param user
   * @returns {Promise<Wallet>}
   */
  static async processNewWallet(dataWallet: Object, user: Object): Promise<Wallet> {
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
   * @returns {Promise<Wallet>}
   */
  static async getWalletFromUser(user: Object): Promise<Wallet> {
    return Wallet.findOne({ userId: user.id, companyId: user.companyId });
  }

  /**
   * Get the Master Wallet
   * @returns {Promise<Wallet>}
   */
  static async getMasterWallet(): Promise<Wallet> {
    return Wallet.findOne({ isMaster: true });
  }

  /**
   * Get Wallet from an id
   * @param walletId
   * @returns {Promise<Wallet>}
   */
  static async getWalletFromId(walletId: string): Promise<Wallet> {
    return Wallet.findOne({ _id: walletId });
  }

  /**
   * List cards from user
   * @param user
   * @returns {Promise<Array<Wallet>>}
   */
  static async getWalletsFromUser(user: Object): Promise<Array<Wallet>> {
    return Wallet.find({ userId: user.id });
  }
}
