import fs from 'fs';
import path from 'path';

// Read CategoryPage.jsx to extract categoryFallbackProducts
const categoryPagePath = path.resolve('client/src/pages/Category/CategoryPage.jsx');
const content = fs.readFileSync(categoryPagePath, 'utf8');

// Match categoryFallbackProducts object
const startMarker = 'const categoryFallbackProducts = {';
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf('// Gender-specific configuration', startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find categoryFallbackProducts in CategoryPage.jsx');
  process.exit(1);
}

const rawObjCode = content.substring(startIndex, endIndex).trim();

// Evaluate or parse the categoryFallbackProducts
// Replace 'const categoryFallbackProducts = ' with 'return ' inside a Function
const parseFn = new Function(rawObjCode + '\nreturn categoryFallbackProducts;');
const catData = parseFn();

console.log('Men items:', catData.men.length);
console.log('Women items:', catData.women.length);

const allFallback = [];

// Helper to generate full product schema
function convertToFullProduct(item, gender) {
  const catName = item.category?.name || 'Exclusive';
  const slug = item.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${gender.toLowerCase()}`;
  const catSlug = catName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  return {
    _id: item._id,
    name: item.name,
    slug: slug,
    description: `${item.name}. Precision cut and crafted with ultra-fine organic materials and architectural tailoring. Timeless luxury designed to endure seasons.`,
    gender: gender.toLowerCase(),
    categoryName: catName,
    category: {
      _id: `cat-${catSlug}`,
      name: catName,
      slug: catSlug
    },
    price: item.price,
    originalPrice: item.originalPrice || Math.round(item.price * 1.25),
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Monochrome', hex: '#1A1A1A' },
      { name: 'Oatmeal', hex: '#E6DFD5' }
    ],
    images: [
      { url: item.image, isPrimary: true }
    ],
    stock: 75,
    material: 'Premium Organic Blend & Fine Finishing',
    fit: 'tailored',
    tags: [catSlug, gender.toLowerCase(), 'timeless', 'luxury', ...catName.toLowerCase().split(' ')],
    rating: { average: 4.8 + Math.round((Math.random() * 0.2) * 10) / 10, count: Math.floor(Math.random() * 80) + 20 },
    isNewArrival: !!item.isNewArrival,
    isFeatured: Math.random() > 0.6,
    isTrending: Math.random() > 0.5,
    isPublished: true
  };
}

// Convert men items
catData.men.forEach((item) => {
  allFallback.push(convertToFullProduct(item, 'men'));
});

// Convert women items
catData.women.forEach((item) => {
  allFallback.push(convertToFullProduct(item, 'women'));
});

console.log('Total products generated:', allFallback.length);

// Generate JavaScript code
const fileContent = `// Comprehensive fallback catalog with 16+ items per subcategory for Men and Women
export const fallbackProducts = ${JSON.stringify(allFallback, null, 2)};
`;

const serverFallbackPath = path.resolve('server/src/data/fallbackProducts.js');
fs.writeFileSync(serverFallbackPath, fileContent, 'utf8');
console.log('Successfully updated server/src/data/fallbackProducts.js with', allFallback.length, 'products!');
