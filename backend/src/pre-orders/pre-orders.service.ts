import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { desc, eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database.constants';
import type { Database } from '../database/database.types';
import { preOrders, products } from '../database/schema';
import { CreatePreOrderDto } from './dto/create-pre-order.dto';
import { UpdatePreOrderStatusDto } from './dto/update-pre-order-status.dto';

@Injectable()
export class PreOrdersService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async create(dto: CreatePreOrderDto) {
    const [product] = await this.db
      .select()
      .from(products)
      .where(eq(products.id, dto.productId))
      .limit(1);

    if (!product || !product.isActive) {
      throw new NotFoundException('Product not found');
    }

    const quantity = dto.quantity ?? 1;

    if (!product.isPreOrderEnabled && product.stock < quantity) {
      throw new BadRequestException('Pre-order not available for this product');
    }

    const [created] = await this.db
      .insert(preOrders)
      .values({
        productId: dto.productId,
        customerName: dto.customerName,
        customerEmail: dto.customerEmail,
        customerPhone: dto.customerPhone,
        instagramHandle: dto.instagramHandle,
        quantity,
        notes: dto.notes,
      })
      .returning();

    return created;
  }

  findAll() {
    return this.db.query.preOrders.findMany({
      with: { product: true },
      orderBy: [desc(preOrders.createdAt)],
    });
  }

  async findOne(id: string) {
    const order = await this.db.query.preOrders.findFirst({
      where: eq(preOrders.id, id),
      with: { product: true },
    });

    if (!order) throw new NotFoundException('Pre-order not found');
    return order;
  }

  async updateStatus(id: string, dto: UpdatePreOrderStatusDto) {
    const [updated] = await this.db
      .update(preOrders)
      .set({ status: dto.status, updatedAt: new Date() })
      .where(eq(preOrders.id, id))
      .returning();

    if (!updated) throw new NotFoundException('Pre-order not found');
    return updated;
  }
}
