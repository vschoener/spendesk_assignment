// @flow

import mongoose from 'mongoose';

export const CURRENCIES_LIST = {
  USD: {
    isoCode: 'USD',
    sign: '$',
  },
  GBP: {
    isoCode: 'GBP',
    sign: '£',
  },
  EUR: {
    isoCode: 'EUR',
    sign: '€',
  },
};

// TODO: Create unique key index { userId, companyId, master}
export const schema: mongoose.Schema = new mongoose.Schema({
  userId: {
    type: Number,
    required: true,
  },
  companyId: {
    type: Number,
    required: true,
  },
  balance: {
    // Stored as int do avoid decimal issue
    type: Number,
    default: 0,
    min: 0,
  },
  currency: {
    type: String,
    required: true,
  },
  isMaster: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  },
});

export class WalletModel extends mongoose.Model {
  userId: number;
  companyId: number;
  balance: number;
  currency: string;
  isMaster: string;
  loyaltyPointEarned: number;
}

schema.loadClass(WalletModel);

// On Typescript I can use an interface and enforce Model<TypeInterface>
// But there is not flow type on Mongoose 5 :(
export const Wallet: WalletModel = mongoose.model('Wallet', schema);
