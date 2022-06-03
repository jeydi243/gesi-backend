import { PartialType } from '@nestjs/mapped-types';
import { EmployeeDto } from './create-employee.dto';

export class UpdateEmployeeDto extends PartialType(EmployeeDto) {}