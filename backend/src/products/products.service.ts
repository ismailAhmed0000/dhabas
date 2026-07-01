import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { and, desc, eq } from 'drizzle-orm';
import { slugify } from '../common/utils/slugify';
import { DATABASE_CONNECTION } from '../database/database.constants';
import type { Database } from '../database/database.types';
import { products } from '../database/schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  findAllPublic() {
    return this.db
      .select()
      .from(products)
      .where(eq(products.isActive, true))
      .orderBy(desc(products.createdAt));
  }

  findAllAdmin() {
    return this.db.select().from(products).orderBy(desc(products.createdAt));
  }

  async findOnePublic(slug: string) {
    const [product] = await this.db
      .select()
      .from(products)
      .where(and(eq(products.slug, slug), eq(products.isActive, true)))
      .limit(1);

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async findOneAdmin(id: string) {
    const [product] = await this.db
      .select()
      .from(products)
      .where(eq(products.id, id))
      .limit(1);

    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async create(dto: CreateProductDto) {
    const [created] = await this.db
      .insert(products)
      .values({
        name: dto.name,
        slug: slugify(dto.name),
        description: dto.description,
        priceCents: dto.priceCents,
        imageUrl: dto.imageUrl,
        tag: dto.tag,
        stock: dto.stock ?? 0,
        isPreOrderEnabled: dto.isPreOrderEnabled ?? false,
        preOrderExpectedAt: dto.preOrderExpectedAt
          ? new Date(dto.preOrderExpectedAt)
          : undefined,
        isActive: dto.isActive ?? true,
      })
      .returning();

    return created;
  }

  async update(id: string, dto: UpdateProductDto) {
    const [updated] = await this.db
      .update(products)
      .set({
        ...(dto.name !== undefined && {
          name: dto.name,
          slug: slugify(dto.name),
        }),
        ...(dto.description !== undefined && { description: dto.description }),
        ...(dto.priceCents !== undefined && { priceCents: dto.priceCents }),
        ...(dto.imageUrl !== undefined && { imageUrl: dto.imageUrl }),
        ...(dto.tag !== undefined && { tag: dto.tag }),
        ...(dto.stock !== undefined && { stock: dto.stock }),
        ...(dto.isPreOrderEnabled !== undefined && {
          isPreOrderEnabled: dto.isPreOrderEnabled,
        }),
        ...(dto.preOrderExpectedAt !== undefined && {
          preOrderExpectedAt: dto.preOrderExpectedAt
            ? new Date(dto.preOrderExpectedAt)
            : null,
        }),
        ...(dto.isActive !== undefined && { isActive: dto.isActive }),
        updatedAt: new Date(),
      })
      .where(eq(products.id, id))
      .returning();

    if (!updated) throw new NotFoundException('Product not found');
    return updated;
  }

  async remove(id: string) {
    const [deleted] = await this.db
      .delete(products)
      .where(eq(products.id, id))
      .returning();

    if (!deleted) throw new NotFoundException('Product not found');
    return deleted;
  }
}
