import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineShoppingBag,
  HiOutlineRefresh,
  HiOutlineSparkles,
  HiOutlineCheck,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { addToCart } from '../../features/cart/cartSlice';
import { setCartDrawer } from '../../features/ui/uiSlice';

const outfitTops = [
  { id: 'top-1', name: 'Essential Oversized Cotton Tee', price: 1499, color: 'Onyx Black', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000' },
  { id: 'top-2', name: 'Pure Linen Spread Collar Shirt', price: 2199, color: 'Pure White', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=1000' },
  { id: 'top-3', name: 'Heavyweight Brushed Flannel Overshirt', price: 2399, color: 'Forest Plaid', image: '/products/flannel-overshirt.jpg' },
  { id: 'top-4', name: 'Cuban Collar Striped Resort Shirt', price: 1799, color: 'Sage / Cream', image: '/products/striped-resort-shirt.jpg' },
];

const outfitBottoms = [
  { id: 'bot-1', name: 'Japanese Selvedge Straight Jeans', price: 2899, color: 'Raw Indigo', image: '/products/selvedge-straight-jeans.jpg' },
  { id: 'bot-2', name: 'Tailored Pleated Wool Trousers', price: 2799, color: 'Charcoal Grey', image: '/products/pleated-wool-trousers.jpg' },
  { id: 'bot-3', name: 'Refined Minimalist Cargo Trousers', price: 2499, color: 'Olive Green', image: '/products/cargo-trousers.jpg' },
  { id: 'bot-4', name: 'Jet Black Comfort Stretch Slim Jeans', price: 2199, color: 'Jet Black', image: '/products/black-slim-jeans.jpg' },
];

const outfitLayers = [
  { id: 'lay-1', name: 'Tailored Minimalist Utility Jacket', price: 3999, color: 'Olive Green', image: '/products/utility-field-jacket.jpg' },
  { id: 'lay-2', name: 'Structured Utility Camel Overcoat', price: 5499, color: 'Camel Tan', image: '/products/structured-overcoat.jpg' },
  { id: 'lay-3', name: 'Heavy Wale Corduroy Trucker Jacket', price: 3499, color: 'Warm Tan', image: '/products/corduroy-trucker-jacket.jpg' },
  { id: 'lay-4', name: 'Classic Double-Breasted Wool Trench', price: 5999, color: 'Charcoal', image: '/products/wool-trench-coat.jpg' },
  { id: 'lay-none', name: 'No Outer Layer', price: 0, color: 'None', image: null },
];

const CustomizerPage = () => {
  const dispatch = useDispatch();

  const [selectedTop, setSelectedTop] = useState(outfitTops[0]);
  const [selectedBottom, setSelectedBottom] = useState(outfitBottoms[0]);
  const [selectedLayer, setSelectedLayer] = useState(outfitLayers[0]);

  const totalPrice = selectedTop.price + selectedBottom.price + (selectedLayer.price || 0);

  const handleAddBundleToCart = () => {
    dispatch(
      addToCart({
        _id: `${selectedTop.id}-M`,
        product: selectedTop.id,
        name: selectedTop.name,
        price: selectedTop.price,
        image: selectedTop.image,
        size: 'M',
        color: selectedTop.color,
        quantity: 1,
      })
    );

    dispatch(
      addToCart({
        _id: `${selectedBottom.id}-32`,
        product: selectedBottom.id,
        name: selectedBottom.name,
        price: selectedBottom.price,
        image: selectedBottom.image,
        size: '32',
        color: selectedBottom.color,
        quantity: 1,
      })
    );

    if (selectedLayer.price > 0 && selectedLayer.image) {
      dispatch(
        addToCart({
          _id: `${selectedLayer.id}-L`,
          product: selectedLayer.id,
          name: selectedLayer.name,
          price: selectedLayer.price,
          image: selectedLayer.image,
          size: 'L',
          color: selectedLayer.color,
          quantity: 1,
        })
      );
    }

    toast.success('Curated Outfit Bundle added to your Bag');
    dispatch(setCartDrawer(true));
  };

  const handleRandomize = () => {
    setSelectedTop(outfitTops[Math.floor(Math.random() * outfitTops.length)]);
    setSelectedBottom(outfitBottoms[Math.floor(Math.random() * outfitBottoms.length)]);
    setSelectedLayer(outfitLayers[Math.floor(Math.random() * outfitLayers.length)]);
    toast.success('Curated new silhouette pairings');
  };

  return (
    <>
      <Helmet>
        <title>Interactive Styling Studio — TIMELESS TRENDS</title>
      </Helmet>

      <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-20 xl:px-24 py-12 lg:py-16">
        {/* Studio Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-bg-secondary border border-border rounded-full mb-3 text-primary text-[11px] font-sans font-semibold uppercase tracking-[0.2em]">
            <HiOutlineSparkles className="w-3.5 h-3.5" /> Bespoke Dressing Atelier
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary tracking-[-0.01em] mb-3">
            Create Your Look
          </h1>
          <p className="text-xs sm:text-sm text-text-secondary leading-relaxed font-light">
            Curate your architectural silhouette in real time. Select your foundation top, trouser, and layering piece to purchase as a unified capsule bundle.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Mannequin Canvas (6 cols) */}
          <div className="lg:col-span-6 bg-white p-6 sm:p-8 border border-border-light shadow-2xs rounded-xl sticky top-24">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-border-light">
              <span className="text-[11px] uppercase tracking-[0.2em] text-text-muted font-bold">
                Live Outfit Silhouette
              </span>
              <button
                onClick={handleRandomize}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-text-secondary uppercase tracking-wider transition-colors"
              >
                <HiOutlineRefresh className="w-3.5 h-3.5" /> Shuffle
              </button>
            </div>

            {/* Mannequin Preview Container */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 bg-bg-secondary/70 p-4 sm:p-5 rounded-lg border border-border-light">
              {/* Top View */}
              <div className="flex flex-col items-center text-center">
                <span className="text-[10px] uppercase font-bold text-text-muted mb-2 tracking-wider">Upper</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedTop.id}
                    initial={{ opacity: 0.4, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.25 }}
                    className="aspect-[3/4] w-full bg-white rounded-md overflow-hidden shadow-xs mb-2.5"
                  >
                    <img src={selectedTop.image} alt={selectedTop.name} className="w-full h-full object-cover" />
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs font-semibold text-primary line-clamp-1">{selectedTop.name}</p>
                <span className="text-xs text-text-muted tabular-nums">₹{selectedTop.price.toLocaleString()}</span>
              </div>

              {/* Bottom View */}
              <div className="flex flex-col items-center text-center">
                <span className="text-[10px] uppercase font-bold text-text-muted mb-2 tracking-wider">Lower</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedBottom.id}
                    initial={{ opacity: 0.4, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.25 }}
                    className="aspect-[3/4] w-full bg-white rounded-md overflow-hidden shadow-xs mb-2.5"
                  >
                    <img src={selectedBottom.image} alt={selectedBottom.name} className="w-full h-full object-cover" />
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs font-semibold text-primary line-clamp-1">{selectedBottom.name}</p>
                <span className="text-xs text-text-muted tabular-nums">₹{selectedBottom.price.toLocaleString()}</span>
              </div>

              {/* Layer View */}
              <div className="flex flex-col items-center text-center col-span-2 sm:col-span-1">
                <span className="text-[10px] uppercase font-bold text-text-muted mb-2 tracking-wider">Outerwear</span>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={selectedLayer.id}
                    initial={{ opacity: 0.4, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0.4 }}
                    transition={{ duration: 0.25 }}
                    className="aspect-[3/4] w-full bg-white rounded-md overflow-hidden shadow-xs mb-2.5 flex items-center justify-center"
                  >
                    {selectedLayer.image ? (
                      <img src={selectedLayer.image} alt={selectedLayer.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-text-muted font-serif italic">No Outerwear</span>
                    )}
                  </motion.div>
                </AnimatePresence>
                <p className="text-xs font-semibold text-primary line-clamp-1">{selectedLayer.name}</p>
                <span className="text-xs text-text-muted tabular-nums">
                  {selectedLayer.price > 0 ? `₹${selectedLayer.price.toLocaleString()}` : '—'}
                </span>
              </div>
            </div>

            {/* Price & Add to Bag Receipt */}
            <div className="mt-6 pt-5 border-t border-border-light flex items-center justify-between">
              <div>
                <span className="text-[10px] uppercase tracking-[0.16em] text-text-muted font-medium block">
                  Complete Bundle Value
                </span>
                <strong className="text-2xl font-bold text-primary tabular-nums">
                  ₹{totalPrice.toLocaleString()}
                </strong>
              </div>
              <motion.button
                onClick={handleAddBundleToCart}
                className="px-6 py-3.5 bg-primary text-text-inverse text-xs uppercase tracking-[0.14em] font-semibold hover:bg-primary-light transition-all rounded shadow-sm flex items-center gap-2"
                whileTap={{ scale: 0.98 }}
              >
                <HiOutlineShoppingBag className="w-4 h-4" /> Add Outfit to Bag
              </motion.button>
            </div>
          </div>

          {/* Right Selector Palettes (6 cols) */}
          <div className="lg:col-span-6 space-y-8">
            {/* Tops */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] font-bold text-primary mb-3">
                1. Select Foundation Upper
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {outfitTops.map((top) => (
                  <div
                    key={top.id}
                    onClick={() => setSelectedTop(top)}
                    className={`p-2.5 border rounded-lg cursor-pointer transition-all bg-white flex flex-col justify-between ${
                      selectedTop.id === top.id
                        ? 'border-primary ring-2 ring-primary/30 shadow-xs'
                        : 'border-border-light hover:border-gray-400'
                    }`}
                  >
                    <div className="aspect-[3/4] rounded overflow-hidden mb-2 bg-bg-secondary">
                      <img src={top.image} alt={top.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary line-clamp-1">{top.name}</p>
                      <p className="text-[11px] text-text-secondary font-medium tabular-nums mt-0.5">₹{top.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottoms */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] font-bold text-primary mb-3">
                2. Select Tailored Lower
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {outfitBottoms.map((bot) => (
                  <div
                    key={bot.id}
                    onClick={() => setSelectedBottom(bot)}
                    className={`p-2.5 border rounded-lg cursor-pointer transition-all bg-white flex flex-col justify-between ${
                      selectedBottom.id === bot.id
                        ? 'border-primary ring-2 ring-primary/30 shadow-xs'
                        : 'border-border-light hover:border-gray-400'
                    }`}
                  >
                    <div className="aspect-[3/4] rounded overflow-hidden mb-2 bg-bg-secondary">
                      <img src={bot.image} alt={bot.name} className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary line-clamp-1">{bot.name}</p>
                      <p className="text-[11px] text-text-secondary font-medium tabular-nums mt-0.5">₹{bot.price.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Outerwear */}
            <div>
              <h3 className="text-xs uppercase tracking-[0.16em] font-bold text-primary mb-3">
                3. Select Outerwear Layer
              </h3>
              <div className="grid grid-cols-3 gap-3">
                {outfitLayers.map((lay) => (
                  <div
                    key={lay.id}
                    onClick={() => setSelectedLayer(lay)}
                    className={`p-2.5 border rounded-lg cursor-pointer transition-all bg-white flex flex-col justify-between ${
                      selectedLayer.id === lay.id
                        ? 'border-primary ring-2 ring-primary/30 shadow-xs'
                        : 'border-border-light hover:border-gray-400'
                    }`}
                  >
                    <div className="aspect-[3/4] rounded overflow-hidden mb-2 bg-bg-secondary flex items-center justify-center">
                      {lay.image ? (
                        <img src={lay.image} alt={lay.name} className="w-full h-full object-cover" />
                      ) : (
                        <span className="text-xs text-text-muted font-serif italic">None</span>
                      )}
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-primary line-clamp-1">{lay.name}</p>
                      <p className="text-[11px] text-text-secondary font-medium tabular-nums mt-0.5">
                        {lay.price > 0 ? `₹${lay.price.toLocaleString()}` : 'No charge'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizerPage;
