import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ManagementService } from '../services/management.service';
import { AssignmentDTO } from '../dto/assigment.sto';

@Controller('assignments')
class AssignmentController {
  constructor(private readonly mgtService: ManagementService) {}

  @Post('')
  async addOrg(@Body() assignmentDTO: AssignmentDTO) {
    try {
      const result = this.mgtService.addAssignment(assignmentDTO);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get('')
  async findAllOrgs() {
    try {
      const result = this.mgtService.allAssignments();
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Get(':id')
  async findOneOrg(@Param('id') id: string) {
    try {
      const result = this.mgtService.findOneAssignment(id);
      return result;
    } catch (error) {
      console.log(error);
    }
  }

  @Put(':id')
  async updateOne(@Param('id') id: string, @Body() updatedOrg) {
    try {
      return await this.mgtService.updateAssignment({ id }, updatedOrg);
    } catch (error) {}
  }
  @Delete(':id')
  async deleteOne(@Param('id') id: string) {
    try {
      return await this.mgtService.deleteAssignment({ id });
    } catch (error) {
      console.log(error);
    }
  }

  @Delete('softdelete/:id')
  async softdeleteOne(@Param('id') id: string) {
    try {
      return await this.mgtService.softdeleteOrg({ id });
    } catch (error) {}
  }
}
