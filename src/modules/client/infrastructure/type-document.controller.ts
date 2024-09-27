import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RegisterTypeDocumentUseCase } from '../aplication/registerTypeDocumentUseCase';
import { CreateTypeDocumentDto } from '../aplication/dto/create-type-document.dto';
import { ListTypeDocumentUseCase } from '../aplication/listTypeDocumentUseCase';

@ApiBearerAuth()
@ApiTags('Type Document')
@UseGuards(AuthGuard)
@Controller('type-document')
export class TypeDocumentController {
  constructor(
    private readonly registerTypeDocumentUseCase: RegisterTypeDocumentUseCase,
    private readonly listTypeDocumentUseCase: ListTypeDocumentUseCase,
  ) {}

  @Post()
  async register(@Body() createTypeDocumentDto: CreateTypeDocumentDto) {
    return await this.registerTypeDocumentUseCase.execute(
      createTypeDocumentDto,
    );
  }

  @Get()
  async list() {
    return await this.listTypeDocumentUseCase.execute();
  }
}
