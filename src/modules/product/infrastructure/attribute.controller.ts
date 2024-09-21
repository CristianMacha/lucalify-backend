import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { AttributeUseCase } from '../aplication/attributeUseCase';
import { createAttributeDto } from '../aplication/dtos/create-attribute.dto';

@ApiBearerAuth()
@ApiTags('Attribute')
@Controller('attribute')
export class AttributeController {
  constructor(private readonly attributeUseCase: AttributeUseCase) {}

  @Get()
  async listAttribute() {
    return await this.attributeUseCase.listAttribute();
  }

  @Post()
  async registerAttribute(@Body() createAttributeDto: createAttributeDto) {
    return await this.attributeUseCase.registerAttribute(createAttributeDto);
  }
}
