import 'dotenv/config';

import dns from 'dns';
import mongoose from 'mongoose';

dns.setServers(['1.1.1.1']);

try {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);

  const db = mongoose.connection.db;

  const categories = await db.collection('categories').find().toArray();
  const products = await db.collection('products').find().toArray();

  for (const product of products) {
    if (typeof product.category !== 'string') {
      continue;
    }

    const category = categories.find((item) => item.name === product.category);

    if (!category) {
      console.log(`Category not found: ${product.category}`);
      continue;
    }

    await db.collection('products').updateOne(
      { _id: product._id },
      {
        $set: {
          category: category._id,
        },
      }
    );

    console.log(`Product "${product.name}" -> "${category.name}"`);
  }

  console.log('Product categories migrated successfully');
} catch (error) {
  console.error(error);
} finally {
  await mongoose.disconnect();
}
