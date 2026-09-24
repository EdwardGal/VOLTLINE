import mongoose from 'mongoose';

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },
    sku: {
      type: String,
      required: true,
    },
    warranty: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      default: 0,
    },
    tag: {
      type: String,
      enum: ['new', 'popular', 'bestseller', '20%', ''],
      default: '',
    },
    quantity: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', ProductSchema);

export default Product;
