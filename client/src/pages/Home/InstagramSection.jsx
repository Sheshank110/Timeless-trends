import { HiOutlineHeart } from 'react-icons/hi';
import insta1 from '../../assets/insta-1.jpg';
import insta2 from '../../assets/insta-2.jpg';
import insta3 from '../../assets/insta-3.jpg';
import insta4 from '../../assets/insta-4.jpg';
import insta5 from '../../assets/insta-5.jpg';
import insta6 from '../../assets/insta-6.jpg';

const instaPosts = [
  { image: insta1, caption: 'The Ivory Double-Breasted Tailored Blazer · Paris Atelier', tag: '#TimelessTrends', likes: '1.4k' },
  { image: insta2, caption: 'Charcoal Cashmere Turtleneck & Minimalist Timepiece', tag: '#MenswearAtelier', likes: '980' },
  { image: insta3, caption: 'Oversized Utility Olive Bomber & Distressed Denim', tag: '#StreetwearEdit', likes: '2.1k' },
  { image: insta4, caption: 'Handcrafted Espresso Chelsea Boots & Structured Tote', tag: '#LeatherCraft', likes: '1.7k' },
  { image: insta5, caption: 'Silk Champagne Slip Dress · Evening Gallery Edit', tag: '#HauteMinimal', likes: '3.2k' },
  { image: insta6, caption: 'Architectural Trench Coat & Selvedge Denim · London', tag: '#CapsuleWardrobe', likes: '1.1k' },
];

const InstagramSection = () => {
  return (
    <section className="py-24 lg:py-32 bg-white" id="instagram-section">
      <div className="w-full max-w-[1520px] mx-auto px-8 sm:px-16 lg:px-24 xl:px-32">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
          <div>
            <p className="text-[11px] tracking-[0.25em] uppercase text-text-muted mb-2 font-sans font-medium">
              @timelesstrends · Haute Atelier
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl tracking-[-0.01em] text-primary">
              Follow Our Style
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs uppercase tracking-[0.16em] font-semibold text-primary border-b border-primary pb-0.5 hover:opacity-60 transition-opacity self-start sm:self-auto"
          >
            Follow on Instagram →
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {instaPosts.map((post, i) => (
            <a
              key={i}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square rounded-lg overflow-hidden bg-[#F3EFE9] shadow-2xs block"
            >
              <img
                src={post.image}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                loading="lazy"
              />

              {/* Dark Hover Reveal Overlay */}
              <div className="absolute inset-0 bg-primary/75 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-4 text-white">
                <div className="flex items-center justify-end">
                  <span className="text-[10px] uppercase tracking-wider flex items-center gap-1 font-semibold text-white/90">
                    <HiOutlineHeart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
                    {post.likes}
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-white/70 uppercase tracking-widest mb-1">{post.tag}</p>
                  <p className="text-xs font-serif line-clamp-2 leading-tight text-white">{post.caption}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
