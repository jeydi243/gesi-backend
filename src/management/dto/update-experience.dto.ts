import { PartialType } from '@nestjs/swagger';
import ExperienceDTO from './experience.dto';

export class UpdateExperienceDTO extends PartialType(ExperienceDTO) {}
