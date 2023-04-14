import { Document } from 'mongoose';

export interface Appoitment extends Document {
  readonly name: string;
  readonly surname: string;
  readonly lastname: string;
  readonly dateTime: string;
}