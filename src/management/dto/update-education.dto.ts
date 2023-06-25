import { PartialType } from '@nestjs/swagger';
import EducationDTO from './education.dto';

export class UpdateEducationDTO extends PartialType(EducationDTO) {
  id?: any;
}
