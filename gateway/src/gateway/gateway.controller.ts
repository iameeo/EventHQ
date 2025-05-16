import { Controller, Post, Req, Res, UseGuards } from '@nestjs/common';
import { GatewayService } from './gateway.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('proxy')
export class GatewayController {
  constructor(private readonly gatewayService: GatewayService) {}

  @UseGuards(JwtAuthGuard)
  @Post('auth/profile')
  async proxyProfile(@Req() req, @Res() res) {
    const jwt = req.headers.authorization;
    const result = await this.gatewayService.forwardRequest('/auth/profile', 'GET', null).toPromise();
    res.status(result.status).send(result.data);
  }
}