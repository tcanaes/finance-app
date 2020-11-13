import mongoose from 'mongoose';
import * as Utils from '../utils/utils.js';

/******************************************************************************/
/*                                   SCHEMA                                   */
/******************************************************************************/
const transactionSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
    trim: true,
  },
  value: { type: Number, required: true },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  year: Number,
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 31,
  },
  yearMonth: String,
  yearMonthDay: String,
  type: {
    type: String,
    required: true,
    enum: ['+', '-'],
  },
});

/******************************************************************************/
/*                        FILL DATE FILDS BEFORE SAVE                         */
/******************************************************************************/
transactionSchema.pre('save', function (next) {
  if (
    this.isNew ||
    this.isModified('year') ||
    this.isModified('month') ||
    this.isModified('day')
  ) {
    this.yearMonth = `${this.year}-${Utils.leadingZeros(this.month, 2)}`;
    this.yearMonthDay = `${this.year}-${Utils.leadingZeros(
      this.month,
      2
    )}-${Utils.leadingZeros(this.day, 2)}`;
  }
  next();
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
