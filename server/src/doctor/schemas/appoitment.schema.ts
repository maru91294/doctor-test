import * as mongoose from 'mongoose';

export const AppoitmentSchema = new mongoose.Schema({
  name: String,
  surname: String,
  lastname: String,
  dateTime: String,
})