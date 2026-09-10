import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import HeroSection from './HeroSection';
import CategoryCards from './CategoryCards';
import EditorialBanner from './EditorialBanner';
import AIAssistantPromo from './AIAssistantPromo';
import TestimonialSection from './TestimonialSection';
import InstagramSection from './InstagramSection';
import Footer from '../../components/layout/Footer';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

const HomePage = () => {
  return (
    <>
      <Helmet>
        <title>TIMELESS TRENDS — Premium Fashion for Men & Women</title>
        <meta
          name="description"
          content="Discover premium fashion at TIMELESS TRENDS. Shop the latest collections for men and women. Style that never goes out of fashion."
        />
        <meta property="og:title" content="TIMELESS TRENDS — Premium Fashion" />
        <meta property="og:description" content="Style That Never Goes Out of Fashion." />
        <link rel="canonical" href="/" />
      </Helmet>

      <HeroSection />

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
        <CategoryCards />
      </motion.div>

      <EditorialBanner />

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
        <AIAssistantPromo />
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
        <TestimonialSection />
      </motion.div>

      <motion.div variants={fadeInUp} initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-50px' }}>
        <InstagramSection />
      </motion.div>
    </>
  );
};

export default HomePage;
