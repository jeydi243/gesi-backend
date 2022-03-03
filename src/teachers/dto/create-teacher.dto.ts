import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, isPhoneNumber, ValidateIf } from 'class-validator';
import { Name } from 'src/export.type';
import { BaseMemberDto } from '../../member.base';

export class CreateTeacherDto extends BaseMemberDto {}
