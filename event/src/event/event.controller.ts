import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('events')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post()
  createEvent(@Body() body: any) {
    return this.eventService.createEvent(body);
  }

  @Get()
  getEvents() {
    return this.eventService.getEvents();
  }

  @Post(':id/rewards')
  createReward(@Param('id') eventId: string, @Body() body: any) {
    return this.eventService.createReward(eventId, body);
  }

  @Post(':id/request')
  requestReward(@Param('id') eventId: string, @Body('userId') userId: string) {
    return this.eventService.requestReward(eventId, userId);
  }
}