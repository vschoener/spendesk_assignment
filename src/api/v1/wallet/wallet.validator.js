import Joi from 'joi';
import { CURRENCIES_LIST } from './wallet.model';

export class WalletValidator {
  // TODO: Look what is used by Joi
  joySchema: any;

  constructor() {
    this.joySchema = Joi.object().keys({
      balance: Joi.number().integer().min(0),
      currency: Joi.string().regex(/^[A-Z]{3}$/).required(),
      isMaster: Joi.boolean().required(),
    });
  }

  validate(dataObject: Object): Promise<void> {
    const result = Joi.validate(dataObject, this.joySchema);
    if (result.error) {
      throw new Error(result.error.details[0].message);
    }

    if (!(dataObject.currency in CURRENCIES_LIST)) {
      throw new Error('"currency", this value is not available');
    }

    return Promise.resolve();
  }
}

export const walletValidator: WalletValidator = new WalletValidator();
