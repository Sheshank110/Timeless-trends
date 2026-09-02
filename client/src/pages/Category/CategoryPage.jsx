import { useState, useEffect, useCallback } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { HiOutlineShieldCheck, HiOutlineSparkles, HiOutlineTruck, HiArrowRight, HiOutlineInformationCircle } from 'react-icons/hi';
import api from '../../services/api';
import menHero from '../../assets/men-hero.jpg';
import womenHero from '../../assets/women-hero.jpg';

// Dedicated fallback collections so category pages always render rich, relevant pieces
const categoryFallbackProducts = {
  men: [
    // ── Shirts ──
    {
      _id: 'men-shirt-1',
      name: 'Pure European Linen Spread Shirt',
      price: 2199,
      originalPrice: 2799,
      category: { name: 'Shirts' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-shirt-2',
      name: 'Classic Oxford Cloth Button-Down',
      price: 1899,
      originalPrice: 2499,
      category: { name: 'Shirts' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'men-shirt-3',
      name: 'Camp Collar Relaxed Linen Shirt',
      price: 1999,
      originalPrice: 2599,
      category: { name: 'Shirts' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-shirt-4',
      name: 'Heavyweight Brushed Flannel Overshirt',
      price: 2399,
      originalPrice: 3099,
      category: { name: 'Shirts' },
      gender: 'Men',
      image: '/products/flannel-overshirt.jpg',
      isNewArrival: true,
    },
    {
      _id: 'men-shirt-5',
      name: 'Japanese Selvedge Chambray Workshirt',
      price: 2299,
      originalPrice: 2899,
      category: { name: 'Shirts' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-shirt-6',
      name: 'Cuban Collar Striped Resort Shirt',
      price: 1799,
      originalPrice: 2399,
      category: { name: 'Shirts' },
      gender: 'Men',
      image: '/products/striped-resort-shirt.jpg',
      isNewArrival: false,
    },
    {
      _id: 'men-shirt-7',
      name: 'Crisp Cotton Poplin Formal Shirt',
      price: 1899,
      originalPrice: 2499,
      category: { name: 'Shirts' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'men-shirt-8',
      name: 'Minimalist Boxy Overshirt',
      price: 1999,
      originalPrice: 2599,
      category: { name: 'Shirts' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-shirt-9',
      name: 'Tailored Chambray Button-Down',
      price: 1799,
      originalPrice: 2299,
      category: { name: 'Shirts' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-shirt-10',
      name: 'Fine Linen Structured Casual Shirt',
      price: 2099,
      originalPrice: 2699,
      category: { name: 'Shirts' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },

    // ── Jeans ──
    {
      _id: 'men-jean-1',
      name: 'Japanese Selvedge Dark Straight Jeans',
      price: 2899,
      originalPrice: 3699,
      category: { name: 'Jeans' },
      gender: 'Men',
      image: '/products/selvedge-straight-jeans.jpg',
      isNewArrival: false,
    },
    {
      _id: 'men-jean-2',
      name: 'Vintage Fade Relaxed Tapered Jeans',
      price: 2499,
      originalPrice: 3199,
      category: { name: 'Jeans' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'men-jean-3',
      name: 'Classic Stonewash Straight Denim',
      price: 2299,
      originalPrice: 2999,
      category: { name: 'Jeans' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-jean-4',
      name: 'Jet Black Comfort Stretch Slim Jeans',
      price: 2199,
      originalPrice: 2799,
      category: { name: 'Jeans' },
      gender: 'Men',
      image: '/products/black-slim-jeans.jpg',
      isNewArrival: false,
    },
    {
      _id: 'men-jean-5',
      name: 'Wide-Leg Carpenter Denim Trousers',
      price: 2599,
      originalPrice: 3299,
      category: { name: 'Jeans' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'men-jean-6',
      name: 'Ecru Natural Raw Cotton Jeans',
      price: 2699,
      originalPrice: 3399,
      category: { name: 'Jeans' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-jean-7',
      name: 'Architectural Stack Washed Denim',
      price: 2499,
      originalPrice: 3199,
      category: { name: 'Jeans' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-jean-8',
      name: 'Relaxed Fit Indigo Selvedge Jeans',
      price: 2799,
      originalPrice: 3499,
      category: { name: 'Jeans' },
      gender: 'Men',
      image: '/products/selvedge-straight-jeans.jpg',
      isNewArrival: true,
    },
    {
      _id: 'men-jean-9',
      name: 'Stay-Black Tailored Denim Slacks',
      price: 2399,
      originalPrice: 2999,
      category: { name: 'Jeans' },
      gender: 'Men',
      image: '/products/black-slim-jeans.jpg',
      isNewArrival: false,
    },

    // ── Jackets ──
    {
      _id: 'men-jacket-1',
      name: 'Structured Utility Overcoat',
      price: 5499,
      originalPrice: 6999,
      category: { name: 'Jackets' },
      gender: 'Men',
      image: '/products/structured-overcoat.jpg',
      isNewArrival: true,
    },
    {
      _id: 'men-jacket-2',
      name: 'Minimalist Twill Shacket',
      price: 3199,
      originalPrice: 3999,
      category: { name: 'Jackets' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-jacket-3',
      name: 'Tailored Minimalist Utility Jacket',
      price: 3999,
      originalPrice: 4999,
      category: { name: 'Jackets' },
      gender: 'Men',
      image: '/products/utility-field-jacket.jpg',
      isNewArrival: false,
    },
    {
      _id: 'men-jacket-4',
      name: 'Vintage Biker Leather Jacket',
      price: 4699,
      originalPrice: 5999,
      category: { name: 'Jackets' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'men-jacket-5',
      name: 'Heavy Wale Corduroy Trucker Jacket',
      price: 3499,
      originalPrice: 4499,
      category: { name: 'Jackets' },
      gender: 'Men',
      image: '/products/corduroy-trucker-jacket.jpg',
      isNewArrival: false,
    },
    {
      _id: 'men-jacket-6',
      name: 'Classic Double-Breasted Wool Trench',
      price: 5999,
      originalPrice: 7499,
      category: { name: 'Jackets' },
      gender: 'Men',
      image: '/products/wool-trench-coat.jpg',
      isNewArrival: false,
    },
    {
      _id: 'men-jacket-7',
      name: 'Classic Denim Trucker Jacket',
      price: 3299,
      originalPrice: 4199,
      category: { name: 'Jackets' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-jacket-8',
      name: 'Tailored Single-Breasted Wool Blazer',
      price: 5299,
      originalPrice: 6699,
      category: { name: 'Jackets' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'men-jacket-9',
      name: 'Urban Café Racer Leather Jacket',
      price: 4899,
      originalPrice: 6299,
      category: { name: 'Jackets' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-jacket-10',
      name: 'Heavy Twill Double-Rider Biker Jacket',
      price: 4499,
      originalPrice: 5799,
      category: { name: 'Jackets' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-jacket-11',
      name: 'Hand-Burnished Suede Field Jacket',
      price: 4599,
      originalPrice: 5899,
      category: { name: 'Jackets' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },

    // ── Trousers ──
    {
      _id: 'men-trouser-1',
      name: 'Tailored Pleated Wool Trousers',
      price: 2799,
      originalPrice: 3599,
      category: { name: 'Trousers' },
      gender: 'Men',
      image: '/products/pleated-wool-trousers.jpg',
      isNewArrival: false,
    },
    {
      _id: 'men-trouser-2',
      name: 'Relaxed Fit Pure Linen Trousers',
      price: 2299,
      originalPrice: 2999,
      category: { name: 'Trousers' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'men-trouser-3',
      name: 'Slim Tapered Stretch Cotton Chinos',
      price: 1999,
      originalPrice: 2599,
      category: { name: 'Trousers' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-trouser-4',
      name: 'Wide-Leg Architectural Pleated Trousers',
      price: 2699,
      originalPrice: 3499,
      category: { name: 'Trousers' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-trouser-5',
      name: 'Refined Minimalist Cargo Trousers',
      price: 2499,
      originalPrice: 3199,
      category: { name: 'Trousers' },
      gender: 'Men',
      image: '/products/cargo-trousers.jpg',
      isNewArrival: true,
    },
    {
      _id: 'men-trouser-6',
      name: 'Cropped Smart Ankle Flannel Trousers',
      price: 2599,
      originalPrice: 3299,
      category: { name: 'Trousers' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-trouser-7',
      name: 'Glen Check Sartorial Wool Slacks',
      price: 2699,
      originalPrice: 3399,
      category: { name: 'Trousers' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-trouser-8',
      name: 'Heavyweight Cotton Canvas Utility Trousers',
      price: 2399,
      originalPrice: 2999,
      category: { name: 'Trousers' },
      gender: 'Men',
      image: '/products/cargo-trousers.jpg',
      isNewArrival: true,
    },
    {
      _id: 'men-trouser-9',
      name: 'Drawstring Travel Pleated Slacks',
      price: 2199,
      originalPrice: 2799,
      category: { name: 'Trousers' },
      gender: 'Men',
      image: '/products/pleated-wool-trousers.jpg',
      isNewArrival: false,
    },

    // ── Shoes (Renamed from Knitwear) ──
    {
      _id: 'men-shoe-1',
      name: 'Italian Minimalist Leather Low-Top Sneakers',
      price: 3299,
      originalPrice: 4299,
      category: { name: 'Shoes' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'men-shoe-2',
      name: 'Handcrafted Suede Chelsea Boots',
      price: 4499,
      originalPrice: 5699,
      category: { name: 'Shoes' },
      gender: 'Men',
      image: '/products/suede-chelsea-boots.jpg',
      isNewArrival: false,
    },
    {
      _id: 'men-shoe-3',
      name: 'Classic Calfskin Penny Loafers',
      price: 3899,
      originalPrice: 4899,
      category: { name: 'Shoes' },
      gender: 'Men',
      image: '/products/penny-loafers.jpg',
      isNewArrival: true,
    },
    {
      _id: 'men-shoe-4',
      name: 'Chunky Lug-Sole Leather Derby Shoes',
      price: 3999,
      originalPrice: 5199,
      category: { name: 'Shoes' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-shoe-5',
      name: 'Retro Gum-Sole Court Sneakers',
      price: 2699,
      originalPrice: 3499,
      category: { name: 'Shoes' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-shoe-6',
      name: 'Sand Suede Desert Chukka Boots',
      price: 3499,
      originalPrice: 4499,
      category: { name: 'Shoes' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-shoe-7',
      name: 'Heritage Penny Loafers with Metal Bit',
      price: 3699,
      originalPrice: 4699,
      category: { name: 'Shoes' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1616406432452-07bc5938759d?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'men-shoe-8',
      name: 'Crimson Court Athletic Low-Top Sneakers',
      price: 2999,
      originalPrice: 3899,
      category: { name: 'Shoes' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-shoe-9',
      name: 'Classic Canvas Skater Court Shoes',
      price: 2499,
      originalPrice: 3199,
      category: { name: 'Shoes' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'men-shoe-10',
      name: 'Olive Suede Low-Profile Trainers',
      price: 2899,
      originalPrice: 3699,
      category: { name: 'Shoes' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'men-shoe-11',
      name: 'Air Cushion Minimalist Athletic Trainers',
      price: 3499,
      originalPrice: 4399,
      category: { name: 'Shoes' },
      gender: 'Men',
      image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
  ],
  women: [
    // ── Dresses ──
    {
      _id: 'women-dress-1',
      name: 'Champagne Silk Bias-Cut Slip Maxi Dress',
      price: 4599,
      originalPrice: 5799,
      category: { name: 'Dresses' },
      gender: 'Women',
      image: '/products/champagne-silk-slip-dress.jpg',
      isNewArrival: true,
    },
    {
      _id: 'women-dress-2',
      name: 'Asymmetrical Draped Floral Linen Midi',
      price: 4299,
      originalPrice: 5499,
      category: { name: 'Dresses' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'women-dress-3',
      name: 'Midnight Satin Cocktail Slip Dress',
      price: 3999,
      originalPrice: 4999,
      category: { name: 'Dresses' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'women-dress-4',
      name: 'Heavyweight Streetwear Hoodie Dress',
      price: 2899,
      originalPrice: 3699,
      category: { name: 'Dresses' },
      gender: 'Women',
      image: '/products/streetwear-hoodie-dress.jpg',
      isNewArrival: false,
    },
    {
      _id: 'women-dress-5',
      name: 'Tiered Smocked Summer Day Dress',
      price: 2499,
      originalPrice: 3199,
      category: { name: 'Dresses' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'women-dress-6',
      name: 'Ribbed Streetwear Bodycon Midi Dress',
      price: 2199,
      originalPrice: 2799,
      category: { name: 'Dresses' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },

    // ── Blazers ──
    {
      _id: 'women-blazer-1',
      name: 'Structured Double-Breasted Wool Blazer',
      price: 5499,
      originalPrice: 6999,
      category: { name: 'Blazers' },
      gender: 'Women',
      image: '/products/tailored-double-breasted-blazer.jpg',
      isNewArrival: true,
    },
    {
      _id: 'women-blazer-2',
      name: 'Oversized Streetwear Boxy Wool Blazer',
      price: 4899,
      originalPrice: 6199,
      category: { name: 'Blazers' },
      gender: 'Women',
      image: '/products/oversized-boxy-blazer.jpg',
      isNewArrival: false,
    },
    {
      _id: 'women-blazer-3',
      name: 'Sleek Lambskin Tailored Leather Blazer',
      price: 5999,
      originalPrice: 7499,
      category: { name: 'Blazers' },
      gender: 'Women',
      image: '/products/leather-tailored-blazer.jpg',
      isNewArrival: true,
    },
    {
      _id: 'women-blazer-4',
      name: 'Organic French Linen Relaxed Blazer',
      price: 4699,
      originalPrice: 5899,
      category: { name: 'Blazers' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'women-blazer-5',
      name: 'Minimalist Pinstripe Tailored Blazer',
      price: 5299,
      originalPrice: 6599,
      category: { name: 'Blazers' },
      gender: 'Women',
      image: '/products/pinstripe-tailored-blazer.jpg',
      isNewArrival: false,
    },
    {
      _id: 'women-blazer-6',
      name: 'Contemporary Streetwear Houndstooth Blazer',
      price: 4499,
      originalPrice: 5699,
      category: { name: 'Blazers' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },

    // ── Trousers ──
    {
      _id: 'women-trouser-1',
      name: 'High-Waisted Tailored Pleated Trousers',
      price: 3299,
      originalPrice: 4199,
      category: { name: 'Trousers' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'women-trouser-2',
      name: 'Wide-Leg Minimalist Drape Trousers',
      price: 2999,
      originalPrice: 3799,
      category: { name: 'Trousers' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'women-trouser-3',
      name: 'Streetwear Wide-Leg Utility Cargo Pants',
      price: 2799,
      originalPrice: 3499,
      category: { name: 'Trousers' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'women-trouser-4',
      name: 'Sartorial Pinstripe Wool Slacks',
      price: 3499,
      originalPrice: 4399,
      category: { name: 'Trousers' },
      gender: 'Women',
      image: '/products/pleated-wool-trousers.jpg',
      isNewArrival: false,
    },
    {
      _id: 'women-trouser-5',
      name: 'Relaxed High-Rise Linen Drawstring Slacks',
      price: 2699,
      originalPrice: 3399,
      category: { name: 'Trousers' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },

    // ── Jeans ──
    {
      _id: 'women-jean-1',
      name: '90s Loose Baggy Skater Denim',
      price: 2799,
      originalPrice: 3599,
      category: { name: 'Jeans' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'women-jean-2',
      name: 'High-Rise Vintage Washed Straight Jeans',
      price: 2999,
      originalPrice: 3799,
      category: { name: 'Jeans' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'women-jean-3',
      name: 'Stonewash Distressed Boyfriend Jeans',
      price: 2699,
      originalPrice: 3399,
      category: { name: 'Jeans' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'women-jean-4',
      name: 'Raw Indigo Rigid High-Waist Denim',
      price: 3299,
      originalPrice: 4199,
      category: { name: 'Jeans' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'women-jean-5',
      name: 'Washed Carbon Black Straight Denim',
      price: 2599,
      originalPrice: 3299,
      category: { name: 'Jeans' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },

    // ── Shoes (New Category) ──
    {
      _id: 'women-shoe-1',
      name: 'Minimalist Gold Metallic Strappy Stilettos',
      price: 4299,
      originalPrice: 5499,
      category: { name: 'Shoes' },
      gender: 'Women',
      image: '/products/gold-strappy-heels.jpg',
      isNewArrival: true,
    },
    {
      _id: 'women-shoe-2',
      name: 'Chunky Lug-Sole Platform Penny Loafers',
      price: 3899,
      originalPrice: 4999,
      category: { name: 'Shoes' },
      gender: 'Women',
      image: '/products/chunky-platform-loafers.jpg',
      isNewArrival: true,
    },
    {
      _id: 'women-shoe-3',
      name: 'Sleek Pointed-Toe Italian Leather Ankle Boots',
      price: 4799,
      originalPrice: 5999,
      category: { name: 'Shoes' },
      gender: 'Women',
      image: '/products/pointed-leather-ankle-boots.jpg',
      isNewArrival: false,
    },
    {
      _id: 'women-shoe-4',
      name: 'Pointed-Toe Sculptural Stiletto Pumps',
      price: 3999,
      originalPrice: 5199,
      category: { name: 'Shoes' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'women-shoe-5',
      name: 'Chunky Retro Streetwear Platform Sneakers',
      price: 2999,
      originalPrice: 3799,
      category: { name: 'Shoes' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800',
      isNewArrival: true,
    },
    {
      _id: 'women-shoe-6',
      name: 'Court Minimalist Low-Top Leather Trainers',
      price: 3299,
      originalPrice: 4199,
      category: { name: 'Shoes' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
    {
      _id: 'women-shoe-7',
      name: 'Classic Streetwear Low-Top Canvas Sneakers',
      price: 2299,
      originalPrice: 2899,
      category: { name: 'Shoes' },
      gender: 'Women',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800',
      isNewArrival: false,
    },
  ],
};

// Gender-specific configuration & editorial features
const genderConfig = {
  men: {
    title: "The Men's Edit",
    subtitle: 'Tailored for the Modern Man',
    copy: 'Architectural proportions, organic cottons, and precise tailoring. Every piece built to outlast fleeting seasons.',
    hero: menHero,
    heroBrightness: 'brightness-[0.75]',
    overlayFrom: 'from-[#121110]/70',
    accentColor: 'text-slate-200',
    styleNote: {
      title: 'The Modern Capsule Rule',
      body: 'Pair clean lines with tactile textures. A pure European linen shirt over Japanese selvedge denim provides an effortless balance of structured formality and relaxed modern confidence.',
    },
    features: [
      { icon: <HiOutlineShieldCheck className="w-5 h-5" />, label: 'Organic Cotton', sub: 'GOTS Certified Fabrics' },
      { icon: <HiOutlineSparkles className="w-5 h-5" />, label: 'Tailored Fit', sub: 'Precision Cut & Sewn' },
      { icon: <HiOutlineTruck className="w-5 h-5" />, label: 'Free Shipping', sub: 'On orders above ₹2,999' },
    ],
    lookbook: [
      { label: 'Shirts & Tailoring', tagline: 'Structured linen & oxford essentials', path: '/men?category=shirts', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=900' },
      { label: 'Shoes & Footwear', tagline: 'Italian leather sneakers & chelsea boots', path: '/men?category=shoes', image: '/products/suede-chelsea-boots.jpg' },
    ],
    subcats: ['All', 'Shirts', 'Trousers', 'Jackets', 'Shoes', 'Jeans'],
  },
  women: {
    title: "The Women's Atelier",
    subtitle: 'Crafted for the Conscious Woman',
    copy: 'Fluid silhouettes, architectural draping, and refined linen blends — fashion that moves with intentional grace.',
    hero: womenHero,
    heroBrightness: 'brightness-[0.80]',
    overlayFrom: 'from-[#6B5B45]/60',
    accentColor: 'text-amber-100',
    styleNote: {
      title: 'Architectural Draping',
      body: 'Our blazers feature soft, unpadded shoulders with hand-finished lapels. Transition effortlessly from daytime gallery openings to intimate candlelit dining with monochrome separates.',
    },
    features: [
      { icon: <HiOutlineShieldCheck className="w-5 h-5" />, label: 'Sustainable Dye', sub: 'OEKO-TEX Certified' },
      { icon: <HiOutlineSparkles className="w-5 h-5" />, label: 'Bespoke Drape', sub: 'Architectural Silhouettes' },
      { icon: <HiOutlineTruck className="w-5 h-5" />, label: 'Free Returns', sub: '14-Day Easy Returns' },
    ],
    lookbook: [
      { label: 'Blazers & Suiting', tagline: 'Structured power dressing & streetwear cuts', path: '/women?category=blazers', image: '/products/tailored-double-breasted-blazer.jpg' },
      { label: 'Dresses & Silhouettes', tagline: 'Draped silk slip & urban hoodie dresses', path: '/women?category=dresses', image: '/products/champagne-silk-slip-dress.jpg' },
    ],
    subcats: ['All', 'Dresses', 'Blazers', 'Trousers', 'Jeans', 'Shoes'],
  },
  all: {
    title: 'Exclusive Collections',
    subtitle: 'All Categories',
    copy: 'Every piece, every season — the complete TIMELESS TRENDS catalog.',
    hero: null,
    heroBrightness: '',
    overlayFrom: '',
    accentColor: '',
    styleNote: null,
    features: [],
    lookbook: [],
    subcats: ['All', 'T-Shirts', 'Shirts', 'Jeans', 'Hoodies', 'Jackets'],
  },
};

const CategoryPage = ({ gender: propGender }) => {
  const { gender: paramGender, category: paramCategory } = useParams();
  const activeGender = propGender || paramGender || 'all';
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const initialCat = paramCategory || searchParams.get('category') || '';
  const [selectedSubcat, setSelectedSubcat] = useState(
    initialCat ? initialCat.charAt(0).toUpperCase() + initialCat.slice(1).toLowerCase() : ''
  );
  const [sort, setSort] = useState(searchParams.get('sort') || 'newest');

  useEffect(() => {
    const catQuery = searchParams.get('category');
    if (catQuery) {
      setSelectedSubcat(catQuery.charAt(0).toUpperCase() + catQuery.slice(1).toLowerCase());
    } else if (paramCategory) {
      setSelectedSubcat(paramCategory.charAt(0).toUpperCase() + paramCategory.slice(1).toLowerCase());
    }
  }, [searchParams, paramCategory]);

  const config = genderConfig[activeGender] || genderConfig.all;

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (activeGender && activeGender !== 'all') {
        params.set('gender', activeGender);
      }
      if (selectedSubcat && selectedSubcat !== 'All') {
        params.set('category', selectedSubcat.toLowerCase());
      }
      if (sort) params.set('sort', sort);
      params.set('page', searchParams.get('page') || '1');
      params.set('limit', '12');

      const { data } = await api.get(`/products?${params.toString()}`);
      if (data.data && data.data.length > 0) {
        setProducts(data.data);
        setPagination(data.pagination);
      } else {
        // Use dedicated category fallback list
        const fallbackList = categoryFallbackProducts[activeGender] || categoryFallbackProducts.men;
        let filtered = fallbackList;
        if (selectedSubcat && selectedSubcat !== 'All') {
          filtered = filtered.filter(
            (p) => p.category?.name?.toLowerCase() === selectedSubcat.toLowerCase()
          );
        }
        if (sort === 'price-asc') {
          filtered = [...filtered].sort((a, b) => a.price - b.price);
        } else if (sort === 'price-desc') {
          filtered = [...filtered].sort((a, b) => b.price - a.price);
        }
        setProducts(filtered);
      }
    } catch {
      const fallbackList = categoryFallbackProducts[activeGender] || categoryFallbackProducts.men;
      let filtered = fallbackList;
      if (selectedSubcat && selectedSubcat !== 'All') {
        filtered = filtered.filter(
          (p) => p.category?.name?.toLowerCase() === selectedSubcat.toLowerCase()
        );
      }
      if (sort === 'price-asc') {
        filtered = [...filtered].sort((a, b) => a.price - b.price);
      } else if (sort === 'price-desc') {
        filtered = [...filtered].sort((a, b) => b.price - a.price);
      }
      setProducts(filtered);
    } finally {
      setIsLoading(false);
    }
  }, [activeGender, selectedSubcat, sort, searchParams]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <Helmet>
        <title>{`${config.title} — TIMELESS TRENDS`}</title>
        <meta name="description" content={config.copy} />
      </Helmet>

      {/* ── Full-bleed Editorial Hero ── */}
      {config.hero ? (
        <div className="relative h-[55vh] min-h-[420px] max-h-[640px] overflow-hidden">
          <img
            src={config.hero}
            alt={config.title}
            className={`w-full h-full object-cover object-center ${config.heroBrightness}`}
            loading="eager"
          />
          <div className={`absolute inset-0 bg-gradient-to-r ${config.overlayFrom} via-transparent to-transparent`} />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          <div className="absolute inset-0 flex items-end pb-12 sm:pb-16">
            <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
              <motion.div
                initial={{ opacity: 0, y: 25 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <span className={`text-[10px] uppercase tracking-[0.28em] font-medium block mb-2 ${config.accentColor}`}>
                  {config.subtitle}
                </span>
                <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white tracking-[-0.02em] mb-3">
                  {config.title}
                </h1>
                <p className="text-white/75 max-w-md text-sm leading-relaxed font-light">{config.copy}</p>
              </motion.div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-primary py-20 text-center">
          <h1 className="font-serif text-4xl sm:text-5xl text-white">{config.title}</h1>
          <p className="text-white/60 mt-3 text-sm">{config.copy}</p>
        </div>
      )}

      {/* ── Feature Badges Strip ── */}
      {config.features.length > 0 && (
        <div className="bg-[#F3EFE9] border-b border-[#E6DFD5]">
          <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-12">
              {config.features.map((feat, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-white border border-[#E6DFD5] flex items-center justify-center text-primary shrink-0 shadow-2xs">
                    {feat.icon}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-primary uppercase tracking-[0.1em]">{feat.label}</p>
                    <p className="text-xs text-[#8A8178] mt-0.5">{feat.sub}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Lookbook Row & Styling Note ── */}
      {config.lookbook.length > 0 && (
        <div className="py-16 lg:py-24 bg-white">
          <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
              {/* Lookbook 2 columns (8 cols) */}
              <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-5">
                {config.lookbook.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Link to={item.path} className="group relative block aspect-[16/10] rounded-xl overflow-hidden shadow-2xs">
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 brightness-[0.82]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/20 to-transparent" />
                      <div className="absolute inset-0 p-6 sm:p-7 flex flex-col justify-end text-white">
                        <p className="text-[10px] uppercase tracking-[0.2em] text-white/60 mb-1">{item.tagline}</p>
                        <h3 className="font-serif text-xl sm:text-2xl">{item.label}</h3>
                        <span className="inline-flex items-center gap-1.5 mt-2.5 text-[11px] uppercase tracking-[0.14em] font-semibold text-white/70 group-hover:text-white group-hover:gap-3 transition-all">
                          Explore Edit <HiArrowRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>

              {/* Interactive Clothing Customizer Studio (4 cols) */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="lg:col-span-4 bg-gradient-to-br from-[#FAF8F5] via-[#F4EFE6] to-[#EAE3D6] border border-[#DCD3C5] p-7 rounded-xl flex flex-col justify-between shadow-xs hover:border-[#C3B7A5] transition-all relative overflow-hidden group"
              >
                {/* Decorative background accent */}
                <div className="absolute -top-12 -right-12 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl pointer-events-none" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-white/90 border border-[#DCD3C5] rounded-full text-[10px] uppercase tracking-[0.2em] font-semibold text-primary shadow-2xs">
                      <HiOutlineSparkles className="w-3.5 h-3.5 text-amber-700" />
                      Bespoke Atelier
                    </span>
                    <span className="text-[10px] font-semibold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2 py-0.5 rounded-full border border-emerald-300/50">
                      Live Customizer
                    </span>
                  </div>

                  <h4 className="font-serif text-2xl sm:text-[26px] text-primary leading-tight mb-2.5 group-hover:text-primary-light transition-colors">
                    Customize Your Own Clothes
                  </h4>
                  <p className="text-xs text-[#7A7065] leading-relaxed font-light mb-6">
                    Mix, match, and tailor your signature ensemble in real time. Choose your custom tops, trousers, and outerwear for a personalized capsule fit.
                  </p>

                  {/* Interactive Silhouette Slots */}
                  <div className="grid grid-cols-3 gap-2 p-3 bg-white/85 rounded-lg border border-[#DCD3C5]/80 shadow-2xs mb-2">
                    <div className="text-center py-1">
                      <span className="block text-[9px] uppercase tracking-wider text-[#998E82] font-semibold">Step 1</span>
                      <span className="text-xs font-semibold text-primary block mt-0.5">Custom Top</span>
                      <span className="text-[10px] text-[#8A8178]">Linen / Tees</span>
                    </div>
                    <div className="text-center py-1 border-x border-[#E6DFD5]">
                      <span className="block text-[9px] uppercase tracking-wider text-[#998E82] font-semibold">Step 2</span>
                      <span className="text-xs font-semibold text-primary block mt-0.5">Bottom</span>
                      <span className="text-[10px] text-[#8A8178]">Denim / Chinos</span>
                    </div>
                    <div className="text-center py-1">
                      <span className="block text-[9px] uppercase tracking-wider text-[#998E82] font-semibold">Step 3</span>
                      <span className="text-xs font-semibold text-primary block mt-0.5">Outerwear</span>
                      <span className="text-[10px] text-[#8A8178]">Jackets / Coats</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 border-t border-[#DCD3C5] mt-6 flex flex-col gap-2.5">
                  <Link
                    to="/customize"
                    className="w-full flex items-center justify-center gap-2 px-5 py-3.5 bg-primary text-white text-xs uppercase tracking-[0.16em] font-semibold rounded-lg hover:bg-primary-light transition-all shadow-sm group-hover:shadow-md"
                  >
                    <span>Design Your Outfit</span>
                    <HiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                  </Link>
                  <p className="text-[10px] text-center text-[#8A8178] uppercase tracking-widest font-medium">
                    Live Real-Time Preview & Bundle Savings
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}

      {/* ── Filter Pills + Sort + Product Grid ── */}
      <div className="bg-[#FAF8F5] py-16 lg:py-24">
        <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
          {/* Section Heading */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[11px] uppercase tracking-[0.22em] text-[#8A8178] font-medium block mb-1.5">
                Curated Garments
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-primary">All {config.title} Pieces</h3>
            </div>
          </div>

          {/* Filter + Sort Row */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 pb-8 mb-10 border-b border-[#E6DFD5]">
            <div className="flex items-center gap-2.5 flex-wrap">
              {config.subcats.map((cat) => {
                const isCurrentActive =
                  (cat === 'All' && !selectedSubcat) ||
                  (selectedSubcat && selectedSubcat.toLowerCase() === cat.toLowerCase());
                return (
                  <button
                    key={cat}
                    onClick={() => {
                      const next = cat === 'All' ? '' : cat;
                      setSelectedSubcat(next);
                      if (next) {
                        searchParams.set('category', next.toLowerCase());
                      } else {
                        searchParams.delete('category');
                      }
                      setSearchParams(searchParams);
                    }}
                    className={`px-4 py-2 text-xs uppercase tracking-[0.1em] font-semibold border transition-all rounded-sm whitespace-nowrap ${
                      isCurrentActive
                        ? 'bg-primary text-white border-primary shadow-xs'
                        : 'border-[#E6DFD5] text-[#8A8178] hover:border-primary hover:text-primary bg-white'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <span className="text-xs text-[#8A8178] uppercase tracking-[0.1em]">Sort by:</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-xs bg-white border border-[#E6DFD5] px-3.5 py-2 uppercase font-semibold tracking-wider rounded-sm focus:outline-none focus:border-primary cursor-pointer shadow-sm"
              >
                <option value="newest">Newest</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {Array(8).fill(null).map((_, idx) => (
                <div key={idx}>
                  <div className="aspect-[3/4] rounded-lg bg-[#F3EFE9] animate-pulse mb-4" />
                  <div className="h-3 rounded bg-[#E6DFD5] w-3/4 mb-2 animate-pulse" />
                  <div className="h-3 rounded bg-[#E6DFD5] w-1/3 animate-pulse" />
                </div>
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-28 bg-white border border-[#E6DFD5] rounded-xl p-8">
              <p className="font-serif text-2xl text-primary mb-3">No Garments in this Selection</p>
              <p className="text-sm text-[#8A8178] mb-8">Try selecting a different filter category or reset.</p>
              <button
                onClick={() => setSelectedSubcat('')}
                className="inline-block px-8 py-3.5 bg-primary text-white text-xs tracking-[0.15em] uppercase font-semibold hover:opacity-80 transition-opacity"
              >
                View All {config.title}
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 lg:gap-8">
              {products.map((prod, idx) => (
                <motion.div
                  key={prod._id}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04 }}
                >
                  <Link to={`/product/${prod.slug || prod._id}`} className="group block">
                    <div className="aspect-[3/4] bg-[#F3EFE9] mb-4 overflow-hidden relative rounded-lg shadow-2xs">
                      <img
                        src={prod.images?.[0]?.url || prod.image}
                        alt={prod.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        loading="lazy"
                      />
                      {prod.isNewArrival && (
                        <span className="absolute top-3.5 left-3.5 px-2.5 py-1 bg-primary text-white text-[10px] uppercase tracking-[0.1em] font-semibold rounded-sm">
                          New
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#8A8178] uppercase tracking-[0.1em] mb-1.5">
                      {prod.gender} · {prod.category?.name || prod.category || 'Exclusive'}
                    </p>
                    <h3 className="text-sm font-semibold text-primary group-hover:opacity-60 transition-opacity truncate mb-2">
                      {prod.name}
                    </h3>
                    <p className="text-sm font-bold text-primary tabular-nums">₹{prod.price?.toLocaleString()}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
