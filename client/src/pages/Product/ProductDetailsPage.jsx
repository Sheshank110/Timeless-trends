import { useState, useEffect, useMemo } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineHeart,
  HiHeart,
  HiOutlineShoppingBag,
  HiStar,
  HiOutlineTruck,
  HiOutlineRefresh,
  HiOutlineShieldCheck,
  HiMinus,
  HiPlus,
  HiOutlineShare,
  HiChevronDown,
  HiOutlineSparkles,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { addToCart } from '../../features/cart/cartSlice';
import { addToWishlist, removeFromWishlist, selectIsInWishlist } from '../../features/wishlist/wishlistSlice';
import { setCartDrawer } from '../../features/ui/uiSlice';
import { getProductByIdOrSlug, allProducts } from '../../data/products';

// Size options by category for normalization
const sizesByCategory = {
  't-shirts': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  'shirts': ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
  'trousers': ['28', '30', '32', '34', '36', '38'],
  'jeans': ['28', '30', '32', '34', '36', '38'],
  'jackets': ['S', 'M', 'L', 'XL', 'XXL'],
  'blazers': ['XS', 'S', 'M', 'L', 'XL'],
  'shoes': ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
  'dresses': ['XS', 'S', 'M', 'L', 'XL'],
};

const colorsByCategory = {
  't-shirts': [
    { name: 'Onyx Black', hex: '#111111' },
    { name: 'Pure White', hex: '#FFFFFF' },
    { name: 'Navy Blue', hex: '#1B2A4A' },
    { name: 'Olive Green', hex: '#556B2F' },
  ],
  'shirts': [
    { name: 'Classic White', hex: '#FAFAFA' },
    { name: 'Sky Blue', hex: '#87CEEB' },
    { name: 'Charcoal', hex: '#333333' },
    { name: 'Blush Pink', hex: '#FFB6C1' },
  ],
  'trousers': [
    { name: 'Khaki', hex: '#C3B091' },
    { name: 'Charcoal', hex: '#333333' },
    { name: 'Navy', hex: '#1B2A4A' },
    { name: 'Olive', hex: '#556B2F' },
  ],
  'jeans': [
    { name: 'Indigo Wash', hex: '#3F5277' },
    { name: 'Dark Rinse', hex: '#1C2536' },
    { name: 'Light Wash', hex: '#94A3B8' },
    { name: 'Black', hex: '#111111' },
  ],
  'jackets': [
    { name: 'Midnight Black', hex: '#111111' },
    { name: 'Camel', hex: '#C19A6B' },
    { name: 'Navy', hex: '#1B2A4A' },
    { name: 'Olive', hex: '#556B2F' },
  ],
  'blazers': [
    { name: 'Classic Black', hex: '#111111' },
    { name: 'Charcoal Grey', hex: '#4A4A4A' },
    { name: 'Navy', hex: '#1B2A4A' },
    { name: 'Camel', hex: '#C19A6B' },
  ],
  'shoes': [
    { name: 'Black Leather', hex: '#111111' },
    { name: 'Tan Brown', hex: '#8B6914' },
    { name: 'White', hex: '#FAFAFA' },
    { name: 'Burgundy', hex: '#722F37' },
  ],
  'dresses': [
    { name: 'Midnight Black', hex: '#111111' },
    { name: 'Rose', hex: '#C08081' },
    { name: 'Emerald', hex: '#2D6A4F' },
    { name: 'Ivory', hex: '#FFFFF0' },
  ],
};

const materialByCategory = {
  't-shirts': '100% Organic Combed Cotton (200 GSM)',
  'shirts': '100% Premium Egyptian Cotton',
  'trousers': '98% Cotton, 2% Elastane Stretch Blend',
  'jeans': '98% Cotton, 2% Lycra Premium Denim',
  'jackets': 'Premium Wool Blend with Satin Lining',
  'blazers': 'Italian Wool-Cashmere Blend',
  'shoes': 'Full-Grain Calfskin Leather',
  'dresses': 'Premium Silk-Blend Fabric',
};

const fitByCategory = {
  't-shirts': 'relaxed',
  'shirts': 'regular',
  'trousers': 'slim',
  'jeans': 'slim',
  'jackets': 'tailored',
  'blazers': 'tailored',
  'shoes': 'true to size',
  'dresses': 'regular',
};

// Semantic color detection and bucket classification keywords
const colorKeywords = {
  white: ['white', 'ivory', 'ecru', 'cream', 'poplin', 'linen', 'snow'],
  black: ['black', 'onyx', 'midnight', 'carbon', 'dark rinse', 'jet'],
  blue: ['blue', 'navy', 'indigo', 'sky', 'denim', 'chambray', 'stonewash', 'powder'],
  green: ['olive', 'sage', 'emerald', 'army', 'forest'],
  brown: ['camel', 'khaki', 'tan', 'brown', 'caramel', 'cognac', 'taupe', 'sand'],
  pink: ['pink', 'rose', 'blush'],
  grey: ['grey', 'gray', 'charcoal', 'heather', 'smoke', 'ash'],
  burgundy: ['burgundy', 'wine', 'maroon', 'cherry'],
};

export const colorToBucket = (name) => {
  const n = (name || '').toLowerCase();
  if (n.includes('white') || n.includes('ivory')) return 'white';
  if (n.includes('black') || n.includes('dark rinse')) return 'black';
  if (n.includes('navy') || n.includes('blue') || n.includes('indigo') || n.includes('light wash') || n.includes('sky')) return 'blue';
  if (n.includes('olive') || n.includes('green') || n.includes('emerald')) return 'green';
  if (n.includes('camel') || n.includes('khaki') || n.includes('tan') || n.includes('brown')) return 'brown';
  if (n.includes('pink') || n.includes('rose')) return 'pink';
  if (n.includes('charcoal') || n.includes('grey') || n.includes('gray')) return 'grey';
  if (n.includes('burgundy')) return 'burgundy';
  return 'default';
};

export const detectNativeColor = (prod) => {
  if (!prod || !prod.colors || prod.colors.length === 0) return null;
  const text = `${prod.name || ''} ${prod.description || ''}`.toLowerCase();
  for (const [group, words] of Object.entries(colorKeywords)) {
    if (words.some((w) => text.includes(w))) {
      const found = prod.colors.find((c) => {
        const cLower = c.name.toLowerCase();
        return cLower.includes(group) || words.some((w) => cLower.includes(w));
      });
      if (found) return found;
    }
  }
  return prod.colors[0];
};

// Live dynamic garment recolor styling engine
export function getGarmentColorStyle(colorName, hex) {
  if (!colorName && !hex) {
    return { filter: 'none', overlay: 'transparent', blendMode: 'normal', opacity: 0 };
  }

  const n = (colorName || '').toLowerCase();
  const h = (hex || '').toUpperCase();

  // 1. Pure White / Classic White / Ivory / Ecru / Light Cream
  if (
    n.includes('white') ||
    n.includes('ivory') ||
    n.includes('cream') ||
    n.includes('ecru') ||
    h === '#FFFFFF' ||
    h === '#FAFAFA' ||
    h === '#FFFFF0'
  ) {
    return {
      filter: 'brightness(1.85) contrast(0.9) grayscale(0.7)',
      overlay: 'rgba(255, 255, 255, 0.45)',
      blendMode: 'screen',
      opacity: 1,
    };
  }

  // 2. Onyx Black / Classic Black / Midnight Black / Black Leather / Dark Rinse / Charcoal / Jet
  if (
    n.includes('black') ||
    n.includes('onyx') ||
    n.includes('dark rinse') ||
    n.includes('midnight') ||
    n.includes('carbon') ||
    h === '#111111' ||
    h === '#1C2536'
  ) {
    return {
      filter: 'brightness(0.38) contrast(1.3) grayscale(0.5)',
      overlay: 'rgba(15, 15, 18, 0.82)',
      blendMode: 'multiply',
      opacity: 1,
    };
  }

  // 3. Charcoal / Charcoal Grey
  if (n.includes('charcoal') || n.includes('grey') || n.includes('gray') || h === '#333333' || h === '#4A4A4A') {
    return {
      filter: 'brightness(0.55) contrast(1.22) grayscale(0.7)',
      overlay: hex || '#333333',
      blendMode: 'multiply',
      opacity: 0.88,
    };
  }

  // 4. Navy Blue / Indigo / Sky Blue / Light Wash / Indigo Wash
  if (n.includes('navy') || n.includes('indigo') || n.includes('sky') || n.includes('blue') || n.includes('wash')) {
    if (n.includes('sky') || n.includes('light wash')) {
      return {
        filter: 'brightness(1.15) contrast(1.05) saturate(1.2)',
        overlay: hex || '#87CEEB',
        blendMode: 'soft-light',
        opacity: 0.9,
      };
    }
    return {
      filter: 'brightness(0.78) contrast(1.18) saturate(1.25)',
      overlay: hex || '#1B2A4A',
      blendMode: 'multiply',
      opacity: 0.88,
    };
  }

  // 5. Olive Green / Emerald / Sage
  if (n.includes('olive') || n.includes('green') || n.includes('emerald') || n.includes('sage') || h === '#556B2F' || h === '#2D6A4F') {
    return {
      filter: 'brightness(0.82) contrast(1.12) saturate(1.2)',
      overlay: hex || '#556B2F',
      blendMode: 'multiply',
      opacity: 0.86,
    };
  }

  // 6. Camel / Khaki / Tan Brown
  if (n.includes('camel') || n.includes('khaki') || n.includes('tan') || n.includes('brown') || h === '#C19A6B' || h === '#C3B091' || h === '#8B6914') {
    return {
      filter: 'brightness(0.88) contrast(1.08) saturate(1.15)',
      overlay: hex || '#C19A6B',
      blendMode: 'multiply',
      opacity: 0.85,
    };
  }

  // 7. Blush Pink / Rose
  if (n.includes('pink') || n.includes('rose') || n.includes('blush') || h === '#FFB6C1' || h === '#C08081') {
    return {
      filter: 'brightness(0.95) contrast(1.06) saturate(1.2)',
      overlay: hex || '#E8A598',
      blendMode: 'multiply',
      opacity: 0.82,
    };
  }

  // 8. Burgundy / Wine / Maroon
  if (n.includes('burgundy') || n.includes('wine') || n.includes('maroon') || h === '#722F37') {
    return {
      filter: 'brightness(0.72) contrast(1.18) saturate(1.25)',
      overlay: hex || '#722F37',
      blendMode: 'multiply',
      opacity: 0.88,
    };
  }

  // 9. Generic Fallback
  return {
    filter: 'brightness(0.85) contrast(1.1) saturate(1.2)',
    overlay: hex || '#111111',
    blendMode: 'multiply',
    opacity: 0.85,
  };
}

// Verified active, high-resolution color variant photoshoot galleries
export const colorMap = {
  men: {
    't-shirts': {
      'Onyx Black': [
        '/products/essential_tee_black.jpg',
        '/products/essential_tee_black.jpg',
      ],
      'Pure White': [
        '/products/essential_tee_white.jpg',
        '/products/essential_tee_white.jpg',
      ],
      'Navy Blue': [
        '/products/essential_tee_navy.jpg',
        '/products/essential_tee_navy.jpg',
      ],
      'Olive Green': [
        '/products/essential_tee_olive.jpg',
        '/products/essential_tee_olive.jpg',
      ],
    },
    'shirts': {
      'Classic White': [
        'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&q=80&w=800',
      ],
      'Sky Blue': [
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800',
      ],
      'Charcoal': [
        'https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&q=80&w=800',
      ],
      'Blush Pink': [
        'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&q=80&w=800',
      ],
    },
    'trousers': {
      'Khaki': [
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
      ],
      'Charcoal': [
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
      ],
      'Navy': [
        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
      ],
      'Olive': [
        'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      ],
    },
    'jeans': {
      'Indigo Wash': [
        'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      ],
      'Dark Rinse': [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&q=80&w=800',
      ],
      'Light Wash': [
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&q=80&w=800',
      ],
      'Black': [
        'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800',
      ],
    },
    'jackets': {
      'Midnight Black': [
        'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&q=80&w=800',
      ],
      'Camel': [
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800',
      ],
      'Navy': [
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=80&w=800',
      ],
      'Olive': [
        'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800',
      ],
    },
    'blazers': {
      'Classic Black': [
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
      ],
      'Charcoal Grey': [
        'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
      ],
      'Navy': [
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
      ],
      'Camel': [
        'https://images.unsplash.com/photo-1548624313-0396c75e4b1a?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
      ],
    },
    'shoes': {
      'Black Leather': [
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800',
      ],
      'Tan Brown': [
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      ],
      'White': [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      ],
      'Burgundy': [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800',
      ],
    },
  },
  women: {
    'dresses': {
      'Midnight Black': [
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
      ],
      'Rose': [
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
      ],
      'Emerald': [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800',
      ],
      'Ivory': [
        'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800',
      ],
    },
    'blazers': {
      'Classic Black': [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=800',
      ],
      'Charcoal Grey': [
        'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      ],
      'Navy': [
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800',
      ],
      'Camel': [
        'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=800',
      ],
    },
    'trousers': {
      'Khaki': [
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&q=80&w=800',
      ],
      'Charcoal': [
        'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
      ],
      'Navy': [
        'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1551803091-e20673f15770?auto=format&fit=crop&q=80&w=800',
      ],
      'Olive': [
        'https://images.unsplash.com/photo-1517438476312-10d79c077509?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800',
      ],
    },
    'jeans': {
      'Indigo Wash': [
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&q=80&w=800',
      ],
      'Dark Rinse': [
        'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      ],
      'Light Wash': [
        'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&q=80&w=800',
      ],
      'Black': [
        'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&q=80&w=800',
      ],
    },
    'shoes': {
      'Black Leather': [
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800',
      ],
      'Tan Brown': [
        'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
      ],
      'White': [
        'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
      ],
      'Burgundy': [
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800',
      ],
    },
  },
};

/**
 * Normalize product data from any source into the consistent format the component expects.
 * Handles: DB products, server fallback (flat), and any other shape.
 */
const normalizeProduct = (raw) => {
  if (!raw) return null;

  // Determine category name
  const catName = typeof raw.category === 'string'
    ? raw.category
    : (raw.category?.name || raw.categoryName || 'Capsule');
  const catSlug = catName.toLowerCase().replace(/\s+/g, '-');

  // Normalize images: ensure it's always an array of {url, alt}
  let images = raw.images;
  if (!images || !Array.isArray(images) || images.length === 0) {
    const imgUrl = raw.image || '';
    images = imgUrl
      ? [
          { url: imgUrl, alt: `${raw.name} - Front View` },
          { url: imgUrl, alt: `${raw.name} - Detail View` },
        ]
      : [];
  }

  // Normalize rating: ensure it's always {average, count}
  let rating = raw.rating;
  if (typeof rating === 'number') {
    rating = { average: rating, count: raw.reviewsCount || 24 };
  } else if (!rating || typeof rating !== 'object') {
    rating = { average: 4.8, count: 24 };
  }

  // Normalize category: ensure it's always {name, slug}
  const category = typeof raw.category === 'object' && raw.category !== null
    ? { name: raw.category.name || catName, slug: raw.category.slug || catSlug }
    : { name: catName, slug: catSlug };

  return {
    ...raw,
    slug: raw.slug || raw._id,
    category,
    images,
    rating,
    sizes: raw.sizes && raw.sizes.length > 0 ? raw.sizes : (sizesByCategory[catSlug] || ['S', 'M', 'L', 'XL']),
    colors: raw.colors && raw.colors.length > 0 ? raw.colors : (colorsByCategory[catSlug] || [{ name: 'Black', hex: '#111111' }, { name: 'White', hex: '#FAFAFA' }]),
    stock: raw.stock || 45,
    material: raw.material || materialByCategory[catSlug] || '100% Premium Natural Fibers',
    careInstructions: raw.careInstructions || 'Gentle machine wash in cold water. Do not bleach. Dry flat in shade.',
    fit: raw.fit || fitByCategory[catSlug] || 'regular',
    gender: raw.gender || 'men',
    description: raw.description || `${raw.name}. Precision cut and crafted with ultra-fine organic materials and architectural tailoring. Timeless luxury designed to endure seasons.`,
  };
};

const ProductDetailsPage = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Instant zero-lag hydration from router state or local master dataset
  const initialProduct = location.state?.product
    ? normalizeProduct(location.state.product)
    : normalizeProduct(getProductByIdOrSlug(slug));
  const initialNativeColor = initialProduct ? detectNativeColor(initialProduct) : null;

  const [product, setProduct] = useState(initialProduct);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState(initialProduct?.sizes?.[0] || '');
  const [selectedColor, setSelectedColor] = useState(initialNativeColor || initialProduct?.colors?.[0] || null);
  const [hasUserSelectedColor, setHasUserSelectedColor] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(!initialProduct);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState('details');

  // Compute display images: prioritize direct colorway images (e.g. dedicated matching photoshoot)
  // Otherwise, ALWAYS use product.images to ensure the exact cloth and model are preserved!
  const displayImages = useMemo(() => {
    if (!product) return [];

    // 1. Direct colorway image on the selected color object (Highest Priority!)
    if (selectedColor?.images && selectedColor.images.length > 0) {
      return selectedColor.images;
    }
    if (selectedColor?.image) {
      return [
        { url: selectedColor.image, alt: `${product.name} - ${selectedColor.name} - Front View` },
        { url: selectedColor.image, alt: `${product.name} - ${selectedColor.name} - Detail View` },
      ];
    }

    // 2. Look for matching color in product.colors that has an image
    if (selectedColor && product.colors) {
      const match = product.colors.find(
        (c) => (c.name || '').toLowerCase() === (selectedColor.name || '').toLowerCase() || c.hex === selectedColor.hex
      );
      if (match?.images && match.images.length > 0) return match.images;
      if (match?.image) {
        return [
          { url: match.image, alt: `${product.name} - ${match.name} - Front View` },
          { url: match.image, alt: `${product.name} - ${match.name} - Detail View` },
        ];
      }
    }

    // 3. Fallback: ALWAYS preserve authentic product images (same cloth, same photoshoot)
    return product.images && product.images.length > 0
      ? product.images
      : [{ url: product.image, alt: product.name }];
  }, [product, selectedColor]);

  // Clean, photorealistic garment recoloring on color swatch click
  const colorTintStyle = useMemo(() => {
    if (!product || !selectedColor) {
      return { filter: 'none', overlay: 'transparent', blendMode: 'normal', opacity: 0 };
    }

    // If this colorway already has dedicated matching photoshoot images (e.g. men-tshirt-1), no CSS filter needed
    if (selectedColor.images && selectedColor.images.length > 0) {
      return { filter: 'none', overlay: 'transparent', blendMode: 'normal', opacity: 0 };
    }
    if (selectedColor.image) {
      return { filter: 'none', overlay: 'transparent', blendMode: 'normal', opacity: 0 };
    }
    if (product.colors) {
      const match = product.colors.find(
        (c) => (c.name || '').toLowerCase() === (selectedColor.name || '').toLowerCase() || c.hex === selectedColor.hex
      );
      if (match?.image || (match?.images && match.images.length > 0)) {
        return { filter: 'none', overlay: 'transparent', blendMode: 'normal', opacity: 0 };
      }
    }

    // If user hasn't clicked any color swatch yet, show the authentic unedited studio photo
    if (!hasUserSelectedColor) {
      return { filter: 'none', overlay: 'transparent', blendMode: 'normal', opacity: 0 };
    }

    // Apply live dynamic garment recolor for the clicked colorway
    return getGarmentColorStyle(selectedColor.name, selectedColor.hex);
  }, [product, selectedColor, hasUserSelectedColor]);

  // Reset gallery to first image when color changes
  useEffect(() => {
    setActiveImageIndex(0);
  }, [selectedColor]);

  const inWishlist = useSelector((state) => (product ? selectIsInWishlist(product._id)(state) : false));

  useEffect(() => {
    // Reset view and state when navigating between products
    setActiveImageIndex(0);
    setHasUserSelectedColor(false);
    const currentResolved = location.state?.product
      ? normalizeProduct(location.state.product)
      : normalizeProduct(getProductByIdOrSlug(slug));

    if (currentResolved) {
      setProduct(currentResolved);
      const native = detectNativeColor(currentResolved);
      setSelectedColor(native || currentResolved.colors?.[0] || null);
      if (currentResolved.sizes && currentResolved.sizes.length > 0) {
        setSelectedSize(currentResolved.sizes[0]);
      }
    }

    const fetchProduct = async () => {
      if (!currentResolved) {
        setIsLoading(true);
      }
      try {
        const { data } = await api.get(`/products/${slug}`);
        const prod = normalizeProduct(data.data);
        if (prod) {
          setProduct(prod);
          const native = detectNativeColor(prod);
          setSelectedColor(native || prod.colors?.[0] || null);
          if (prod.sizes && prod.sizes.length > 0) {
            setSelectedSize(prod.sizes[0]);
          }

          try {
            const relatedRes = await api.get(`/products/${prod._id}/related`);
            if (relatedRes.data?.data && relatedRes.data.data.length > 0) {
              setRelatedProducts(relatedRes.data.data.map(normalizeProduct));
            } else {
              const currentCat = (prod.category?.slug || prod.category?.name || '').toLowerCase();
              const rel = allProducts
                .filter((p) => p._id !== prod._id && (p.category?.slug || '').toLowerCase() === currentCat)
                .slice(0, 4)
                .map(normalizeProduct);
              setRelatedProducts(rel);
            }
          } catch {
            const currentCat = (prod.category?.slug || prod.category?.name || '').toLowerCase();
            const rel = allProducts
              .filter((p) => p._id !== prod._id && (p.category?.slug || '').toLowerCase() === currentCat)
              .slice(0, 4)
              .map(normalizeProduct);
            setRelatedProducts(rel);
          }
        }
      } catch (error) {
        console.warn('Network product fetch failed, utilizing client catalog:', error?.message);
        if (currentResolved) {
          const currentCat = (currentResolved.category?.slug || currentResolved.category?.name || '').toLowerCase();
          const rel = allProducts
            .filter((p) => p._id !== currentResolved._id && (p.category?.slug || '').toLowerCase() === currentCat)
            .slice(0, 4)
            .map(normalizeProduct);
          setRelatedProducts(rel);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [slug]);

  const handleAddToCart = () => {
    if (!product) return;
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    const item = {
      _id: `${product._id}-${selectedSize}-${selectedColor?.name || 'default'}`,
      product: product._id,
      name: product.name,
      price: product.price,
      image: displayImages?.[0]?.url || product.images?.[0]?.url || '',
      size: selectedSize,
      color: selectedColor?.name || '',
      quantity,
      stock: product.stock,
    };

    dispatch(addToCart(item));
    toast.success(`Added ${product.name} (${selectedSize}) to Bag`);
    dispatch(setCartDrawer(true));
  };

  const handleToggleWishlist = () => {
    if (!product) return;
    if (inWishlist) {
      dispatch(removeFromWishlist(product._id));
      toast.success('Removed from wishlist');
    } else {
      dispatch(addToWishlist(product));
      toast.success('Saved to wishlist');
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 aspect-[3/4] skeleton rounded-lg" />
          <div className="lg:col-span-5 space-y-6">
            <div className="h-4 skeleton w-1/4" />
            <div className="h-8 skeleton w-3/4" />
            <div className="h-6 skeleton w-1/3" />
            <div className="h-28 skeleton w-full" />
            <div className="h-14 skeleton w-full" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="font-serif text-2xl mb-4">Garment Not Found</h2>
        <Link to="/shop" className="px-6 py-2.5 bg-primary text-text-inverse text-xs tracking-[0.14em] uppercase">
          Back to Shop
        </Link>
      </div>
    );
  }

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <>
      <Helmet>
        <title>{`${product.name} — TIMELESS TRENDS Atelier`}</title>
        <meta name="description" content={product.description?.substring(0, 160)} />
      </Helmet>

      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 py-8 lg:py-16">
        {/* Breadcrumb Navigation */}
        <nav className="flex items-center gap-2 text-[11px] text-text-muted mb-8 uppercase tracking-[0.12em] font-sans">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-primary transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop/${product.gender}`} className="hover:text-primary transition-colors capitalize">{product.gender}</Link>
          <span>/</span>
          <span className="text-primary truncate max-w-[240px] sm:max-w-none font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Media Gallery (7 cols) */}
          <div className="lg:col-span-7 flex flex-col-reverse md:flex-row gap-4 sticky top-24">
            {/* Thumbnails */}
            {displayImages && displayImages.length > 1 && (
              <div className="flex md:flex-col gap-3 overflow-x-auto md:overflow-y-auto max-h-[640px] shrink-0 scrollbar-none">
                {displayImages.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveImageIndex(index)}
                    className={`w-16 sm:w-20 aspect-[3/4] rounded-md transition-all overflow-hidden relative shrink-0 ${
                      activeImageIndex === index
                        ? 'border-2 border-primary ring-2 ring-primary/20 scale-[0.98]'
                        : 'border border-border opacity-70 hover:opacity-100 hover:scale-[1.02]'
                    }`}
                  >
                    <img src={img.url} alt={img.alt || product.name} className="w-full h-full object-cover" style={{ filter: colorTintStyle.filter, transition: 'filter 0.4s ease' }} />
                    {colorTintStyle.opacity > 0 && (
                      <div
                        className="absolute inset-0 pointer-events-none transition-all duration-400"
                        style={{
                          background: colorTintStyle.overlay,
                          mixBlendMode: colorTintStyle.blendMode,
                          opacity: colorTintStyle.opacity,
                        }}
                      />
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Featured Image */}
            <div className="flex-1 relative aspect-[3/4] bg-bg-secondary rounded-lg overflow-hidden group shadow-sm">
              {displayImages && displayImages[activeImageIndex] ? (
                <>
                  <motion.img
                    key={`${activeImageIndex}-${selectedColor?.name}`}
                    src={displayImages[activeImageIndex].url}
                    alt={displayImages[activeImageIndex].alt || product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out cursor-zoom-in"
                    style={{ filter: colorTintStyle.filter, transition: 'filter 0.4s ease' }}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  {colorTintStyle.opacity > 0 && (
                    <motion.div
                      key={`tint-${selectedColor?.name}`}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background: colorTintStyle.overlay,
                        mixBlendMode: colorTintStyle.blendMode,
                      }}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: colorTintStyle.opacity }}
                      transition={{ duration: 0.4 }}
                    />
                  )}
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center font-serif text-3xl text-text-light">
                  {product.name}
                </div>
              )}

              {discountPercent > 0 && (
                <span className="absolute top-4 left-4 bg-primary text-text-inverse text-[10px] uppercase tracking-[0.14em] px-3 py-1 font-semibold rounded-xs shadow-xs">
                  {discountPercent}% OFF
                </span>
              )}
            </div>
          </div>

          {/* Right Product Summary & Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-7">
            <div>
              {/* Category tag & Rating */}
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-[11px] tracking-[0.2em] uppercase text-text-muted font-medium">
                  {product.gender} · {product.category?.name || 'Capsule Collection'}
                </span>
                <div className="flex items-center gap-1.5">
                  <div className="flex items-center text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <HiStar
                        key={i}
                        className={`w-3.5 h-3.5 ${i < Math.round(product.rating?.average || 5) ? 'text-primary' : 'text-gray-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-text-secondary font-medium tabular-nums">
                    ({product.rating?.count || 48} reviews)
                  </span>
                </div>
              </div>

              {/* Title */}
              <h1 className="font-serif text-3xl sm:text-4xl text-primary tracking-[-0.01em] leading-tight mb-4">
                {product.name}
              </h1>

              {/* Price Row */}
              <div className="flex items-baseline gap-3 pb-6 border-b border-border-light">
                <span className="text-2xl sm:text-3xl font-bold text-primary tabular-nums">
                  ₹{product.price?.toLocaleString()}
                </span>
                {product.originalPrice && product.originalPrice > product.price && (
                  <span className="text-base text-text-muted line-through tabular-nums">
                    ₹{product.originalPrice?.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-text-muted font-sans ml-auto">
                  GST included · Free express shipping
                </span>
              </div>
            </div>

            {/* Color Swatches */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-[0.14em] uppercase text-text-secondary font-semibold">
                    Colorway: <span className="text-primary font-bold">{selectedColor?.name}</span>
                  </span>
                  {hasUserSelectedColor && (
                    <button
                      type="button"
                      onClick={() => setHasUserSelectedColor(false)}
                      className="text-[11px] text-text-muted hover:text-primary transition-colors underline underline-offset-2"
                    >
                      Reset Original
                    </button>
                  )}
                </div>
                <div className="flex items-center gap-3.5 p-1">
                  {product.colors.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => {
                        setSelectedColor(color);
                        setHasUserSelectedColor(true);
                      }}
                      className={`w-8 h-8 rounded-full border p-0.5 transition-all flex items-center justify-center ${
                        selectedColor?.name === color.name
                          ? 'border-primary ring-2 ring-primary/40 ring-offset-2 scale-105'
                          : 'border-transparent hover:scale-110'
                      }`}
                      title={color.name}
                    >
                      <span
                        className="w-full h-full rounded-full border border-black/10 shadow-2xs"
                        style={{ backgroundColor: color.hex }}
                      />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector & Size Guide */}
            {product.sizes && product.sizes.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs tracking-[0.14em] uppercase text-text-secondary font-semibold">
                    Select Size
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsSizeGuideOpen(true)}
                    className="text-xs text-primary underline underline-offset-4 hover:text-text-secondary transition-colors font-medium"
                  >
                    Size Guide
                  </button>
                </div>
                <div className="grid grid-cols-6 gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 text-xs tracking-[0.06em] font-semibold uppercase rounded-sm border transition-all ${
                        selectedSize === size
                          ? 'bg-primary text-white border-primary shadow-xs'
                          : 'border-border hover:border-primary text-primary bg-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {/* Quantity Controls */}
                <div className="flex items-center border border-border rounded h-12 bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3.5 h-full text-text-secondary hover:text-primary transition-colors"
                    aria-label="Decrease quantity"
                  >
                    <HiMinus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-9 text-center text-xs font-bold tabular-nums">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3.5 h-full text-text-secondary hover:text-primary transition-colors"
                    aria-label="Increase quantity"
                  >
                    <HiPlus className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Add to Bag Button */}
                <motion.button
                  onClick={handleAddToCart}
                  className="flex-1 h-12 bg-primary text-white text-xs tracking-[0.16em] uppercase font-semibold hover:bg-primary-light transition-all rounded flex items-center justify-center gap-2 shadow-sm"
                  whileTap={{ scale: 0.98 }}
                >
                  <HiOutlineShoppingBag className="w-4 h-4" />
                  Add to Bag
                </motion.button>

                {/* Wishlist Button */}
                <button
                  onClick={handleToggleWishlist}
                  className={`w-12 h-12 border rounded flex items-center justify-center transition-all ${
                    inWishlist
                      ? 'border-primary bg-primary text-white shadow-xs'
                      : 'border-border bg-white hover:border-primary text-primary'
                  }`}
                  aria-label="Save to wishlist"
                >
                  {inWishlist ? <HiHeart className="w-5 h-5 text-red-500" /> : <HiOutlineHeart className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Assurances Row */}
            <div className="grid grid-cols-3 gap-3 py-6 border-y border-border-light text-center text-[11px] text-text-secondary font-medium">
              <div className="flex flex-col items-center gap-1">
                <HiOutlineTruck className="w-4.5 h-4.5 text-primary" />
                <span>Complimentary Express Courier</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <HiOutlineRefresh className="w-4.5 h-4.5 text-primary" />
                <span>14-Day Doorstep Returns</span>
              </div>
              <div className="flex flex-col items-center gap-1">
                <HiOutlineShieldCheck className="w-4.5 h-4.5 text-primary" />
                <span>Certified Sustainable Textile</span>
              </div>
            </div>

            {/* Accordions */}
            <div className="divide-y divide-border-light text-left">
              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'details' ? '' : 'details')}
                  className="w-full py-4 flex items-center justify-between text-xs tracking-[0.14em] uppercase font-semibold text-primary"
                >
                  <span>Silhouette & Craft Specifications</span>
                  <HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'details' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'details' && (
                  <div className="pb-4 text-xs text-text-secondary leading-relaxed space-y-2.5">
                    <p>{product.description}</p>
                    {product.fit && <p><strong className="text-primary">Fit Type:</strong> {product.fit.toUpperCase()}</p>}
                    {product.material && <p><strong className="text-primary">Composition:</strong> {product.material}</p>}
                  </div>
                )}
              </div>

              <div>
                <button
                  onClick={() => setOpenAccordion(openAccordion === 'care' ? '' : 'care')}
                  className="w-full py-4 flex items-center justify-between text-xs tracking-[0.14em] uppercase font-semibold text-primary"
                >
                  <span>Textile Care Guide</span>
                  <HiChevronDown className={`w-4 h-4 transition-transform duration-300 ${openAccordion === 'care' ? 'rotate-180' : ''}`} />
                </button>
                {openAccordion === 'care' && (
                  <div className="pb-4 text-xs text-text-secondary leading-relaxed">
                    <p>{product.careInstructions || 'Gentle cold cycle wash inside out. Hang dry in shade to preserve cotton hand feel.'}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products / Complete the Look */}
        {relatedProducts.length > 0 && (
          <div className="mt-20 pt-16 border-t border-border-light">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-[10px] uppercase tracking-[0.24em] text-text-muted font-medium block mb-1">
                  Atelier Curation
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-primary">Complete the Look</h3>
              </div>
              <Link
                to={`/shop/${(product?.gender || 'men').toLowerCase()}`}
                className="text-xs uppercase tracking-[0.14em] font-semibold text-primary border-b border-primary pb-0.5 hover:opacity-60 transition-opacity"
              >
                View Collection →
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {relatedProducts.map((rel) => (
                <Link
                  key={rel._id}
                  to={`/product/${rel.slug || rel._id}`}
                  state={{ product: rel }}
                  className="group block"
                >
                  <div className="aspect-[3/4] bg-[#F3EFE9] rounded-lg overflow-hidden mb-3 relative shadow-2xs">
                    <img
                      src={rel.images?.[0]?.url || rel.image}
                      alt={rel.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <p className="text-[10px] text-text-muted uppercase tracking-[0.1em] mb-1">
                    {rel.category?.name || 'Exclusive'}
                  </p>
                  <h4 className="text-xs sm:text-sm font-semibold text-primary truncate group-hover:opacity-70 transition-opacity mb-1">
                    {rel.name}
                  </h4>
                  <p className="text-xs sm:text-sm font-bold text-primary tabular-nums">
                    ₹{rel.price?.toLocaleString()}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Size Guide Modal */}
        <AnimatePresence>
          {isSizeGuideOpen && (
            <motion.div
              className="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSizeGuideOpen(false)}
            >
              <motion.div
                className="bg-bg w-full max-w-lg p-8 rounded-lg shadow-2xl border border-border relative"
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between pb-4 border-b border-border mb-6">
                  <h3 className="font-serif text-2xl text-primary">Measurement Guide (Inches)</h3>
                  <button onClick={() => setIsSizeGuideOpen(false)} className="text-text-muted hover:text-primary text-xl">
                    ✕
                  </button>
                </div>

                <div className="overflow-x-auto mb-6">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-primary/20 text-[10px] tracking-[0.15em] uppercase text-text-muted font-bold">
                        <th className="py-2.5 px-3">Size</th>
                        <th className="py-2.5 px-3">Chest</th>
                        <th className="py-2.5 px-3">Waist</th>
                        <th className="py-2.5 px-3">Length</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border-light text-text-secondary tabular-nums">
                      <tr><td className="py-2.5 px-3 font-bold text-primary">XS</td><td className="py-2.5 px-3">36"</td><td className="py-2.5 px-3">30"</td><td className="py-2.5 px-3">27"</td></tr>
                      <tr><td className="py-2.5 px-3 font-bold text-primary">S</td><td className="py-2.5 px-3">38"</td><td className="py-2.5 px-3">32"</td><td className="py-2.5 px-3">28"</td></tr>
                      <tr><td className="py-2.5 px-3 font-bold text-primary">M</td><td className="py-2.5 px-3">40"</td><td className="py-2.5 px-3">34"</td><td className="py-2.5 px-3">29"</td></tr>
                      <tr><td className="py-2.5 px-3 font-bold text-primary">L</td><td className="py-2.5 px-3">42"</td><td className="py-2.5 px-3">36"</td><td className="py-2.5 px-3">30"</td></tr>
                      <tr><td className="py-2.5 px-3 font-bold text-primary">XL</td><td className="py-2.5 px-3">44"</td><td className="py-2.5 px-3">38"</td><td className="py-2.5 px-3">31"</td></tr>
                      <tr><td className="py-2.5 px-3 font-bold text-primary">XXL</td><td className="py-2.5 px-3">46"</td><td className="py-2.5 px-3">40"</td><td className="py-2.5 px-3">32"</td></tr>
                    </tbody>
                  </table>
                </div>

                <p className="text-[11px] text-text-muted leading-relaxed">
                  * Our oversized garments feature intentional relaxed proportions with dropped shoulder seams. Order your true size for the intended silhouette.
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default ProductDetailsPage;
