import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TokenDocument = HydratedDocument<Token>;

@Schema()
export class Token {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  card_number: number;

  @Prop({ required: true })
  cvv: number;

  @Prop({ required: true })
  expiration_month: string;

  @Prop({ required: true })
  expiration_year: string;

  @Prop({ required: true })
  token: string;
}

export const TokenSchema = SchemaFactory.createForClass(Token);
