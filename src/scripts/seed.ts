import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
import Product from '../models/product.model';
import User from '../models/user.model';
import bcrypt from 'bcryptjs';

const MONGO = process.env.MONGODB_URI || 'mongodb://localhost:27017/tienda_test';

async function seed(){
  await mongoose.connect(MONGO);
  console.log('Connected', MONGO);
  await Product.deleteMany({});
  await User.deleteMany({});
  const admin = new User({
    name: 'Admin',
    email: 'admin@local.test',
    password: await bcrypt.hash('Admin1234', 10),
    role: 'admin'
  });
  await admin.save();
  const p1 = new Product({ name: 'Zapatos deportivos', price: 120000, stock: 10, active: true, featured: true });
  const p2 = new Product({ name: 'Camiseta', price: 40000, stock: 20, active: true });
  await p1.save(); await p2.save();
  console.log('Seed complete');
  process.exit(0);
}

seed().catch(e => { console.error(e); process.exit(1); });