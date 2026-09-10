import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineShoppingBag,
  HiOutlineSparkles,
  HiOutlineUpload,
  HiOutlineCheck,
  HiOutlinePhotograph,
  HiOutlineEye,
  HiOutlineAdjustments,
  HiOutlineInformationCircle,
  HiArrowRight,
  HiOutlineTrash,
  HiOutlineRefresh,
  HiOutlineArrowsExpand,
  HiOutlineSwitchHorizontal,
  HiOutlineSwitchVertical,
  HiOutlineCursorClick,
  HiOutlinePlus,
  HiOutlineMinus,
  HiOutlineChevronUp,
  HiOutlineChevronDown,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import { addToCart } from '../../features/cart/cartSlice';
import { setCartDrawer } from '../../features/ui/uiSlice';

// Garment Types Definition
const GARMENT_TYPES = [
  {
    id: 'shirt',
    name: 'Collared Shirt',
    tagline: 'Linen, Oxford & Resort Tailoring',
    basePrice: 1999,
    icon: '👔',
  },
  {
    id: 'tshirt',
    name: 'T-Shirt',
    tagline: 'Casual & Streetwear',
    basePrice: 1299,
    icon: '👕',
  },
  {
    id: 'jeans',
    name: 'Jeans & Denim',
    tagline: 'Sartorial Denimwear',
    basePrice: 2499,
    icon: '👖',
  },
  {
    id: 'formal-pants',
    name: 'Formal Pants',
    tagline: 'Tailored Trousers & Slacks',
    basePrice: 2799,
    icon: '👖',
  },
  {
    id: 'hoodie',
    name: 'Hoodie & Sweatshirt',
    tagline: 'Heavyweight Street Silhouette',
    basePrice: 2899,
    icon: '🧥',
  },
];

// Fabrics catalog per garment
const FABRICS_BY_GARMENT = {
  shirt: [
    { id: 'european-linen', name: '100% Pure European Flax Linen', weight: '160 GSM', desc: 'Airy, textured weave with effortless relaxed drape and natural cooling', extraPrice: 550 },
    { id: 'royal-oxford', name: 'Royal Two-Ply Oxford Cotton', weight: '180 GSM', desc: 'Distinctive basketweave texture with structured collar and durability', extraPrice: 300 },
    { id: 'poplin-cotton', name: 'Crisp Egyptian Poplin', weight: '140 GSM', desc: 'Silky smooth formal weave with clean tailored luster and crisp press', extraPrice: 0 },
    { id: 'silk-blend', name: 'Mulberry Silk-Cotton Satin', weight: '150 GSM', desc: 'Fluid, lustrous drape with liquid sheen for evening wear & resort luxury', extraPrice: 750 },
    { id: 'brushed-twill', name: 'Winter Brushed Cotton Twill', weight: '220 GSM', desc: 'Soft peached handfeel with warming insulating diagonal rib weave', extraPrice: 400 },
  ],
  tshirt: [
    { id: 'combed-cotton', name: '100% Combed Cotton', weight: '240 GSM', desc: 'Ultra-durable, breathable, structured drape', extraPrice: 0 },
    { id: 'supima-cotton', name: 'Luxury Supima Cotton', weight: '190 GSM', desc: 'Extra-long staple cotton with silk-like softness', extraPrice: 350 },
    { id: 'french-terry', name: 'Organic French Terry', weight: '320 GSM', desc: 'Heavyweight loopback texture for premium street fit', extraPrice: 500 },
    { id: 'modal-blend', name: 'Cotton-Modal Blend', weight: '210 GSM', desc: 'Flowy, high-comfort fabric with cool touch', extraPrice: 250 },
  ],
  jeans: [
    { id: 'selvedge-denim', name: 'Japanese Raw Selvedge Denim', weight: '14.5 oz', desc: 'Authentic red-line shuttle-loom denim, raw unwashed', extraPrice: 700 },
    { id: 'stretch-denim', name: 'Comfort Stretch Denim', weight: '12.5 oz', desc: '98% Cotton / 2% Elastane for all-day mobility', extraPrice: 0 },
    { id: 'vintage-washed', name: 'Enzyme Washed Denim', weight: '13.5 oz', desc: 'Pre-softened vintage patina with natural fade', extraPrice: 400 },
  ],
  'formal-pants': [
    { id: 'italian-wool', name: 'Italian Poly-Wool Gabardine', weight: '280 GSM', desc: 'Crease-resistant luxury drape for boardroom & galas', extraPrice: 650 },
    { id: 'cotton-twill', name: 'Mercerized Cotton Twill', weight: '260 GSM', desc: 'Clean semi-formal structure with refined matte luster', extraPrice: 0 },
    { id: 'stretch-sartorial', name: 'Sartorial Bi-Stretch Weave', weight: '290 GSM', desc: 'Modern tailored flexibility with razor-sharp pressed pleats', extraPrice: 450 },
  ],
  hoodie: [
    { id: 'heavy-terry', name: 'Custom Heavyweight Terry', weight: '450 GSM', desc: 'Ultra-dense streetwear weight, thick hood structure', extraPrice: 500 },
    { id: 'fleece-brushed', name: 'Brushed Interior Organic Cotton', weight: '380 GSM', desc: 'Velvety fleece warmth with structured exterior silhouette', extraPrice: 0 },
  ],
};

// Styles & Types per garment — EXTENDED WITH RICH SHIRT TYPES
const STYLES_BY_GARMENT = {
  shirt: [
    { id: 'cuban-collar', name: 'Cuban Camp Collar Resort', desc: 'Open notched camp collar, relaxed fit, straight vented hem for summer ease', extraPrice: 150, tag: 'Summer Edit' },
    { id: 'formal-oxford', name: 'Structured Spread Collar Formal', desc: 'Crisp spread collar with removable stays, tailored French placket & barrel cuffs', extraPrice: 0, tag: 'Essential' },
    { id: 'mandarin-band', name: 'Mandarin / Grandad Band Collar', desc: 'Minimalist collarless band with clean covered button placket', extraPrice: 150, tag: 'Minimalist' },
    { id: 'flannel-shacket', name: 'Oversized Flannel Workwear Shacket', desc: 'Heavyweight boxy cut with twin flap chest pockets and dropped shoulders', extraPrice: 350, tag: 'Outerwear' },
    { id: 'tuxedo-wingtip', name: 'Tuxedo Wingtip & Pleated Bib Shirt', desc: 'Ultra-formal wing collar with 12-pleat starched front bib panel & stud closures', extraPrice: 500, tag: 'Black Tie' },
    { id: 'western-snap', name: 'Western Yoke & Pearl Snap Shirt', desc: 'Pointed cowboy shoulder yokes, mother-of-pearl snap buttons & sawtooth flap pockets', extraPrice: 300, tag: 'Vintage' },
    { id: 'silk-bowling', name: 'Silk Bowling Camp Shirt', desc: 'Retro 50s silhouette with contrast piped collar, lapels, and cuffs', extraPrice: 400, tag: 'Luxury' },
    { id: 'french-cuff', name: 'Double-Cuff French Sartorial Shirt', desc: 'Cutaway Italian collar with folded French cuffs tailored for cufflinks', extraPrice: 350, tag: 'Signature' },
    { id: 'short-sleeve-resort', name: 'Short-Sleeve Utility Safari Shirt', desc: 'Twin pleated cargo pockets, epaulets, and cuffed short sleeves', extraPrice: 200, tag: 'Casual' },
  ],
  tshirt: [
    { id: 'drop-shoulder', name: 'Down / Drop Shoulder', desc: 'Relaxed dropped armhole, boxy contemporary silhouette', extraPrice: 0, tag: 'Popular' },
    { id: 'ripped-tshirt', name: 'Ripped & Distressed Edges', desc: 'Artisanal micro-tears, raw frayed hems and vintage distress', extraPrice: 300, tag: 'Artisan' },
    { id: 'photo-print', name: 'Photo / Graphic Print on T-Shirt', desc: 'Custom HD DTG digital print of your personal photo or artwork', extraPrice: 400, tag: 'Custom Upload' },
    { id: 'classic-crew', name: 'Classic Tailored Crew Neck', desc: 'Standard fitted cut with ribbed reinforced collar', extraPrice: 0 },
    { id: 'oversized-heavy', name: 'Oversized Boxy Silhouette', desc: 'Wider chest and shorter body cut for clean street drape', extraPrice: 150 },
  ],
  jeans: [
    { id: 'ripped-jeans', name: 'Ripped & Distressed Denim', desc: 'Hand-distressed knee abrasions and pocket fraying', extraPrice: 450, tag: 'Artisan' },
    { id: 'straight-selvedge', name: 'Clean Straight Leg Selvedge', desc: 'Timeless tailored straight leg with clean selvedge cuff', extraPrice: 0 },
    { id: 'baggy-wide', name: 'Baggy Skater Wide-Leg', desc: 'Relaxed roomy thigh through ankle with slight floor stack', extraPrice: 200, tag: 'Trending' },
    { id: 'slim-tapered', name: 'Slim Tapered Cut', desc: 'Fitted through hip and thigh with a modern ankle taper', extraPrice: 0 },
  ],
  'formal-pants': [
    { id: 'formal-pleated', name: 'Classic Double Pleated Trouser', desc: 'Sophisticated sartorial front pleats with sharp pressed creases', extraPrice: 250, tag: 'Signature' },
    { id: 'slim-slacks', name: 'Slim-Fit Sartorial Slacks', desc: 'Flat front, clean tapered leg, angled side slash pockets', extraPrice: 0 },
    { id: 'relaxed-chinos', name: 'Relaxed Tailored Chinos', desc: 'Slightly relaxed leg with cuffed hem and concealed tab closure', extraPrice: 0 },
    { id: 'high-waist', name: 'High-Waisted Gurkha Pant', desc: 'Vintage extended waistband with double side buckle adjusters', extraPrice: 400, tag: 'Luxury' },
  ],
  hoodie: [
    { id: 'drop-shoulder-hoodie', name: 'Down Shoulder Boxy Hoodie', desc: 'Dropped seams, double-layered hood without drawstrings', extraPrice: 0, tag: 'Signature' },
    { id: 'ripped-hoodie', name: 'Ripped & Vintage Distressed', desc: 'Custom edge abrasions at cuffs, kangaroo pocket, and hood lip', extraPrice: 350 },
    { id: 'photo-hoodie', name: 'Custom Photo Back/Front Print', desc: 'Full-color DTG print with your personalized photo upload', extraPrice: 450, tag: 'Custom Upload' },
  ],
};

// Patterns catalog per garment
const PATTERNS_BY_GARMENT = {
  shirt: [
    { id: 'solid', name: 'Solid Pure Weave', desc: 'Smooth uniform luxury dye without pattern', extraPrice: 0, tag: 'Clean' },
    { id: 'bengal-stripe', name: 'Vertical Bengal Stripe', desc: 'Classic bold alternating vertical sartorial stripes', extraPrice: 200, tag: 'Classic' },
    { id: 'pinstripe', name: 'Fine Sartorial Pinstripe', desc: 'Crisp, subtle vertical hairline pinstripes for business and tailoring', extraPrice: 200, tag: 'Formal' },
    { id: 'windowpane', name: 'Modern Windowpane Check', desc: 'Clean geometric grid check lines for effortless architectural appeal', extraPrice: 250, tag: 'Trending' },
    { id: 'glen-plaid', name: 'Glen Plaid / Prince of Wales', desc: 'Heritage Scottish cross-hatched check pattern for elevated distinction', extraPrice: 300, tag: 'Heritage' },
    { id: 'tartan-check', name: 'Tartan Flannel Plaid', desc: 'Deep intersecting check lines for cozy autumn & casual overshirt drape', extraPrice: 250, tag: 'Casual' },
    { id: 'resort-botanical', name: 'Resort Botanical / Floral', desc: 'Artisanal tropical leaf and floral motif silhouette for vacation vibes', extraPrice: 350, tag: 'Resort' },
    { id: 'micro-polka', name: 'Micro Polka Dot', desc: 'Subtle micro dotted pattern for elevated evening style and cocktail attire', extraPrice: 200 },
    { id: 'herringbone', name: 'Herringbone Chevron Weave', desc: 'Textured V-shaped diagonal woven texture with rich light play', extraPrice: 300, tag: 'Textured' },
    { id: 'abstract-geo', name: 'Abstract Geometric Minimal', desc: 'Contemporary avant-garde monochrome geometric accents', extraPrice: 300 },
  ],
  tshirt: [
    { id: 'solid', name: 'Solid Pure Dye', desc: 'Smooth, rich solid dye without surface pattern', extraPrice: 0, tag: 'Clean' },
    { id: 'bengal-stripe', name: 'Horizontal Breton Stripe', desc: 'Iconic French nautical horizontal stripes across chest', extraPrice: 150, tag: 'Iconic' },
    { id: 'micro-polka', name: 'Micro Dot Texture', desc: 'Subtle micro-texture for modern minimalist street drape', extraPrice: 150 },
    { id: 'abstract-geo', name: 'Abstract Minimal Grid', desc: 'Architectural subtle gridlines across the upper chest', extraPrice: 200 },
  ],
  jeans: [
    { id: 'solid', name: 'Classic Pure Wash', desc: 'Authentic uniform indigo or solid dye', extraPrice: 0, tag: 'Clean' },
    { id: 'pinstripe', name: 'Railroad Hickory Stripe', desc: 'Heritage American workwear pinstripe denim weave', extraPrice: 300, tag: 'Vintage' },
  ],
  'formal-pants': [
    { id: 'solid', name: 'Solid Gabardine', desc: 'Crisp uniform luxury surface with sharp razor crease', extraPrice: 0, tag: 'Clean' },
    { id: 'pinstripe', name: 'Executive Pinstripe', desc: 'Sharply defined vertical dress pinstripes for power suits', extraPrice: 300, tag: 'Sartorial' },
    { id: 'windowpane', name: 'Subtle Windowpane Grid', desc: 'Understated tone-on-tone large grid for modern boardroom wear', extraPrice: 350, tag: 'Modern' },
    { id: 'glen-plaid', name: 'Glen Plaid Suiting', desc: 'Heritage Prince of Wales check for sartorial depth', extraPrice: 350, tag: 'Heritage' },
  ],
  hoodie: [
    { id: 'solid', name: 'Solid Heavy Dye', desc: 'Rich uniform tone on heavyweight fleece', extraPrice: 0, tag: 'Clean' },
    { id: 'abstract-geo', name: 'Split Geometric Block', desc: 'Subtle modern geometric panelling accents', extraPrice: 300 },
  ],
};

// Preset Luxury Color Swatches
const COLOR_PRESETS = [
  { name: 'Onyx Black', hex: '#141414', border: '#333333' },
  { name: 'Optic Pure White', hex: '#F7F7F7', border: '#CCCCCC' },
  { name: 'Heather Charcoal', hex: '#4A4A4A', border: '#666666' },
  { name: 'Raw Indigo', hex: '#1E2F4D', border: '#2B3D5B' },
  { name: 'Sage Olive', hex: '#58654F', border: '#68775F' },
  { name: 'Camel Tan', hex: '#B8976C', border: '#C5A880' },
  { name: 'Espresso Brown', hex: '#3B2F2F', border: '#4E3E3E' },
  { name: 'Warm Cream', hex: '#EBE5D8', border: '#DCD4C3' },
  { name: 'Burgundy Crimson', hex: '#5C1D24', border: '#73262E' },
  { name: 'Slate Blue', hex: '#3A4B5C', border: '#4C5F73' },
];

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '3XL'];

const PHOTO_PLACEMENTS = [
  { id: 'chest-center', label: 'Center Chest', pos: { x: 50, y: 32 } },
  { id: 'pocket', label: 'Left Pocket / Crest', pos: { x: 34, y: 30 } },
  { id: 'full-front', label: 'Full Torso Statement', pos: { x: 50, y: 46 } },
  { id: 'upper-back', label: 'Upper Back Hero', pos: { x: 50, y: 26 } },
  { id: 'lower-hem', label: 'Lower Hip Print', pos: { x: 50, y: 72 } },
];

const PHOTO_FINISHES = [
  { id: 'normal', name: 'Vibrant Digital', desc: 'True-to-color direct garment print' },
  { id: 'multiply', name: 'Textile Infused', desc: 'Blends into the natural garment weave' },
  { id: 'vintage', name: 'Vintage Wash', desc: 'Sun-faded retro streetwear wash' },
  { id: 'grunge', name: 'Distressed Contrast', desc: 'High-contrast gritty streetwear look' },
];

const SAMPLE_ARTWORKS = [
  {
    id: 'deadpool-hero',
    name: 'Streetwear Graphic (Deadpool)',
    url: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=600',
    thumb: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 'dragon-crest',
    name: 'Vintage Dragon Insignia',
    url: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=600',
    thumb: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&q=80&w=150',
  },
  {
    id: 'atelier-abstract',
    name: 'Neo-Tokyo Abstract Art',
    url: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=600',
    thumb: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=150',
  },
];

const CustomizerPage = () => {
  const dispatch = useDispatch();
  const fileInputRef = useRef(null);
  const visualizerContainerRef = useRef(null);

  // State
  const [selectedGarmentId, setSelectedGarmentId] = useState('shirt');
  const [selectedFabricId, setSelectedFabricId] = useState('european-linen');
  const [selectedStyleId, setSelectedStyleId] = useState('cuban-collar');
  const [selectedPatternId, setSelectedPatternId] = useState('bengal-stripe');
  const [sleeveLength, setSleeveLength] = useState('full'); // 'full' | 'half'
  const [customColor, setCustomColor] = useState(COLOR_PRESETS[3].hex); // Raw Indigo
  const [colorName, setColorName] = useState(COLOR_PRESETS[3].name);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const [viewAngle, setViewAngle] = useState('front'); // 'front' | 'back'
  const [customNotes, setCustomNotes] = useState('');

  // Interactive Photo on Garment Editor State (Full Drag, Rotate, Resize, Blend)
  const [uploadedPhotoUrl, setUploadedPhotoUrl] = useState(null);
  const [uploadedPhotoName, setUploadedPhotoName] = useState('');
  const [photoPlacement, setPhotoPlacement] = useState('chest-center');
  const [photoPos, setPhotoPos] = useState({ x: 50, y: 32 }); // % of visualizer canvas (15% to 85%)
  const [photoScale, setPhotoScale] = useState(100); // 30% to 220%
  const [photoRotation, setPhotoRotation] = useState(0); // -180° to 180°
  const [photoFlipH, setPhotoFlipH] = useState(false);
  const [photoFlipV, setPhotoFlipV] = useState(false);
  const [photoBlendMode, setPhotoBlendMode] = useState('normal'); // 'normal' | 'multiply' | 'vintage' | 'grunge'
  const [isPhotoSelected, setIsPhotoSelected] = useState(true);
  const [isDraggingPhoto, setIsDraggingPhoto] = useState(false);

  // Derived selections
  const currentGarment = GARMENT_TYPES.find((g) => g.id === selectedGarmentId) || GARMENT_TYPES[0];
  const fabrics = FABRICS_BY_GARMENT[selectedGarmentId] || FABRICS_BY_GARMENT.shirt;
  const currentFabric = fabrics.find((f) => f.id === selectedFabricId) || fabrics[0];

  const styles = STYLES_BY_GARMENT[selectedGarmentId] || STYLES_BY_GARMENT.shirt;
  const currentStyle = styles.find((s) => s.id === selectedStyleId) || styles[0];

  const patterns = PATTERNS_BY_GARMENT[selectedGarmentId] || PATTERNS_BY_GARMENT.shirt;
  const currentPattern = patterns.find((p) => p.id === selectedPatternId) || patterns[0];

  const isPhotoFeatureActive =
    currentStyle.id === 'photo-print' ||
    currentStyle.id === 'photo-hoodie' ||
    Boolean(uploadedPhotoUrl);

  // Handle Garment Type Switch
  const handleGarmentChange = (newGarmentId) => {
    setSelectedGarmentId(newGarmentId);
    const newFabrics = FABRICS_BY_GARMENT[newGarmentId] || [];
    if (newFabrics.length > 0) setSelectedFabricId(newFabrics[0].id);

    const newStyles = STYLES_BY_GARMENT[newGarmentId] || [];
    if (newStyles.length > 0) setSelectedStyleId(newStyles[0].id);

    const newPatterns = PATTERNS_BY_GARMENT[newGarmentId] || [];
    if (newPatterns.length > 0) setSelectedPatternId(newPatterns[0].id);

    if (newGarmentId === 'shirt') {
      setSleeveLength('full');
    }

    // Default color tone based on garment
    if (newGarmentId === 'jeans') {
      setCustomColor('#1E2F4D');
      setColorName('Raw Indigo');
    } else if (newGarmentId === 'formal-pants') {
      setCustomColor('#141414');
      setColorName('Onyx Black');
    } else if (newGarmentId === 'shirt') {
      setCustomColor('#1E2F4D');
      setColorName('Raw Indigo');
    } else if (newGarmentId === 'tshirt') {
      setCustomColor('#141414');
      setColorName('Onyx Black');
    }
  };

  // Photo Upload Handler
  const handlePhotoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be under 10MB');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedPhotoUrl(reader.result);
      setUploadedPhotoName(file.name);
      setPhotoPos({ x: 50, y: viewAngle === 'back' ? 26 : 32 });
      setPhotoScale(100);
      setPhotoRotation(0);
      setPhotoFlipH(false);
      setPhotoFlipV(false);
      setIsPhotoSelected(true);
      toast.success(`Artwork loaded! You can drag, resize & rotate it anywhere on the cloth.`);
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setUploadedPhotoUrl(null);
    setUploadedPhotoName('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    toast.success('Custom photo removed');
  };

  // Apply Placement Preset
  const handlePlacementPreset = (presetId) => {
    setPhotoPlacement(presetId);
    const preset = PHOTO_PLACEMENTS.find((p) => p.id === presetId);
    if (preset) {
      setPhotoPos(preset.pos);
      toast.success(`Positioned at: ${preset.label}`);
    }
  };

  // Interactive Drag-and-Drop Movement on Cloth
  const handlePhotoPointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPhotoSelected(true);
    setIsDraggingPhoto(true);

    const container = visualizerContainerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const startPointerX = e.clientX;
    const startPointerY = e.clientY;
    const startPosX = photoPos.x;
    const startPosY = photoPos.y;

    const onPointerMove = (moveEvent) => {
      const deltaPxX = moveEvent.clientX - startPointerX;
      const deltaPxY = moveEvent.clientY - startPointerY;
      const deltaPercentX = (deltaPxX / rect.width) * 100;
      const deltaPercentY = (deltaPxY / rect.height) * 100;

      const newX = Math.min(85, Math.max(15, startPosX + deltaPercentX));
      const newY = Math.min(85, Math.max(15, startPosY + deltaPercentY));

      setPhotoPos({ x: Math.round(newX * 10) / 10, y: Math.round(newY * 10) / 10 });
    };

    const onPointerUp = () => {
      setIsDraggingPhoto(false);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Interactive Corner Drag Resizing
  const handleResizePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const startPointerX = e.clientX;
    const startPointerY = e.clientY;
    const startScale = photoScale;

    const onPointerMove = (moveEvent) => {
      const delta = moveEvent.clientX - startPointerX + (moveEvent.clientY - startPointerY);
      const newScale = Math.min(220, Math.max(30, Math.round(startScale + delta * 0.5)));
      setPhotoScale(newScale);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Interactive Rotation Handle Drag
  const handleRotatePointerDown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const photoEl = e.currentTarget.closest('.customizer-photo-box');
    if (!photoEl) return;
    const rect = photoEl.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const onPointerMove = (moveEvent) => {
      const radians = Math.atan2(moveEvent.clientY - centerY, moveEvent.clientX - centerX);
      let degrees = Math.round(radians * (180 / Math.PI)) + 90;
      if (degrees > 180) degrees -= 360;
      if (degrees < -180) degrees += 360;
      setPhotoRotation(degrees);
    };

    const onPointerUp = () => {
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
    };

    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
  };

  // Nudge Artwork in 4 Directions
  const nudgePhoto = (dx, dy) => {
    setPhotoPos((prev) => ({
      x: Math.min(85, Math.max(15, Math.round((prev.x + dx) * 10) / 10)),
      y: Math.min(85, Math.max(15, Math.round((prev.y + dy) * 10) / 10)),
    }));
  };

  // Reset Artwork Transform
  const resetPhotoTransform = () => {
    setPhotoPos({ x: 50, y: viewAngle === 'back' ? 26 : 32 });
    setPhotoScale(100);
    setPhotoRotation(0);
    setPhotoFlipH(false);
    setPhotoFlipV(false);
    setPhotoBlendMode('normal');
    toast.success('Artwork alignment reset to center');
  };

  // Artwork CSS Blend Style
  const getBlendStyle = () => {
    switch (photoBlendMode) {
      case 'multiply':
        return { mixBlendMode: 'multiply', opacity: 0.92 };
      case 'vintage':
        return { filter: 'sepia(0.35) contrast(0.92) brightness(0.95)', mixBlendMode: 'multiply', opacity: 0.88 };
      case 'grunge':
        return { filter: 'contrast(1.3) saturate(0.85) brightness(0.92)', opacity: 0.92 };
      default:
        return { filter: 'contrast(1.05)', opacity: 1 };
    }
  };

  // Pricing calculations
  const unitPrice =
    currentGarment.basePrice +
    currentFabric.extraPrice +
    currentStyle.extraPrice +
    (currentPattern?.extraPrice || 0) +
    (uploadedPhotoUrl ? 250 : 0);

  const discountPercent = quantity >= 3 ? 15 : quantity >= 2 ? 10 : 0;
  const subtotal = unitPrice * quantity;
  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const totalPrice = subtotal - discountAmount;

  // Add to Cart
  const handleAddToCart = () => {
    const customConfigTitle = `${currentStyle.name} (${currentPattern.name}, ${currentFabric.name})`;
    const customId = `custom-${selectedGarmentId}-${Date.now()}`;

    dispatch(
      addToCart({
        _id: customId,
        product: customId,
        name: `Bespoke ${currentGarment.name} — ${currentStyle.name}`,
        price: unitPrice,
        image:
          uploadedPhotoUrl ||
          'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&q=80&w=800',
        size: selectedSize,
        color: colorName,
        quantity,
        isCustom: true,
        customDetails: {
          garment: currentGarment.name,
          fabric: currentFabric.name,
          style: currentStyle.name,
          pattern: currentPattern.name,
          sleeveLength: selectedGarmentId === 'shirt' ? (sleeveLength === 'full' ? 'Full Length Sleeves' : 'Half / Short Sleeves') : null,
          colorName,
          colorHex: customColor,
          size: selectedSize,
          photoPlacement: isPhotoFeatureActive ? photoPlacement : null,
          hasCustomPhoto: Boolean(uploadedPhotoUrl),
          notes: customNotes,
        },
      })
    );

    toast.success(`Custom ${currentGarment.name} added to your bag!`);
    dispatch(setCartDrawer(true));
  };

  return (
    <>
      <Helmet>
        <title>Bespoke Clothing Customizer Atelier — TIMELESS TRENDS</title>
        <meta
          name="description"
          content="Create and customize your signature garments from scratch. Select types of shirts (Cuban, Tuxedo, Oxford, Mandarin, Shacket, French Cuff, Western Snap), fabrics, textile patterns (stripes, plaid, pinstripe, botanical, polka dot), colors, sizes, and quantities."
        />
      </Helmet>

      <div className="min-h-screen bg-[#FAF8F5] text-primary pt-6 pb-24">
        {/* Header Ribbon */}
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-20 mb-8 sm:mb-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-border/80 pb-6 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-border rounded-full text-[10px] uppercase tracking-[0.22em] font-semibold text-amber-800 shadow-2xs mb-2.5">
                <HiOutlineSparkles className="w-3.5 h-3.5 text-amber-700" />
                Haute Atelier · Bespoke Studio
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-tight text-primary leading-tight">
                Design Your Signature Garment
              </h1>
              <p className="text-xs sm:text-sm text-text-muted mt-2 max-w-2xl font-light leading-relaxed">
                Build your bespoke silhouette from raw materials. Select shirt types (Cuban collar, French cuff, Tuxedo, Oxford, Shacket, Western snap), fabric grade, patterns (stripes, pinstripes, checks, botanical, houndstooth), colors, and tailored fit.
              </p>
            </div>

            {/* Quick Pricing Badge */}
            <div className="flex items-center gap-4 shrink-0 bg-white border border-border/80 p-3.5 sm:p-4 rounded-xl shadow-2xs">
              <div className="text-right">
                <span className="block text-[10px] uppercase tracking-[0.16em] text-text-muted font-medium">
                  Custom Piece Price
                </span>
                <span className="font-serif text-2xl sm:text-3xl font-medium text-primary">
                  ₹{unitPrice.toLocaleString('en-IN')}
                </span>
              </div>
              <div className="w-px h-10 bg-border/80" />
              <button
                onClick={handleAddToCart}
                className="flex items-center gap-2 px-5 py-3 bg-primary text-white text-xs uppercase tracking-[0.16em] font-semibold rounded-lg hover:bg-primary-light transition-all shadow-sm"
              >
                <HiOutlineShoppingBag className="w-4 h-4" />
                <span>Add To Bag</span>
              </button>
            </div>
          </div>
        </div>

        {/* Main Customizer Workspace */}
        <div className="w-full max-w-[1520px] mx-auto px-6 sm:px-12 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            
            {/* ── LEFT COLUMN: Interactive Visual Mockup Canvas (5 cols sticky) ── */}
            <div className="lg:col-span-5 lg:sticky lg:top-28">
              <div className="bg-white border border-border/90 rounded-2xl p-6 sm:p-8 shadow-xs relative overflow-hidden">
                {/* Visualizer Top Bar */}
                <div className="flex items-center justify-between border-b border-border/60 pb-4 mb-6">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] text-text-muted font-semibold block">
                      Live Mockup Preview
                    </span>
                    <span className="font-serif text-lg text-primary">
                      {currentGarment.name} · {currentStyle.name} {selectedGarmentId === 'shirt' && `(${sleeveLength === 'full' ? 'Full Sleeves' : 'Half Sleeves'})`}
                    </span>
                  </div>

                  {/* View Angle Switcher */}
                  <div className="flex items-center bg-[#FAF8F5] border border-border rounded-lg p-1 text-xs">
                    <button
                      onClick={() => setViewAngle('front')}
                      className={`px-3 py-1 rounded font-medium transition-all ${
                        viewAngle === 'front' ? 'bg-primary text-white shadow-2xs' : 'text-text-muted hover:text-primary'
                      }`}
                    >
                      Front
                    </button>
                    <button
                      onClick={() => setViewAngle('back')}
                      className={`px-3 py-1 rounded font-medium transition-all ${
                        viewAngle === 'back' ? 'bg-primary text-white shadow-2xs' : 'text-text-muted hover:text-primary'
                      }`}
                    >
                      Back
                    </button>
                  </div>
                </div>

                {/* Live Interactive SVG Canvas Display */}
                <div
                  ref={visualizerContainerRef}
                  className="relative aspect-[4/5] bg-gradient-to-b from-[#F5F2EC] to-[#EAE4D7] rounded-xl flex items-center justify-center p-8 overflow-hidden shadow-inner border border-[#E3DCCE]"
                >
                  {/* Subtle garment studio ambient light shadow */}
                  <div className="absolute inset-0 bg-radial from-transparent via-black/5 to-black/15 pointer-events-none" />

                  {/* Canvas Drag & Edit Guidance Pill */}
                  {uploadedPhotoUrl && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] tracking-wide px-3 py-1 rounded-full shadow-lg z-30 pointer-events-none flex items-center gap-1.5 backdrop-blur-xs border border-white/15 animate-fade-in">
                      <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                      <span>Drag artwork to move • Grab corner to resize</span>
                    </div>
                  )}

                  {/* SVG Garment Visualizer */}
                  <div className="relative w-full h-full flex items-center justify-center">
                    
                    {/* ── COLLARED SHIRT REALISTIC SVG ENGINE (FRONT & BACK VIEWS) ── */}
                    {selectedGarmentId === 'shirt' && (
                      <svg
                        viewBox="0 0 300 360"
                        className="w-full h-full max-h-[360px] filter drop-shadow-2xl transition-all duration-500"
                      >
                        <defs>
                          {/* 1. Real Textile Micro-Weave Texture */}
                          <pattern id="real-fabric-micro-weave" width="4" height="4" patternUnits="userSpaceOnUse">
                            <rect width="4" height="4" fill="none" />
                            <line x1="0" y1="2" x2="4" y2="2" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
                            <line x1="2" y1="0" x2="2" y2="4" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                          </pattern>

                          {/* 2. Real 3D Torso Volumetric Studio Lighting (Soft Key light from top-left) */}
                          <linearGradient id="real-torso-lighting" x1="15%" y1="0%" x2="90%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.22" />
                            <stop offset="28%" stopColor="#FFFFFF" stopOpacity="0.08" />
                            <stop offset="65%" stopColor="#000000" stopOpacity="0.05" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.24" />
                          </linearGradient>

                          {/* 3. Drop Shadows */}
                          <filter id="real-collar-shadow" x="-30%" y="-20%" width="160%" height="180%">
                            <feDropShadow dx="0" dy="4" stdDeviation="3" floodColor="#000000" floodOpacity="0.38" />
                          </filter>

                          <filter id="real-placket-shadow" x="-40%" y="0%" width="180%" height="100%">
                            <feDropShadow dx="1.8" dy="0" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.22" />
                          </filter>

                          <filter id="real-pocket-shadow" x="-20%" y="-10%" width="140%" height="150%">
                            <feDropShadow dx="0" dy="2.5" stdDeviation="2" floodColor="#000000" floodOpacity="0.28" />
                          </filter>

                          <filter id="real-button-shadow" x="-30%" y="-30%" width="160%" height="160%">
                            <feDropShadow dx="0" dy="1.2" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.4" />
                          </filter>

                          {/* 4. 3D Dished Mother-of-Pearl Button Texture */}
                          <radialGradient id="real-mop-button" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#FFFFFF" />
                            <stop offset="35%" stopColor="#FAF7F2" />
                            <stop offset="75%" stopColor="#DDD5C7" />
                            <stop offset="100%" stopColor="#B3A792" />
                          </radialGradient>

                          {/* Patterns catalog */}
                          <pattern id="pattern-bengal-stripe" width="20" height="20" patternUnits="userSpaceOnUse">
                            <rect width="10" height="20" fill="rgba(255,255,255,0.28)" />
                            <rect x="10" width="10" height="20" fill="rgba(0,0,0,0.18)" />
                          </pattern>
                          <pattern id="pattern-pinstripe" width="12" height="12" patternUnits="userSpaceOnUse">
                            <line x1="6" y1="0" x2="6" y2="12" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                          </pattern>
                          <pattern id="pattern-windowpane" width="36" height="36" patternUnits="userSpaceOnUse">
                            <rect width="36" height="36" fill="none" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5" />
                          </pattern>
                          <pattern id="pattern-glen-plaid" width="28" height="28" patternUnits="userSpaceOnUse">
                            <rect width="14" height="14" fill="rgba(0,0,0,0.14)" />
                            <rect x="14" y="14" width="14" height="14" fill="rgba(0,0,0,0.14)" />
                            <line x1="0" y1="7" x2="28" y2="7" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                            <line x1="7" y1="0" x2="7" y2="28" stroke="rgba(255,255,255,0.3)" strokeWidth="1" strokeDasharray="2 2" />
                          </pattern>
                          <pattern id="pattern-tartan-check" width="40" height="40" patternUnits="userSpaceOnUse">
                            <rect width="40" height="40" fill="none" />
                            <rect x="0" y="0" width="20" height="40" fill="rgba(0,0,0,0.18)" />
                            <rect x="0" y="0" width="40" height="20" fill="rgba(0,0,0,0.18)" />
                            <line x1="10" y1="0" x2="10" y2="40" stroke="#C59B27" strokeWidth="1" opacity="0.6" />
                            <line x1="0" y1="10" x2="40" y2="10" stroke="#C59B27" strokeWidth="1" opacity="0.6" />
                            <line x1="30" y1="0" x2="30" y2="40" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                            <line x1="0" y1="30" x2="40" y2="30" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
                          </pattern>
                          <pattern id="pattern-resort-botanical" width="34" height="34" patternUnits="userSpaceOnUse">
                            <path d="M 6 17 Q 17 6 28 17 Q 17 28 6 17 Z" fill="rgba(255,255,255,0.22)" />
                            <path d="M 17 6 Q 28 17 17 28 Q 6 17 17 6 Z" fill="rgba(0,0,0,0.12)" />
                            <circle cx="17" cy="17" r="2.5" fill="#E8DDD0" opacity="0.7" />
                          </pattern>
                          <pattern id="pattern-micro-polka" width="16" height="16" patternUnits="userSpaceOnUse">
                            <circle cx="8" cy="8" r="2.5" fill="rgba(255,255,255,0.45)" />
                          </pattern>
                          <pattern id="pattern-herringbone" width="16" height="16" patternUnits="userSpaceOnUse">
                            <path d="M 0 8 L 8 0 L 16 8 L 8 16 Z" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
                          </pattern>
                          <pattern id="pattern-abstract-geo" width="24" height="24" patternUnits="userSpaceOnUse">
                            <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                            <circle cx="12" cy="12" r="3" fill="rgba(0,0,0,0.18)" />
                          </pattern>
                        </defs>

                        {/* ── 1. INNER BACK NECK & WOVEN LABEL (Visible in Front View only) ── */}
                        {viewAngle === 'front' && (
                          <g>
                            <ellipse cx="150" cy="38" rx="36" ry="12" fill="#181512" />
                            {/* Inner back collar stand */}
                            <path d="M 114 38 Q 150 24 186 38 Q 150 44 114 38 Z" fill="rgba(255,255,255,0.14)" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                            {/* Woven Atelier Brand Label */}
                            <rect x="139" y="27" width="22" height="9" rx="1.5" fill="#FAF8F5" stroke="#C59B27" strokeWidth="0.6" filter="url(#real-button-shadow)" />
                            <text x="150" y="33" textAnchor="middle" fontSize="3.5" fontFamily="serif" fill="#1C1815" fontWeight="bold" letterSpacing="0.6">TIMELESS</text>
                          </g>
                        )}

                        {/* ── 2. SHIRT BODY & SLEEVES WITH NATURAL TAILORED DRAPERY ── */}
                        {sleeveLength === 'full' ? (
                          <g>
                            {/* Base Full Sleeve Shirt Body with Curved Tail Hem */}
                            <path
                              d="M 110 38 Q 150 46 190 38 L 255 105 L 262 185 L 268 275 L 232 275 L 226 185 L 215 125 L 218 330 Q 150 348 82 330 L 85 125 L 74 185 L 68 275 L 32 275 L 38 185 L 45 105 Z"
                              fill={customColor}
                              stroke="rgba(0,0,0,0.22)"
                              strokeWidth="1.8"
                            />

                            {/* Pattern Overlay on Full Sleeve */}
                            {selectedPatternId !== 'solid' && (
                              <path
                                d="M 110 38 Q 150 46 190 38 L 255 105 L 262 185 L 268 275 L 232 275 L 226 185 L 215 125 L 218 330 Q 150 348 82 330 L 85 125 L 74 185 L 68 275 L 32 275 L 38 185 L 45 105 Z"
                                fill={`url(#pattern-${selectedPatternId})`}
                                opacity="0.8"
                              />
                            )}

                            {/* Volumetric Studio Shading Layer */}
                            <path
                              d="M 110 38 Q 150 46 190 38 L 255 105 L 262 185 L 268 275 L 232 275 L 226 185 L 215 125 L 218 330 Q 150 348 82 330 L 85 125 L 74 185 L 68 275 L 32 275 L 38 185 L 45 105 Z"
                              fill="url(#real-torso-lighting)"
                              opacity="0.85"
                            />

                            {/* Micro-Weave Real Fabric Texture Overlay */}
                            <path
                              d="M 110 38 Q 150 46 190 38 L 255 105 L 262 185 L 268 275 L 232 275 L 226 185 L 215 125 L 218 330 Q 150 348 82 330 L 85 125 L 74 185 L 68 275 L 32 275 L 38 185 L 45 105 Z"
                              fill="url(#real-fabric-micro-weave)"
                              opacity="0.22"
                            />

                            {/* Natural Side Inseam Seams */}
                            <path d="M 215 125 L 226 185 L 232 275" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" />
                            <path d="M 85 125 L 74 185 L 68 275" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="1.2" />

                            {/* Triangular Side Gussets at Hips (Luxury Tailoring Mark) */}
                            <polygon points="218,326 215,334 221,334" fill="rgba(255,255,255,0.4)" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />
                            <polygon points="82,326 79,334 85,334" fill="rgba(255,255,255,0.4)" stroke="rgba(0,0,0,0.2)" strokeWidth="0.5" />

                            {/* Tailored Barrel Cuffs & Gauntlet Plackets (Front vs Back) */}
                            {currentStyle.id !== 'french-cuff' && (
                              <g>
                                {viewAngle === 'front' ? (
                                  <>
                                    {/* Right Forearm Gauntlet Slit & Button */}
                                    <line x1="250" y1="228" x2="250" y2="248" stroke="rgba(0,0,0,0.28)" strokeWidth="0.8" />
                                    <circle cx="250" cy="238" r="1.6" fill="url(#real-mop-button)" stroke="#999" strokeWidth="0.3" />

                                    {/* Left Forearm Gauntlet Slit & Button */}
                                    <line x1="50" y1="228" x2="50" y2="248" stroke="rgba(0,0,0,0.28)" strokeWidth="0.8" />
                                    <circle cx="50" cy="238" r="1.6" fill="url(#real-mop-button)" stroke="#999" strokeWidth="0.3" />

                                    {/* Right Barrel Cuff with Edge Top-Stitching */}
                                    <line x1="232" y1="248" x2="268" y2="248" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
                                    <line x1="232" y1="251" x2="268" y2="251" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1" strokeWidth="0.8" />
                                    <g filter="url(#real-button-shadow)">
                                      <circle cx="250" cy="262" r="3" fill="url(#real-mop-button)" stroke="rgba(0,0,0,0.25)" strokeWidth="0.4" />
                                      <line x1="249" y1="261" x2="251" y2="263" stroke="#2B2620" strokeWidth="0.4" />
                                      <line x1="251" y1="261" x2="249" y2="263" stroke="#2B2620" strokeWidth="0.4" />
                                    </g>

                                    {/* Left Barrel Cuff with Edge Top-Stitching */}
                                    <line x1="32" y1="248" x2="68" y2="248" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
                                    <line x1="32" y1="251" x2="68" y2="251" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1" strokeWidth="0.8" />
                                    <g filter="url(#real-button-shadow)">
                                      <circle cx="50" cy="262" r="3" fill="url(#real-mop-button)" stroke="rgba(0,0,0,0.25)" strokeWidth="0.4" />
                                      <line x1="49" y1="261" x2="51" y2="263" stroke="#2B2620" strokeWidth="0.4" />
                                      <line x1="51" y1="261" x2="49" y2="263" stroke="#2B2620" strokeWidth="0.4" />
                                    </g>
                                  </>
                                ) : (
                                  // Back of Cuffs (Smooth tailored cuffs from behind)
                                  <>
                                    <line x1="232" y1="248" x2="268" y2="248" stroke="rgba(0,0,0,0.28)" strokeWidth="1.2" />
                                    <line x1="232" y1="251" x2="268" y2="251" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1" strokeWidth="0.8" />
                                    <line x1="32" y1="248" x2="68" y2="248" stroke="rgba(0,0,0,0.28)" strokeWidth="1.2" />
                                    <line x1="32" y1="251" x2="68" y2="251" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1" strokeWidth="0.8" />
                                  </>
                                )}
                              </g>
                            )}

                            {/* French Double Cuffs with Gold/Pearl Cufflinks */}
                            {currentStyle.id === 'french-cuff' && (
                              <g fill="rgba(255,255,255,0.95)" stroke="rgba(0,0,0,0.3)" strokeWidth="1.2">
                                <rect x="28" y="246" width="44" height="28" rx="2" filter="url(#real-button-shadow)" />
                                <circle cx="50" cy="262" r="3.2" fill="#C59B27" stroke="#111" strokeWidth="0.5" />
                                <rect x="228" y="246" width="44" height="28" rx="2" filter="url(#real-button-shadow)" />
                                <circle cx="250" cy="262" r="3.2" fill="#C59B27" stroke="#111" strokeWidth="0.5" />
                              </g>
                            )}
                          </g>
                        ) : (
                          // Half / Short Sleeve Cut with Realistic Cuffed Hem
                          <g>
                            <path
                              d="M 110 38 Q 150 46 190 38 L 260 75 L 245 155 L 220 145 L 220 330 Q 150 348 80 330 L 80 145 L 55 155 L 40 75 Z"
                              fill={customColor}
                              stroke="rgba(0,0,0,0.22)"
                              strokeWidth="1.8"
                            />

                            {/* Pattern Overlay on Short Sleeve */}
                            {selectedPatternId !== 'solid' && (
                              <path
                                d="M 110 38 Q 150 46 190 38 L 260 75 L 245 155 L 220 145 L 220 330 Q 150 348 80 330 L 80 145 L 55 155 L 40 75 Z"
                                fill={`url(#pattern-${selectedPatternId})`}
                                opacity="0.8"
                              />
                            )}

                            {/* Shading & Texture */}
                            <path
                              d="M 110 38 Q 150 46 190 38 L 260 75 L 245 155 L 220 145 L 220 330 Q 150 348 80 330 L 80 145 L 55 155 L 40 75 Z"
                              fill="url(#real-torso-lighting)"
                              opacity="0.85"
                            />
                            <path
                              d="M 110 38 Q 150 46 190 38 L 260 75 L 245 155 L 220 145 L 220 330 Q 150 348 80 330 L 80 145 L 55 155 L 40 75 Z"
                              fill="url(#real-fabric-micro-weave)"
                              opacity="0.22"
                            />

                            {/* Short Sleeve Hem Turnback & Stitches */}
                            <line x1="220" y1="145" x2="245" y2="155" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
                            <line x1="220" y1="142" x2="245" y2="152" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1.5" strokeWidth="0.8" />
                            <line x1="80" y1="145" x2="55" y2="155" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
                            <line x1="80" y1="142" x2="55" y2="152" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1.5" strokeWidth="0.8" />
                          </g>
                        )}

                        {/* ── 3. BACK VIEW SARTORIAL YOKE & BOX PLEAT (When viewAngle === 'back') ── */}
                        {viewAngle === 'back' ? (
                          <g>
                            {/* Sartorial Split Back Shoulder Yoke */}
                            <path d="M 96 68 Q 150 78 204 68" fill="none" stroke="rgba(0,0,0,0.22)" strokeWidth="1.2" strokeDasharray="3 1.5" />
                            <path d="M 96 71 Q 150 81 204 71" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" strokeDasharray="3 1.5" />

                            {/* Center Box Pleat with Locker Loop */}
                            <rect x="146" y="72" width="8" height="12" rx="1" fill={customColor} stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
                            <line x1="147" y1="84" x2="147" y2="328" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />
                            <line x1="153" y1="84" x2="153" y2="328" stroke="rgba(0,0,0,0.18)" strokeWidth="1" />

                            {/* Western Back Yoke (If Western Snap) */}
                            {currentStyle.id === 'western-snap' && (
                              <path d="M 80 100 Q 150 60 220 100" fill="none" stroke="#C59B27" strokeWidth="1.5" />
                            )}

                            {/* Natural Back Lumbar Drapery Folds */}
                            <g stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" fill="none" strokeLinecap="round">
                              <path d="M 100 240 Q 125 246 145 242" />
                              <path d="M 155 242 Q 175 246 200 240" />
                              <path d="M 96 285 Q 122 291 145 287" />
                              <path d="M 155 287 Q 178 291 204 285" />
                            </g>

                            {/* Folded Back Collar Leaf */}
                            <g filter="url(#real-collar-shadow)">
                              <path
                                d="M 112 38 Q 150 26 188 38 L 186 52 Q 150 42 114 52 Z"
                                fill={customColor}
                                stroke="rgba(0,0,0,0.32)"
                                strokeWidth="1.2"
                              />
                              <path d="M 114 49 Q 150 40 186 49" fill="none" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1.5" strokeWidth="0.8" />
                            </g>
                          </g>
                        ) : (
                          // ── FRONT VIEW DETAILS (Yoke, Placket, 3D Buttons, Pockets & Collar) ──
                          <g>
                            {/* Organic Drapery & Natural Waist Fold Creases */}
                            <g stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" fill="none" strokeLinecap="round">
                              <path d="M 95 240 Q 115 246 135 241" />
                              <path d="M 165 241 Q 185 246 205 240" />
                              <path d="M 92 285 Q 112 291 138 286" />
                              <path d="M 162 286 Q 188 291 208 285" />
                              {sleeveLength === 'full' && (
                                <>
                                  <path d="M 235 185 Q 248 192 260 183" />
                                  <path d="M 65 185 Q 52 192 40 183" />
                                  <path d="M 233 215 Q 245 222 258 213" />
                                  <path d="M 67 215 Q 55 222 42 213" />
                                </>
                              )}
                            </g>

                            {/* Sartorial Front Shoulder Seams */}
                            <path d="M 96 62 Q 150 74 204 62" fill="none" stroke="rgba(0,0,0,0.14)" strokeWidth="1" strokeDasharray="3 1.5" />

                            {/* Tuxedo Pleated Front Bib Panel */}
                            {currentStyle.id === 'tuxedo-wingtip' && (
                              <g filter="url(#real-button-shadow)">
                                <rect x="124" y="46" width="52" height="185" fill="rgba(255,255,255,0.92)" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
                                {[128, 132, 136, 140, 160, 164, 168, 172].map((x) => (
                                  <line key={x} x1={x} y1="46" x2={x} y2="231" stroke="rgba(0,0,0,0.18)" strokeWidth="0.8" />
                                ))}
                                {[85, 125, 165, 205].map((y) => (
                                  <g key={y} filter="url(#real-button-shadow)">
                                    <circle cx="150" cy={y} r="3.2" fill="#141414" stroke="#C59B27" strokeWidth="0.8" />
                                    <circle cx="149" cy={y - 1} r="0.8" fill="rgba(255,255,255,0.6)" />
                                  </g>
                                ))}
                              </g>
                            )}

                            {/* 3D Placket & Mother-of-Pearl Buttons */}
                            {currentStyle.id !== 'tuxedo-wingtip' && (
                              <g>
                                <rect x="143.5" y="44" width="13" height="298" fill="rgba(0,0,0,0.06)" filter="url(#real-placket-shadow)" />
                                <rect x="144" y="44" width="12" height="298" fill="rgba(255,255,255,0.06)" />
                                <line x1="145.2" y1="44" x2="145.2" y2="342" stroke="rgba(255,255,255,0.3)" strokeDasharray="2 1.5" strokeWidth="0.8" />
                                <line x1="154.8" y1="44" x2="154.8" y2="342" stroke="rgba(0,0,0,0.2)" strokeDasharray="2 1.5" strokeWidth="0.8" />

                                {[80, 125, 170, 215, 260, 305].map((y) => (
                                  <g key={y} filter="url(#real-button-shadow)">
                                    <circle
                                      cx="150"
                                      cy={y}
                                      r="3.4"
                                      fill={currentStyle.id === 'western-snap' ? '#F7F7F7' : 'url(#real-mop-button)'}
                                      stroke={currentStyle.id === 'western-snap' ? '#888' : 'rgba(0,0,0,0.25)'}
                                      strokeWidth="0.4"
                                    />
                                    {currentStyle.id !== 'western-snap' && (
                                      <>
                                        <circle cx="150" cy={y} r="2.1" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="0.35" />
                                        <circle cx="149.1" cy={y - 0.9} r="0.35" fill="#3D3832" />
                                        <circle cx="150.9" cy={y - 0.9} r="0.35" fill="#3D3832" />
                                        <circle cx="149.1" cy={y + 0.9} r="0.35" fill="#3D3832" />
                                        <circle cx="150.9" cy={y + 0.9} r="0.35" fill="#3D3832" />
                                        <line x1="149.1" y1={y - 0.9} x2="150.9" y2={y + 0.9} stroke="#2B2620" strokeWidth="0.4" />
                                        <line x1="150.9" y1={y - 0.9} x2="149.1" y2={y + 0.9} stroke="#2B2620" strokeWidth="0.4" />
                                      </>
                                    )}
                                  </g>
                                ))}
                              </g>
                            )}

                            {/* Western Pointed Yokes */}
                            {currentStyle.id === 'western-snap' && (
                              <g stroke="#C59B27" strokeWidth="1.5" fill="none">
                                <path d="M 80 120 Q 115 80 145 100" />
                                <path d="M 220 120 Q 185 80 155 100" />
                              </g>
                            )}

                            {/* 3D Flap Chest Pockets */}
                            {(currentStyle.id === 'flannel-shacket' || currentStyle.id === 'western-snap' || currentStyle.id === 'short-sleeve-resort') && (
                              <g filter="url(#real-pocket-shadow)">
                                <rect x="94" y="125" width="40" height="44" rx="2" fill={customColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                                <path d="M 94 125 L 114 136 L 134 125 Z" fill="rgba(0,0,0,0.08)" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
                                <circle cx="114" cy="133" r="2.5" fill="url(#real-mop-button)" filter="url(#real-button-shadow)" />

                                <rect x="166" y="125" width="40" height="44" rx="2" fill={customColor} stroke="rgba(0,0,0,0.2)" strokeWidth="1" />
                                <path d="M 166 125 L 186 136 L 206 125 Z" fill="rgba(0,0,0,0.08)" stroke="rgba(0,0,0,0.25)" strokeWidth="1" />
                                <circle cx="186" cy="133" r="2.5" fill="url(#real-mop-button)" filter="url(#real-button-shadow)" />
                              </g>
                            )}

                            {/* Silk Bowling Shirt Contrast Piping */}
                            {currentStyle.id === 'silk-bowling' && (
                              <g stroke="#FFFFFF" strokeWidth="2" fill="none">
                                <line x1="144" y1="45" x2="144" y2="335" />
                                <line x1="156" y1="45" x2="156" y2="335" />
                                {sleeveLength === 'full' ? (
                                  <>
                                    <line x1="232" y1="250" x2="268" y2="250" />
                                    <line x1="32" y1="250" x2="68" y2="250" />
                                  </>
                                ) : (
                                  <>
                                    <line x1="220" y1="145" x2="245" y2="155" />
                                    <line x1="80" y1="145" x2="55" y2="155" />
                                  </>
                                )}
                              </g>
                            )}

                            {/* 3D Front Collar Structure */}
                            <g filter="url(#real-collar-shadow)">
                              {currentStyle.id === 'mandarin-band' ? (
                                <g>
                                  <path d="M 112 38 Q 150 48 188 38 L 186 52 Q 150 60 114 52 Z" fill={customColor} stroke="rgba(0,0,0,0.35)" strokeWidth="1.2" />
                                  <circle cx="150" cy="46" r="2.2" fill="url(#real-mop-button)" />
                                </g>
                              ) : currentStyle.id === 'tuxedo-wingtip' ? (
                                <g fill="#FFFFFF" stroke="rgba(0,0,0,0.35)" strokeWidth="1.2">
                                  <path d="M 112 38 L 126 60 L 142 46 Z" />
                                  <path d="M 188 38 L 174 60 L 158 46 Z" />
                                </g>
                              ) : currentStyle.id === 'cuban-collar' || currentStyle.id === 'silk-bowling' ? (
                                <g fill={customColor} stroke="rgba(0,0,0,0.32)" strokeWidth="1.2">
                                  <path d="M 114 38 L 94 82 L 138 72 Z" />
                                  <path d="M 186 38 L 206 82 L 162 72 Z" />
                                  <path d="M 114 41 L 96 80 L 136 71" fill="none" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1.5" strokeWidth="0.8" />
                                  <path d="M 186 41 L 204 80 L 164 71" fill="none" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1.5" strokeWidth="0.8" />
                                </g>
                              ) : (
                                <g fill={customColor} stroke="rgba(0,0,0,0.32)" strokeWidth="1.2">
                                  <path d="M 112 38 L 96 92 L 140 72 Z" />
                                  <path d="M 188 38 L 204 92 L 160 72 Z" />
                                  <path d="M 112 40 L 98 90 L 138 71" fill="none" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1.5" strokeWidth="0.8" />
                                  <path d="M 188 40 L 202 90 L 162 71" fill="none" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1.5" strokeWidth="0.8" />
                                </g>
                              )}
                            </g>
                          </g>
                        )}
                      </svg>
                    )}

                    {/* ── T-SHIRT REALISTIC SVG ENGINE (FRONT & BACK VIEWS) ── */}
                    {selectedGarmentId === 'tshirt' && (
                      <svg
                        viewBox="0 0 300 360"
                        className="w-full h-full max-h-[360px] filter drop-shadow-2xl transition-all duration-500"
                      >
                        <defs>
                          <pattern id="real-fabric-micro-weave" width="4" height="4" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="2" x2="4" y2="2" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
                            <line x1="2" y1="0" x2="2" y2="4" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                          </pattern>
                          <linearGradient id="real-tshirt-lighting" x1="15%" y1="0%" x2="90%" y2="100%">
                            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
                            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.06" />
                            <stop offset="65%" stopColor="#000000" stopOpacity="0.04" />
                            <stop offset="100%" stopColor="#000000" stopOpacity="0.22" />
                          </linearGradient>
                          <filter id="real-collar-shadow" x="-30%" y="-20%" width="160%" height="180%">
                            <feDropShadow dx="0" dy="3" stdDeviation="2.5" floodColor="#000000" floodOpacity="0.35" />
                          </filter>
                        </defs>

                        {/* 1. Inner Neck & Brand Label (Front View Only) */}
                        {viewAngle === 'front' && (
                          <g>
                            <ellipse cx="150" cy="38" rx="36" ry="12" fill="#181512" />
                            <rect x="139" y="28" width="22" height="8" rx="1" fill="#FAF8F5" stroke="#C59B27" strokeWidth="0.5" />
                            <text x="150" y="33.5" textAnchor="middle" fontSize="3.5" fontFamily="serif" fill="#1C1815" fontWeight="bold">TIMELESS</text>
                          </g>
                        )}

                        {/* 2. Body & Sleeves */}
                        <path
                          d={
                            currentStyle.id === 'drop-shoulder' || currentStyle.id === 'oversized-heavy'
                              ? 'M 105 35 Q 150 50 195 35 L 285 85 L 255 145 L 225 130 L 224 330 Q 150 338 76 330 L 75 130 L 45 145 L 15 85 Z'
                              : 'M 110 38 Q 150 50 190 38 L 265 88 L 240 140 L 215 125 L 214 330 Q 150 338 86 330 L 85 125 L 60 140 L 35 88 Z'
                          }
                          fill={customColor}
                          stroke="rgba(0,0,0,0.2)"
                          strokeWidth="1.8"
                        />

                        {/* Shading & Fabric Weave Overlays */}
                        <path
                          d={
                            currentStyle.id === 'drop-shoulder' || currentStyle.id === 'oversized-heavy'
                              ? 'M 105 35 Q 150 50 195 35 L 285 85 L 255 145 L 225 130 L 224 330 Q 150 338 76 330 L 75 130 L 45 145 L 15 85 Z'
                              : 'M 110 38 Q 150 50 190 38 L 265 88 L 240 140 L 215 125 L 214 330 Q 150 338 86 330 L 85 125 L 60 140 L 35 88 Z'
                          }
                          fill="url(#real-tshirt-lighting)"
                          opacity="0.85"
                        />
                        <path
                          d={
                            currentStyle.id === 'drop-shoulder' || currentStyle.id === 'oversized-heavy'
                              ? 'M 105 35 Q 150 50 195 35 L 285 85 L 255 145 L 225 130 L 224 330 Q 150 338 76 330 L 75 130 L 45 145 L 15 85 Z'
                              : 'M 110 38 Q 150 50 190 38 L 265 88 L 240 140 L 215 125 L 214 330 Q 150 338 86 330 L 85 125 L 60 140 L 35 88 Z'
                          }
                          fill="url(#real-fabric-micro-weave)"
                          opacity="0.2"
                        />

                        {/* 3. Ribbed Crewneck Collar (Front Scoop vs High Back Rib Band) */}
                        {viewAngle === 'front' ? (
                          <g filter="url(#real-collar-shadow)">
                            <path
                              d="M 106 36 Q 150 68 194 36 Q 150 56 106 36 Z"
                              fill={customColor}
                              stroke="rgba(0,0,0,0.25)"
                              strokeWidth="1.2"
                            />
                            <path d="M 110 39 Q 150 64 190 39" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" strokeDasharray="2 1.5" />
                          </g>
                        ) : (
                          // High Back Collar Band from Behind
                          <g filter="url(#real-collar-shadow)">
                            <path
                              d="M 106 36 Q 150 26 194 36 L 192 46 Q 150 36 108 46 Z"
                              fill={customColor}
                              stroke="rgba(0,0,0,0.28)"
                              strokeWidth="1.2"
                            />
                            <path d="M 108 46 Q 150 36 192 46" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" strokeDasharray="2.5 1.5" />
                          </g>
                        )}

                        {/* 4. Natural Drapery Creases */}
                        <g stroke="rgba(0,0,0,0.12)" strokeWidth="1.2" fill="none" strokeLinecap="round">
                          <path d="M 95 230 Q 115 236 135 231" />
                          <path d="M 165 231 Q 185 236 205 230" />
                          <path d="M 98 275 Q 118 281 142 276" />
                          <path d="M 158 276 Q 182 281 202 275" />
                        </g>

                        {/* 5. Double-Needle Coverstitch at Sleeves and Hem */}
                        <line x1="18" y1="87" x2="43" y2="142" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1.5" strokeWidth="0.8" />
                        <line x1="282" y1="87" x2="257" y2="142" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1.5" strokeWidth="0.8" />
                        <path d="M 80 324 Q 150 332 220 324" fill="none" stroke="rgba(255,255,255,0.25)" strokeDasharray="2 1.5" strokeWidth="0.8" />

                        {/* 6. Ripped / Distressed Edge Abrasions */}
                        {currentStyle.id === 'ripped-tshirt' && (
                          <g stroke="rgba(255,255,255,0.8)" strokeWidth="1.5">
                            <path d="M 120 120 Q 135 122 145 119" />
                            <path d="M 122 125 Q 133 126 142 123" />
                            <path d="M 170 190 Q 185 193 195 188" />
                            <path d="M 172 196 Q 183 198 193 194" />
                            <path d="M 85 328 L 90 322 L 95 328 L 100 323" stroke="rgba(0,0,0,0.3)" />
                            <path d="M 200 328 L 205 322 L 210 328 L 215 323" stroke="rgba(0,0,0,0.3)" />
                          </g>
                        )}
                      </svg>
                    )}

                    {/* ── JEANS & DENIM REALISTIC SVG ENGINE (FRONT & BACK VIEWS) ── */}
                    {selectedGarmentId === 'jeans' && (
                      <svg
                        viewBox="0 0 300 360"
                        className="w-full h-full max-h-[360px] filter drop-shadow-2xl transition-all duration-500"
                      >
                        <defs>
                          <pattern id="real-denim-twill" width="6" height="6" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="6" y2="6" stroke="rgba(255,255,255,0.14)" strokeWidth="0.8" />
                            <line x1="0" y1="3" x2="6" y2="9" stroke="rgba(0,0,0,0.12)" strokeWidth="0.8" />
                          </pattern>
                          <radialGradient id="real-brass-button" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#E6C875" />
                            <stop offset="50%" stopColor="#B89742" />
                            <stop offset="100%" stopColor="#5C4512" />
                          </radialGradient>
                          <radialGradient id="real-copper-rivet" cx="35%" cy="35%" r="65%">
                            <stop offset="0%" stopColor="#E89B72" />
                            <stop offset="60%" stopColor="#B35B2E" />
                            <stop offset="100%" stopColor="#6E2F11" />
                          </radialGradient>
                          <filter id="real-button-shadow" x="-30%" y="-30%" width="160%" height="160%">
                            <feDropShadow dx="0" dy="1.2" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.4" />
                          </filter>
                        </defs>

                        {/* 1. Base Denim Legs */}
                        <path
                          d={
                            currentStyle.id === 'baggy-wide'
                              ? 'M 86 65 L 214 65 L 222 342 L 165 342 L 150 152 L 135 342 L 78 342 Z'
                              : 'M 86 65 L 214 65 L 205 342 L 165 342 L 150 160 L 135 342 L 95 342 Z'
                          }
                          fill={customColor}
                          stroke="rgba(0,0,0,0.3)"
                          strokeWidth="2"
                        />

                        {/* Denim Twill Weave Overlay */}
                        <path
                          d={
                            currentStyle.id === 'baggy-wide'
                              ? 'M 86 65 L 214 65 L 222 342 L 165 342 L 150 152 L 135 342 L 78 342 Z'
                              : 'M 86 65 L 214 65 L 205 342 L 165 342 L 150 160 L 135 342 L 95 342 Z'
                          }
                          fill="url(#real-denim-twill)"
                          opacity="0.3"
                        />

                        {viewAngle === 'front' ? (
                          // ── FRONT JEANS DETAILS (Thigh Fades, Whiskers, Scoop Pockets, Shank Button, J-Fly) ──
                          <g>
                            {/* Hand-Sanded 3D Thigh Fade Highlights */}
                            <ellipse cx="120" cy="195" rx="16" ry="62" fill="rgba(255,255,255,0.18)" filter="blur(6px)" />
                            <ellipse cx="180" cy="195" rx="16" ry="62" fill="rgba(255,255,255,0.18)" filter="blur(6px)" />

                            {/* 3D Whiskering Creases */}
                            <g stroke="rgba(255,255,255,0.22)" strokeWidth="2.5" fill="none" strokeLinecap="round" filter="blur(1px)">
                              <path d="M 135 110 Q 115 130 96 142" />
                              <path d="M 135 125 Q 118 142 102 152" />
                              <path d="M 165 110 Q 185 130 204 142" />
                              <path d="M 165 125 Q 182 142 198 152" />
                            </g>

                            {/* Waistband with Belt Loops & Double Stitch */}
                            <path d="M 85 40 L 215 40 L 213 65 L 87 65 Z" fill={customColor} stroke="rgba(0,0,0,0.3)" strokeWidth="1.8" />
                            <line x1="86" y1="42" x2="214" y2="42" stroke="#C59B27" strokeWidth="1.2" strokeDasharray="3 1.5" />
                            <line x1="87" y1="63" x2="213" y2="63" stroke="#C59B27" strokeWidth="1.2" strokeDasharray="3 1.5" />
                            {[96, 125, 150, 175, 204].map((x) => (
                              <rect key={x} x={x - 2} y="39" width="4" height="27" rx="0.5" fill={customColor} stroke="#A8821E" strokeWidth="0.8" />
                            ))}

                            {/* Curved Scoop Pockets with Coin Pocket & Copper Rivets */}
                            <path d="M 92 65 Q 118 105 134 65" fill="none" stroke="#C59B27" strokeWidth="1.6" strokeDasharray="3 1" />
                            <path d="M 208 65 Q 182 105 166 65" fill="none" stroke="#C59B27" strokeWidth="1.6" strokeDasharray="3 1" />
                            <rect x="180" y="68" width="16" height="14" rx="1" fill="none" stroke="#C59B27" strokeWidth="1.2" strokeDasharray="2 1" />

                            {/* Copper Rivet Studs */}
                            <circle cx="94" cy="67" r="1.8" fill="url(#real-copper-rivet)" />
                            <circle cx="132" cy="67" r="1.8" fill="url(#real-copper-rivet)" />
                            <circle cx="206" cy="67" r="1.8" fill="url(#real-copper-rivet)" />
                            <circle cx="168" cy="67" r="1.8" fill="url(#real-copper-rivet)" />

                            {/* Fly with Curved J-Stitch */}
                            <path d="M 150 65 L 150 120 Q 150 140 138 140" fill="none" stroke="#C59B27" strokeWidth="1.6" strokeDasharray="3 1" />
                            <circle cx="150" cy="52" r="4.5" fill="url(#real-brass-button)" stroke="#3B2A08" strokeWidth="0.6" filter="url(#real-button-shadow)" />
                            <circle cx="150" cy="52" r="2.5" fill="none" stroke="#664D12" strokeWidth="0.5" />
                          </g>
                        ) : (
                          // ── BACK JEANS DETAILS (V-Yoke, Pentagonal Back Pockets with Arcuate Stitch, Leather Patch, Honeycombs) ──
                          <g>
                            {/* Waistband with Belt Loops */}
                            <path d="M 85 40 L 215 40 L 213 65 L 87 65 Z" fill={customColor} stroke="rgba(0,0,0,0.3)" strokeWidth="1.8" />
                            <line x1="86" y1="42" x2="214" y2="42" stroke="#C59B27" strokeWidth="1.2" strokeDasharray="3 1.5" />
                            <line x1="87" y1="63" x2="213" y2="63" stroke="#C59B27" strokeWidth="1.2" strokeDasharray="3 1.5" />
                            {[96, 122, 178, 204].map((x) => (
                              <rect key={x} x={x - 2} y="39" width="4" height="27" rx="0.5" fill={customColor} stroke="#A8821E" strokeWidth="0.8" />
                            ))}

                            {/* Cognac Leather Brand Patch (Jacron) on Right Rear Waistband */}
                            <g filter="url(#real-button-shadow)">
                              <rect x="174" y="41" width="34" height="22" rx="1.5" fill="#8B4A1E" stroke="#4A240B" strokeWidth="0.8" />
                              <rect x="176" y="43" width="30" height="18" fill="none" stroke="#D4AF37" strokeWidth="0.6" strokeDasharray="1.5 1" />
                              <text x="191" y="51.5" textAnchor="middle" fontSize="3.2" fontFamily="sans-serif" fill="#FDF7F0" fontWeight="bold" letterSpacing="0.4">TIMELESS</text>
                              <text x="191" y="56.5" textAnchor="middle" fontSize="2.2" fontFamily="sans-serif" fill="#F0D1AB" letterSpacing="0.2">DENIM ATELIER</text>
                            </g>

                            {/* Authentic V-Shaped Denim Riser Back Yoke */}
                            <path d="M 86 65 L 150 96 L 214 65" fill="none" stroke="#C59B27" strokeWidth="1.8" strokeDasharray="3 1.5" />
                            <path d="M 86 68 L 150 99 L 214 68" fill="none" stroke="#C59B27" strokeWidth="1.8" strokeDasharray="3 1.5" />

                            {/* Center Back Seat Rise Seam */}
                            <line x1="150" y1="96" x2="150" y2="152" stroke="#C59B27" strokeWidth="1.8" strokeDasharray="3 1.5" />
                            <line x1="148" y1="96" x2="148" y2="152" stroke="#C59B27" strokeWidth="1.2" strokeDasharray="3 1.5" />

                            {/* Left Pentagonal Patch Back Pocket */}
                            <g filter="url(#real-button-shadow)">
                              <path d="M 98 105 L 138 105 L 136 142 L 118 156 L 100 142 Z" fill={customColor} stroke="#C59B27" strokeWidth="1.8" />
                              <path d="M 100 107 L 136 107 L 134 140 L 118 153 L 102 140 Z" fill="none" stroke="#C59B27" strokeWidth="1.2" strokeDasharray="2 1" />
                              {/* Signature Dual-Wave Arcuate Stitch */}
                              <path d="M 100 120 Q 109 135 118 126 Q 127 135 136 120" fill="none" stroke="#C59B27" strokeWidth="1.4" />
                              {/* Copper Corner Rivets */}
                              <circle cx="99" cy="106" r="1.6" fill="url(#real-copper-rivet)" />
                              <circle cx="137" cy="106" r="1.6" fill="url(#real-copper-rivet)" />
                            </g>

                            {/* Right Pentagonal Patch Back Pocket */}
                            <g filter="url(#real-button-shadow)">
                              <path d="M 162 105 L 202 105 L 200 142 L 182 156 L 164 142 Z" fill={customColor} stroke="#C59B27" strokeWidth="1.8" />
                              <path d="M 164 107 L 200 107 L 198 140 L 182 153 L 166 140 Z" fill="none" stroke="#C59B27" strokeWidth="1.2" strokeDasharray="2 1" />
                              {/* Signature Dual-Wave Arcuate Stitch */}
                              <path d="M 164 120 Q 173 135 182 126 Q 191 135 200 120" fill="none" stroke="#C59B27" strokeWidth="1.4" />
                              {/* Copper Corner Rivets */}
                              <circle cx="163" cy="106" r="1.6" fill="url(#real-copper-rivet)" />
                              <circle cx="201" cy="106" r="1.6" fill="url(#real-copper-rivet)" />
                            </g>

                            {/* Behind-the-Knee Honeycomb Creases */}
                            <g stroke="rgba(255,255,255,0.2)" strokeWidth="2.2" fill="none" strokeLinecap="round" filter="blur(1px)">
                              <path d="M 104 220 Q 118 226 130 221" />
                              <path d="M 106 228 Q 118 234 128 229" />
                              <path d="M 108 236 Q 118 242 126 237" />
                              <path d="M 170 221 Q 182 226 196 220" />
                              <path d="M 172 229 Q 182 234 194 228" />
                              <path d="M 174 237 Q 182 242 192 236" />
                            </g>
                          </g>
                        )}

                        {/* Inseam Golden Contrast Double Stitch */}
                        <path d="M 150 152 L 135 342" stroke="#C59B27" strokeWidth="1.4" strokeDasharray="3 1.5" />
                        <path d="M 150 152 L 165 342" stroke="#C59B27" strokeWidth="1.4" strokeDasharray="3 1.5" />

                        {/* Ripped Distressed Holes */}
                        {currentStyle.id === 'ripped-jeans' && (
                          <g stroke="rgba(255,255,255,0.85)" strokeWidth="1.5">
                            <rect x="108" y="198" width="24" height="16" rx="2" fill="#141414" />
                            <line x1="108" y1="202" x2="132" y2="202" />
                            <line x1="108" y1="206" x2="132" y2="206" />
                            <line x1="108" y1="210" x2="132" y2="210" />

                            <rect x="170" y="210" width="22" height="14" rx="2" fill="#141414" />
                            <line x1="170" y1="214" x2="192" y2="214" />
                            <line x1="170" y1="218" x2="192" y2="218" />
                          </g>
                        )}
                      </svg>
                    )}

                    {/* ── FORMAL PANTS REALISTIC SVG ENGINE (FRONT & BACK VIEWS) ── */}
                    {selectedGarmentId === 'formal-pants' && (
                      <svg
                        viewBox="0 0 300 360"
                        className="w-full h-full max-h-[360px] filter drop-shadow-2xl transition-all duration-500"
                      >
                        <defs>
                          <pattern id="real-wool-twill" width="4" height="4" patternUnits="userSpaceOnUse">
                            <line x1="0" y1="0" x2="4" y2="4" stroke="rgba(255,255,255,0.08)" strokeWidth="0.6" />
                            <line x1="0" y1="2" x2="4" y2="6" stroke="rgba(0,0,0,0.06)" strokeWidth="0.6" />
                          </pattern>
                        </defs>

                        {/* 1. Tailored Wool Trousers Legs */}
                        <path
                          d="M 86 68 L 214 68 L 203 345 L 163 345 L 150 152 L 137 345 L 97 345 Z"
                          fill={customColor}
                          stroke="rgba(0,0,0,0.3)"
                          strokeWidth="1.8"
                        />
                        <path
                          d="M 86 68 L 214 68 L 203 345 L 163 345 L 150 152 L 137 345 L 97 345 Z"
                          fill="url(#real-wool-twill)"
                          opacity="0.25"
                        />

                        {viewAngle === 'front' ? (
                          // ── FRONT VIEW (Split-Lighting Knife Creases, Gurkha Waistband Tab, Slant Pockets) ──
                          <g>
                            {/* 3D Split-Lighting Knife Pleats */}
                            <line x1="120" y1="78" x2="118" y2="345" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
                            <line x1="121.2" y1="78" x2="119.2" y2="345" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
                            <line x1="180" y1="78" x2="182" y2="345" stroke="rgba(255,255,255,0.35)" strokeWidth="1.2" />
                            <line x1="181.2" y1="78" x2="183.2" y2="345" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />

                            {/* High Sartorial Waistband with Extended Tab */}
                            <path d="M 85 44 L 215 44 L 213 68 L 87 68 Z" fill={customColor} stroke="rgba(0,0,0,0.3)" strokeWidth="1.6" />
                            <rect x="142" y="47" width="16" height="18" rx="1.5" fill="rgba(255,255,255,0.12)" stroke="rgba(0,0,0,0.25)" strokeWidth="0.8" />
                            <circle cx="150" cy="56" r="2.8" fill="#2E2418" stroke="#D4AF37" strokeWidth="0.6" />

                            {/* Slanted Bespoke Hand-Stitched Pockets */}
                            <line x1="91" y1="72" x2="106" y2="108" stroke="rgba(0,0,0,0.3)" strokeWidth="1.8" />
                            <line x1="209" y1="72" x2="194" y2="108" stroke="rgba(0,0,0,0.3)" strokeWidth="1.8" />
                            <line x1="89" y1="72" x2="93" y2="72" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
                            <line x1="104" y1="108" x2="108" y2="108" stroke="rgba(0,0,0,0.4)" strokeWidth="1.5" />
                          </g>
                        ) : (
                          // ── BACK VIEW (Sartorial After-Dinner V-Split, Double-Jetted Rear Welt Pockets & Horn Buttons) ──
                          <g>
                            {/* Sartorial After-Dinner Split Waistband (V-Notch at Center Back) */}
                            <path d="M 85 44 L 148 44 L 150 52 L 152 44 L 215 44 L 213 68 L 87 68 Z" fill={customColor} stroke="rgba(0,0,0,0.3)" strokeWidth="1.6" />
                            <line x1="150" y1="52" x2="150" y2="152" stroke="rgba(0,0,0,0.22)" strokeWidth="1.2" />

                            {/* Left Double-Jetted Rear Welt Pocket with Horn Button */}
                            <g>
                              <rect x="98" y="90" width="38" height="6" rx="1" fill="rgba(0,0,0,0.2)" stroke="rgba(0,0,0,0.35)" strokeWidth="0.8" />
                              <line x1="98" y1="93" x2="136" y2="93" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                              <polygon points="113,90 121,90 117,98" fill={customColor} stroke="rgba(0,0,0,0.3)" strokeWidth="0.6" />
                              <circle cx="117" cy="100" r="2.4" fill="#2E2418" stroke="#D4AF37" strokeWidth="0.5" />
                            </g>

                            {/* Right Double-Jetted Rear Welt Pocket with Horn Button */}
                            <g>
                              <rect x="164" y="90" width="38" height="6" rx="1" fill="rgba(0,0,0,0.2)" stroke="rgba(0,0,0,0.35)" strokeWidth="0.8" />
                              <line x1="164" y1="93" x2="202" y2="93" stroke="rgba(255,255,255,0.25)" strokeWidth="0.8" />
                              <polygon points="179,90 187,90 183,98" fill={customColor} stroke="rgba(0,0,0,0.3)" strokeWidth="0.6" />
                              <circle cx="183" cy="100" r="2.4" fill="#2E2418" stroke="#D4AF37" strokeWidth="0.5" />
                            </g>

                            {/* Back Calf Razor Crease Lines */}
                            <line x1="120" y1="96" x2="118" y2="345" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
                            <line x1="180" y1="96" x2="182" y2="345" stroke="rgba(255,255,255,0.3)" strokeWidth="1.2" />
                          </g>
                        )}

                        {/* Cuffed Sartorial Hem Break */}
                        <line x1="97" y1="334" x2="137" y2="334" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
                        <line x1="163" y1="334" x2="203" y2="334" stroke="rgba(0,0,0,0.25)" strokeWidth="1.2" />
                      </svg>
                    )}

                    {/* ── HOODIE REALISTIC SVG ENGINE (FRONT & BACK VIEWS) ── */}
                    {selectedGarmentId === 'hoodie' && (
                      <svg
                        viewBox="0 0 300 360"
                        className="w-full h-full max-h-[360px] filter drop-shadow-2xl transition-all duration-500"
                      >
                        <defs>
                          <filter id="real-hood-shadow" x="-30%" y="-20%" width="160%" height="180%">
                            <feDropShadow dx="0" dy="5" stdDeviation="4" floodColor="#000000" floodOpacity="0.45" />
                          </filter>
                          <filter id="real-button-shadow" x="-30%" y="-30%" width="160%" height="160%">
                            <feDropShadow dx="0" dy="1.2" stdDeviation="0.8" floodColor="#000000" floodOpacity="0.4" />
                          </filter>
                        </defs>

                        {/* 1. Heavyweight Terry Body & Sleeves */}
                        <path
                          d="M 100 45 L 200 45 L 285 95 L 255 155 L 225 140 L 225 330 L 75 330 L 75 140 L 45 155 L 15 95 Z"
                          fill={customColor}
                          stroke="rgba(0,0,0,0.25)"
                          strokeWidth="2"
                        />

                        {/* Shading */}
                        <path
                          d="M 100 45 L 200 45 L 285 95 L 255 155 L 225 140 L 225 330 L 75 330 L 75 140 L 45 155 L 15 95 Z"
                          fill="url(#real-torso-lighting)"
                          opacity="0.85"
                        />

                        {viewAngle === 'front' ? (
                          // ── FRONT VIEW (Deep Inner Hood Opening, Metallic Eyelets, Cords & Kangaroo Pocket) ──
                          <g>
                            {/* Volumetric Hood Cavity & Lip */}
                            <g filter="url(#real-hood-shadow)">
                              <path d="M 105 45 Q 150 18 195 45 Q 150 82 105 45 Z" fill="#141414" stroke="rgba(0,0,0,0.3)" strokeWidth="1" />
                              <path d="M 100 45 Q 150 14 200 45 Q 150 72 100 45 Z" fill={customColor} stroke="rgba(0,0,0,0.28)" strokeWidth="1.5" />
                            </g>

                            {/* Metallic Eyelets & Hanging Drawstrings */}
                            <circle cx="138" cy="74" r="2.2" fill="none" stroke="#C59B27" strokeWidth="1" />
                            <circle cx="162" cy="74" r="2.2" fill="none" stroke="#C59B27" strokeWidth="1" />
                            <path d="M 138 76 Q 134 115 137 155" fill="none" stroke="#FAF8F5" strokeWidth="2" strokeLinecap="round" />
                            <rect x="135.5" y="152" width="3" height="8" rx="0.5" fill="#C59B27" />

                            <path d="M 162 76 Q 166 115 163 155" fill="none" stroke="#FAF8F5" strokeWidth="2" strokeLinecap="round" />
                            <rect x="161.5" y="152" width="3" height="8" rx="0.5" fill="#C59B27" />

                            {/* Kangaroo Pouch Pocket */}
                            <g filter="url(#real-button-shadow)">
                              <path
                                d="M 104 235 L 196 235 L 206 295 L 94 295 Z"
                                fill={customColor}
                                stroke="rgba(0,0,0,0.22)"
                                strokeWidth="1.5"
                              />
                              <path d="M 104 235 L 94 295" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                              <path d="M 196 235 L 206 295" stroke="rgba(0,0,0,0.3)" strokeWidth="2" />
                            </g>
                          </g>
                        ) : (
                          // ── BACK VIEW (Draped Hood resting across Upper Back with Center Seam, Clean Back Torso) ──
                          <g>
                            {/* Draped Hood resting on Back */}
                            <g filter="url(#real-hood-shadow)">
                              <path
                                d="M 95 44 Q 150 20 205 44 Q 218 110 150 120 Q 82 110 95 44 Z"
                                fill={customColor}
                                stroke="rgba(0,0,0,0.3)"
                                strokeWidth="1.8"
                              />
                              {/* Center Hood Seam */}
                              <path d="M 150 20 Q 150 70 150 120" stroke="rgba(0,0,0,0.25)" strokeWidth="1.4" strokeDasharray="3 1.5" />
                              <path d="M 98 46 Q 150 24 202 46" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1" />
                            </g>
                          </g>
                        )}

                        {/* 5. Dense 2x2 Ribbed Cuffs & Waistband */}
                        <rect x="75" y="316" width="150" height="14" fill="rgba(0,0,0,0.14)" />
                        {[85, 95, 105, 115, 125, 135, 145, 155, 165, 175, 185, 195, 205, 215].map((x) => (
                          <line key={x} x1={x} y1="316" x2={x} y2="330" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
                        ))}
                      </svg>
                    )}

                    {/* ── INTERACTIVE LIVE PHOTO ON CLOTH (DRAGGABLE, RESIZABLE, ROTATABLE) ── */}
                    {uploadedPhotoUrl && (
                      <div
                        className={`absolute customizer-photo-box z-20 select-none cursor-grab active:cursor-grabbing transition-shadow ${
                          isPhotoSelected ? 'ring-2 ring-amber-500/80 ring-offset-2 ring-offset-transparent shadow-xl' : 'hover:ring-1 hover:ring-amber-400/50'
                        }`}
                        style={{
                          top: `${photoPos.y}%`,
                          left: `${photoPos.x}%`,
                          transform: `translate(-50%, -50%) rotate(${photoRotation}deg) scaleX(${photoFlipH ? -1 : 1}) scaleY(${photoFlipV ? -1 : 1})`,
                          width: `${(photoScale / 100) * 110}px`,
                          maxWidth: '240px',
                          touchAction: 'none',
                        }}
                        onPointerDown={handlePhotoPointerDown}
                        onClick={(e) => {
                          e.stopPropagation();
                          setIsPhotoSelected(true);
                        }}
                      >
                        {/* Artwork Image with Blend Mode */}
                        <div
                          className="relative group/photo rounded-xs overflow-visible"
                          style={getBlendStyle()}
                        >
                          <img
                            src={uploadedPhotoUrl}
                            alt="Custom print artwork"
                            draggable={false}
                            className="w-full object-contain rounded-xs shadow-md border border-white/20 filter contrast-105 pointer-events-none"
                          />
                        </div>

                        {/* Interactive Editor Controls Overlay (Active when selected or hovered) */}
                        {isPhotoSelected && (
                          <>
                            {/* Top Rotation Handle */}
                            <div
                              className="absolute -top-7 left-1/2 -translate-x-1/2 flex flex-col items-center cursor-grab active:cursor-grabbing z-30"
                              onPointerDown={handleRotatePointerDown}
                              title="Drag to Rotate Artwork"
                            >
                              <div className="w-5 h-5 rounded-full bg-amber-600 text-white shadow-md flex items-center justify-center border border-white text-[10px] hover:scale-110 transition-transform">
                                ⟲
                              </div>
                              <div className="w-0.5 h-2 bg-amber-600" />
                            </div>

                            {/* Corner Resize Handles */}
                            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-amber-500 border-2 border-white rounded-full shadow-xs pointer-events-none" />
                            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-amber-500 border-2 border-white rounded-full shadow-xs pointer-events-none" />
                            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-amber-500 border-2 border-white rounded-full shadow-xs pointer-events-none" />

                            {/* Bottom-Right Interactive Drag-Resize Grip */}
                            <div
                              className="absolute -bottom-2 -right-2 w-5 h-5 bg-amber-600 border-2 border-white rounded-full shadow-md cursor-nwse-resize hover:scale-125 transition-transform flex items-center justify-center text-white text-[9px] z-30"
                              onPointerDown={handleResizePointerDown}
                              title="Drag to Resize Artwork"
                            >
                              ⤡
                            </div>

                            {/* Floating Canvas Quick Action Toolbar */}
                            <div
                              className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black/90 text-white px-2 py-1 rounded-md shadow-2xl flex items-center gap-1.5 text-[10px] whitespace-nowrap z-40 backdrop-blur-xs border border-white/10"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <button
                                type="button"
                                onClick={() => setPhotoRotation((r) => (r + 90) % 360)}
                                className="px-1.5 py-0.5 rounded hover:bg-white/20 transition-colors"
                                title="Rotate 90°"
                              >
                                ⟲ 90°
                              </button>
                              <div className="w-px h-3 bg-white/20" />
                              <button
                                type="button"
                                onClick={() => setPhotoFlipH((f) => !f)}
                                className={`px-1.5 py-0.5 rounded hover:bg-white/20 transition-colors ${photoFlipH ? 'bg-amber-500/40 text-amber-300' : ''}`}
                                title="Flip Horizontally"
                              >
                                ⇄ Flip
                              </button>
                              <div className="w-px h-3 bg-white/20" />
                              <button
                                type="button"
                                onClick={() => setPhotoPos({ x: 50, y: viewAngle === 'back' ? 26 : 32 })}
                                className="px-1.5 py-0.5 rounded hover:bg-white/20 transition-colors"
                                title="Center on Garment"
                              >
                                ⊡ Center
                              </button>
                              <div className="w-px h-3 bg-white/20" />
                              <button
                                type="button"
                                onClick={handleRemovePhoto}
                                className="px-1.5 py-0.5 rounded text-rose-400 hover:bg-rose-950 hover:text-rose-300 transition-colors"
                                title="Remove Artwork"
                              >
                                ✕
                              </button>
                            </div>
                          </>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Material Texture Overlay effect */}
                  <div
                    className="absolute inset-0 opacity-[0.06] pointer-events-none mix-blend-overlay"
                    style={{
                      backgroundImage: `radial-gradient(circle at 1px 1px, #000 1px, transparent 0)`,
                      backgroundSize: '4px 4px',
                    }}
                  />
                </div>

                {/* Specs Pill Summary */}
                <div className="mt-5 grid grid-cols-2 sm:grid-cols-5 gap-2 pt-4 border-t border-border/60 text-[11px]">
                  <div>
                    <span className="text-[#998E82] uppercase text-[9px] font-semibold tracking-wider block">Fabric</span>
                    <span className="font-medium text-primary truncate block">{currentFabric.name}</span>
                  </div>
                  <div>
                    <span className="text-[#998E82] uppercase text-[9px] font-semibold tracking-wider block">Style & Sleeves</span>
                    <span className="font-medium text-primary truncate block">
                      {currentStyle.name} {selectedGarmentId === 'shirt' && `(${sleeveLength === 'full' ? 'Full' : 'Half'})`}
                    </span>
                  </div>
                  <div>
                    <span className="text-[#998E82] uppercase text-[9px] font-semibold tracking-wider block">Pattern</span>
                    <span className="font-medium text-primary truncate block">{currentPattern.name}</span>
                  </div>
                  <div>
                    <span className="text-[#998E82] uppercase text-[9px] font-semibold tracking-wider block">Color</span>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-2.5 h-2.5 rounded-full border border-black/20" style={{ backgroundColor: customColor }} />
                      <span className="font-medium text-primary truncate">{colorName}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[#998E82] uppercase text-[9px] font-semibold tracking-wider block">Size / Qty</span>
                    <span className="font-medium text-primary block">{selectedSize} · {quantity} pcs</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT COLUMN: Step-by-Step Customization Studio (7 cols) ── */}
            <div className="lg:col-span-7 space-y-8">
              
              {/* ── STEP 1: Select Garment Type ── */}
              <div className="bg-white border border-border/90 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-800">
                      Step 1 of 6
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-primary mt-0.5">
                      Choose Garment Silhouette
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                  {GARMENT_TYPES.map((garment) => {
                    const isSelected = garment.id === selectedGarmentId;
                    return (
                      <button
                        key={garment.id}
                        onClick={() => handleGarmentChange(garment.id)}
                        className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                          isSelected
                            ? 'bg-primary text-white border-primary shadow-md scale-[1.02]'
                            : 'bg-[#FAF8F5] text-primary border-border hover:border-primary/50'
                        }`}
                      >
                        <div>
                          <span className="text-2xl block mb-2">{garment.icon}</span>
                          <span className="font-serif text-sm font-medium block leading-tight">
                            {garment.name}
                          </span>
                        </div>
                        <span className={`text-[11px] font-sans font-semibold mt-3 block ${
                          isSelected ? 'text-amber-200' : 'text-text-muted'
                        }`}>
                          From ₹{garment.basePrice.toLocaleString('en-IN')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── STEP 2: Choose Fabric ── */}
              <div className="bg-white border border-border/90 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-800">
                      Step 2 of 6
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-primary mt-0.5">
                      Select Fabric Grade & Weight
                    </h2>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {fabrics.map((fabric) => {
                    const isSelected = fabric.id === selectedFabricId;
                    return (
                      <button
                        key={fabric.id}
                        onClick={() => setSelectedFabricId(fabric.id)}
                        className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-[#FAF8F5] border-primary ring-2 ring-primary/20 shadow-xs'
                            : 'bg-white border-border hover:border-[#C3B7A5]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-serif text-base font-medium text-primary">
                              {fabric.name}
                            </span>
                            <span className="text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#EAE4D7] text-primary">
                              {fabric.weight}
                            </span>
                          </div>
                          <p className="text-xs text-[#7A7065] font-light leading-relaxed">
                            {fabric.desc}
                          </p>
                        </div>
                        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-border/60">
                          <span className="text-xs font-semibold text-primary">
                            {fabric.extraPrice === 0 ? 'Standard Inclusion' : `+₹${fabric.extraPrice}`}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                              <HiOutlineCheck className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── STEP 3: Customize Style (Types of Shirts, Down Shoulder, Ripped, Pleated, etc.) ── */}
              <div className="bg-white border border-border/90 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-800">
                      Step 3 of 6
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-primary mt-0.5">
                      Tailoring Style & Cut Variations
                    </h2>
                  </div>
                  <span className="text-xs font-serif italic text-text-muted">
                    {styles.length} curated cuts available
                  </span>
                </div>
                <p className="text-xs text-text-muted mb-5 font-light">
                  {selectedGarmentId === 'shirt'
                    ? 'Select your specific shirt type: Cuban camp collar, Tuxedo wingtip bib, Oversized shacket, Western snap yoke, Mandarin band, or French double-cuff.'
                    : 'Choose your artisanal cut: Down shoulder drop, distressed rips, personal photo graphics, or sartorial pleats.'}
                </p>

                {/* ── SLEEVE CONFIGURATION FOR SHIRTS ── */}
                {selectedGarmentId === 'shirt' && (
                  <div className="mb-6 p-4 bg-[#FAF8F5] border border-border rounded-xl">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-800">
                        Sleeve Configuration
                      </span>
                      <span className="text-xs font-semibold text-primary">
                        {sleeveLength === 'full' ? 'Full Length Sleeves (Selected)' : 'Half / Short Sleeves (Selected)'}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#7A7065] font-light mb-3">
                      Choose between full-length tailored sleeves with buttoned cuffs or breezy half sleeves.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <button
                        type="button"
                        onClick={() => setSleeveLength('full')}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          sleeveLength === 'full'
                            ? 'bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20'
                            : 'bg-white text-primary border-border hover:border-primary/50'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-semibold block">Full Length Sleeves</span>
                          <span className={`text-[10px] block mt-0.5 ${sleeveLength === 'full' ? 'text-amber-200' : 'text-text-muted'}`}>
                            Tailored wrists, barrel cuffs & placket buttons
                          </span>
                        </div>
                        {sleeveLength === 'full' && <HiOutlineCheck className="w-4 h-4 text-white shrink-0 ml-2" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setSleeveLength('half')}
                        className={`p-3.5 rounded-xl border text-left transition-all flex items-center justify-between ${
                          sleeveLength === 'half'
                            ? 'bg-primary text-white border-primary shadow-xs ring-2 ring-primary/20'
                            : 'bg-white text-primary border-border hover:border-primary/50'
                        }`}
                      >
                        <div>
                          <span className="text-xs font-semibold block">Half / Short Sleeves</span>
                          <span className={`text-[10px] block mt-0.5 ${sleeveLength === 'half' ? 'text-amber-200' : 'text-text-muted'}`}>
                            Casual summer bicep cut with cuffed hem
                          </span>
                        </div>
                        {sleeveLength === 'half' && <HiOutlineCheck className="w-4 h-4 text-white shrink-0 ml-2" />}
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 mb-6">
                  {styles.map((style) => {
                    const isSelected = style.id === selectedStyleId;
                    return (
                      <button
                        key={style.id}
                        onClick={() => setSelectedStyleId(style.id)}
                        className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-[#FAF8F5] border-primary ring-2 ring-primary/20 shadow-xs'
                            : 'bg-white border-border hover:border-[#C3B7A5]'
                        }`}
                      >
                        {style.tag && (
                          <span className="absolute top-3 right-3 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                            {style.tag}
                          </span>
                        )}
                        <div>
                          <span className="font-serif text-base font-medium text-primary block pr-16 mb-1">
                            {style.name}
                          </span>
                          <p className="text-xs text-[#7A7065] font-light leading-relaxed">
                            {style.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-border/60">
                          <span className="text-xs font-semibold text-primary">
                            {style.extraPrice === 0 ? 'Standard Cut' : `+₹${style.extraPrice}`}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                              <HiOutlineCheck className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* ── PHOTO ON T-SHIRT / GARMENT INTERACTIVE ARTWORK STUDIO ── */}
                {(currentStyle.id === 'photo-print' ||
                  currentStyle.id === 'photo-hoodie' ||
                  selectedGarmentId === 'tshirt' ||
                  selectedGarmentId === 'hoodie' ||
                  Boolean(uploadedPhotoUrl)) && (
                  <div className="mt-4 p-5 sm:p-6 bg-[#FAF8F5] border border-amber-900/20 rounded-2xl shadow-xs">
                    <div className="flex items-center justify-between mb-3 border-b border-border/60 pb-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-lg bg-amber-900/10 flex items-center justify-center text-amber-800">
                          <HiOutlinePhotograph className="w-4 h-4" />
                        </div>
                        <div>
                          <h3 className="font-serif text-base text-primary font-medium">
                            Live Cloth Artwork Studio
                          </h3>
                          <span className="text-[10px] text-text-muted">
                            Drag, rotate & resize directly on the garment preview
                          </span>
                        </div>
                      </div>
                      <span className="text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200">
                        Interactive Print
                      </span>
                    </div>

                    {!uploadedPhotoUrl ? (
                      <div>
                        <p className="text-xs text-[#7A7065] font-light mb-4 leading-relaxed">
                          Upload any custom photo, graphic art, brand insignia, or meme. You can move, drag, resize, rotate, and blend it freely anywhere on the garment fabric.
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/*"
                          onChange={handlePhotoUpload}
                          className="hidden"
                          id="custom-photo-file"
                        />
                        <label
                          htmlFor="custom-photo-file"
                          className="w-full py-4 border-2 border-dashed border-[#C3B7A5] hover:border-primary rounded-xl flex flex-col items-center justify-center gap-2 bg-white cursor-pointer hover:bg-amber-50/40 transition-all group"
                        >
                          <div className="w-10 h-10 rounded-full bg-amber-100 text-amber-900 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <HiOutlineUpload className="w-5 h-5" />
                          </div>
                          <span className="text-xs uppercase tracking-[0.14em] font-semibold text-primary">
                            Upload Photo / Artwork (PNG, JPG, WebP)
                          </span>
                          <span className="text-[10px] text-text-muted">
                            Up to 10MB • High resolution DTG print preview
                          </span>
                        </label>

                        {/* Quick Sample Artworks to Try */}
                        <div className="mt-4 pt-3 border-t border-border/60">
                          <span className="text-[10px] uppercase tracking-wider font-semibold text-text-muted block mb-2">
                            Or Try A Curated Sample Graphic:
                          </span>
                          <div className="grid grid-cols-3 gap-2">
                            {SAMPLE_ARTWORKS.map((sample) => (
                              <button
                                key={sample.id}
                                type="button"
                                onClick={() => {
                                  setUploadedPhotoUrl(sample.url);
                                  setUploadedPhotoName(sample.name);
                                  setPhotoPos({ x: 50, y: viewAngle === 'back' ? 26 : 32 });
                                  setPhotoScale(100);
                                  setPhotoRotation(0);
                                  setPhotoFlipH(false);
                                  setPhotoFlipV(false);
                                  setIsPhotoSelected(true);
                                  toast.success(`Loaded "${sample.name}"! Drag or resize it on the garment.`);
                                }}
                                className="p-2 bg-white border border-border hover:border-primary hover:shadow-xs rounded-xl text-left transition-all flex items-center gap-2 group"
                              >
                                <img
                                  src={sample.thumb}
                                  alt={sample.name}
                                  className="w-8 h-8 rounded-md object-cover border border-border group-hover:scale-105 transition-transform"
                                />
                                <span className="text-[10px] font-medium text-primary leading-tight truncate block">
                                  {sample.name}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-5">
                        {/* Active File Bar */}
                        <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-border shadow-2xs">
                          <div className="flex items-center gap-3">
                            <img
                              src={uploadedPhotoUrl}
                              alt="Uploaded thumbnail"
                              className="w-11 h-11 object-cover rounded-lg border border-border"
                            />
                            <div>
                              <span className="text-xs font-semibold text-primary block truncate max-w-[180px] sm:max-w-[240px]">
                                {uploadedPhotoName || 'Custom Artwork'}
                              </span>
                              <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                                <HiOutlineSparkles className="w-3 h-3" />
                                High-Definition Direct-to-Garment (+₹250)
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <label
                              htmlFor="custom-photo-replace"
                              className="px-2.5 py-1.5 text-[11px] font-medium text-primary hover:bg-amber-50 rounded-lg cursor-pointer border border-border hover:border-primary/40 transition-all flex items-center gap-1"
                              title="Change image"
                            >
                              <HiOutlineRefresh className="w-3 h-3" />
                              <span>Replace</span>
                            </label>
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handlePhotoUpload}
                              className="hidden"
                              id="custom-photo-replace"
                            />
                            <button
                              type="button"
                              onClick={handleRemovePhoto}
                              className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                              title="Remove photo"
                            >
                              <HiOutlineTrash className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* 1. Placement Position Presets */}
                        <div>
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                              Quick Placement Presets
                            </label>
                            <span className="text-[10px] text-amber-800 font-medium">
                              X: {photoPos.x}% · Y: {photoPos.y}%
                            </span>
                          </div>
                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                            {PHOTO_PLACEMENTS.map((place) => (
                              <button
                                key={place.id}
                                type="button"
                                onClick={() => handlePlacementPreset(place.id)}
                                className={`px-2 py-2 text-[10px] rounded-lg border text-center transition-all ${
                                  photoPlacement === place.id
                                    ? 'bg-primary text-white border-primary font-semibold shadow-2xs'
                                    : 'bg-white text-text-secondary border-border hover:border-primary/50'
                                }`}
                              >
                                {place.label}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 2. Precision Move & Align D-Pad */}
                        <div className="bg-white p-3.5 rounded-xl border border-border">
                          <div className="flex items-center justify-between mb-2.5">
                            <span className="text-[10px] uppercase tracking-wider font-semibold text-text-muted">
                              Precision Move / Nudge on Cloth
                            </span>
                            <button
                              type="button"
                              onClick={resetPhotoTransform}
                              className="text-[10px] font-semibold text-amber-800 hover:underline flex items-center gap-1"
                            >
                              <HiOutlineRefresh className="w-3 h-3" />
                              Reset to Center
                            </button>
                          </div>

                          <div className="flex items-center justify-between gap-4">
                            {/* D-Pad Controls */}
                            <div className="flex flex-col items-center">
                              <button
                                type="button"
                                onClick={() => nudgePhoto(0, -3)}
                                className="w-7 h-7 bg-[#FAF8F5] border border-border hover:bg-primary hover:text-white rounded-md flex items-center justify-center text-primary transition-all shadow-2xs"
                                title="Nudge Up"
                              >
                                <HiOutlineChevronUp className="w-4 h-4" />
                              </button>
                              <div className="flex items-center gap-1 my-1">
                                <button
                                  type="button"
                                  onClick={() => nudgePhoto(-3, 0)}
                                  className="w-7 h-7 bg-[#FAF8F5] border border-border hover:bg-primary hover:text-white rounded-md flex items-center justify-center text-primary transition-all shadow-2xs"
                                  title="Nudge Left"
                                >
                                  <HiOutlineChevronLeft className="w-4 h-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setPhotoPos({ x: 50, y: viewAngle === 'back' ? 26 : 32 })}
                                  className="w-7 h-7 bg-amber-100 border border-amber-300 hover:bg-amber-200 text-amber-900 rounded-md flex items-center justify-center text-[10px] font-bold transition-all shadow-2xs"
                                  title="Center on Cloth"
                                >
                                  ⊡
                                </button>
                                <button
                                  type="button"
                                  onClick={() => nudgePhoto(3, 0)}
                                  className="w-7 h-7 bg-[#FAF8F5] border border-border hover:bg-primary hover:text-white rounded-md flex items-center justify-center text-primary transition-all shadow-2xs"
                                  title="Nudge Right"
                                >
                                  <HiOutlineChevronRight className="w-4 h-4" />
                                </button>
                              </div>
                              <button
                                type="button"
                                onClick={() => nudgePhoto(0, 3)}
                                className="w-7 h-7 bg-[#FAF8F5] border border-border hover:bg-primary hover:text-white rounded-md flex items-center justify-center text-primary transition-all shadow-2xs"
                                title="Nudge Down"
                              >
                                <HiOutlineChevronDown className="w-4 h-4" />
                              </button>
                            </div>

                            {/* Position stats & quick helpers */}
                            <div className="flex-1 text-[11px] text-[#7A7065] space-y-1.5 bg-[#FAF8F5] p-2.5 rounded-lg border border-border/60">
                              <div className="flex justify-between font-medium">
                                <span>Horizontal Position:</span>
                                <span className="font-bold text-primary">{photoPos.x}%</span>
                              </div>
                              <div className="flex justify-between font-medium">
                                <span>Vertical Position:</span>
                                <span className="font-bold text-primary">{photoPos.y}%</span>
                              </div>
                              <p className="text-[10px] text-text-muted italic pt-1 border-t border-border/50">
                                💡 Tip: You can also grab and drag the photo directly on the mockup!
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* 3. Scale / Size Controls */}
                        <div>
                          <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-2">
                            <span>Print Scale / Size</span>
                            <div className="flex items-center gap-1.5">
                              <button
                                type="button"
                                onClick={() => setPhotoScale((s) => Math.max(30, s - 10))}
                                className="w-5 h-5 rounded bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                              >
                                <HiOutlineMinus className="w-3 h-3" />
                              </button>
                              <span className="font-bold text-primary w-10 text-center">{photoScale}%</span>
                              <button
                                type="button"
                                onClick={() => setPhotoScale((s) => Math.min(220, s + 10))}
                                className="w-5 h-5 rounded bg-white border border-border flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors"
                              >
                                <HiOutlinePlus className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                          <input
                            type="range"
                            min="30"
                            max="220"
                            value={photoScale}
                            onChange={(e) => setPhotoScale(Number(e.target.value))}
                            className="w-full accent-primary h-1.5 bg-border rounded-lg cursor-pointer mb-2"
                          />
                          <div className="grid grid-cols-4 gap-1.5">
                            {[
                              { label: 'Compact', scale: 60 },
                              { label: 'Standard', scale: 100 },
                              { label: 'Statement', scale: 140 },
                              { label: 'Oversized', scale: 180 },
                            ].map((preset) => (
                              <button
                                key={preset.scale}
                                type="button"
                                onClick={() => setPhotoScale(preset.scale)}
                                className={`py-1 text-[10px] rounded border transition-all ${
                                  photoScale === preset.scale
                                    ? 'bg-amber-100 text-amber-900 border-amber-300 font-semibold'
                                    : 'bg-white text-text-muted border-border hover:text-primary'
                                }`}
                              >
                                {preset.label} ({preset.scale}%)
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* 4. Rotation & Orientation Controls */}
                        <div className="pt-2 border-t border-border/60">
                          <div className="flex justify-between items-center text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-2">
                            <span>Rotation & Mirror Flip</span>
                            <span className="font-bold text-primary">{photoRotation}°</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <input
                              type="range"
                              min="-180"
                              max="180"
                              value={photoRotation}
                              onChange={(e) => setPhotoRotation(Number(e.target.value))}
                              className="flex-1 accent-primary h-1.5 bg-border rounded-lg cursor-pointer"
                            />
                            <div className="flex items-center gap-1">
                              <button
                                type="button"
                                onClick={() => setPhotoRotation((r) => (r - 90 < -180 ? r - 90 + 360 : r - 90))}
                                className="px-2 py-1 bg-white border border-border text-[10px] rounded hover:border-primary transition-colors"
                                title="Rotate -90°"
                              >
                                ⟲ -90°
                              </button>
                              <button
                                type="button"
                                onClick={() => setPhotoRotation(0)}
                                className="px-2 py-1 bg-white border border-border text-[10px] rounded hover:border-primary transition-colors font-medium"
                                title="Reset 0°"
                              >
                                0°
                              </button>
                              <button
                                type="button"
                                onClick={() => setPhotoRotation((r) => (r + 90 > 180 ? r + 90 - 360 : r + 90))}
                                className="px-2 py-1 bg-white border border-border text-[10px] rounded hover:border-primary transition-colors"
                                title="Rotate +90°"
                              >
                                ⟳ +90°
                              </button>
                            </div>
                          </div>

                          {/* Flip Buttons */}
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              onClick={() => setPhotoFlipH((f) => !f)}
                              className={`py-1.5 px-3 rounded-lg border text-[11px] flex items-center justify-center gap-1.5 transition-all ${
                                photoFlipH
                                  ? 'bg-primary text-white border-primary font-medium'
                                  : 'bg-white text-text-secondary border-border hover:border-primary'
                              }`}
                            >
                              <HiOutlineSwitchHorizontal className="w-3.5 h-3.5" />
                              <span>Flip Horizontal</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => setPhotoFlipV((f) => !f)}
                              className={`py-1.5 px-3 rounded-lg border text-[11px] flex items-center justify-center gap-1.5 transition-all ${
                                photoFlipV
                                  ? 'bg-primary text-white border-primary font-medium'
                                  : 'bg-white text-text-secondary border-border hover:border-primary'
                              }`}
                            >
                              <HiOutlineSwitchVertical className="w-3.5 h-3.5" />
                              <span>Flip Vertical</span>
                            </button>
                          </div>
                        </div>

                        {/* 5. Fabric Print Finish / Blend Mode */}
                        <div className="pt-2 border-t border-border/60">
                          <label className="block text-[10px] uppercase tracking-wider font-semibold text-text-muted mb-2">
                            Fabric Print Texture & Blend Effect
                          </label>
                          <div className="grid grid-cols-2 gap-2">
                            {PHOTO_FINISHES.map((finish) => (
                              <button
                                key={finish.id}
                                type="button"
                                onClick={() => setPhotoBlendMode(finish.id)}
                                className={`p-2.5 text-left rounded-xl border transition-all ${
                                  photoBlendMode === finish.id
                                    ? 'bg-[#FAF8F5] border-amber-800 ring-2 ring-amber-800/20 shadow-2xs'
                                    : 'bg-white border-border hover:border-[#C3B7A5]'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-0.5">
                                  <span className="text-xs font-semibold text-primary block">
                                    {finish.name}
                                  </span>
                                  {photoBlendMode === finish.id && (
                                    <HiOutlineCheck className="w-3.5 h-3.5 text-amber-800 shrink-0" />
                                  )}
                                </div>
                                <span className="text-[10px] text-[#7A7065] block font-light leading-snug">
                                  {finish.desc}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ── STEP 4: Choose Textile Pattern & Weave (NEW!) ── */}
              <div className="bg-white border border-border/90 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-800">
                      Step 4 of 6
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-primary mt-0.5">
                      Select Textile Pattern & Weave
                    </h2>
                  </div>
                  <span className="text-xs font-serif italic text-text-muted">
                    {currentPattern.name}
                  </span>
                </div>
                <p className="text-xs text-text-muted mb-5 font-light">
                  Choose your woven or printed pattern: Vertical Bengal stripes, fine pinstripes, windowpane checks, heritage tartan, botanical motifs, or clean solid weave.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {patterns.map((pattern) => {
                    const isSelected = pattern.id === selectedPatternId;
                    return (
                      <button
                        key={pattern.id}
                        onClick={() => setSelectedPatternId(pattern.id)}
                        className={`text-left p-4 rounded-xl border transition-all flex flex-col justify-between relative ${
                          isSelected
                            ? 'bg-[#FAF8F5] border-primary ring-2 ring-primary/20 shadow-xs'
                            : 'bg-white border-border hover:border-[#C3B7A5]'
                        }`}
                      >
                        {pattern.tag && (
                          <span className="absolute top-3 right-3 text-[9px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-200">
                            {pattern.tag}
                          </span>
                        )}

                        <div>
                          {/* Mini Pattern Visual Preview Swatch */}
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-6 h-6 rounded-md border border-border overflow-hidden shrink-0 bg-[#F5F2EC]">
                              <svg viewBox="0 0 24 24" className="w-full h-full">
                                {pattern.id === 'solid' && (
                                  <rect width="24" height="24" fill={customColor} />
                                )}
                                {pattern.id === 'bengal-stripe' && (
                                  <g>
                                    <rect width="24" height="24" fill={customColor} />
                                    <line x1="4" y1="0" x2="4" y2="24" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
                                    <line x1="12" y1="0" x2="12" y2="24" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
                                    <line x1="20" y1="0" x2="20" y2="24" stroke="rgba(255,255,255,0.7)" strokeWidth="3" />
                                  </g>
                                )}
                                {pattern.id === 'pinstripe' && (
                                  <g>
                                    <rect width="24" height="24" fill={customColor} />
                                    <line x1="4" y1="0" x2="4" y2="24" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
                                    <line x1="10" y1="0" x2="10" y2="24" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
                                    <line x1="16" y1="0" x2="16" y2="24" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
                                    <line x1="22" y1="0" x2="22" y2="24" stroke="rgba(255,255,255,0.8)" strokeWidth="1" />
                                  </g>
                                )}
                                {pattern.id === 'windowpane' && (
                                  <g>
                                    <rect width="24" height="24" fill={customColor} />
                                    <line x1="12" y1="0" x2="12" y2="24" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                                    <line x1="0" y1="12" x2="24" y2="12" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                                  </g>
                                )}
                                {pattern.id === 'glen-plaid' && (
                                  <g>
                                    <rect width="24" height="24" fill={customColor} />
                                    <rect x="0" y="0" width="12" height="12" fill="rgba(0,0,0,0.2)" />
                                    <rect x="12" y="12" width="12" height="12" fill="rgba(0,0,0,0.2)" />
                                  </g>
                                )}
                                {pattern.id === 'tartan-check' && (
                                  <g>
                                    <rect width="24" height="24" fill={customColor} />
                                    <line x1="6" y1="0" x2="6" y2="24" stroke="#C59B27" strokeWidth="2" />
                                    <line x1="0" y1="6" x2="24" y2="6" stroke="#C59B27" strokeWidth="2" />
                                    <line x1="18" y1="0" x2="18" y2="24" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                                    <line x1="0" y1="18" x2="24" y2="18" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                                  </g>
                                )}
                                {pattern.id === 'resort-botanical' && (
                                  <g>
                                    <rect width="24" height="24" fill={customColor} />
                                    <circle cx="8" cy="8" r="4" fill="rgba(255,255,255,0.6)" />
                                    <circle cx="16" cy="16" r="4" fill="rgba(255,255,255,0.6)" />
                                  </g>
                                )}
                                {pattern.id === 'micro-polka' && (
                                  <g>
                                    <rect width="24" height="24" fill={customColor} />
                                    <circle cx="6" cy="6" r="1.5" fill="rgba(255,255,255,0.9)" />
                                    <circle cx="18" cy="6" r="1.5" fill="rgba(255,255,255,0.9)" />
                                    <circle cx="12" cy="12" r="1.5" fill="rgba(255,255,255,0.9)" />
                                    <circle cx="6" cy="18" r="1.5" fill="rgba(255,255,255,0.9)" />
                                    <circle cx="18" cy="18" r="1.5" fill="rgba(255,255,255,0.9)" />
                                  </g>
                                )}
                                {pattern.id === 'herringbone' && (
                                  <g>
                                    <rect width="24" height="24" fill={customColor} />
                                    <path d="M 4 4 L 12 12 L 4 20" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                                    <path d="M 12 4 L 20 12 L 12 20" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                                  </g>
                                )}
                                {pattern.id === 'abstract-geo' && (
                                  <g>
                                    <rect width="24" height="24" fill={customColor} />
                                    <polygon points="12,2 22,12 12,22 2,12" fill="none" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
                                  </g>
                                )}
                              </svg>
                            </div>
                            <span className="font-serif text-base font-medium text-primary block pr-14">
                              {pattern.name}
                            </span>
                          </div>

                          <p className="text-xs text-[#7A7065] font-light leading-relaxed">
                            {pattern.desc}
                          </p>
                        </div>

                        <div className="flex items-center justify-between mt-3.5 pt-2.5 border-t border-border/60">
                          <span className="text-xs font-semibold text-primary">
                            {pattern.extraPrice === 0 ? 'Standard Weave' : `+₹${pattern.extraPrice}`}
                          </span>
                          {isSelected && (
                            <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center">
                              <HiOutlineCheck className="w-3.5 h-3.5" />
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── STEP 5: Color Palette & Color Picker ── */}
              <div className="bg-white border border-border/90 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-800">
                      Step 5 of 6
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-primary mt-0.5">
                      Select Dye & Garment Color
                    </h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border border-black/20" style={{ backgroundColor: customColor }} />
                    <span className="text-xs font-semibold text-primary">{colorName}</span>
                  </div>
                </div>
                <p className="text-xs text-text-muted mb-5 font-light">
                  Choose from our curated atelier dyes or create a bespoke custom shade with the color picker.
                </p>

                {/* Swatches */}
                <div className="grid grid-cols-5 sm:grid-cols-10 gap-3 mb-5">
                  {COLOR_PRESETS.map((color) => {
                    const isSelected = customColor === color.hex;
                    return (
                      <button
                        key={color.name}
                        onClick={() => {
                          setCustomColor(color.hex);
                          setColorName(color.name);
                        }}
                        className={`group flex flex-col items-center gap-1.5 focus:outline-none`}
                        title={color.name}
                      >
                        <div
                          className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-transform duration-200 border-2 flex items-center justify-center ${
                            isSelected ? 'scale-115 ring-2 ring-primary ring-offset-2 shadow-sm' : 'hover:scale-105'
                          }`}
                          style={{
                            backgroundColor: color.hex,
                            borderColor: color.border,
                          }}
                        >
                          {isSelected && (
                            <HiOutlineCheck
                              className={`w-4 h-4 ${
                                color.hex === '#F7F7F7' || color.hex === '#EBE5D8'
                                  ? 'text-black'
                                  : 'text-white'
                              }`}
                            />
                          )}
                        </div>
                        <span className="text-[9px] text-text-muted font-medium truncate w-full text-center group-hover:text-primary">
                          {color.name.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Color Picker Input */}
                <div className="flex items-center gap-3 p-3 bg-[#FAF8F5] rounded-xl border border-border/80">
                  <input
                    type="color"
                    value={customColor}
                    onChange={(e) => {
                      setCustomColor(e.target.value);
                      setColorName(`Custom Shade (${e.target.value.toUpperCase()})`);
                    }}
                    className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent p-0"
                    id="custom-hex-color"
                  />
                  <div className="flex-1">
                    <label htmlFor="custom-hex-color" className="block text-xs font-semibold text-primary cursor-pointer">
                      Custom Color Mixer (HEX)
                    </label>
                    <span className="text-[11px] text-text-muted">
                      Pick any custom shade: <span className="font-mono uppercase font-semibold">{customColor}</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* ── STEP 6: Sizing, Quantity & Atelier Notes ── */}
              <div className="bg-white border border-border/90 rounded-2xl p-6 sm:p-7 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-amber-800">
                      Step 6 of 6
                    </span>
                    <h2 className="font-serif text-xl sm:text-2xl text-primary mt-0.5">
                      Tailored Size & Quantity
                    </h2>
                  </div>
                </div>

                {/* Size Grid */}
                <div className="mb-6">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-2.5">
                    Garment Size (Standard Fit)
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                    {SIZES.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all border ${
                          selectedSize === size
                            ? 'bg-primary text-white border-primary shadow-xs'
                            : 'bg-white text-primary border-border hover:border-primary/50'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity & Volume Pricing */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-border/60 items-center">
                  <div>
                    <label className="block text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-2">
                      Quantity to Tailor
                    </label>
                    <div className="inline-flex items-center border border-border rounded-xl bg-white shadow-2xs overflow-hidden">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="px-4 py-2 text-base text-primary hover:bg-black/5 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        −
                      </button>
                      <span className="px-5 py-2 font-mono text-sm font-semibold text-primary">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="px-4 py-2 text-base text-primary hover:bg-black/5 transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    {discountPercent > 0 && (
                      <span className="block text-[11px] text-emerald-700 font-medium mt-2">
                        🎉 {discountPercent}% Volume Atelier Discount applied!
                      </span>
                    )}
                  </div>

                  {/* Pricing Breakdown Summary */}
                  <div className="bg-[#FAF8F5] p-4 rounded-xl border border-border/80 text-xs space-y-1.5">
                    <div className="flex justify-between text-text-muted">
                      <span>Base Silhouette:</span>
                      <span>₹{currentGarment.basePrice.toLocaleString('en-IN')}</span>
                    </div>
                    {currentFabric.extraPrice > 0 && (
                      <div className="flex justify-between text-text-muted">
                        <span>Fabric Grade:</span>
                        <span>+₹{currentFabric.extraPrice}</span>
                      </div>
                    )}
                    {currentStyle.extraPrice > 0 && (
                      <div className="flex justify-between text-text-muted">
                        <span>Tailored Cut:</span>
                        <span>+₹{currentStyle.extraPrice}</span>
                      </div>
                    )}
                    {currentPattern?.extraPrice > 0 && (
                      <div className="flex justify-between text-text-muted">
                        <span>Textile Pattern:</span>
                        <span>+₹{currentPattern.extraPrice}</span>
                      </div>
                    )}
                    {uploadedPhotoUrl && (
                      <div className="flex justify-between text-text-muted">
                        <span>Custom Photo Print:</span>
                        <span>+₹250</span>
                      </div>
                    )}
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-700 font-medium">
                        <span>Volume Savings:</span>
                        <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-primary font-serif text-base font-semibold pt-2 border-t border-border/60">
                      <span>Total ({quantity} {quantity === 1 ? 'item' : 'items'}):</span>
                      <span>₹{totalPrice.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                {/* Custom Atelier Instructions Note */}
                <div className="mt-5">
                  <label className="block text-[11px] uppercase tracking-wider font-semibold text-text-muted mb-1.5">
                    Tailoring Notes / Special Instructions (Optional)
                  </label>
                  <input
                    type="text"
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    placeholder="e.g. Extra 2 inches length, monogram initials 'S.K.' on cuff, custom collar spread..."
                    className="w-full px-4 py-2.5 text-xs border border-border rounded-xl focus:outline-none focus:border-primary bg-white"
                  />
                </div>

                {/* Primary Add to Bag Action */}
                <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row gap-3 items-center justify-between">
                  <div>
                    <span className="text-xs text-text-muted font-light block">
                      Crafted on-demand · Dispatches in 3–5 business days
                    </span>
                    <span className="text-[11px] text-primary font-medium">
                      Complimentary tracked delivery across India
                    </span>
                  </div>

                  <button
                    onClick={handleAddToCart}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-primary text-white text-xs uppercase tracking-[0.18em] font-semibold rounded-xl hover:bg-primary-light transition-all shadow-md hover:shadow-lg"
                  >
                    <HiOutlineShoppingBag className="w-5 h-5" />
                    <span>Add {quantity} Custom Garment{quantity > 1 ? 's' : ''} to Bag · ₹{totalPrice.toLocaleString('en-IN')}</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomizerPage;
