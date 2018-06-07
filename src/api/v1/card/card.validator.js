import Joi from 'joi';
import { CARD_STATUS } from './card.model';
import DateHelper from '../../../helper/date';

// We could create a ValidatorInterface
export class CardValidator {
  // TODO: Look what is type used by Joi
  joySchema: any;

  constructor() {
    this.joySchema = Joi.object().keys({
      balance: Joi.number().integer().min(0),
      numbers: Joi.number().integer().required(),
      expirationDate: Joi.string().regex(/^[0-9]{2}\/[0-9]{4}$/).required(),
      ccv: Joi.number().integer().required(),
      status: Joi.string(),
      walletId: Joi.string().regex(/^[0-9a-z]*$/).required(),
    });
  }

  validate(dataObject: Object): Promise<void> {
    const result = Joi.validate(dataObject, this.joySchema);

    if (result.error) {
      throw new Error(result.error.details[0].message);
    }

    if (!dataObject.ccv.toString().match(/^[0-9]{3}$/)) {
      throw new Error('"ccv" is not valid');
    }

    if (!dataObject.numbers.toString().match(/^[0-9]{16}$/)) {
      throw new Error('"ccv" is not valid');
    }

    if (dataObject.status && !(dataObject.status in CARD_STATUS)) {
      throw new Error('"status" has a bad value, should be ENABLED or BLOCKED');
    }

    const currentDate = new Date();
    const cardDate: Date = DateHelper.getDateFromExpirationDateCard(dataObject.expirationDate);
    if (cardDate < currentDate) {
      throw new Error('"ccv" date should be after today');
    }

    return Promise.resolve();
  }
}

export const cardValidator: CardValidator = new CardValidator();
