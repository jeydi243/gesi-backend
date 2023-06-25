import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { DocumentOrganisation, ListLevel, ListStatus } from 'src/config/export.type';
import { PersonDTO } from 'src/config/person.base';

export class CreateStudentDTO extends PersonDTO {
  @ApiProperty({
    example: 'CANDIDAT',
    default: 'CANDIDAT',
    enum: ListStatus,
    required: true,
    type: String,
  })
  @IsNotEmpty()
  status: string;

  @ApiProperty({
    description: "Le niveau actuel de l'étudiant",
    default: 'G3',
    enum: ListLevel,
    nullable: false,
    required: true,
  })
  @IsNotEmpty()
  level: string;

  @ApiProperty({
    description: 'Les informations concernant une ou plusieurs personne référente',
    type: Array,
  })
  responsables: Map<string, any>[];

  @ApiProperty({
    description: 'Document et lien du document',
    type: Array,
  })
  documents: Record<keyof DocumentOrganisation, any>[];

  @ApiProperty({
    type: Map,
    description: "L'établissement secondaire ou le diplome secondaire a été obtenue",
    example: 'Ecole Maadini',
    required: true,
  })
  high_school: Map<string, any>;
}
