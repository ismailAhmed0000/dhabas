import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { CreatePreOrderDto } from './dto/create-pre-order.dto';
import { UpdatePreOrderStatusDto } from './dto/update-pre-order-status.dto';
import { PreOrdersService } from './pre-orders.service';

@Controller('pre-orders')
export class PreOrdersController {
  constructor(private readonly preOrdersService: PreOrdersService) {}

  @Public()
  @Post()
  create(@Body() dto: CreatePreOrderDto) {
    return this.preOrdersService.create(dto);
  }

  @Get()
  findAll() {
    return this.preOrdersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.preOrdersService.findOne(id);
  }

  @Patch(':id/status')
  updateStatus(
    @Param('id') id: string,
    @Body() dto: UpdatePreOrderStatusDto,
  ) {
    return this.preOrdersService.updateStatus(id, dto);
  }
}
