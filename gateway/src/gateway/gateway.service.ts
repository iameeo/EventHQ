import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class GatewayService {
  constructor(private readonly httpService: HttpService) {}

  forwardRequest(path: string, method: string, data: any) {
    // 이 예제는 단순화를 위해 auth 서버로만 라우팅
    return this.httpService.request({
      url: `http://auth:3001${path}`,
      method,
      data,
    });
  }
}