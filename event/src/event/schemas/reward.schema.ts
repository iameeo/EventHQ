import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type RewardDocument = Reward & Document;

@Schema()
export class Reward {
  @Prop({ required: true })
  eventId: string;

  @Prop()
  type: string;

  @Prop()
  amount: number;
}

export const RewardSchema = SchemaFactory.createForClass(Reward);