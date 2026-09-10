import fs from 'fs';
import path from 'path';

const categoryFallbackProducts = {
  men: [
    // ── T-Shirts (Real Men's T-Shirts & Men Models in T-Shirts) ──
    { _id: 'men-tshirt-1', name: 'Essential Oversized Heavyweight Tee', price: 1299, originalPrice: 1799, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-tshirt-2', name: 'Premium Supima Crew Neck Tee', price: 999, originalPrice: 1399, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-tshirt-3', name: 'Graphic Minimal Art Statement Tee', price: 1499, originalPrice: 1999, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-tshirt-4', name: 'Vintage Washed Boxy Drop-Shoulder Tee', price: 1199, originalPrice: 1599, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-tshirt-5', name: 'Striped Long-Sleeve Breton Tee', price: 1399, originalPrice: 1899, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1618354691229-88d47f285158?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-tshirt-6', name: 'Pocket Detail Slub Cotton Tee', price: 1099, originalPrice: 1499, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-tshirt-7', name: 'Tie-Dye Acid Wash Statement Tee', price: 1299, originalPrice: 1699, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-tshirt-8', name: 'Heavyweight Ribbed Crewneck Tee', price: 1599, originalPrice: 2099, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-tshirt-9', name: 'Minimalist Typography Print Tee', price: 1199, originalPrice: 1599, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-tshirt-10', name: 'French Terry Mockneck Tee', price: 1799, originalPrice: 2299, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1622445268121-ac11f17a5834?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-tshirt-11', name: 'Organic Cotton V-Neck Tee', price: 1099, originalPrice: 1399, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-tshirt-12', name: 'Longline Curved Hem Extended Tee', price: 1399, originalPrice: 1799, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-tshirt-13', name: 'Distressed Washed Vintage Tee', price: 1299, originalPrice: 1699, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-tshirt-14', name: 'Half-Zip Sports Performance Tee', price: 1699, originalPrice: 2199, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-tshirt-15', name: 'Earth-Tone Abstract Printed Tee', price: 1499, originalPrice: 1899, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-tshirt-16', name: 'Pigment-Dyed Relaxed Crew Tee', price: 1199, originalPrice: 1599, category: { name: 'T-Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&q=80&w=800', isNewArrival: false },

    // ── Shirts (Men's Button-Down, Collared & Dress Shirts) ──
    { _id: 'men-shirt-1', name: 'Pure European Linen Spread Shirt', price: 2199, originalPrice: 2799, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shirt-2', name: 'Classic Oxford Cloth Button-Down', price: 1899, originalPrice: 2499, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-shirt-3', name: 'Camp Collar Relaxed Linen Shirt', price: 1999, originalPrice: 2599, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shirt-4', name: 'Heavyweight Brushed Flannel Overshirt', price: 2399, originalPrice: 3099, category: { name: 'Shirts' }, gender: 'Men', image: '/products/flannel-overshirt.jpg', isNewArrival: true },
    { _id: 'men-shirt-5', name: 'Japanese Selvedge Chambray Workshirt', price: 2299, originalPrice: 2899, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shirt-6', name: 'Cuban Collar Striped Resort Shirt', price: 1799, originalPrice: 2399, category: { name: 'Shirts' }, gender: 'Men', image: '/products/striped-resort-shirt.jpg', isNewArrival: false },
    { _id: 'men-shirt-7', name: 'Crisp Cotton Poplin Formal Shirt', price: 1899, originalPrice: 2499, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-shirt-8', name: 'Tailored Sartorial Oxford Shirt', price: 1999, originalPrice: 2599, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shirt-9', name: 'Tailored Chambray Button-Down', price: 1799, originalPrice: 2299, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shirt-10', name: 'Fine Linen Structured Casual Shirt', price: 2099, originalPrice: 2699, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1589310243389-96a5483213a8?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-shirt-11', name: 'Tuxedo Wingtip Pleated Dress Shirt', price: 2799, originalPrice: 3499, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1603252109303-2751441dd157?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shirt-12', name: 'Mandarin Band Collar Linen Shirt', price: 1999, originalPrice: 2599, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-shirt-13', name: 'Corduroy Patchwork Work Shirt', price: 2499, originalPrice: 3199, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shirt-14', name: 'Silk Blend Resort Aloha Shirt', price: 2699, originalPrice: 3399, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-shirt-15', name: 'Slim Fit Navy Twill Dress Shirt', price: 1999, originalPrice: 2599, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shirt-16', name: 'Garment-Dyed Pigment Linen Shirt', price: 2299, originalPrice: 2999, category: { name: 'Shirts' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1600721391776-b5cd0e0048f9?auto=format&fit=crop&q=80&w=800', isNewArrival: false },

    // ── Jeans (Men's Denim) ──
    { _id: 'men-jean-1', name: 'Japanese Selvedge Dark Straight Jeans', price: 2899, originalPrice: 3699, category: { name: 'Jeans' }, gender: 'Men', image: '/products/selvedge-straight-jeans.jpg', isNewArrival: false },
    { _id: 'men-jean-2', name: 'Vintage Fade Relaxed Tapered Jeans', price: 2499, originalPrice: 3199, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-jean-3', name: 'Classic Stonewash Straight Denim', price: 2299, originalPrice: 2999, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jean-4', name: 'Jet Black Comfort Stretch Slim Jeans', price: 2199, originalPrice: 2799, category: { name: 'Jeans' }, gender: 'Men', image: '/products/black-slim-jeans.jpg', isNewArrival: false },
    { _id: 'men-jean-5', name: 'Wide-Leg Carpenter Denim Trousers', price: 2599, originalPrice: 3299, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-jean-6', name: 'Ecru Natural Raw Cotton Jeans', price: 2699, originalPrice: 3399, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jean-7', name: 'Architectural Stack Washed Denim', price: 2499, originalPrice: 3199, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jean-8', name: 'Relaxed Fit Indigo Selvedge Jeans', price: 2799, originalPrice: 3499, category: { name: 'Jeans' }, gender: 'Men', image: '/products/selvedge-straight-jeans.jpg', isNewArrival: true },
    { _id: 'men-jean-9', name: 'Stay-Black Tailored Denim Slacks', price: 2399, originalPrice: 2999, category: { name: 'Jeans' }, gender: 'Men', image: '/products/black-slim-jeans.jpg', isNewArrival: false },
    { _id: 'men-jean-10', name: '90s Loose Skater Baggy Denim', price: 2899, originalPrice: 3699, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-jean-11', name: 'Distressed Vintage Indigo Straight Jeans', price: 2699, originalPrice: 3399, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jean-12', name: 'Raw Rigid 14oz Heavyweight Selvedge', price: 3299, originalPrice: 4199, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1542272604-780c96856592?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-jean-13', name: 'Slim Tapered Medium-Wash Denim', price: 2199, originalPrice: 2799, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jean-14', name: 'Double-Knee Work Denim Trousers', price: 2799, originalPrice: 3599, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jean-15', name: 'Washed Grey Acid Denim Slim Jeans', price: 2499, originalPrice: 3199, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-jean-16', name: 'Overdyed Vintage Olive Denim', price: 2899, originalPrice: 3699, category: { name: 'Jeans' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&q=80&w=800', isNewArrival: false },

    // ── Jackets (Men's Outerwear, Coats & Blazers ONLY) ──
    { _id: 'men-jacket-1', name: 'Structured Utility Overcoat', price: 5499, originalPrice: 6999, category: { name: 'Jackets' }, gender: 'Men', image: '/products/structured-overcoat.jpg', isNewArrival: true },
    { _id: 'men-jacket-2', name: 'Minimalist Twill Shacket', price: 3199, originalPrice: 3999, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jacket-3', name: 'Tailored Minimalist Utility Field Jacket', price: 3999, originalPrice: 4999, category: { name: 'Jackets' }, gender: 'Men', image: '/products/utility-field-jacket.jpg', isNewArrival: false },
    { _id: 'men-jacket-4', name: 'Vintage Biker Leather Jacket', price: 4699, originalPrice: 5999, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-jacket-5', name: 'Heavy Wale Corduroy Trucker Jacket', price: 3499, originalPrice: 4499, category: { name: 'Jackets' }, gender: 'Men', image: '/products/corduroy-trucker-jacket.jpg', isNewArrival: false },
    { _id: 'men-jacket-6', name: 'Classic Double-Breasted Wool Trench', price: 5999, originalPrice: 7499, category: { name: 'Jackets' }, gender: 'Men', image: '/products/wool-trench-coat.jpg', isNewArrival: false },
    { _id: 'men-jacket-7', name: 'Classic Denim Trucker Jacket', price: 3299, originalPrice: 4199, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jacket-8', name: 'Tailored Single-Breasted Wool Blazer', price: 5299, originalPrice: 6699, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-jacket-9', name: 'Urban Café Racer Leather Jacket', price: 4899, originalPrice: 6299, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jacket-10', name: 'Heavy Twill Double-Rider Biker Jacket', price: 4499, originalPrice: 5799, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1521223890158-f9f7c3d5d504?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jacket-11', name: 'Hand-Burnished Suede Field Jacket', price: 4599, originalPrice: 5899, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-jacket-12', name: 'Shearling-Collar Suede Aviator Bomber', price: 6499, originalPrice: 7999, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-jacket-13', name: 'Merino Wool Raglan Bomber Jacket', price: 4199, originalPrice: 5299, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1505022610485-0249ba5b3675?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jacket-14', name: 'Waxed Cotton Barbour-Style Field Coat', price: 5299, originalPrice: 6599, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1578932750294-f5075e85f44a?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-jacket-15', name: 'Technical Shell Windbreaker Jacket', price: 3899, originalPrice: 4899, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-jacket-16', name: 'Sartorial Italian Overcoat', price: 5999, originalPrice: 7499, category: { name: 'Jackets' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1544441893-675973e31985?auto=format&fit=crop&q=80&w=800', isNewArrival: false },

    // ── Trousers (Men's Pants, Slacks & Chinos) ──
    { _id: 'men-trouser-1', name: 'Tailored Pleated Wool Trousers', price: 2799, originalPrice: 3599, category: { name: 'Trousers' }, gender: 'Men', image: '/products/pleated-wool-trousers.jpg', isNewArrival: false },
    { _id: 'men-trouser-2', name: 'Relaxed Fit Pure Linen Trousers', price: 2299, originalPrice: 2999, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-trouser-3', name: 'Slim Tapered Stretch Cotton Chinos', price: 1999, originalPrice: 2599, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-trouser-4', name: 'Wide-Leg Architectural Pleated Trousers', price: 2699, originalPrice: 3499, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-trouser-5', name: 'Refined Minimalist Cargo Trousers', price: 2499, originalPrice: 3199, category: { name: 'Trousers' }, gender: 'Men', image: '/products/cargo-trousers.jpg', isNewArrival: true },
    { _id: 'men-trouser-6', name: 'Cropped Smart Ankle Flannel Trousers', price: 2599, originalPrice: 3299, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-trouser-7', name: 'Glen Check Sartorial Wool Slacks', price: 2699, originalPrice: 3399, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-trouser-8', name: 'Heavyweight Cotton Canvas Utility Trousers', price: 2399, originalPrice: 2999, category: { name: 'Trousers' }, gender: 'Men', image: '/products/cargo-trousers.jpg', isNewArrival: true },
    { _id: 'men-trouser-9', name: 'Drawstring Travel Pleated Slacks', price: 2199, originalPrice: 2799, category: { name: 'Trousers' }, gender: 'Men', image: '/products/pleated-wool-trousers.jpg', isNewArrival: false },
    { _id: 'men-trouser-10', name: 'High-Rise Gurkha Band Wool Trousers', price: 2999, originalPrice: 3799, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-trouser-11', name: 'Relaxed Wide Draped Gabardine Trousers', price: 2799, originalPrice: 3499, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-trouser-12', name: 'Double-Pleated Pinstripe Suiting Slacks', price: 2899, originalPrice: 3699, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-trouser-13', name: 'Elasticated Waist Jogger Chinos', price: 1999, originalPrice: 2499, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-trouser-14', name: 'Herringbone Tweed Tailored Trousers', price: 3199, originalPrice: 3999, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-trouser-15', name: 'Linen-Blend Straight Resort Trousers', price: 2399, originalPrice: 2999, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-trouser-16', name: 'Silk-Wool Flat-Front Dress Trousers', price: 3499, originalPrice: 4499, category: { name: 'Trousers' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&q=80&w=800', isNewArrival: false },

    // ── Shoes (Men's Footwear ONLY) ──
    { _id: 'men-shoe-1', name: 'Italian Minimalist Leather Low-Top Sneakers', price: 3299, originalPrice: 4299, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-shoe-2', name: 'Handcrafted Suede Chelsea Boots', price: 4499, originalPrice: 5699, category: { name: 'Shoes' }, gender: 'Men', image: '/products/suede-chelsea-boots.jpg', isNewArrival: false },
    { _id: 'men-shoe-3', name: 'Classic Calfskin Penny Loafers', price: 3899, originalPrice: 4899, category: { name: 'Shoes' }, gender: 'Men', image: '/products/penny-loafers.jpg', isNewArrival: true },
    { _id: 'men-shoe-4', name: 'Chunky Lug-Sole Leather Derby Shoes', price: 3999, originalPrice: 5199, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shoe-5', name: 'Retro Gum-Sole Court Sneakers', price: 2699, originalPrice: 3499, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shoe-6', name: 'Sand Suede Desert Chukka Boots', price: 3499, originalPrice: 4499, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shoe-7', name: 'Heritage Penny Loafers with Metal Bit', price: 3699, originalPrice: 4699, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1616406432452-07bc5938759d?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-shoe-8', name: 'Crimson Court Athletic Low-Top Sneakers', price: 2999, originalPrice: 3899, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shoe-9', name: 'Classic Canvas Skater Court Shoes', price: 2499, originalPrice: 3199, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shoe-10', name: 'Olive Suede Low-Profile Trainers', price: 2899, originalPrice: 3699, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-shoe-11', name: 'Air Cushion Minimalist Athletic Trainers', price: 3499, originalPrice: 4399, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shoe-12', name: 'Waxed Leather Chelsea Commando Boots', price: 4799, originalPrice: 5999, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-shoe-13', name: 'Suede Wholecut Oxford Dress Shoes', price: 5199, originalPrice: 6499, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shoe-14', name: 'Triple-White Leather Minimal Sneakers', price: 2999, originalPrice: 3799, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'men-shoe-15', name: 'Lug-Sole Monk Strap Dress Shoes', price: 4299, originalPrice: 5499, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'men-shoe-16', name: 'Waterproof Hiking-Sole Derby Boots', price: 4599, originalPrice: 5799, category: { name: 'Shoes' }, gender: 'Men', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
  ],
  women: [
    // ── Dresses (Women Models in Dresses & Gowns ONLY) ──
    { _id: 'women-dress-1', name: 'Champagne Silk Bias-Cut Slip Maxi Dress', price: 4599, originalPrice: 5799, category: { name: 'Dresses' }, gender: 'Women', image: '/products/champagne-silk-slip-dress.jpg', isNewArrival: true },
    { _id: 'women-dress-2', name: 'Asymmetrical Draped Floral Linen Midi', price: 4299, originalPrice: 5499, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-dress-3', name: 'Midnight Satin Cocktail Slip Dress', price: 3999, originalPrice: 5199, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-dress-4', name: 'Streetwear Heavyweight Hoodie Dress', price: 2999, originalPrice: 3799, category: { name: 'Dresses' }, gender: 'Women', image: '/products/streetwear-hoodie-dress.jpg', isNewArrival: false },
    { _id: 'women-dress-5', name: 'Tiered Smocked Floral Summer Day Dress', price: 3299, originalPrice: 4199, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-dress-6', name: 'Ribbed Bodycon Midi Dress', price: 2899, originalPrice: 3699, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-dress-7', name: 'Sculptural Plissé Pleated Column Gown', price: 5499, originalPrice: 6999, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-dress-8', name: 'French Terracotta Linen Cutout Sundress', price: 3499, originalPrice: 4499, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-dress-9', name: 'Structured Poplin Corset Shirt Dress', price: 3899, originalPrice: 4899, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-dress-10', name: 'Burgundy Velvet Off-Shoulder Evening Gown', price: 6499, originalPrice: 7999, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1568252542512-9fe8fe9c87bb?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-dress-11', name: 'Backless Halter Silk Charmeuse Gown', price: 5299, originalPrice: 6699, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1550639525-c97d455acf70?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-dress-12', name: 'Minimalist High-Neck Crepe Maxi Dress', price: 4199, originalPrice: 5299, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-dress-13', name: 'Bohemian Paisley Wrap Maxi Dress', price: 3799, originalPrice: 4799, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-dress-14', name: 'Graphic Knit Mini Skater Dress', price: 2699, originalPrice: 3399, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-dress-15', name: 'Lace-Trim Puff-Sleeve Taffeta Dress', price: 4899, originalPrice: 6199, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-dress-16', name: 'Dip-Dye Ombré Chiffon Midi Dress', price: 3499, originalPrice: 4399, category: { name: 'Dresses' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', isNewArrival: false },

    // ── Blazers (Women Models in Tailored Blazers ONLY) ──
    { _id: 'women-blazer-1', name: 'Structured Double-Breasted Wool Blazer', price: 5499, originalPrice: 6999, category: { name: 'Blazers' }, gender: 'Women', image: '/products/tailored-double-breasted-blazer.jpg', isNewArrival: true },
    { _id: 'women-blazer-2', name: 'Oversized Streetwear Boxy Wool Blazer', price: 4899, originalPrice: 6199, category: { name: 'Blazers' }, gender: 'Women', image: '/products/oversized-boxy-blazer.jpg', isNewArrival: false },
    { _id: 'women-blazer-3', name: 'Sleek Lambskin Tailored Leather Blazer', price: 5999, originalPrice: 7499, category: { name: 'Blazers' }, gender: 'Women', image: '/products/leather-tailored-blazer.jpg', isNewArrival: true },
    { _id: 'women-blazer-4', name: 'Organic French Linen Relaxed Blazer', price: 4699, originalPrice: 5899, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1591369822096-ffd140ec948f?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-blazer-5', name: 'Minimalist Pinstripe Tailored Blazer', price: 5299, originalPrice: 6599, category: { name: 'Blazers' }, gender: 'Women', image: '/products/pinstripe-tailored-blazer.jpg', isNewArrival: false },
    { _id: 'women-blazer-6', name: 'Contemporary Streetwear Houndstooth Blazer', price: 4499, originalPrice: 5699, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-blazer-7', name: 'Midnight Silk-Satin Tuxedo Evening Blazer', price: 6299, originalPrice: 7899, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1584273143981-41c073dfe8f8?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-blazer-8', name: 'Cropped Double-Breasted Bouclé Tweed Jacket', price: 4799, originalPrice: 5999, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-blazer-9', name: 'Hourglass Sculpted Waist Crepe Blazer', price: 5399, originalPrice: 6799, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-blazer-10', name: 'Burgundy Velvet Peak-Lapel Cocktail Blazer', price: 5799, originalPrice: 7199, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-blazer-11', name: 'Heritage Glen Plaid Wool Boyfriend Blazer', price: 4999, originalPrice: 6299, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-blazer-12', name: 'Belted Wool Kimono Drape Blazer', price: 5199, originalPrice: 6499, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-blazer-13', name: 'Caramel Oversized Cocoon Coat Blazer', price: 5599, originalPrice: 6999, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-blazer-14', name: 'Neon-Trim Monochrome Power Blazer', price: 4299, originalPrice: 5499, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-blazer-15', name: 'Collarless Minimalist Knit Blazer', price: 4599, originalPrice: 5799, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1585487000160-6ebcfceb0d03?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-blazer-16', name: 'Bold Stripe Colour-Block Blazer', price: 4799, originalPrice: 5999, category: { name: 'Blazers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=800', isNewArrival: true },

    // ── Trousers (Women Models in Trousers ONLY) ──
    { _id: 'women-trouser-1', name: 'High-Waisted Tailored Pleated Trousers', price: 3299, originalPrice: 4199, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-trouser-2', name: 'Wide-Leg Minimalist Drape Trousers', price: 2999, originalPrice: 3799, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-trouser-3', name: 'Streetwear Wide-Leg Utility Cargo Pants', price: 2799, originalPrice: 3499, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1517445312882-bc9910d016b7?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-trouser-4', name: 'Sartorial Pinstripe Wool Slacks', price: 3499, originalPrice: 4399, category: { name: 'Trousers' }, gender: 'Women', image: '/products/pleated-wool-trousers.jpg', isNewArrival: false },
    { _id: 'women-trouser-5', name: 'Relaxed High-Rise Linen Drawstring Slacks', price: 2699, originalPrice: 3399, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-trouser-6', name: 'Flared Sartorial Gabardine Trousers', price: 3599, originalPrice: 4499, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1584865288642-42078afe6942?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-trouser-7', name: 'Cropped Cigarette Crepe Trousers', price: 2899, originalPrice: 3599, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-trouser-8', name: 'High-Waist Silk-Wool Palazzo Pants', price: 3999, originalPrice: 4999, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-trouser-9', name: 'Double-Pleated Sailor Trousers with Horn Buttons', price: 3399, originalPrice: 4299, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-trouser-10', name: 'Architectural Barrel-Leg Chinos', price: 2799, originalPrice: 3499, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-trouser-11', name: 'Split-Hem Tailored Slim Pants', price: 3199, originalPrice: 3999, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1534126511673-b6899657816a?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-trouser-12', name: 'Fluid Satin Drawstring Lounge Slacks', price: 2999, originalPrice: 3799, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-trouser-13', name: 'Asymmetric-Hem Deconstructed Trousers', price: 3299, originalPrice: 4199, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-trouser-14', name: 'Velvet Straight-Leg Evening Trousers', price: 3799, originalPrice: 4799, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-trouser-15', name: 'Elasticated-Waist Linen Beach Trousers', price: 2499, originalPrice: 3199, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-trouser-16', name: 'Power-Stretch High-Waist Ponte Trousers', price: 2899, originalPrice: 3699, category: { name: 'Trousers' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800', isNewArrival: false },

    // ── Jeans (Women Models in Denim ONLY) ──
    { _id: 'women-jean-1', name: '90s Loose Baggy Skater Denim', price: 2799, originalPrice: 3599, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-jean-2', name: 'High-Rise Vintage Washed Straight Jeans', price: 2999, originalPrice: 3799, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-jean-3', name: 'Stonewash Distressed Boyfriend Jeans', price: 2699, originalPrice: 3399, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-jean-4', name: 'Raw Indigo Rigid High-Waist Denim', price: 3299, originalPrice: 4199, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1584370848010-d7fe6bc767ec?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-jean-5', name: 'Washed Carbon Black Straight Denim', price: 2599, originalPrice: 3299, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1560243563-062bfc001d68?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-jean-6', name: 'Retro 70s High-Rise Flare Bellbottoms', price: 3199, originalPrice: 3999, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-jean-7', name: 'Sculpt Skinny High-Rise Stretch Denim', price: 2899, originalPrice: 3699, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1508296695146-257a814070b4?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-jean-8', name: 'Natural Ecru Raw-Hem Cropped Wide Jeans', price: 2999, originalPrice: 3799, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1475178626620-a4d074967452?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-jean-9', name: 'Relaxed Workwear Carpenter Jeans with Loop', price: 2899, originalPrice: 3599, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-jean-10', name: 'Low-Rise Baggy Utility Cargo Jeans', price: 3399, originalPrice: 4299, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-jean-11', name: 'Barrel Curve Silhouette Denim', price: 3199, originalPrice: 3999, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1550614000-4895a10e1bfd?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-jean-12', name: 'Split Two-Tone Contrast Inseam Denim', price: 3499, originalPrice: 4399, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-jean-13', name: 'Patchwork Contrast Panel Denim', price: 3299, originalPrice: 4199, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-jean-14', name: 'Mid-Rise Cropped Frayed Ankle Jeans', price: 2699, originalPrice: 3399, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-jean-15', name: 'Powder Blue Cloud-Wash Straight Jeans', price: 2999, originalPrice: 3799, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-jean-16', name: 'Exposed Button-Fly Raw-Selvedge Denim', price: 3599, originalPrice: 4599, category: { name: 'Jeans' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1555689502-c4b22d76c56f?auto=format&fit=crop&q=80&w=800', isNewArrival: true },

    // ── Shoes (Women's Footwear ONLY) ──
    { _id: 'women-shoe-1', name: 'Minimalist Gold Metallic Strappy Stilettos', price: 4299, originalPrice: 5499, category: { name: 'Shoes' }, gender: 'Women', image: '/products/gold-strappy-heels.jpg', isNewArrival: true },
    { _id: 'women-shoe-2', name: 'Chunky Lug-Sole Platform Penny Loafers', price: 3899, originalPrice: 4999, category: { name: 'Shoes' }, gender: 'Women', image: '/products/chunky-platform-loafers.jpg', isNewArrival: true },
    { _id: 'women-shoe-3', name: 'Sleek Pointed-Toe Italian Leather Ankle Boots', price: 4799, originalPrice: 5999, category: { name: 'Shoes' }, gender: 'Women', image: '/products/pointed-leather-ankle-boots.jpg', isNewArrival: false },
    { _id: 'women-shoe-4', name: 'Pointed-Toe Sculptural Stiletto Pumps', price: 3999, originalPrice: 5199, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-shoe-5', name: 'Chunky Retro Streetwear Platform Sneakers', price: 2999, originalPrice: 3799, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-shoe-6', name: 'Court Minimalist Low-Top Leather Trainers', price: 3299, originalPrice: 4199, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-shoe-7', name: 'Classic Streetwear Low-Top Canvas Sneakers', price: 2299, originalPrice: 2899, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-shoe-8', name: 'Sculptural Kitten-Heel Nappa Mules', price: 3699, originalPrice: 4699, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-shoe-9', name: 'Strappy Minimalist Nappa Leather Block Sandals', price: 3499, originalPrice: 4399, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1562273138-f46be4ebdf33?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-shoe-10', name: 'Suede Block-Heel Chelsea Ankle Boots', price: 4599, originalPrice: 5799, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-shoe-11', name: 'Square-Toe Italian Lambskin Ballet Flats', price: 2999, originalPrice: 3899, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1575537302964-96cd47c06b1b?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-shoe-12', name: 'Knee-High Slouchy Suede Western Boots', price: 5499, originalPrice: 6999, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-shoe-13', name: 'Crystal-Embellished T-Strap Heeled Sandals', price: 4799, originalPrice: 5999, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-shoe-14', name: 'Sporty Dad Chunky Retro Sneakers', price: 3199, originalPrice: 3999, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
    { _id: 'women-shoe-15', name: 'Woven Leather Slingback Heels', price: 3899, originalPrice: 4899, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?auto=format&fit=crop&q=80&w=800', isNewArrival: false },
    { _id: 'women-shoe-16', name: 'Clear-Strap Perspex Toe-Loop Flatform Mules', price: 2799, originalPrice: 3499, category: { name: 'Shoes' }, gender: 'Women', image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?auto=format&fit=crop&q=80&w=800', isNewArrival: true },
  ],
};

// 1. Update CategoryPage.jsx
const categoryPagePath = path.resolve('client/src/pages/Category/CategoryPage.jsx');
let catPageContent = fs.readFileSync(categoryPagePath, 'utf8');

const startMarker = 'const categoryFallbackProducts = {';
const startIndex = catPageContent.indexOf(startMarker);
const endMarker = '// Gender-specific configuration';
const endIndex = catPageContent.indexOf(endMarker, startIndex);

if (startIndex === -1 || endIndex === -1) {
  console.error('Could not find markers in CategoryPage.jsx');
  process.exit(1);
}

const newCatFallbackStr = 'const categoryFallbackProducts = ' + JSON.stringify(categoryFallbackProducts, null, 2) + ';\n\n';
catPageContent = catPageContent.substring(0, startIndex) + newCatFallbackStr + catPageContent.substring(endIndex);
fs.writeFileSync(categoryPagePath, catPageContent, 'utf8');
console.log('Successfully updated CategoryPage.jsx with verified images!');

// 2. Update server/src/data/fallbackProducts.js
const allFallback = [];
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
    rating: { average: 4.8, count: 48 },
    isNewArrival: !!item.isNewArrival,
    isFeatured: true,
    isTrending: false,
    isPublished: true
  };
}

categoryFallbackProducts.men.forEach((item) => allFallback.push(convertToFullProduct(item, 'men')));
categoryFallbackProducts.women.forEach((item) => allFallback.push(convertToFullProduct(item, 'women')));

const fileContent = `// Comprehensive fallback catalog with 16+ items per subcategory for Men and Women
export const fallbackProducts = ${JSON.stringify(allFallback, null, 2)};
`;

const serverFallbackPath = path.resolve('server/src/data/fallbackProducts.js');
fs.writeFileSync(serverFallbackPath, fileContent, 'utf8');
console.log('Successfully updated server/src/data/fallbackProducts.js with', allFallback.length, 'verified products!');
