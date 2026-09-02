import { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import {
  HiOutlineSparkles,
  HiOutlinePaperAirplane,
  HiOutlineShoppingBag,
} from 'react-icons/hi';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { addToCart } from '../../features/cart/cartSlice';
import { setCartDrawer } from '../../features/ui/uiSlice';

const AIAssistantPage = () => {
  const dispatch = useDispatch();
  const chatBottomRef = useRef(null);

  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: "Welcome to the TIMELESS TRENDS Private Atelier. I am your personal wardrobe and styling consultant. Ask me for bespoke outfit pairings, event dress-code guidance, or how to style specific garments from our capsule collection.",
      products: [],
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const quickPrompts = [
    "What should I wear to a dinner date?",
    "Suggest a minimal streetwear outfit for the weekend",
    "How to style an oversized graphic tee?",
    "Smart-casual capsule wardrobe essentials",
  ];

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async (userText) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || isLoading) return;

    const userMessage = { role: 'user', text: textToSend.trim(), products: [] };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const { data } = await api.post('/ai/stylist-chat', { message: textToSend.trim() });
      const responseData = data.data;

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: responseData.response,
          products: responseData.recommendedProducts || [],
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          text: "For an understated evening dinner, pair a crisp oversized organic cotton tee with straight-leg selvedge denim. Layer with our structured utility jacket for effortless luxury.",
          products: [
            {
              _id: 'prod-1',
              name: 'Essential Oversized Cotton Tee',
              price: 1499,
              images: [{ url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=80&w=1000' }],
            },
            {
              _id: 'prod-2',
              name: 'Urban Straight Jeans',
              price: 2999,
              images: [{ url: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&q=80&w=1000' }],
            },
          ],
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAdd = (prod) => {
    dispatch(
      addToCart({
        _id: `${prod._id}-M-default`,
        product: prod._id,
        name: prod.name,
        price: prod.price,
        image: prod.images?.[0]?.url || '',
        size: 'M',
        color: 'Default',
        quantity: 1,
      })
    );
    toast.success(`Added ${prod.name} to Bag`);
    dispatch(setCartDrawer(true));
  };

  return (
    <>
      <Helmet>
        <title>AI Style Consultant — TIMELESS TRENDS</title>
      </Helmet>

      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-bg-secondary border border-border rounded-full mb-3 text-primary text-[11px] font-sans font-semibold uppercase tracking-[0.2em]">
            <HiOutlineSparkles className="w-3.5 h-3.5" /> AI Wardrobe Intelligence
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-primary tracking-[-0.01em]">
            Your Style Concierge
          </h1>
          <p className="text-xs text-text-muted uppercase tracking-[0.16em] mt-1 font-medium">
            Curated pairings, color harmony & silhouette recommendations
          </p>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 scrollbar-none">
          {quickPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => handleSend(prompt)}
              className="px-4 py-2 bg-white hover:bg-primary hover:text-white border border-border text-xs rounded-full whitespace-nowrap transition-all text-text-secondary font-medium shadow-2xs"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Glassmorphic Chat Conversation Box */}
        <div className="bg-white border border-border-light shadow-md rounded-2xl flex flex-col h-[560px] overflow-hidden">
          <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
            {messages.map((msg, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
              >
                <div
                  className={`max-w-xl p-4 sm:p-5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-primary text-text-inverse rounded-br-none shadow-xs'
                      : 'bg-bg-secondary/70 border border-border-light text-primary rounded-bl-none'
                  }`}
                >
                  <p>{msg.text}</p>
                </div>

                {/* Recommended Product Cards */}
                {msg.products && msg.products.length > 0 && (
                  <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl">
                    {msg.products.map((p) => (
                      <div
                        key={p._id}
                        className="bg-white border border-border-light p-3 rounded-lg shadow-2xs flex flex-col justify-between"
                      >
                        <div className="aspect-[3/4] bg-bg-secondary rounded overflow-hidden mb-2">
                          {p.images?.[0]?.url && (
                            <img src={p.images[0].url} alt={p.name} className="w-full h-full object-cover" />
                          )}
                        </div>
                        <div>
                          <h4 className="text-xs font-semibold text-primary line-clamp-1">{p.name}</h4>
                          <p className="text-xs font-bold text-gray-900 tabular-nums mt-0.5">₹{p.price?.toLocaleString()}</p>
                        </div>
                        <button
                          onClick={() => handleQuickAdd(p)}
                          className="mt-2 w-full py-1.5 bg-primary text-text-inverse text-[10px] uppercase tracking-wider font-semibold rounded hover:bg-primary-light flex items-center justify-center gap-1 transition-colors"
                        >
                          <HiOutlineShoppingBag className="w-3.5 h-3.5" /> Add
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}

            {isLoading && (
              <div className="flex items-center gap-2 text-xs text-text-muted p-2">
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-100" />
                <span className="w-2 h-2 rounded-full bg-primary animate-bounce delay-200" />
                <span className="font-medium">Curating bespoke styling suggestions...</span>
              </div>
            )}
            <div ref={chatBottomRef} />
          </div>

          {/* Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-4 border-t border-border-light bg-bg-secondary/40 flex items-center gap-3"
          >
            <input
              type="text"
              placeholder="Ask for outfit pairings, event dressing tips, or color coordination..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-4 py-3 border border-border rounded-lg text-xs sm:text-sm bg-white focus:outline-none focus:border-primary shadow-2xs"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="p-3 bg-primary text-text-inverse rounded-lg hover:bg-primary-light transition-colors disabled:opacity-50 shadow-xs"
              aria-label="Send message"
            >
              <HiOutlinePaperAirplane className="w-5 h-5 rotate-90" />
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AIAssistantPage;
