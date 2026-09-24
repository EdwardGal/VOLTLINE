import 'dotenv/config';

import dns from 'dns';
import mongoose from 'mongoose';
import Category from './models/Category.js';

dns.setServers(['1.1.1.1']);

const categories = [
  {
    name: 'Gaming PCs',
    slug: 'gaming-pcs',
    image: '/uploads/categories/gaming-pcs.webp',
  },
  {
    name: 'Mini PCs',
    slug: 'mini-pcs',
    image: '/uploads/categories/mini-pcs.webp',
  },
  {
    name: 'Keyboards and mice',
    slug: 'keyboards-and-mice',
    image: '/uploads/categories/keyboards-and-mice.webp',
  },
  {
    name: 'Monitors',
    slug: 'monitors',
    image: '/uploads/categories/monitors.webp',
  },
  {
    name: 'Video cards',
    slug: 'video-cards',
    image: '/uploads/categories/video-cards.webp',
  },

  {
    name: 'Headsets',
    slug: 'headsets',
    image: '/uploads/categories/headsets.webp',
  },
];

try {
  await mongoose.connect(process.env.DB_CONNECTION_STRING);

  await Category.deleteMany({});
  await Category.insertMany(categories);

  console.log('Categories created successfully');
} catch (error) {
  console.error(error);
} finally {
  await mongoose.disconnect();
}
