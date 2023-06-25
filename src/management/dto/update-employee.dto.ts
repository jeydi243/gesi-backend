import { PartialType } from '@nestjs/mapped-types';
import { EmployeeDTO } from './employee.dto';

export class UpdateEmployeeDTO extends PartialType(EmployeeDTO) {}