import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { CustomOrdersService } from './custom-orders.service';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';

@Controller('custom-orders')
export class CustomOrdersController {
  constructor(private readonly customOrdersService: CustomOrdersService) {}

  @Public()
  @Post()
  create(@Body() dto: CreateCustomOrderDto) {
    return this.customOrdersService.create(dto);
  }

  @Get()
  findAll() {
    return this.customOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customOrdersService.findOne(id);
  }
}
