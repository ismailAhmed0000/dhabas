import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { desc, eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database.constants';
import type { Database } from '../database/database.types';
import { customOrders } from '../database/schema';
import { CreateCustomOrderDto } from './dto/create-custom-order.dto';

@Injectable()
export class CustomOrdersService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async create(dto: CreateCustomOrderDto) {
    const [created] = await this.db
      .insert(customOrders)
      .values({
        customerName: dto.customerName,
        customerEmail: dto.customerEmail,
        customerPhone: dto.customerPhone,
        instagramHandle: dto.instagramHandle,
        description: dto.description,
        referenceImageUrl: dto.referenceImageUrl,
      })
      .returning();

    return created;
  }

  findAll() {
    return this.db.query.customOrders.findMany({
      orderBy: [desc(customOrders.createdAt)],
    });
  }

  async findOne(id: string) {
    const order = await this.db.query.customOrders.findFirst({
      where: eq(customOrders.id, id),
    });

    if (!order) throw new NotFoundException('Custom order not found');
    return order;
  }
}
