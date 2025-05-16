import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { Request, RequestDocument } from './schemas/request.schema';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
  ) {}

  async createEvent(data: any) {
    const created = new this.eventModel(data);
    return created.save();
  }

  async getEvents() {
    return this.eventModel.find().exec();
  }

  async createReward(eventId: string, data: any) {
    const reward = new this.rewardModel({ ...data, eventId });
    return reward.save();
  }

  async requestReward(eventId: string, userId: string) {
    const existing = await this.requestModel.findOne({ eventId, userId });
    if (existing) {
      return { message: 'Already requested.' };
    }

    const request = new this.requestModel({
      userId,
      eventId,
      status: 'SUCCESS',
      requestedAt: new Date(),
    });

    return request.save();
  }
}