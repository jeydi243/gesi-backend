import { PartialType } from '@nestjs/swagger';
import EducationDTO from './education.dto';

export class UpdateEducationDto extends PartialType(EducationDTO) {}
