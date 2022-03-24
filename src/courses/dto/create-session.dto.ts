import { ApiProperty } from '@nestjs/swagger';
import { IsMongoId, IsNotEmpty, ValidateIf } from 'class-validator';

export class CreateSessionCourseDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty()
  courseId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  teacherId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsMongoId()
  roomId: string;

  @ApiProperty()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @ValidateIf(o => o.startDate < o.endDate)
  endDate: Date;
}
