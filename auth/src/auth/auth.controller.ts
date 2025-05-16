import { Roles } from './common/roles.decorator';
import { Public } from './common/public.decorator';
import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth') // 컨트롤러 클래스
export class AuthController {
  constructor(private readonly authService: AuthService) {} // 생성자 - 의존성 주입

  @Public()
  @Post('register') // POST 요청 처리
  register(@Body() body: any) {
    return this.authService.register(body.username, body.password); // 결과 반환
  }

  @Public()
  @Post('login') // POST 요청 처리
  async login(@Body() body: any) { // 비동기 함수
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user); // 결과 반환
  }

  @UseGuards(JwtAuthGuard) // 인증/인가 가드 적용
  @Roles('USER') // 역할 기반 접근 제한
  @Roles('USER') // 역할 기반 접근 제한
  @Get('profile') // GET 요청 처리
  getProfile(@Request() req) {
    return req.user;
  }
}