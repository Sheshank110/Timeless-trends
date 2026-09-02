import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import Category from '../models/Category.js';
import Product from '../models/Product.js';
import SiteSettings from '../models/SiteSettings.js';

const categories = [
  { name: 'T-Shirts', gender: 'all', sortOrder: 1 },
  { name: 'Shirts', gender: 'all', sortOrder: 2 },
  { name: 'Jeans', gender: 'all', sortOrder: 3 },
  { name: 'Hoodies', gender: 'all', sortOrder: 4 },
  { name: 'Jackets', gender: 'all', sortOrder: 5 },
  { name: 'Trousers', gender: 'all', sortOrder: 6 },
  { name: 'Shoes', gender: 'all', sortOrder: 7 },
];

const products = [
  // Men's T-Shirts
  { name: 'Essential Oversized Tee', description: 'A wardrobe essential crafted from premium 100% combed cotton. Features a relaxed oversized fit with dropped shoulders and a clean crew neckline. The perfect foundation piece for any casual outfit.', gender: 'men', categoryName: 'T-Shirts', price: 1299, originalPrice: 1799, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: [{ name: 'Black', hex: '#111111' }, { name: 'White', hex: '#FFFFFF' }, { name: 'Sage', hex: '#B5C4B1' }], stock: 150, material: '100% Combed Cotton, 220 GSM', careInstructions: 'Machine wash cold. Tumble dry low.', fit: 'oversized', tags: ['basics', 'oversized', 'cotton'], isNewArrival: true, isFeatured: true },
  { name: 'Premium Crew Neck Tee', description: 'Elevated basics redefined. This crew neck tee is made from ultra-soft Supima cotton with a tailored fit that flatters without restricting. Ribbed collar for lasting shape retention.', gender: 'men', categoryName: 'T-Shirts', price: 999, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: [{ name: 'Navy', hex: '#1B2A4A' }, { name: 'Charcoal', hex: '#333333' }], stock: 200, material: 'Supima Cotton, 180 GSM', fit: 'regular', tags: ['basics', 'crew-neck'] },
  { name: 'Graphic Print Statement Tee', description: 'Make a statement with this contemporary graphic tee. Features an abstract minimalist print inspired by modern art. Premium heavyweight cotton for a structured drape.', gender: 'men', categoryName: 'T-Shirts', price: 1499, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Off White', hex: '#FAF9F6' }, { name: 'Black', hex: '#111111' }], stock: 80, material: 'Heavyweight Cotton, 250 GSM', fit: 'relaxed', tags: ['graphic', 'statement'], isTrending: true },

  // Men's Shirts
  { name: 'Classic Linen Shirt', description: 'Timeless elegance meets effortless comfort. This pure linen shirt features a relaxed spread collar, mother-of-pearl buttons, and a curved hem. Perfect for both casual and smart-casual occasions.', gender: 'men', categoryName: 'Shirts', price: 2199, originalPrice: 2799, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Sky Blue', hex: '#B1C4D5' }, { name: 'Beige', hex: '#E8DDD0' }], stock: 100, material: '100% European Linen', fit: 'regular', tags: ['linen', 'formal', 'classic'], isFeatured: true },
  { name: 'Oxford Button-Down', description: 'The quintessential shirt for the modern gentleman. Woven from premium Oxford cloth with a button-down collar and chest pocket. A versatile piece that transitions seamlessly from desk to dinner.', gender: 'men', categoryName: 'Shirts', price: 1899, originalPrice: 2499, sizes: ['S', 'M', 'L', 'XL', 'XXL'], colors: [{ name: 'Light Blue', hex: '#A8C4D8' }, { name: 'Pink', hex: '#E8C4C4' }], stock: 120, material: 'Cotton Oxford Weave', fit: 'slim', tags: ['oxford', 'button-down', 'smart'] },
  { name: 'Camp Collar Relaxed Linen Shirt', description: 'Breezy camp-collar styling with a boxy modern silhouette. Breathable washed linen crafted for warm days and resort wear.', gender: 'men', categoryName: 'Shirts', price: 1999, originalPrice: 2599, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Sand', hex: '#D2B48C' }, { name: 'Olive', hex: '#556B2F' }], stock: 85, material: 'Washed Pure Linen', fit: 'relaxed', tags: ['linen', 'camp-collar'] },
  { name: 'Heavyweight Brushed Flannel Overshirt', description: 'Durable yarn-dyed flannel with a brushed finish on both sides. Wear buttoned up or open over your favorite tee.', gender: 'men', categoryName: 'Shirts', price: 2399, originalPrice: 3099, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Forest Check', hex: '#2E4F4F' }], stock: 95, material: '100% Brushed Cotton, 280 GSM', fit: 'relaxed', tags: ['flannel', 'overshirt'] },

  // Men's Jeans
  { name: 'Japanese Selvedge Dark Straight Jeans', description: 'Clean lines and a straight leg profile define these modern jeans. Made from premium Japanese selvedge denim with an authentic dark indigo wash.', gender: 'men', categoryName: 'Jeans', price: 2899, originalPrice: 3699, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Medium Wash', hex: '#6B8DAD' }, { name: 'Dark Indigo', hex: '#2B3A67' }], stock: 90, material: 'Japanese Selvedge Denim, 13 oz', fit: 'regular', tags: ['denim', 'straight', 'selvedge'], isTrending: true },
  { name: 'Vintage Fade Relaxed Tapered Jeans', description: '90s-inspired relaxed top block tapering gently toward the ankle. Finished with subtle whiskering and antique hardware.', gender: 'men', categoryName: 'Jeans', price: 2499, originalPrice: 3199, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Light Vintage', hex: '#9BB8D3' }], stock: 110, material: '100% Cotton Rigid Denim', fit: 'tapered', tags: ['vintage', 'tapered'] },
  { name: 'Jet Black Comfort Stretch Slim Jeans', description: 'Sleek and refined slim fit jeans in a stay-black dye that does not fade after washing. Stretch blend for ease of movement.', gender: 'men', categoryName: 'Jeans', price: 2199, originalPrice: 2799, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Jet Black', hex: '#0A0A0A' }], stock: 100, material: '98% Cotton, 2% Elastane', fit: 'slim', tags: ['denim', 'black', 'stretch'] },

  // Men's Hoodies
  { name: 'Minimal Zip Hoodie', description: 'Understated luxury in hoodie form. This full-zip hoodie is made from brushed French terry with a clean, minimal aesthetic. Features a double-layered hood, kangaroo pockets, and branded metal zipper.', gender: 'men', categoryName: 'Hoodies', price: 3499, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Black', hex: '#111111' }, { name: 'Heather Grey', hex: '#C0C0C0' }], stock: 75, material: 'French Terry, 350 GSM', fit: 'regular', tags: ['hoodie', 'zip', 'minimal'], isNewArrival: true },

  // Men's Jackets
  { name: 'Structured Utility Overcoat', description: 'Clean architectural lines and soft-shoulder tailoring. European wool-blend construction with deep internal welt pockets.', gender: 'men', categoryName: 'Jackets', price: 5499, originalPrice: 6999, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Camel', hex: '#C19A6B' }, { name: 'Charcoal', hex: '#333333' }], stock: 45, material: 'Wool-Cashmere Blend', fit: 'tailored', tags: ['overcoat', 'tailored', 'wool'], isFeatured: true },
  { name: 'Minimalist Twill Shacket', description: 'A versatile transitional layer crafted from heavyweight cotton twill with dual chest patch pockets and horn buttons.', gender: 'men', categoryName: 'Jackets', price: 3199, originalPrice: 3999, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Khaki', hex: '#C3B091' }, { name: 'Navy', hex: '#1B2A4A' }], stock: 65, material: 'Heavy Cotton Twill', fit: 'regular', tags: ['shacket', 'twill'] },
  { name: 'Tailored Utility Jacket', description: 'Where sophistication meets functionality. Four flap pockets, satin lining, and snap button closure.', gender: 'men', categoryName: 'Jackets', price: 3999, originalPrice: 4999, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Olive', hex: '#556B2F' }, { name: 'Black', hex: '#111111' }], stock: 50, material: 'Cotton Twill with Satin Lining', fit: 'tailored', tags: ['jacket', 'utility', 'tailored'], isFeatured: true, isTrending: true },

  // Men's Trousers
  { name: 'Tailored Pleated Wool Trousers', description: 'Double-pleated front with high-rise waist and fluid wide drape. Finished with an internal waistband grip.', gender: 'men', categoryName: 'Trousers', price: 2799, originalPrice: 3599, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Heather Grey', hex: '#808080' }, { name: 'Navy', hex: '#1B2A4A' }], stock: 80, material: 'Tropical Wool Blend', fit: 'pleated', tags: ['trousers', 'pleated', 'formal'] },
  { name: 'Relaxed Fit Pure Linen Trousers', description: 'Effortless drawstring trousers crafted from breathable pre-washed European linen with clean side slash pockets.', gender: 'men', categoryName: 'Trousers', price: 2299, originalPrice: 2999, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'Natural Ecru', hex: '#F0EAD6' }], stock: 75, material: '100% Linen', fit: 'relaxed', tags: ['linen', 'drawstring'] },
  { name: 'Slim Tapered Stretch Cotton Chinos', description: 'Daily essential chinos with a comfortable mid-rise and cleanly tapered leg. Enzyme-washed for immediate softness.', gender: 'men', categoryName: 'Trousers', price: 1999, originalPrice: 2599, sizes: ['S', 'M', 'L', 'XL'], colors: [{ name: 'British Khaki', hex: '#C3B091' }, { name: 'Black', hex: '#111111' }], stock: 120, material: '97% Cotton, 3% Spandex', fit: 'slim', tags: ['chinos', 'basics'] },

  // Men's Shoes
  { name: 'Italian Minimalist Leather Low-Top Sneakers', description: 'Handmade court silhouette cut from full-grain Italian Nappa leather. Cushioned calfskin insole and vulcanized rubber sole.', gender: 'men', categoryName: 'Shoes', price: 3299, originalPrice: 4299, sizes: ['40', '41', '42', '43', '44'], colors: [{ name: 'White', hex: '#FFFFFF' }], stock: 60, material: 'Full-Grain Calf Leather', tags: ['shoes', 'sneakers', 'leather'], isNewArrival: true },
  { name: 'Handcrafted Suede Chelsea Boots', description: 'Classic Chelsea boot profile with elasticated side gussets and pull tabs. Supple water-repellent oiled suede upper.', gender: 'men', categoryName: 'Shoes', price: 4499, originalPrice: 5699, sizes: ['40', '41', '42', '43', '44'], colors: [{ name: 'Snuff Suede', hex: '#8B5A2B' }], stock: 45, material: 'Calf Suede & Crepe Sole', tags: ['shoes', 'boots', 'chelsea'] },
  { name: 'Classic Calfskin Penny Loafers', description: 'Hand-sewn moccasin construction with genuine leather outsole and stacked heel. Slip-on sophistication for any tailored outfit.', gender: 'men', categoryName: 'Shoes', price: 3899, originalPrice: 4899, sizes: ['40', '41', '42', '43', '44'], colors: [{ name: 'Burgundy', hex: '#800020' }, { name: 'Black', hex: '#111111' }], stock: 50, material: 'Box Calf Leather', tags: ['shoes', 'loafers', 'dress'] },

  // Women's T-Shirts
  { name: 'Ribbed Crop Top', description: 'A contemporary take on the essential tee. This ribbed crop top features a flattering square neckline and a cropped length that pairs perfectly with high-waisted bottoms. Ultra-soft ribbed cotton knit.', gender: 'women', categoryName: 'T-Shirts', price: 999, originalPrice: 1499, sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Blush', hex: '#E8C4C4' }, { name: 'Black', hex: '#111111' }], stock: 180, material: 'Ribbed Cotton Knit', fit: 'slim', tags: ['crop', 'ribbed', 'basics'], isNewArrival: true, isTrending: true },
  { name: 'Relaxed V-Neck Tee', description: 'Effortlessly chic relaxed fit V-neck tee. Made from modal-blend fabric for an incredibly soft hand feel and beautiful drape. A go-to piece for everyday elegance.', gender: 'women', categoryName: 'T-Shirts', price: 1199, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: [{ name: 'Lavender', hex: '#C4B7D5' }, { name: 'Cream', hex: '#F5E6D3' }], stock: 140, material: 'Modal-Cotton Blend', fit: 'relaxed', tags: ['v-neck', 'relaxed', 'modal'] },

  // Women's Shirts
  { name: 'Satin Blouse', description: 'Pure luxury in a blouse. Crafted from premium satin with a subtle sheen, featuring a classic collar, concealed button placket, and relaxed fit through the body. Dressed up or down, it always delivers.', gender: 'women', categoryName: 'Shirts', price: 2999, sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Champagne', hex: '#F7E7CE' }, { name: 'Black', hex: '#111111' }], stock: 60, material: 'Premium Satin', fit: 'relaxed', tags: ['satin', 'blouse', 'elegant'], isFeatured: true },

  // Women's Jeans
  { name: 'High Rise Wide Leg Jeans', description: 'Statement-making wide leg jeans with a high rise waist for a flattering silhouette. Made from non-stretch vintage-inspired denim with a light wash. Clean front, patch pockets at back.', gender: 'women', categoryName: 'Jeans', price: 3299, sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Light Wash', hex: '#A4B8C9' }], stock: 70, material: '100% Cotton Denim, 12 oz', fit: 'relaxed', tags: ['wide-leg', 'high-rise', 'vintage'], isNewArrival: true },

  // Women's Hoodies
  { name: 'Plush Pullover Hoodie', description: 'Cloud-like softness in a pullover hoodie. Made from plush fleece with a slightly oversized fit, kangaroo pocket, and cozy ribbed cuffs. The ultimate comfort piece elevated with premium detailing.', gender: 'women', categoryName: 'Hoodies', price: 3299, sizes: ['XS', 'S', 'M', 'L', 'XL'], colors: [{ name: 'Dusty Rose', hex: '#D4A0A0' }, { name: 'Oatmeal', hex: '#E8DDD0' }], stock: 85, material: 'Plush Fleece, 380 GSM', fit: 'oversized', tags: ['hoodie', 'plush', 'cozy'] },

  // Women's Jackets
  { name: 'Structured Blazer', description: 'Power dressing perfected. This single-breasted blazer features a structured shoulder, peaked lapels, and a single-button closure. Fully lined with interior pockets. An investment piece.', gender: 'women', categoryName: 'Jackets', price: 5499, sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Black', hex: '#111111' }, { name: 'Camel', hex: '#C4A882' }], stock: 40, material: 'Wool-Blend Suiting', fit: 'tailored', tags: ['blazer', 'structured', 'power'], isFeatured: true },

  // Teen T-Shirts
  { name: 'Retro Graphic Tee', description: 'Throwback vibes with a modern twist. This retro-inspired graphic tee features bold vintage typography on heavyweight cotton. A statement piece for the style-conscious teen.', gender: 'teen', categoryName: 'T-Shirts', price: 899, originalPrice: 1199, sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Washed Black', hex: '#333333' }, { name: 'Vintage White', hex: '#F0ECE7' }], stock: 200, material: 'Cotton Jersey, 200 GSM', fit: 'regular', tags: ['retro', 'graphic', 'teen'], isNewArrival: true },

  // Teen Hoodies
  { name: 'Colorblock Hoodie', description: 'Bold color blocking meets streetwear cool. This pullover hoodie features contrasting panels, an oversized hood, and front pouch pocket. Made from soft loopback cotton for all-day comfort.', gender: 'teen', categoryName: 'Hoodies', price: 2499, sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Black/White', hex: '#111111' }, { name: 'Navy/Grey', hex: '#1B2A4A' }], stock: 90, material: 'Loopback Cotton, 320 GSM', fit: 'oversized', tags: ['colorblock', 'streetwear', 'teen'], isTrending: true },

  // Teen Jeans
  { name: 'Relaxed Cargo Jeans', description: 'Street-ready cargo jeans with a relaxed fit and functional side pockets. Made from washed cotton denim with a comfortable mid-rise waist. The go-to jean for the urban explorer.', gender: 'teen', categoryName: 'Jeans', price: 2299, sizes: ['XS', 'S', 'M', 'L'], colors: [{ name: 'Khaki', hex: '#C3B091' }, { name: 'Black', hex: '#111111' }], stock: 110, material: 'Washed Cotton Denim', fit: 'relaxed', tags: ['cargo', 'relaxed', 'teen'] },
];

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('\n🌱 Starting database seed...\n');

    // Clear existing data
    await Promise.all([
      User.deleteMany({}),
      Category.deleteMany({}),
      Product.deleteMany({}),
      SiteSettings.deleteMany({}),
    ]);
    console.log('   Cleared existing data');

    // Create admin user
    const admin = await User.create({
      firstName: 'Admin',
      lastName: 'User',
      email: 'admin@timelesstrends.com',
      password: 'Admin@123',
      role: 'admin',
      isEmailVerified: true,
    });
    console.log('   ✅ Admin user created (admin@timelesstrends.com / Admin@123)');

    // Create test customer
    await User.create({
      firstName: 'Test',
      lastName: 'Customer',
      email: 'customer@test.com',
      password: 'Customer@123',
      role: 'customer',
      isEmailVerified: true,
    });
    console.log('   ✅ Test customer created (customer@test.com / Customer@123)');

    // Create categories
    const categoryMap = {};
    for (const cat of categories) {
      const created = await Category.create(cat);
      categoryMap[cat.name] = created._id;
    }
    console.log(`   ✅ ${categories.length} categories created`);

    // Create products
    const productDocs = products.map((p) => ({
      ...p,
      category: categoryMap[p.categoryName],
      sku: `TT-${p.gender.toUpperCase().slice(0, 1)}-${p.categoryName.toUpperCase().slice(0, 2)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
      images: [{ url: '', alt: p.name }],
    }));

    await Product.insertMany(productDocs);
    console.log(`   ✅ ${products.length} products created`);

    // Create site settings
    await SiteSettings.create({
      _id: 'site-settings',
      shipping: {
        freeShippingThreshold: 999,
        baseCharge: 79,
        expressCharge: 149,
      },
    });
    console.log('   ✅ Site settings created');

    console.log('\n✅ Database seeded successfully!\n');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seed failed:', error.message);
    process.exit(1);
  }
};

seedDatabase();
