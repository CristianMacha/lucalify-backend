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
import { FilterProductDto } from '../aplication/dtos/filter-product.dto';
import { FilterProductUseCase } from '../aplication/filterProductUseCase';
import { RegisterProductUseCase } from '../aplication/registerProductUseCase';
import { CreateProductDto } from '../aplication/dtos/create-product.dto';
import { AuthGuard } from '../../../common/guards/auth.guard';
import { UpdateProductUseCase } from '../aplication/updateProductUseCase';
import { UpdateProductDto } from '../aplication/dtos/update-product.dto';
import { SearchProductUseCase } from '../aplication/searchProductUseCase';

@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(AuthGuard)
@Controller('product')
export class ProductController {
  constructor(
    private readonly filterProductUseCase: FilterProductUseCase,
    private readonly registerProductUseCase: RegisterProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
    private readonly searchProductUseCase: SearchProductUseCase,
  ) {}

  @Put(':id')
  async updateProduct(
    @Body() updateProductDto: UpdateProductDto,
    @Param('id') id: string,
  ) {
    return await this.updateProductUseCase.execute(id, updateProductDto);
  }

  @Get('filter')
  async listProduct(@Query() filterProductDto: FilterProductDto) {
    return await this.filterProductUseCase.execute(filterProductDto);
  }

  @Post()
  async registerProduct(
    @Body() createProductDto: CreateProductDto,
    @Req() req: any,
  ) {
    return await this.registerProductUseCase.execute(
      createProductDto,
      req.user,
    );
  }

  @Get('search')
  async searchProduct(@Query('value') value: string) {
    return await this.searchProductUseCase.execute(value);
  }
}
