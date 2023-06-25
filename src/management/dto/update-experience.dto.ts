import { PartialType } from '@nestjs/mapped-types';
import ExperienceDTO from './experience.dto';

export class UpdateExperienceDTO extends PartialType(ExperienceDTO) {}
