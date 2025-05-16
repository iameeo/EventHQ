import { ApiProperty } from '@nestjs/swagger';

export class RewardRequestDto {
  @ApiProperty()
  userId: string;
}