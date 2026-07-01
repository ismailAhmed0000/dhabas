import { Inject, Injectable } from '@nestjs/common';
import { count, desc, eq } from 'drizzle-orm';
import { DATABASE_CONNECTION } from '../database/database.constants';
import type { Database } from '../database/database.types';
import { preOrders, products } from '../database/schema';

@Injectable()
export class AdminService {
  constructor(@Inject(DATABASE_CONNECTION) private readonly db: Database) {}

  async getStats() {
    const [[productCount], [pendingPreOrders], [activeProducts]] =
      await Promise.all([
        this.db.select({ value: count() }).from(products),
        this.db
          .select({ value: count() })
          .from(preOrders)
          .where(eq(preOrders.status, 'pending')),
        this.db
          .select({ value: count() })
          .from(products)
          .where(eq(products.isActive, true)),
      ]);

    return {
      totalProducts: productCount.value,
      activeProducts: activeProducts.value,
      pendingPreOrders: pendingPreOrders.value,
    };
  }

  getRecentPreOrders() {
    return this.db.query.preOrders.findMany({
      with: { product: true },
      orderBy: [desc(preOrders.createdAt)],
      limit: 10,
    });
  }
}
