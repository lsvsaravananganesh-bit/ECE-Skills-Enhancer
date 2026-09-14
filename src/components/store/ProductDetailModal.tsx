import React, { useState } from 'react';
import {
  X,
  Star,
  Check,
  ShieldCheck,
  Truck,
  RotateCcw,
  ShoppingCart,
  Zap,
  Sparkles,
  Heart,
  GraduationCap
} from 'lucide-react';
import { StoreProduct } from '../../types';

interface ProductDetailModalProps {
  product: StoreProduct | null;
  onClose: () => void;
  onAddToCart: (
    product: StoreProduct,
    quantity: number,
    color?: string,
    size?: string
  ) => void;
  onBuyNow: (
    product: StoreProduct,
    quantity: number,
    color?: string,
    size?: string
  ) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  userXp?: number;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist,
  userXp = 0,
}) => {
  if (!product) return null;

  const images = [product.image, ...(product.additionalImages || [])];
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product.colors?.[0]
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product.sizes?.[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'specs' | 'reviews'>(
    'details'
  );
  const [addedAnimation, setAddedAnimation] = useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const maxCoinsDiscount = product.coinsRedeemableMax
    ? Math.round(product.coinsRedeemableMax * 0.5)
    : 0;

  const handleAddToCart = () => {
    onAddToCart(product, quantity, selectedColor, selectedSize);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1500);
  };

  const handleBuyNow = () => {
    onBuyNow(product, quantity, selectedColor, selectedSize);
  };

  return (
    <div
      id="product-detail-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
      onClick={onClose}
    >
      <div
        id="product-detail-modal"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-200 dark:divide-slate-800"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Images & Quick Badges */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-slate-50/50 dark:bg-slate-950/50">
          <div className="space-y-4">
            {/* Main Featured Image */}
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm">
              <img
                src={images[activeImageIndex]}
                alt={product.name}
                className="h-full w-full object-cover object-center transition-all duration-300"
              />

              {product.badge && (
                <div className="absolute top-3 left-3">
                  <span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider text-white shadow-md bg-gradient-to-r from-indigo-600 to-blue-600">
                    <Zap className="w-3 h-3 fill-current text-yellow-300" />
                    {product.badge}
                  </span>
                </div>
              )}

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`absolute top-3 right-3 p-2.5 rounded-full backdrop-blur-md transition-all ${
                  isWishlisted
                    ? 'bg-rose-500 text-white shadow-lg'
                    : 'bg-white/80 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-rose-500'
                }`}
              >
                <Heart
                  className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`}
                />
              </button>
            </div>

            {/* Thumbnail Carousel */}
            {images.length > 1 && (
              <div className="flex items-center gap-2.5 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-indigo-600 shadow-md ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Student Perks Guarantee Banner */}
          <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800/80 grid grid-cols-3 gap-2 text-center">
            <div className="flex flex-col items-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60">
              <Truck className="w-4 h-4 text-indigo-500 mb-1" />
              <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">
                Fast Campus Dispatch
              </span>
              <span className="text-[9px] text-slate-400">2-4 days</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60">
              <ShieldCheck className="w-4 h-4 text-emerald-500 mb-1" />
              <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">
                1-Year Warranty
              </span>
              <span className="text-[9px] text-slate-400">Official Brand</span>
            </div>
            <div className="flex flex-col items-center p-2 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-800/60">
              <RotateCcw className="w-4 h-4 text-blue-500 mb-1" />
              <span className="text-[10px] font-bold text-slate-800 dark:text-slate-200">
                7-Day Returns
              </span>
              <span className="text-[9px] text-slate-400">Hostel pickup</span>
            </div>
          </div>
        </div>

        {/* Right Side: Product Details & Purchase Actions */}
        <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-6">
            {/* Category & Rating */}
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                  {product.category}
                </span>
                <div className="flex items-center gap-1.5 bg-amber-50 dark:bg-amber-950/50 text-amber-800 dark:text-amber-200 px-2.5 py-1 rounded-full text-xs font-bold border border-amber-200 dark:border-amber-800/60">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  <span>{product.rating}</span>
                  <span className="text-slate-400">({product.reviewsCount} reviews)</span>
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                {product.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                {product.tagline}
              </p>
            </div>

            {/* Pricing Section */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 space-y-2">
              <div className="flex items-baseline gap-3">
                <span className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  ₹{product.price.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-extrabold text-white bg-emerald-600">
                  {discountPercent}% OFF
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-indigo-700 dark:text-indigo-300">
                <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                <span>
                  Save an extra ₹{maxCoinsDiscount} using your SkillSphere XP coins at checkout!
                </span>
              </div>
            </div>

            {/* Variant Selectors: Color */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Select Color: <span className="text-indigo-600 dark:text-indigo-400">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                        selectedColor === color
                          ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Variant Selectors: Size */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Select Size: <span className="text-indigo-600 dark:text-indigo-400">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`w-10 h-10 rounded-xl text-xs font-bold flex items-center justify-center transition-all ${
                        selectedSize === sz
                          ? 'bg-indigo-600 text-white shadow-sm ring-2 ring-indigo-500/30'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Stepper */}
            <div className="flex items-center gap-4">
              <label className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                Quantity:
              </label>
              <div className="inline-flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-sm font-bold"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-bold text-slate-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(Math.min(10, quantity + 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 text-sm font-bold"
                >
                  +
                </button>
              </div>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 font-medium">
                In Stock ({product.stockCount} units remaining)
              </span>
            </div>

            {/* Information Tabs */}
            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-4 border-b border-slate-200 dark:border-slate-800">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`pb-2 text-xs font-bold transition-colors border-b-2 ${
                    activeTab === 'details'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Overview & Features
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 text-xs font-bold transition-colors border-b-2 ${
                    activeTab === 'specs'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Tech Specs
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`pb-2 text-xs font-bold transition-colors border-b-2 ${
                    activeTab === 'reviews'
                      ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                  }`}
                >
                  Student Reviews ({product.reviews?.length || 0})
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'details' && (
                <div className="space-y-3 text-xs leading-relaxed text-slate-600 dark:text-slate-300">
                  <p>{product.description}</p>
                  <div className="space-y-1.5 pt-1">
                    <span className="font-bold text-slate-900 dark:text-white block">
                      Key Highlights:
                    </span>
                    {product.features.map((feature, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'specs' && (
                <div className="rounded-xl border border-slate-200 dark:border-slate-800 divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key} className="flex justify-between py-2 px-3">
                      <span className="font-medium text-slate-500 dark:text-slate-400">
                        {key}
                      </span>
                      <span className="font-semibold text-slate-900 dark:text-slate-100 text-right">
                        {val}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-3 max-h-48 overflow-y-auto pr-1">
                  {product.reviews && product.reviews.length > 0 ? (
                    product.reviews.map((rev) => (
                      <div
                        key={rev.id}
                        className="p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200/80 dark:border-slate-800/80 space-y-1.5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <img
                              src={rev.avatar}
                              alt={rev.author}
                              className="w-6 h-6 rounded-full object-cover"
                            />
                            <div>
                              <span className="text-xs font-bold text-slate-900 dark:text-white">
                                {rev.author}
                              </span>
                              {rev.college && (
                                <div className="flex items-center gap-1 text-[10px] text-indigo-600 dark:text-indigo-400">
                                  <GraduationCap className="w-3 h-3" />
                                  <span>{rev.college}</span>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-1 text-amber-500">
                            {[...Array(rev.rating)].map((_, i) => (
                              <Star key={i} className="w-3 h-3 fill-current" />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                          {rev.title}
                        </p>
                        <p className="text-xs text-slate-600 dark:text-slate-400">
                          {rev.comment}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-slate-400 py-4 text-center">
                      No customer reviews yet. Be the first student to review this product!
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons: Add to Cart & Buy Now */}
          <div className="pt-6 mt-6 border-t border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3">
            <button
              onClick={handleAddToCart}
              className={`py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                addedAnimation
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-900 dark:text-white'
              }`}
            >
              {addedAnimation ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Added to Cart!</span>
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4" />
                  <span>Add to Cart</span>
                </>
              )}
            </button>
            <button
              onClick={handleBuyNow}
              className="py-3 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 hover:opacity-95 shadow-md shadow-indigo-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Zap className="w-4 h-4 fill-current text-yellow-300" />
              <span>Instant Buy Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
