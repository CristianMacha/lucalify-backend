import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AttributeValueUseCase } from '../aplication/attributeValueUseCase';
import { CreateAttributeValueDto } from '../aplication/dtos/create-attribute-value.dto';

@ApiBearerAuth()
@ApiTags('AttributeValue')
@Controller('attribute-value')
export class AttributeValueController {
  constructor(private readonly attributeValueUseCase: AttributeValueUseCase) {}

  @Post()
  async registerAttributeValue(
    @Body() createAttributeValueDto: CreateAttributeValueDto,
  ) {
    return await this.attributeValueUseCase.registerAttributeValue(
      createAttributeValueDto,
    );
  }

  @Get()
  async listAttributeValue() {
    return await this.attributeValueUseCase.listAttributeValue();
  }
}
