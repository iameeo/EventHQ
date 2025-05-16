import { Roles } from './common/roles.decorator';
import { Public } from './common/public.decorator';
import { Controller, Post, Body, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  register(@Body() body: any) {
    return this.authService.register(body.username, body.password);
  }

  @Public()
  @Post('login')
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.username, body.password);
    if (!user) throw new Error('Invalid credentials');
    return this.authService.login(user);
  }

  @UseGuards(JwtAuthGuard)
  @Roles('USER')
  @Roles('USER')
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}