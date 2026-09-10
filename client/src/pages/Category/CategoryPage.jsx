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
    "men": [
        {
            "_id": "men-tshirt-1",
            "slug": "men-tshirt-1",
            "name": "Essential Oversized Heavyweight Tee",
            "price": 1299,
            "originalPrice": 1799,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-tshirt-2",
            "slug": "men-tshirt-2",
            "name": "Premium Supima Crew Neck Tee",
            "price": 999,
            "originalPrice": 1399,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-tshirt-3",
            "slug": "men-tshirt-3",
            "name": "Graphic Minimal Art Statement Tee",
            "price": 1499,
            "originalPrice": 1999,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-tshirt-4",
            "slug": "men-tshirt-4",
            "name": "Vintage Washed Boxy Drop-Shoulder Tee",
            "price": 1199,
            "originalPrice": 1599,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-tshirt-5",
            "slug": "men-tshirt-5",
            "name": "Striped Long-Sleeve Breton Tee",
            "price": 1399,
            "originalPrice": 1899,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-tshirt-6",
            "slug": "men-tshirt-6",
            "name": "Pocket Detail Slub Cotton Tee",
            "price": 899,
            "originalPrice": 1299,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-tshirt-7",
            "slug": "men-tshirt-7",
            "name": "Tie-Dye Acid Wash Statement Tee",
            "price": 1599,
            "originalPrice": 2199,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-tshirt-8",
            "slug": "men-tshirt-8",
            "name": "Heavyweight Ribbed Crewneck Tee",
            "price": 1099,
            "originalPrice": 1499,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-tshirt-9",
            "slug": "men-tshirt-9",
            "name": "Minimalist Typography Print Tee",
            "price": 1299,
            "originalPrice": 1699,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "/products/men_tshirt_typography.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-tshirt-10",
            "slug": "men-tshirt-10",
            "name": "French Terry Mockneck Tee",
            "price": 1499,
            "originalPrice": 1999,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "/products/men_tshirt_mockneck.jpg",
            "isNewArrival": true
        },
        {
            "_id": "men-tshirt-11",
            "slug": "men-tshirt-11",
            "name": "Organic Cotton V-Neck Tee",
            "price": 899,
            "originalPrice": 1199,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-tshirt-12",
            "slug": "men-tshirt-12",
            "name": "Longline Curved Hem Extended Tee",
            "price": 1199,
            "originalPrice": 1599,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-tshirt-13",
            "slug": "men-tshirt-13",
            "name": "Distressed Washed Vintage Tee",
            "price": 1399,
            "originalPrice": 1899,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "/products/men_tshirt_vintage.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-tshirt-14",
            "slug": "men-tshirt-14",
            "name": "Half-Zip Sports Performance Tee",
            "price": 1699,
            "originalPrice": 2299,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "/products/men_sports_tee.jpg",
            "isNewArrival": true
        },
        {
            "_id": "men-tshirt-15",
            "slug": "men-tshirt-15",
            "name": "Earth-Tone Abstract Printed Tee",
            "price": 1299,
            "originalPrice": 1799,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-tshirt-16",
            "slug": "men-tshirt-16",
            "name": "Pigment-Dyed Relaxed Crew Tee",
            "price": 1099,
            "originalPrice": 1499,
            "category": {
                "name": "T-Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shirt-1",
            "slug": "men-shirt-1",
            "name": "Textured Linen Blend Camp Collar Shirt",
            "price": 1899,
            "originalPrice": 2499,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-shirt-2",
            "slug": "men-shirt-2",
            "name": "Oversized Heavyweight Flannel Overshirt",
            "price": 2499,
            "originalPrice": 3299,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "/products/flannel-overshirt.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-shirt-3",
            "slug": "men-shirt-3",
            "name": "Striped Silk-Cotton Resort Shirt",
            "price": 2199,
            "originalPrice": 2899,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "/products/striped-resort-shirt.jpg",
            "isNewArrival": true
        },
        {
            "_id": "men-shirt-4",
            "slug": "men-shirt-4",
            "name": "Tailored Poplin Classic Button-Down",
            "price": 1799,
            "originalPrice": 2299,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shirt-5",
            "slug": "men-shirt-5",
            "name": "Mandarin Collar Minimalist Linen Shirt",
            "price": 1999,
            "originalPrice": 2699,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-shirt-6",
            "slug": "men-shirt-6",
            "name": "Vintage Chambray Workshirt",
            "price": 2299,
            "originalPrice": 2999,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shirt-7",
            "slug": "men-shirt-7",
            "name": "Abstract Print Cuban Collar Summer Shirt",
            "price": 1899,
            "originalPrice": 2499,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "/products/men_cuban_shirt.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-shirt-8",
            "slug": "men-shirt-8",
            "name": "Brushed Cotton Buffalo Plaid Shirt",
            "price": 2599,
            "originalPrice": 3499,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1593030761757-71fae45fa0e7?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shirt-9",
            "slug": "men-shirt-9",
            "name": "Raw Silk Relaxed Evening Shirt",
            "price": 2899,
            "originalPrice": 3799,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-shirt-10",
            "slug": "men-shirt-10",
            "name": "Sartorial French Cuff Formal Dress Shirt",
            "price": 2199,
            "originalPrice": 2899,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shirt-11",
            "slug": "men-shirt-11",
            "name": "Denim Western Snap-Button Shirt",
            "price": 2399,
            "originalPrice": 3199,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shirt-12",
            "slug": "men-shirt-12",
            "name": "Crinkled Cotton Resort Guayabera",
            "price": 1999,
            "originalPrice": 2599,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-shirt-13",
            "slug": "men-shirt-13",
            "name": "Herringbone Flannel Utility Overshirt",
            "price": 2699,
            "originalPrice": 3599,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "/products/men_flannel_shirt_1788285952163.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-shirt-14",
            "slug": "men-shirt-14",
            "name": "Sleek Micro-Dot Sateen Party Shirt",
            "price": 2099,
            "originalPrice": 2799,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "/products/men_resort_shirt_1788285977869.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-shirt-15",
            "slug": "men-shirt-15",
            "name": "Washed Corduroy Oversized Button-Down",
            "price": 2399,
            "originalPrice": 3099,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1598032895397-b9472444bf93?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-shirt-16",
            "slug": "men-shirt-16",
            "name": "Double-Pocket Safari Twill Shirt",
            "price": 2199,
            "originalPrice": 2899,
            "category": {
                "name": "Shirts"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1604695573706-53170668f6a6?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jean-1",
            "slug": "men-jean-1",
            "name": "Selvedge Straight-Leg Rigid Denim Jeans",
            "price": 2799,
            "originalPrice": 3699,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "/products/selvedge-straight-jeans.jpg",
            "isNewArrival": true
        },
        {
            "_id": "men-jean-2",
            "slug": "men-jean-2",
            "name": "Classic Vintage Wash Relaxed Jeans",
            "price": 2299,
            "originalPrice": 2999,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jean-3",
            "slug": "men-jean-3",
            "name": "Wide-Leg Pleated Carpenter Jeans",
            "price": 2599,
            "originalPrice": 3399,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-jean-4",
            "slug": "men-jean-4",
            "name": "Jet Black Comfort Stretch Slim Jeans",
            "price": 1999,
            "originalPrice": 2599,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "/products/black-slim-jeans.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-jean-5",
            "slug": "men-jean-5",
            "name": "Wide-Leg Carpenter Denim Trousers",
            "price": 2499,
            "originalPrice": 3199,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jean-6",
            "slug": "men-jean-6",
            "name": "Raw Ecru Heavyweight Denim Slacks",
            "price": 2899,
            "originalPrice": 3799,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-jean-7",
            "slug": "men-jean-7",
            "name": "Distressed Vintage Wash Baggy Denim",
            "price": 2699,
            "originalPrice": 3499,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jean-8",
            "slug": "men-jean-8",
            "name": "Japanese Selvedge Tapered Indigo Denim",
            "price": 3499,
            "originalPrice": 4599,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "/products/men_selvedge_jeans_1788285763399.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-jean-9",
            "slug": "men-jean-9",
            "name": "Stay-Black Tailored Denim Slacks",
            "price": 2199,
            "originalPrice": 2899,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "/products/men_black_jeans_1788285788089.jpg",
            "isNewArrival": true
        },
        {
            "_id": "men-jean-10",
            "slug": "men-jean-10",
            "name": "90s Loose Skater Baggy Denim",
            "price": 2399,
            "originalPrice": 3099,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jean-11",
            "slug": "men-jean-11",
            "name": "Distressed Vintage Indigo Straight Jeans",
            "price": 2599,
            "originalPrice": 3299,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1475180098004-ca77a66827be?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jean-12",
            "slug": "men-jean-12",
            "name": "Clean Cut Stonewash Dad Jeans",
            "price": 2199,
            "originalPrice": 2799,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-jean-13",
            "slug": "men-jean-13",
            "name": "Slim Tapered Medium-Wash Denim",
            "price": 1999,
            "originalPrice": 2599,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jean-14",
            "slug": "men-jean-14",
            "name": "Double-Knee Work Denim Trousers",
            "price": 2799,
            "originalPrice": 3699,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jean-15",
            "slug": "men-jean-15",
            "name": "Washed Grey Acid Denim Slim Jeans",
            "price": 2399,
            "originalPrice": 3099,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-jean-16",
            "slug": "men-jean-16",
            "name": "Overdyed Vintage Olive Denim",
            "price": 2499,
            "originalPrice": 3299,
            "category": {
                "name": "Jeans"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jacket-1",
            "slug": "men-jacket-1",
            "name": "Structured Utility Overcoat",
            "price": 5499,
            "originalPrice": 6999,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "/products/structured-overcoat.jpg",
            "isNewArrival": true
        },
        {
            "_id": "men-jacket-2",
            "slug": "men-jacket-2",
            "name": "Minimalist Twill Shacket",
            "price": 3299,
            "originalPrice": 4299,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jacket-3",
            "slug": "men-jacket-3",
            "name": "Tailored Minimalist Utility Field Jacket",
            "price": 4499,
            "originalPrice": 5799,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "/products/utility-field-jacket.jpg",
            "isNewArrival": true
        },
        {
            "_id": "men-jacket-4",
            "slug": "men-jacket-4",
            "name": "Vintage Biker Leather Jacket",
            "price": 6999,
            "originalPrice": 8999,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jacket-5",
            "slug": "men-jacket-5",
            "name": "Heavy Wale Corduroy Trucker Jacket",
            "price": 3799,
            "originalPrice": 4899,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "/products/corduroy-trucker-jacket.jpg",
            "isNewArrival": true
        },
        {
            "_id": "men-jacket-6",
            "slug": "men-jacket-6",
            "name": "Classic Double-Breasted Wool Trench",
            "price": 6499,
            "originalPrice": 8299,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "/products/wool-trench-coat.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-jacket-7",
            "slug": "men-jacket-7",
            "name": "Classic Denim Trucker Jacket",
            "price": 3199,
            "originalPrice": 4199,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jacket-8",
            "slug": "men-jacket-8",
            "name": "Tailored Single-Breasted Wool Blazer",
            "price": 4999,
            "originalPrice": 6499,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-jacket-9",
            "slug": "men-jacket-9",
            "name": "Urban Café Racer Leather Jacket",
            "price": 7299,
            "originalPrice": 9499,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jacket-10",
            "slug": "men-jacket-10",
            "name": "Heavy Twill Double-Rider Biker Jacket",
            "price": 6499,
            "originalPrice": 8499,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1550246140-5119ae4790b8?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jacket-11",
            "slug": "men-jacket-11",
            "name": "Hand-Burnished Suede Field Jacket",
            "price": 5999,
            "originalPrice": 7799,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-jacket-12",
            "slug": "men-jacket-12",
            "name": "Shearling-Collar Suede Aviator Bomber",
            "price": 6799,
            "originalPrice": 8799,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jacket-13",
            "slug": "men-jacket-13",
            "name": "Merino Wool Raglan Bomber Jacket",
            "price": 4599,
            "originalPrice": 5999,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jacket-14",
            "slug": "men-jacket-14",
            "name": "Waxed Cotton Barbour-Style Field Coat",
            "price": 5299,
            "originalPrice": 6899,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-jacket-15",
            "slug": "men-jacket-15",
            "name": "Technical Shell Windbreaker Jacket",
            "price": 3999,
            "originalPrice": 5199,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-jacket-16",
            "slug": "men-jacket-16",
            "name": "Sartorial Italian Overcoat",
            "price": 7999,
            "originalPrice": 10499,
            "category": {
                "name": "Jackets"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-trouser-1",
            "slug": "men-trouser-1",
            "name": "Tailored Pleated Wool Trousers",
            "price": 2999,
            "originalPrice": 3899,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "/products/pleated-wool-trousers.jpg",
            "isNewArrival": true
        },
        {
            "_id": "men-trouser-2",
            "slug": "men-trouser-2",
            "name": "Relaxed Fit Pure Linen Trousers",
            "price": 2499,
            "originalPrice": 3299,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-trouser-3",
            "slug": "men-trouser-3",
            "name": "Slim Tapered Stretch Cotton Chinos",
            "price": 1899,
            "originalPrice": 2499,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-trouser-4",
            "slug": "men-trouser-4",
            "name": "Wide-Leg Architectural Pleated Trousers",
            "price": 3199,
            "originalPrice": 4199,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-trouser-5",
            "slug": "men-trouser-5",
            "name": "Refined Minimalist Cargo Trousers",
            "price": 2699,
            "originalPrice": 3499,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "/products/cargo-trousers.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-trouser-6",
            "slug": "men-trouser-6",
            "name": "Cropped Smart Ankle Flannel Trousers",
            "price": 2799,
            "originalPrice": 3699,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-trouser-7",
            "slug": "men-trouser-7",
            "name": "Glen Check Sartorial Wool Slacks",
            "price": 3499,
            "originalPrice": 4599,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-trouser-8",
            "slug": "men-trouser-8",
            "name": "Heavyweight Cotton Canvas Utility Trousers",
            "price": 2599,
            "originalPrice": 3399,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "/products/men_cargo_trousers_1788285648400.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-trouser-9",
            "slug": "men-trouser-9",
            "name": "Drawstring Travel Pleated Slacks",
            "price": 2299,
            "originalPrice": 2999,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "/products/men_pleated_trousers_1788285738602.jpg",
            "isNewArrival": true
        },
        {
            "_id": "men-trouser-10",
            "slug": "men-trouser-10",
            "name": "High-Rise Gurkha Band Wool Trousers",
            "price": 3699,
            "originalPrice": 4799,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-trouser-11",
            "slug": "men-trouser-11",
            "name": "Relaxed Wide Draped Gabardine Trousers",
            "price": 2899,
            "originalPrice": 3799,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-trouser-12",
            "slug": "men-trouser-12",
            "name": "Double-Pleated Pinstripe Suiting Slacks",
            "price": 3299,
            "originalPrice": 4299,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-trouser-13",
            "slug": "men-trouser-13",
            "name": "Elasticated Waist Jogger Chinos",
            "price": 1999,
            "originalPrice": 2599,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1488161628813-04466f872be2?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-trouser-14",
            "slug": "men-trouser-14",
            "name": "Herringbone Tweed Tailored Trousers",
            "price": 3599,
            "originalPrice": 4699,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-trouser-15",
            "slug": "men-trouser-15",
            "name": "Linen-Blend Straight Resort Trousers",
            "price": 2399,
            "originalPrice": 3099,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-trouser-16",
            "slug": "men-trouser-16",
            "name": "Silk-Wool Flat-Front Dress Trousers",
            "price": 3399,
            "originalPrice": 4499,
            "category": {
                "name": "Trousers"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shoe-1",
            "slug": "men-shoe-1",
            "name": "Italian Minimalist Leather Low-Top Sneakers",
            "price": 4299,
            "originalPrice": 5599,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-shoe-2",
            "slug": "men-shoe-2",
            "name": "Handcrafted Suede Chelsea Boots",
            "price": 5999,
            "originalPrice": 7799,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "/products/suede-chelsea-boots.jpg",
            "isNewArrival": false
        },
        {
            "_id": "men-shoe-3",
            "slug": "men-shoe-3",
            "name": "Classic Calfskin Penny Loafers",
            "price": 4999,
            "originalPrice": 6499,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "/products/penny-loafers.jpg",
            "isNewArrival": true
        },
        {
            "_id": "men-shoe-4",
            "slug": "men-shoe-4",
            "name": "Chunky Lug-Sole Leather Derby Shoes",
            "price": 4699,
            "originalPrice": 6099,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shoe-5",
            "slug": "men-shoe-5",
            "name": "Retro Gum-Sole Court Sneakers",
            "price": 3699,
            "originalPrice": 4799,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shoe-6",
            "slug": "men-shoe-6",
            "name": "Sand Suede Desert Chukka Boots",
            "price": 4499,
            "originalPrice": 5899,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-shoe-7",
            "slug": "men-shoe-7",
            "name": "Heritage Penny Loafers with Metal Bit",
            "price": 5299,
            "originalPrice": 6899,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1616406432452-07bc5938759d?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shoe-8",
            "slug": "men-shoe-8",
            "name": "Crimson Court Athletic Low-Top Sneakers",
            "price": 3999,
            "originalPrice": 5199,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shoe-9",
            "slug": "men-shoe-9",
            "name": "Classic Canvas Skater Court Shoes",
            "price": 2899,
            "originalPrice": 3799,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shoe-10",
            "slug": "men-shoe-10",
            "name": "Olive Suede Low-Profile Trainers",
            "price": 3499,
            "originalPrice": 4499,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-shoe-11",
            "slug": "men-shoe-11",
            "name": "Air Cushion Minimalist Athletic Trainers",
            "price": 4599,
            "originalPrice": 5999,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shoe-12",
            "slug": "men-shoe-12",
            "name": "Waxed Leather Chelsea Commando Boots",
            "price": 6499,
            "originalPrice": 8499,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shoe-13",
            "slug": "men-shoe-13",
            "name": "Suede Wholecut Oxford Dress Shoes",
            "price": 5499,
            "originalPrice": 7199,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "men-shoe-14",
            "slug": "men-shoe-14",
            "name": "Triple-White Leather Minimal Sneakers",
            "price": 3899,
            "originalPrice": 4999,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shoe-15",
            "slug": "men-shoe-15",
            "name": "Lug-Sole Monk Strap Dress Shoes",
            "price": 5699,
            "originalPrice": 7399,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "men-shoe-16",
            "slug": "men-shoe-16",
            "name": "Waterproof Hiking-Sole Derby Boots",
            "price": 6199,
            "originalPrice": 8099,
            "category": {
                "name": "Shoes"
            },
            "gender": "Men",
            "image": "https://images.unsplash.com/photo-1520639888713-7851133b1ed0?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        }
    ],
    "women": [
        {
            "_id": "women-dress-1",
            "slug": "women-dress-1",
            "name": "Champagne Silk Bias Cut Slip Dress",
            "price": 3499,
            "originalPrice": 4599,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "/products/champagne-silk-slip-dress.jpg",
            "isNewArrival": true
        },
        {
            "_id": "women-dress-2",
            "slug": "women-dress-2",
            "name": "Asymmetrical Draped Floral Linen Midi",
            "price": 3899,
            "originalPrice": 4999,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-dress-3",
            "slug": "women-dress-3",
            "name": "Midnight Satin Cocktail Slip Dress",
            "price": 4299,
            "originalPrice": 5599,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-dress-4",
            "slug": "women-dress-4",
            "name": "Streetwear Graphic Hoodie Dress",
            "price": 2799,
            "originalPrice": 3599,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "/products/streetwear-hoodie-dress.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-dress-5",
            "slug": "women-dress-5",
            "name": "Tiered Smocked Floral Summer Day Dress",
            "price": 3199,
            "originalPrice": 4199,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-dress-6",
            "slug": "women-dress-6",
            "name": "Knitted Cashmere Ribbed Bodycon Midi Dress",
            "price": 4699,
            "originalPrice": 6099,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "/products/cashmere-ribbed-turtleneck.jpg",
            "isNewArrival": true
        },
        {
            "_id": "women-dress-7",
            "slug": "women-dress-7",
            "name": "Sculptural Plissé Pleated Column Gown",
            "price": 5899,
            "originalPrice": 7699,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-dress-8",
            "slug": "women-dress-8",
            "name": "French Terracotta Linen Cutout Sundress",
            "price": 3399,
            "originalPrice": 4399,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-dress-9",
            "slug": "women-dress-9",
            "name": "Structured Poplin Corset Shirt Dress",
            "price": 3699,
            "originalPrice": 4799,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-dress-10",
            "slug": "women-dress-10",
            "name": "Chunky Knit Sleeveless Sweater Mini Dress",
            "price": 2999,
            "originalPrice": 3899,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "/products/chunky-cable-knit-cardigan.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-dress-11",
            "slug": "women-dress-11",
            "name": "Emerald Velvet Backless Evening Gown",
            "price": 6499,
            "originalPrice": 8499,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "/products/emerald_velvet_gown.jpg",
            "isNewArrival": true
        },
        {
            "_id": "women-dress-12",
            "slug": "women-dress-12",
            "name": "Minimalist High-Neck Crepe Maxi Dress",
            "price": 4199,
            "originalPrice": 5499,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-dress-13",
            "slug": "women-dress-13",
            "name": "Bohemian Paisley Wrap Maxi Dress",
            "price": 3799,
            "originalPrice": 4899,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-dress-14",
            "slug": "women-dress-14",
            "name": "Graphic Knit Mini Skater Dress",
            "price": 2699,
            "originalPrice": 3499,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-dress-15",
            "slug": "women-dress-15",
            "name": "Lace-Trim Puff-Sleeve Taffeta Dress",
            "price": 4899,
            "originalPrice": 6399,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-dress-16",
            "slug": "women-dress-16",
            "name": "Dip-Dye Ombré Chiffon Midi Dress",
            "price": 4499,
            "originalPrice": 5899,
            "category": {
                "name": "Dresses"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1495385794356-15371f348c31?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-blazer-1",
            "slug": "women-blazer-1",
            "name": "Structured Double-Breasted Wool Blazer",
            "price": 4999,
            "originalPrice": 6499,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/tailored-double-breasted-blazer.jpg",
            "isNewArrival": true
        },
        {
            "_id": "women-blazer-2",
            "slug": "women-blazer-2",
            "name": "Oversized Streetwear Boxy Wool Blazer",
            "price": 4599,
            "originalPrice": 5999,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/oversized-boxy-blazer.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-blazer-3",
            "slug": "women-blazer-3",
            "name": "Sleek Lambskin Tailored Leather Blazer",
            "price": 6999,
            "originalPrice": 8999,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/leather-tailored-blazer.jpg",
            "isNewArrival": true
        },
        {
            "_id": "women-blazer-4",
            "slug": "women-blazer-4",
            "name": "Organic French Linen Relaxed Blazer",
            "price": 3999,
            "originalPrice": 5199,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/linen_relaxed_blazer.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-blazer-5",
            "slug": "women-blazer-5",
            "name": "Minimalist Pinstripe Tailored Blazer",
            "price": 4799,
            "originalPrice": 6299,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/pinstripe-tailored-blazer.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-blazer-6",
            "slug": "women-blazer-6",
            "name": "Contemporary Streetwear Houndstooth Blazer",
            "price": 5299,
            "originalPrice": 6899,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/houndstooth_blazer.jpg",
            "isNewArrival": true
        },
        {
            "_id": "women-blazer-7",
            "slug": "women-blazer-7",
            "name": "Midnight Silk-Satin Tuxedo Evening Blazer",
            "price": 6499,
            "originalPrice": 8499,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/tuxedo_evening_blazer.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-blazer-8",
            "slug": "women-blazer-8",
            "name": "Cropped Double-Breasted Bouclé Tweed Jacket",
            "price": 4899,
            "originalPrice": 6399,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/boucle_tweed_blazer.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-blazer-9",
            "slug": "women-blazer-9",
            "name": "Hourglass Sculpted Waist Crepe Blazer",
            "price": 5199,
            "originalPrice": 6799,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/hourglass_crepe_blazer.jpg",
            "isNewArrival": true
        },
        {
            "_id": "women-blazer-10",
            "slug": "women-blazer-10",
            "name": "Burgundy Velvet Peak-Lapel Cocktail Blazer",
            "price": 5799,
            "originalPrice": 7499,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/burgundy_velvet_blazer.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-blazer-11",
            "slug": "women-blazer-11",
            "name": "Heritage Glen Plaid Wool Boyfriend Blazer",
            "price": 4999,
            "originalPrice": 6499,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/glen_plaid_blazer.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-blazer-12",
            "slug": "women-blazer-12",
            "name": "Belted Wool Kimono Drape Blazer",
            "price": 5499,
            "originalPrice": 7199,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/kimono_drape_blazer.jpg",
            "isNewArrival": true
        },
        {
            "_id": "women-blazer-13",
            "slug": "women-blazer-13",
            "name": "Caramel Oversized Cocoon Coat Blazer",
            "price": 5699,
            "originalPrice": 7399,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/caramel_cocoon_blazer.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-blazer-14",
            "slug": "women-blazer-14",
            "name": "Neon-Trim Monochrome Power Blazer",
            "price": 4699,
            "originalPrice": 6099,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/oversized-boxy-blazer.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-blazer-15",
            "slug": "women-blazer-15",
            "name": "Collarless Minimalist Knit Blazer",
            "price": 3899,
            "originalPrice": 5099,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/tailored-double-breasted-blazer.jpg",
            "isNewArrival": true
        },
        {
            "_id": "women-blazer-16",
            "slug": "women-blazer-16",
            "name": "Bold Stripe Colour-Block Blazer",
            "price": 4999,
            "originalPrice": 6499,
            "category": {
                "name": "Blazers"
            },
            "gender": "Women",
            "image": "/products/pinstripe-tailored-blazer.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-trouser-1",
            "slug": "women-trouser-1",
            "name": "High-Waisted Tailored Pleated Trousers",
            "price": 2899,
            "originalPrice": 3799,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-trouser-2",
            "slug": "women-trouser-2",
            "name": "Wide-Leg Minimalist Drape Trousers",
            "price": 3199,
            "originalPrice": 4199,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-trouser-3",
            "slug": "women-trouser-3",
            "name": "Streetwear Wide-Leg Utility Cargo Pants",
            "price": 2799,
            "originalPrice": 3599,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-trouser-4",
            "slug": "women-trouser-4",
            "name": "Sartorial Pinstripe Wool Slacks",
            "price": 3499,
            "originalPrice": 4499,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1583496661160-fb5886a0aaaa?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-trouser-5",
            "slug": "women-trouser-5",
            "name": "Relaxed High-Rise Linen Drawstring Slacks",
            "price": 2499,
            "originalPrice": 3299,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1572804013427-4d7ca7268217?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-trouser-6",
            "slug": "women-trouser-6",
            "name": "Flared Sartorial Gabardine Trousers",
            "price": 3299,
            "originalPrice": 4299,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-trouser-7",
            "slug": "women-trouser-7",
            "name": "Cropped Cigarette Crepe Trousers",
            "price": 2699,
            "originalPrice": 3499,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1504593811423-6dd665756598?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-trouser-8",
            "slug": "women-trouser-8",
            "name": "High-Waist Silk-Wool Palazzo Pants",
            "price": 3999,
            "originalPrice": 5199,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-trouser-9",
            "slug": "women-trouser-9",
            "name": "Double-Pleated Sailor Trousers with Horn Buttons",
            "price": 3399,
            "originalPrice": 4399,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-trouser-10",
            "slug": "women-trouser-10",
            "name": "Architectural Barrel-Leg Chinos",
            "price": 2999,
            "originalPrice": 3899,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1532453288672-3a27e9be9efd?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-trouser-11",
            "slug": "women-trouser-11",
            "name": "Split-Hem Tailored Slim Pants",
            "price": 2899,
            "originalPrice": 3799,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-trouser-12",
            "slug": "women-trouser-12",
            "name": "Fluid Satin Drawstring Lounge Slacks",
            "price": 3199,
            "originalPrice": 4099,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1571513722275-4b41940f54b8?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-trouser-13",
            "slug": "women-trouser-13",
            "name": "Asymmetric-Hem Deconstructed Trousers",
            "price": 3699,
            "originalPrice": 4799,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-trouser-14",
            "slug": "women-trouser-14",
            "name": "Velvet Straight-Leg Evening Trousers",
            "price": 3899,
            "originalPrice": 5099,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-trouser-15",
            "slug": "women-trouser-15",
            "name": "Elasticated-Waist Linen Beach Trousers",
            "price": 2299,
            "originalPrice": 2999,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1516826957135-700dedea698c?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-trouser-16",
            "slug": "women-trouser-16",
            "name": "Power-Stretch High-Waist Ponte Trousers",
            "price": 2599,
            "originalPrice": 3399,
            "category": {
                "name": "Trousers"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-jean-1",
            "slug": "women-jean-1",
            "name": "90s Loose Baggy Skater Denim",
            "price": 2699,
            "originalPrice": 3499,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-jean-2",
            "slug": "women-jean-2",
            "name": "High-Rise Vintage Washed Straight Jeans",
            "price": 2499,
            "originalPrice": 3299,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1534452203293-494d7ddbf7e0?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-jean-3",
            "slug": "women-jean-3",
            "name": "Wide-Leg Darted Trouser Jeans",
            "price": 2899,
            "originalPrice": 3799,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-jean-4",
            "slug": "women-jean-4",
            "name": "Raw Indigo Rigid High-Waist Denim",
            "price": 3199,
            "originalPrice": 4199,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-jean-5",
            "slug": "women-jean-5",
            "name": "Washed Carbon Black Straight Denim",
            "price": 2399,
            "originalPrice": 3099,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1504198458649-3128b932f49e?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-jean-6",
            "slug": "women-jean-6",
            "name": "Retro 70s High-Rise Flare Bellbottoms",
            "price": 2999,
            "originalPrice": 3899,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1516914943479-89db7d9ae7f2?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-jean-7",
            "slug": "women-jean-7",
            "name": "Sculpt Skinny High-Rise Stretch Denim",
            "price": 2199,
            "originalPrice": 2899,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1539008835657-9e8e9680c956?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-jean-8",
            "slug": "women-jean-8",
            "name": "Natural Ecru Raw-Hem Cropped Wide Jeans",
            "price": 2799,
            "originalPrice": 3699,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-jean-9",
            "slug": "women-jean-9",
            "name": "Relaxed Workwear Carpenter Jeans with Loop",
            "price": 2699,
            "originalPrice": 3499,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1507680434567-5739c80be1ac?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-jean-10",
            "slug": "women-jean-10",
            "name": "Low-Rise Baggy Utility Cargo Jeans",
            "price": 2899,
            "originalPrice": 3799,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-jean-11",
            "slug": "women-jean-11",
            "name": "Barrel Curve Silhouette Denim",
            "price": 3299,
            "originalPrice": 4299,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-jean-12",
            "slug": "women-jean-12",
            "name": "Split Two-Tone Contrast Inseam Denim",
            "price": 3099,
            "originalPrice": 3999,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-jean-13",
            "slug": "women-jean-13",
            "name": "Patchwork Contrast Panel Denim",
            "price": 3499,
            "originalPrice": 4499,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-jean-14",
            "slug": "women-jean-14",
            "name": "Mid-Rise Cropped Frayed Ankle Jeans",
            "price": 2299,
            "originalPrice": 2999,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1467043237213-65f2da53396f?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-jean-15",
            "slug": "women-jean-15",
            "name": "Powder Blue Cloud-Wash Straight Jeans",
            "price": 2599,
            "originalPrice": 3399,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1484327973588-c31f829103fe?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-jean-16",
            "slug": "women-jean-16",
            "name": "Exposed Button-Fly Raw-Selvedge Denim",
            "price": 3399,
            "originalPrice": 4399,
            "category": {
                "name": "Jeans"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1485462537746-965f33f7f6a7?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-shoe-1",
            "slug": "women-shoe-1",
            "name": "Minimalist Gold Metallic Strappy Stilettos",
            "price": 4999,
            "originalPrice": 6499,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "/products/gold-strappy-heels.jpg",
            "isNewArrival": true
        },
        {
            "_id": "women-shoe-2",
            "slug": "women-shoe-2",
            "name": "Chunky Lug-Sole Platform Penny Loafers",
            "price": 4299,
            "originalPrice": 5599,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "/products/chunky-platform-loafers.jpg",
            "isNewArrival": false
        },
        {
            "_id": "women-shoe-3",
            "slug": "women-shoe-3",
            "name": "Sleek Pointed-Toe Italian Leather Ankle Boots",
            "price": 5999,
            "originalPrice": 7799,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "/products/pointed-leather-ankle-boots.jpg",
            "isNewArrival": true
        },
        {
            "_id": "women-shoe-4",
            "slug": "women-shoe-4",
            "name": "Pointed-Toe Sculptural Stiletto Pumps",
            "price": 4799,
            "originalPrice": 6299,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-shoe-5",
            "slug": "women-shoe-5",
            "name": "Chunky Retro Streetwear Platform Sneakers",
            "price": 3899,
            "originalPrice": 4999,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-shoe-6",
            "slug": "women-shoe-6",
            "name": "Court Minimalist Low-Top Leather Trainers",
            "price": 3699,
            "originalPrice": 4799,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-shoe-7",
            "slug": "women-shoe-7",
            "name": "Classic Streetwear Low-Top Canvas Sneakers",
            "price": 2799,
            "originalPrice": 3599,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1499971856191-1a420a42b498?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-shoe-8",
            "slug": "women-shoe-8",
            "name": "Satin Ribbon Sculpted Mule Stilettos",
            "price": 4499,
            "originalPrice": 5899,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1518049362265-d5b2a6467637?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-shoe-9",
            "slug": "women-shoe-9",
            "name": "Strappy Minimalist Nappa Leather Block Sandals",
            "price": 3599,
            "originalPrice": 4699,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-shoe-10",
            "slug": "women-shoe-10",
            "name": "Suede Block-Heel Chelsea Ankle Boots",
            "price": 5299,
            "originalPrice": 6899,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1549298916-f52d724204b4?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-shoe-11",
            "slug": "women-shoe-11",
            "name": "Square-Toe Italian Lambskin Ballet Flats",
            "price": 3299,
            "originalPrice": 4299,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-shoe-12",
            "slug": "women-shoe-12",
            "name": "Knee-High Slouchy Suede Western Boots",
            "price": 6899,
            "originalPrice": 8999,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-shoe-13",
            "slug": "women-shoe-13",
            "name": "Crystal-Embellished T-Strap Heeled Sandals",
            "price": 5499,
            "originalPrice": 7199,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-shoe-14",
            "slug": "women-shoe-14",
            "name": "Sporty Dad Chunky Retro Sneakers",
            "price": 3999,
            "originalPrice": 5199,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": true
        },
        {
            "_id": "women-shoe-15",
            "slug": "women-shoe-15",
            "name": "Woven Leather Slingback Heels",
            "price": 4199,
            "originalPrice": 5499,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        },
        {
            "_id": "women-shoe-16",
            "slug": "women-shoe-16",
            "name": "Clear-Strap Perspex Toe-Loop Flatform Mules",
            "price": 3399,
            "originalPrice": 4399,
            "category": {
                "name": "Shoes"
            },
            "gender": "Women",
            "image": "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800",
            "isNewArrival": false
        }
    ]
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
    subcats: ['All', 'T-Shirts', 'Shirts', 'Trousers', 'Jackets', 'Shoes', 'Jeans'],
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
      params.set('limit', '100');

      const { data } = await api.get(`/products?${params.toString()}`);
      const minExpected = selectedSubcat && selectedSubcat !== 'All' ? 15 : 50;
      if (data.data && data.data.length >= minExpected) {
        setProducts(data.data);
        setPagination(data.pagination);
      } else {
        // Use dedicated category fallback list with guaranteed 16+ items
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
                  <Link
                    to={`/product/${prod.slug || prod._id}`}
                    state={{ product: prod }}
                    className="group block"
                  >
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
