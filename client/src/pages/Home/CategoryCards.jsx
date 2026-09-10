import { Link } from 'react-router-dom';
import menHero from '../../assets/men-hero.jpg';
import womenHero from '../../assets/women-hero.jpg';
const curatedCategories = [
  {
    name: 'Men’s Capsule',
    tagline: 'Tailored silhouettes & organic cottons',
    path: '/men',
    image: menHero,
    span: 'col-span-1 sm:col-span-2 md:col-span-2 aspect-[4/5] md:aspect-[16/10]',
  },
  {
    name: 'Women’s Edit',
    tagline: 'Architectural blazers & drape linen',
    path: '/women',
    image: womenHero,
    span: 'col-span-1 sm:col-span-2 md:col-span-2 aspect-[4/5] md:aspect-[16/10]',
  },
  {
    name: 'Essential Tees',
    tagline: '240 GSM organic combed staples',
    path: '/shop?category=t-shirts',
    image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1000',
    span: 'col-span-1 aspect-[4/5]',
  },
  {
    name: 'Selvedge Denim',
    tagline: 'Japanese 13oz structured weave',
    path: '/shop?category=jeans',
    image: 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?auto=format&fit=crop&q=80&w=1000',
    span: 'col-span-1 aspect-[4/5]',
  },
  {
    name: 'Outerwear',
    tagline: 'Utility jackets & minimal overcoats',
    path: '/shop?category=jackets',
    image: '/products/structured-overcoat.jpg',
    span: 'col-span-1 aspect-[4/5]',
  },
  {
    name: 'Shoes & Footwear',
    tagline: 'Artisanal leather & clean silhouettes',
    path: '/shop?category=shoes',
    image: '/products/suede-chelsea-boots.jpg',
    span: 'col-span-1 aspect-[4/5]',
  },
];

const CategoryCards = () => {
  return (
    <section className="py-28 lg:py-36 bg-[#FAF8F5]" id="shop-by-category">
      <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <span className="text-[11px] tracking-[0.22em] uppercase text-text-muted font-medium block mb-2">
              Curated Departments
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[-0.01em] text-primary">
              Shop by Category
            </h2>
          </div>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-[0.14em] font-semibold text-primary border-b border-primary pb-0.5 hover:opacity-60 transition-opacity self-start md:self-auto"
          >
            Explore Full Lookbook →
          </Link>
        </div>

        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {curatedCategories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className={`group relative overflow-hidden bg-bg-secondary rounded-lg shadow-2xs ${cat.span}`}
            >
              {/* Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter brightness-[0.88] group-hover:brightness-[0.95]"
                loading="lazy"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent transition-opacity duration-300" />

              {/* Text Container */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-white z-10">
                <span className="text-[10px] tracking-[0.2em] uppercase text-white/60 font-sans font-medium mb-1.5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                  {cat.tagline}
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl tracking-[-0.01em] text-white">
                  {cat.name}
                </h3>
                <span className="inline-flex items-center gap-1 mt-3 text-[11px] uppercase tracking-[0.15em] font-semibold text-white/80 group-hover:text-white group-hover:gap-2 transition-all">
                  Shop Now <span>→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryCards;
