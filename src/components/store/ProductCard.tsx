import React from 'react';
import { Star, ShoppingCart, Heart, Eye, Check, Zap } from 'lucide-react';
import { StoreProduct } from '../../types';

interface ProductCardProps {
  product: StoreProduct;
  onQuickView: (product: StoreProduct) => void;
  onAddToCart: (product: StoreProduct) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  userXp?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
  userXp = 0,
}) => {
  const [justAdded, setJustAdded] = React.useState(false);

  const discountPercent = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product.id);
  };

  return (
    <div
      id={`product-card-${product.id}`}
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 overflow-hidden shadow-sm hover:shadow-xl hover:border-indigo-400/50 dark:hover:border-indigo-500/50 transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-slate-100 dark:bg-slate-950">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.badge && (
            <span className="inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white shadow-sm bg-gradient-to-r from-indigo-600 to-blue-600">
              <Zap className="w-2.5 h-2.5 fill-current text-yellow-300" />
              {product.badge}
            </span>
          )}
          {discountPercent > 0 && (
            <span className="inline-block rounded-full bg-emerald-600 text-white px-2 py-0.5 text-[10px] font-bold shadow-sm">
              {discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          aria-label="Add to wishlist"
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isWishlisted
              ? 'bg-rose-500 text-white shadow-md'
              : 'bg-white/80 dark:bg-slate-900/80 text-slate-600 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Overlay on Desktop Hover */}
        <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-slate-950/80 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex items-center justify-center gap-2">
          <span className="text-xs font-semibold text-white flex items-center gap-1.5 py-1 px-3 rounded-xl bg-white/20 backdrop-blur-md">
            <Eye className="w-3.5 h-3.5" />
            Quick View
          </span>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {/* Category & Rating */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
            {product.category}
          </span>
          <div className="flex items-center gap-1 text-[11px] font-medium text-slate-700 dark:text-slate-300 bg-amber-50 dark:bg-amber-950/40 px-1.5 py-0.5 rounded-md border border-amber-200/50 dark:border-amber-800/50">
            <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
            <span>{product.rating}</span>
            <span className="text-slate-400 text-[10px]">({product.reviewsCount})</span>
          </div>
        </div>

        {/* Title & Tagline */}
        <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
          {product.name}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 mb-3">
          {product.tagline}
        </p>

        {/* Color Previews if available */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-1.5 mb-3 text-[10px] text-slate-500 dark:text-slate-400">
            <span>Colors:</span>
            <span className="font-medium text-slate-700 dark:text-slate-300 truncate">
              {product.colors.join(' • ')}
            </span>
          </div>
        )}

        {/* XP Coin Discount Badge */}
        {product.coinsRedeemableMax && product.coinsRedeemableMax > 0 && (
          <div className="mb-3 inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950/50 text-[11px] text-indigo-700 dark:text-indigo-300 font-medium">
            <span>🪙</span>
            <span>
              Save up to ₹{Math.round(product.coinsRedeemableMax * 0.5)} with XP
            </span>
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-3">
          {/* Price */}
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-slate-400 line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            </div>
            <span className="text-[10px] font-semibold text-emerald-600 dark:text-emerald-400">
              Save ₹{(product.originalPrice - product.price).toLocaleString('en-IN')}
            </span>
          </div>

          {/* Add to Cart CTA */}
          <button
            id={`btn-add-cart-${product.id}`}
            onClick={handleAdd}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all duration-200 flex items-center gap-1.5 shadow-sm cursor-pointer ${
              justAdded
                ? 'bg-emerald-600 text-white shadow-emerald-500/20'
                : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-500/20 active:scale-95'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
