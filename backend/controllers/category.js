import Category from '../models/Category.js';
import { mapCategory } from '../helpers/mapCategory.js';

export const getCategories = async () => {
  const categories = await Category.aggregate([
    {
      $lookup: {
        from: 'products',
        localField: '_id',
        foreignField: 'category',
        as: 'products',
      },
    },
    {
      $project: {
        name: 1,
        slug: 1,
        image: 1,
        quantity: { $size: '$products' },
      },
    },
  ]);

  return categories.map(mapCategory);
};
