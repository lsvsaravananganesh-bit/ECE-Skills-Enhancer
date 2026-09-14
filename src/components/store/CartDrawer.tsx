import React, { useState } from 'react';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Tag,
  Check
} from 'lucide-react';
import { CartItem, UserProfile } from '../../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (
    productId: string,
    quantity: number,
    color?: string,
    size?: string
  ) => void;
  onRemoveItem: (productId: string, color?: string, size?: string) => void;
  onProceedToCheckout: (discountData: {
    couponCode: string;
    couponDiscount: number;
    xpCoinsUsed: number;
    xpDiscount: number;
  }) => void;
  user: UserProfile;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  user,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    percentage: number;
  } | null>({ code: 'STUDENT20', percentage: 20 });
  const [couponError, setCouponError] = useState('');
  const [useXpDiscount, setUseXpDiscount] = useState(false);

  if (!isOpen) return null;

  // Calculations
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

  const freeDeliveryThreshold = 999;
  const progressToFreeDelivery = Math.min(
    100,
    Math.round((subtotal / freeDeliveryThreshold) * 100)
  );
  const remainingForFree = Math.max(0, freeDeliveryThreshold - subtotal);
  const baseShipping = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 99;

  // Coupon Discount
  const couponDiscount = appliedCoupon
    ? Math.round((subtotal * appliedCoupon.percentage) / 100)
    : 0;

  // XP Coins Discount (Max up to 20% of subtotal or user's XP * 0.5)
  const maxAvailableXpDiscount = Math.min(
    Math.round(subtotal * 0.2),
    Math.round((user.xpPoints || 0) * 0.5)
  );
  const xpDiscount = useXpDiscount ? maxAvailableXpDiscount : 0;
  const xpCoinsUsed = useXpDiscount ? Math.round(xpDiscount * 2) : 0;

  const total = Math.max(0, subtotal - couponDiscount - xpDiscount + baseShipping);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    const code = couponCode.trim().toUpperCase();
    if (code === 'STUDENT20') {
      setAppliedCoupon({ code: 'STUDENT20', percentage: 20 });
      setCouponCode('');
    } else if (code === 'LUMIXORA15') {
      setAppliedCoupon({ code: 'LUMIXORA15', percentage: 15 });
      setCouponCode('');
    } else if (code === 'SKILLSPHERE10') {
      setAppliedCoupon({ code: 'SKILLSPHERE10', percentage: 10 });
      setCouponCode('');
    } else {
      setCouponError('Invalid code. Try STUDENT20 or LUMIXORA15');
    }
  };

  const handleCheckoutClick = () => {
    onProceedToCheckout({
      couponCode: appliedCoupon ? appliedCoupon.code : '',
      couponDiscount,
      xpCoinsUsed,
      xpDiscount,
    });
  };

  return (
    <div
      id="cart-drawer-backdrop"
      className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-sm flex justify-end"
      onClick={onClose}
    >
      <div
        id="cart-drawer"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md h-full bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between"
      >
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Your Gear Cart ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close cart"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="px-5 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
            {remainingForFree > 0 ? (
              <span>
                Add{' '}
                <strong className="text-indigo-600 dark:text-indigo-400">
                  ₹{remainingForFree}
                </strong>{' '}
                more for <strong className="text-emerald-500">FREE Campus Express Delivery</strong>
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-bold">
                <Check className="w-3.5 h-3.5" />
                You unlocked FREE Campus Express Delivery!
              </span>
            )}
            <span className="text-[11px] text-slate-400 font-mono">
              {progressToFreeDelivery}%
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-emerald-500 rounded-full transition-all duration-300"
              style={{ width: `${progressToFreeDelivery}%` }}
            ></div>
          </div>
        </div>

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-500">
                <ShoppingBag className="w-8 h-8 opacity-60" />
              </div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Your cart is empty
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs">
                Explore Lumixora desk setups, dev hoodies, and hardware lab kits to boost your study game.
              </p>
              <button
                onClick={onClose}
                className="mt-2 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 shadow-sm"
              >
                Browse Campus Store
              </button>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={`${item.product.id}-${item.selectedColor || ''}-${item.selectedSize || ''}`}
                className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex gap-3.5 items-center"
              >
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover bg-slate-100 dark:bg-slate-950 flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    {item.product.name}
                  </h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.selectedColor && (
                      <span className="capitalize">{item.selectedColor}</span>
                    )}
                    {item.selectedColor && item.selectedSize && <span>•</span>}
                    {item.selectedSize && <span>Size: {item.selectedSize}</span>}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                      ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-center rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950">
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.quantity - 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-xs font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          onUpdateQuantity(
                            item.product.id,
                            item.quantity + 1,
                            item.selectedColor,
                            item.selectedSize
                          )
                        }
                        className="p-1 text-slate-500 hover:text-slate-900 dark:hover:text-white"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() =>
                    onRemoveItem(
                      item.product.id,
                      item.selectedColor,
                      item.selectedSize
                    )
                  }
                  className="p-2 text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer with Discounts, Calculations & Checkout */}
        {items.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/70 space-y-3.5">
            {/* Coupon Code Input */}
            <form onSubmit={handleApplyCoupon} className="space-y-1.5">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. STUDENT20)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200 uppercase font-mono tracking-wider focus:outline-indigo-500"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-xl text-xs font-bold text-white bg-slate-900 dark:bg-slate-800 hover:bg-slate-800 dark:hover:bg-slate-700"
                >
                  Apply
                </button>
              </div>
              {appliedCoupon && (
                <div className="flex items-center justify-between text-[11px] text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg border border-emerald-200 dark:border-emerald-800/60">
                  <span className="font-semibold">
                    Code <strong>{appliedCoupon.code}</strong> Applied ({appliedCoupon.percentage}% OFF)
                  </span>
                  <button
                    type="button"
                    onClick={() => setAppliedCoupon(null)}
                    className="text-xs font-bold text-rose-500 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && (
                <p className="text-[11px] text-rose-500 font-medium">
                  {couponError}
                </p>
              )}
            </form>

            {/* SkillSphere XP Redemption Option */}
            {(user.xpPoints || 0) >= 100 && maxAvailableXpDiscount > 0 && (
              <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-200 dark:border-indigo-900/60 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-base">🪙</span>
                  <div>
                    <span className="text-xs font-bold text-indigo-900 dark:text-indigo-200 block">
                      Redeem SkillSphere XP
                    </span>
                    <span className="text-[10px] text-indigo-700 dark:text-indigo-400">
                      You have {user.xpPoints} XP • Use {xpCoinsUsed || Math.round(maxAvailableXpDiscount * 2)} XP for ₹{maxAvailableXpDiscount} OFF
                    </span>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={useXpDiscount}
                    onChange={(e) => setUseXpDiscount(e.target.checked)}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-slate-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600"></div>
                </label>
              </div>
            )}

            {/* Price Breakdown */}
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-emerald-600 dark:text-emerald-400 font-medium">
                  <span>Student Coupon Discount</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              {xpDiscount > 0 && (
                <div className="flex justify-between text-indigo-600 dark:text-indigo-400 font-medium">
                  <span>SkillSphere XP Discount</span>
                  <span>-₹{xpDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-500 dark:text-slate-400">
                <span>Campus Express Delivery</span>
                <span>
                  {baseShipping === 0 ? (
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      FREE
                    </strong>
                  ) : (
                    `₹${baseShipping}`
                  )}
                </span>
              </div>
              <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex justify-between text-sm font-extrabold text-slate-900 dark:text-white">
                <span>Total Amount</span>
                <span className="text-base text-indigo-600 dark:text-indigo-400">
                  ₹{total.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckoutClick}
              className="w-full py-3.5 px-4 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 hover:opacity-95 shadow-md shadow-indigo-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Campus Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Encrypted 256-Bit Checkout • 7-Day Campus Guarantee</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
