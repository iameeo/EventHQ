import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event, EventDocument } from './schemas/event.schema';
import { Reward, RewardDocument } from './schemas/reward.schema';
import { Request, RequestDocument } from './schemas/request.schema';

@Injectable() // 의존성 주입 가능한 서비스
export class EventService {
  constructor( // 생성자 - 의존성 주입
    @InjectModel(Event.name) private eventModel: Model<EventDocument>,
    @InjectModel(Reward.name) private rewardModel: Model<RewardDocument>,
    @InjectModel(Request.name) private requestModel: Model<RequestDocument>,
  ) {}

  async createEvent(data: any) { // 비동기 함수
    const created = new this.eventModel(data);
    return created.save();
  }

  async getEvents() { // 비동기 함수
    return this.eventModel.find().exec(); // 결과 반환
  }

  async createReward(eventId: string, data: any) { // 비동기 함수
    const reward = new this.rewardModel({ ...data, eventId });
    return reward.save();
  }

  async requestReward(eventId: string, userId: string) { // 비동기 함수
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