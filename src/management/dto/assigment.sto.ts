import { IsDateString, IsMongoId } from 'class-validator';

export class AssignmentDTO {
  @IsMongoId()
  employee_id: string;

  @IsMongoId()
  position_id: string;

  @IsDateString()
  from: Date | string;

  @IsDateString()
  to: Date | null;

}
