import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  Sparkles,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  RotateCcw,
  GraduationCap,
  ArrowRight,
  Zap,
  Filter,
  CheckCircle2,
  ChevronDown,
  Info,
  Layers
} from 'lucide-react';
import { StoreProduct, StoreCategory, CartItem, UserProfile } from '../types';
import { STORE_CATEGORIES, STORE_PRODUCTS } from '../data/storeData';
import { ProductCard } from '../components/store/ProductCard';
import { ProductDetailModal } from '../components/store/ProductDetailModal';

interface StoreViewProps {
  user: UserProfile;
  cartItems: CartItem[];
  onAddToCart: (
    product: StoreProduct,
    quantity?: number,
    color?: string,
    size?: string
  ) => void;
  onOpenCart: () => void;
  onBuyNow: (
    product: StoreProduct,
    quantity?: number,
    color?: string,
    size?: string
  ) => void;
}

export const StoreView: React.FC<StoreViewProps> = ({
  user,
  cartItems,
  onAddToCart,
  onOpenCart,
  onBuyNow,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<StoreCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [showWishlistOnly, setShowWishlistOnly] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('skillsphere_wishlist');
      return saved ? JSON.parse(saved) : ['prod-screenbar-glow', 'prod-hoodie-10x'];
    } catch {
      return ['prod-screenbar-glow', 'prod-hoodie-10x'];
    }
  });

  const [quickViewProduct, setQuickViewProduct] = useState<StoreProduct | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Toggle Wishlist
  const handleToggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const next = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      try {
        localStorage.setItem('skillsphere_wishlist', JSON.stringify(next));
      } catch (e) {
        console.error(e);
      }
      return next;
    });
  };

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return STORE_PRODUCTS.filter((product) => {
      if (selectedCategory !== 'All' && product.category !== selectedCategory) {
        return false;
      }
      if (inStockOnly && !product.inStock) {
        return false;
      }
      if (showWishlistOnly && !wishlist.includes(product.id)) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchName = product.name.toLowerCase().includes(q);
        const matchTagline = product.tagline.toLowerCase().includes(q);
        const matchCategory = product.category.toLowerCase().includes(q);
        if (!matchName && !matchTagline && !matchCategory) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0; // featured default
    });
  }, [selectedCategory, searchQuery, sortBy, inStockOnly, showWishlistOnly, wishlist]);

  const totalCartCount = cartItems.reduce((acc, i) => acc + i.quantity, 0);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 dark:bg-slate-950/50 pb-20">
      {/* Announcement Marquee Bar */}
      <div className="bg-gradient-to-r from-indigo-700 via-blue-700 to-indigo-800 text-white text-xs py-2 px-4 text-center font-medium overflow-hidden shadow-inner">
        <div className="flex items-center justify-center gap-2 sm:gap-6 flex-wrap">
          <span className="flex items-center gap-1.5 font-bold">
            <Zap className="w-3.5 h-3.5 text-yellow-300 fill-current" />
            <span>Campus Flash Sale: 20% OFF with code <strong>STUDENT20</strong></span>
          </span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="hidden sm:inline">
            Free Express Campus Delivery on orders over ₹999
          </span>
          <span className="hidden sm:inline opacity-40">•</span>
          <span className="flex items-center gap-1 text-emerald-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Redeem SkillSphere XP coins for instant cash discounts!</span>
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-10">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-indigo-900 via-slate-900 to-slate-950 border border-slate-800 text-white p-8 sm:p-12 shadow-2xl">
          {/* Background Glow Orbs */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs font-semibold text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>LUMIXORA × SKILLSPHERE OFFICIAL CAMPUS STORE</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Engineer Your Space. <br />
              <span className="bg-gradient-to-r from-indigo-400 via-blue-300 to-emerald-300 bg-clip-text text-transparent">
                Desk Gear & Hardware for Tech Minds.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              From zero-glare monitor screen bars and ergonomic cloud wrist-rests to high-grade embedded IoT experimenter kits and heavy-duty developer hoodies. Built for deep focus and semester dominance.
            </p>

            {/* Metrics Row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
              <div className="border-l-2 border-indigo-500 pl-3">
                <span className="text-xl sm:text-2xl font-extrabold text-white block">48,000+</span>
                <span className="text-[11px] text-slate-400">Students Equipped</span>
              </div>
              <div className="border-l-2 border-blue-500 pl-3">
                <span className="text-xl sm:text-2xl font-extrabold text-white block">4.9 / 5</span>
                <span className="text-[11px] text-slate-400">Verified Rating</span>
              </div>
              <div className="border-l-2 border-emerald-500 pl-3">
                <span className="text-xl sm:text-2xl font-extrabold text-white block">19,000+</span>
                <span className="text-[11px] text-slate-400">Campus Pincodes</span>
              </div>
              <div className="border-l-2 border-amber-500 pl-3">
                <span className="text-xl sm:text-2xl font-extrabold text-white block">₹1.4M+</span>
                <span className="text-[11px] text-slate-400">XP Coins Redeemed</span>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-4">
              <button
                onClick={() => {
                  setSelectedCategory('Desk & Lighting');
                  const el = document.getElementById('products-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Desk Setups</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => {
                  setSelectedCategory('Hardware Kits');
                  const el = document.getElementById('products-section');
                  el?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-indigo-300" />
                <span>Hardware Lab Kits</span>
              </button>

              <button
                onClick={onOpenCart}
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-emerald-300 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-500/30 backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer ml-auto"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>View Cart ({totalCartCount})</span>
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div id="products-section" className="space-y-4">
          
          {/* Categories Tab Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {STORE_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search, Sort & Quick Toggles */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 p-3 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
            
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search desk lights, wrist rests, mechanical keyboards, IoT kits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs text-slate-800 dark:text-slate-200 focus:outline-indigo-500"
              />
            </div>

            {/* Sort & Filters */}
            <div className="flex items-center gap-2 flex-wrap">
              
              {/* Wishlist Filter Button */}
              <button
                onClick={() => setShowWishlistOnly(!showWishlistOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  showWishlistOnly
                    ? 'bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 border border-rose-200 dark:border-rose-900'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${showWishlistOnly ? 'fill-current' : ''}`} />
                <span>Wishlist</span>
                {wishlist.length > 0 && (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-rose-500 text-white">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* In Stock Toggle */}
              <button
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  inStockOnly
                    ? 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-900'
                    : 'bg-slate-50 dark:bg-slate-950 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800'
                }`}
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>In Stock Only</span>
              </button>

              {/* Sort By Dropdown */}
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none pl-3 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300 cursor-pointer focus:outline-indigo-500"
                >
                  <option value="featured">Featured Picks</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              {showWishlistOnly ? 'Saved in Wishlist' : `${selectedCategory} Gear`}{' '}
              <span className="text-xs font-normal text-slate-400">
                ({filteredProducts.length} items)
              </span>
            </h2>

            {(searchQuery || selectedCategory !== 'All' || showWishlistOnly) && (
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setShowWishlistOnly(false);
                  setInStockOnly(false);
                }}
                className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Reset Filters
              </button>
            )}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-12 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center mx-auto text-indigo-500">
                <Search className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                No items match your criteria
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Try searching for something else, or clear your category or stock filter to view all Lumixora gear.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                  setShowWishlistOnly(false);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700"
              >
                View Full Catalog
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onQuickView={(p) => setQuickViewProduct(p)}
                  onAddToCart={(p) => onAddToCart(p)}
                  isWishlisted={wishlist.includes(product.id)}
                  onToggleWishlist={handleToggleWishlist}
                  userXp={user.xpPoints}
                />
              ))}
            </div>
          )}
        </div>

        {/* Why Choose SkillSphere Campus Store? Feature Pillars */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              The Engineering Edge
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Why SkillSphere Student Gear?
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              We partnered with Lumixora to eliminate the markup on high-grade developer equipment, directly empowering university engineering students.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Subsidized Student Pricing
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                40% to 55% OFF standard retail prices. Direct college student pricing without middleman distributor markups.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Truck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Hostel & Campus Delivery
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Seamless delivery directly to university gate security, college reception, or hostel blocks with OTP handover.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                1-Year Lumixora Warranty
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every hardware module, keyboard, and lamp comes with our 1-year hassle-free doorstep replacement guarantee.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-3">
              <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Turn Coding into Rewards
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                Every LeetCode problem solved, mock test cleared, and course completed earns XP coins you can spend like real cash.
              </p>
            </div>
          </div>
        </div>

        {/* FAQs Section */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-sm space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
              Frequently Asked Questions
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
              Campus Store Help & Info
            </h2>
          </div>

          <div className="divide-y divide-slate-200 dark:divide-slate-800">
            {[
              {
                q: 'How do I redeem my SkillSphere XP points for store discounts?',
                a: 'Whenever you add items to your cart, toggle "Redeem SkillSphere XP" in the cart drawer. Every 2 XP is worth ₹1 in cash discount (up to 20% of the total cart value). The discount is applied instantly at checkout!',
              },
              {
                q: 'How does campus hostel delivery work?',
                a: 'During checkout, enter your University name and Hostel Block/Room number. Our express couriers (BlueDart & Delhivery) call you on arrival and hand over your package directly at the hostel gate or security desk.',
              },
              {
                q: 'Are the IoT and VLSI kits suitable for engineering semester labs?',
                a: 'Yes! Our hardware kits are curated directly against AICTE and university practical curricula for ECE, EEE, and CSE. They include complete pinout charts, starter code repositories, and laboratory manuals.',
              },
              {
                q: 'What is the return and replacement policy?',
                a: 'We provide a 7-day no-questions-asked campus return policy. If an item arrives damaged or you are unsatisfied, schedule a reverse pickup right from your hostel room with instant refund or replacement.',
              },
            ].map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div key={idx} className="py-4">
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    <span>{faq.q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-indigo-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Newsletter / Flash Sale Alert Box */}
        <div className="rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-blue-900 p-8 sm:p-10 text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left max-w-lg">
            <h3 className="text-xl sm:text-2xl font-extrabold">
              Never Miss a Campus Gear Drop
            </h3>
            <p className="text-xs text-slate-300">
              Get secret student discount codes, batch drops for embedded kits, and end-of-semester clearance alerts directly to your inbox.
            </p>
          </div>

          <form
            onSubmit={handleNewsletterSubmit}
            className="w-full md:w-auto flex flex-col sm:flex-row gap-2"
          >
            {newsletterSubscribed ? (
              <div className="px-5 py-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>You're on the VIP Student Alert List!</span>
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  placeholder="Enter your college email (.edu / gmail)"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-xs text-white placeholder:text-slate-400 focus:outline-emerald-400 w-full sm:w-72"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 transition-all shadow-md cursor-pointer whitespace-nowrap"
                >
                  Get VIP Alerts
                </button>
              </>
            )}
          </form>
        </div>

      </div>

      {/* Quick View Product Modal */}
      <ProductDetailModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={(p, q, c, s) => {
          onAddToCart(p, q, c, s);
        }}
        onBuyNow={(p, q, c, s) => {
          onBuyNow(p, q, c, s);
          setQuickViewProduct(null);
        }}
        isWishlisted={
          quickViewProduct ? wishlist.includes(quickViewProduct.id) : false
        }
        onToggleWishlist={handleToggleWishlist}
        userXp={user.xpPoints}
      />
    </div>
  );
};
