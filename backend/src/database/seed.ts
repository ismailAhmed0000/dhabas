import 'dotenv/config';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { products } from './schema';

async function seed() {
  const client = postgres(process.env.DATABASE_URL!);
  const db = drizzle(client);

  await db
    .insert(products)
    .values([
      {
        name: 'The Arcadia Tote',
        slug: 'the-arcadia-tote',
        description: 'Tan leather tote bag',
        priceCents: 21000,
        tag: 'Bestseller',
        stock: 0,
        isPreOrderEnabled: true,
      },
      {
        name: 'The Céleste Crossbody',
        slug: 'the-celeste-crossbody',
        description: 'Beige crossbody bag',
        priceCents: 18500,
        tag: 'New',
        stock: 5,
        isPreOrderEnabled: true,
      },
      {
        name: 'The Aurelie Hobo',
        slug: 'the-aurelie-hobo',
        description: 'Cognac brown leather shoulder bag',
        priceCents: 23000,
        tag: 'Limited',
        stock: 0,
        isPreOrderEnabled: true,
      },
    ])
    .onConflictDoNothing();

  await client.end();
  console.log('Seed complete');
}

seed();
