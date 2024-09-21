import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BranchUseCase } from '../aplication/branchUseCase';
import { CreateBranchDto } from '../aplication/dtos/create-branch.dto';

@ApiTags('Branch')
@Controller('branch')
export class BranchController {
  constructor(private readonly branchUseCase: BranchUseCase) {}

  @Get()
  async listBranch() {
    return await this.branchUseCase.listBranch();
  }

  @Post()
  async registerBranch(@Body() createBranchDto: CreateBranchDto) {
    return await this.branchUseCase.registerBranch(createBranchDto);
  }
}
