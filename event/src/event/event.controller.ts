import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { EventService } from './event.service';

@Controller('events') // 컨트롤러 클래스
export class EventController {
  constructor(private readonly eventService: EventService) {} // 생성자 - 의존성 주입

  @Post() // POST 요청 처리
  createEvent(@Body() body: any) {
    return this.eventService.createEvent(body); // 결과 반환
  }

  @Get() // GET 요청 처리
  getEvents() {
    return this.eventService.getEvents(); // 결과 반환
  }

  @Post(':id/rewards') // POST 요청 처리
  createReward(@Param('id') eventId: string, @Body() body: any) {
    return this.eventService.createReward(eventId, body); // 결과 반환
  }

  @Post(':id/request') // POST 요청 처리
  requestReward(@Param('id') eventId: string, @Body('userId') userId: string) {
    return this.eventService.requestReward(eventId, userId); // 결과 반환
  }
}