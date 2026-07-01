import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from '../common/decorators/public.decorator';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Public()
  @Get()
  findAllPublic() {
    return this.productsService.findAllPublic();
  }

  @Get('admin/all')
  findAllAdmin() {
    return this.productsService.findAllAdmin();
  }

  @Get('admin/:id')
  findOneAdmin(@Param('id') id: string) {
    return this.productsService.findOneAdmin(id);
  }

  @Public()
  @Get(':slug')
  findOnePublic(@Param('slug') slug: string) {
    return this.productsService.findOnePublic(slug);
  }

  @Post()
  create(@Body() dto: CreateProductDto) {
    return this.productsService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(id);
  }
}
