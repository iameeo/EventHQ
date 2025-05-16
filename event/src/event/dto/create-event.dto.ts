import { ApiProperty } from '@nestjs/swagger';

export class CreateEventDto {
  @ApiProperty()
  title: string;

  @ApiProperty()
  description: string;

  @ApiProperty()
  condition: string;

  @ApiProperty()
  status: 'ACTIVE' | 'INACTIVE';

  @ApiProperty()
  startDate: string;

  @ApiProperty()
  endDate: string;
}