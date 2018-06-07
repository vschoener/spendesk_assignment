// @flow

import mongoose from 'mongoose';
import DateHelper from '../../../helper/date';

export const CARD_STATUS = {
  BLOCKED: 'BLOCKED',
  ENABLED: 'ENABLED',
};

// TODO: Create unique key index { userId, companyId, master}
// We could add userId has a shortcut in case we need it
export const schema: mongoose.Schema = new mongoose.Schema({
  walletId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  userId: {
    type: Number,
    required: true,
  },
  balance: {
    // Stored as int do avoid decimal issue
    type: Number,
    default: 0,
  },
  currency: {
    type: String,
    required: true,
  },
  numbers: {
    type: Number,
    default: false,
    required: true,
  },
  expirationDate: {
    type: String,
    required: true,
  },
  ccv: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: CARD_STATUS.ENABLED,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export class CardModel extends mongoose.Model {
  walletId: number;
  userId: number;
  balance: number;
  currency: string;
  numbers: number;
  expirationDate: Date;
  ccv: number;
  status: string;

  get dateExpirarionDate(): Date {
    return DateHelper.getDateFromExpirationDateCard(this.expirationDate);
  }
}

schema.loadClass(CardModel);

// On Typescript I can use an interface and enforce Model<TypeInterface>
// But there is not flow type on Mongoose 5 :(
export const Card: CardModel = mongoose.model('Card', schema);
