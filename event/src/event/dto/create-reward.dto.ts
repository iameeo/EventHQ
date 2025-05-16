import { ApiProperty } from '@nestjs/swagger';

export class CreateRewardDto {
  @ApiProperty()
  type: string;

  @ApiProperty()
  amount: number;
}