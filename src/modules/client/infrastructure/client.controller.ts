import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { RegisterClientUseCase } from '../aplication/registerClientUseCase';
import { FilterClientDto } from '../aplication/dto/filter-client.dto';
import { FilteredClientsUseCase } from '../aplication/filteredClientsUseCase';
import { CreateClientDto } from '../aplication/dto/create-client.dto';
import { UpdateClientUseCase } from '../aplication/updateClientUseCase';
import { UpdateClientDto } from '../aplication/dto/update-client.dto';

@ApiBearerAuth()
@ApiTags('client')
@UseGuards(AuthGuard)
@Controller('client')
export class ClientController {
  constructor(
    private readonly registerClientUseCase: RegisterClientUseCase,
    private readonly filteredClientsUseCase: FilteredClientsUseCase,
    private readonly updateClientUseCase: UpdateClientUseCase,
  ) {}

  @Get('filter')
  async filteredClients(@Query() filterClient: FilterClientDto) {
    return await this.filteredClientsUseCase.execute(filterClient);
  }

  @Post()
  async register(@Body() createClientDto: CreateClientDto, @Req() req: any) {
    return await this.registerClientUseCase.execute(createClientDto, req.user);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateClientDto: UpdateClientDto,
    @Req() req: any,
  ) {
    return await this.updateClientUseCase.execute(
      id,
      updateClientDto,
      req.user,
    );
  }
}
