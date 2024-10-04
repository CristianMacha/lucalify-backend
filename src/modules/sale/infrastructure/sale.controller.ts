import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { CreateSaleUseCase } from '../aplication/createSaleUseCase';
import { CreateSaleDto } from '../aplication/dtos/create-sale.dto';
import { FilterSaleDto } from '../aplication/dtos/filter-sale.dto';
import { FilteredSalesUseCase } from '../aplication/filteredSalesUseCase';

@ApiBearerAuth()
@ApiTags('Sale')
@UseGuards(AuthGuard)
@Controller('sale')
export class SaleController {
  constructor(
    private readonly createSaleUseCase: CreateSaleUseCase,
    private readonly filteredSalesUseCase: FilteredSalesUseCase,
  ) {}

  @Post()
  async createSale(@Body() createSaleDto: CreateSaleDto, @Req() req: any) {
    const payload = req.user;
    return await this.createSaleUseCase.execute(createSaleDto, payload);
  }

  @Get('filter')
  async filteredSales(@Query() filterSale: FilterSaleDto) {
    return await this.filteredSalesUseCase.execute(filterSale);
  }
}
