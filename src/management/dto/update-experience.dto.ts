import { PartialType } from '@nestjs/mapped-types';
import ExperienceDto from './experience.dto';

export class UpdateExperienceDto extends PartialType(ExperienceDto) {}
