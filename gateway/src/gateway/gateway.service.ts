import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable() // 의존성 주입 가능한 서비스
export class GatewayService {
  constructor(private readonly httpService: HttpService) {} // 생성자 - 의존성 주입

  forwardRequest(path: string, method: string, data: any) {
    // 이 예제는 단순화를 위해 auth 서버로만 라우팅
    return this.httpService.request({ // 결과 반환
      url: `http://auth:3001${path}`,
      method,
      data,
    });
  }
}