import React, { useState } from 'react';
import {
  X,
  CheckCircle2,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  Phone,
  MapPin,
  ShieldCheck,
  PackageCheck,
  Sparkles,
  ArrowRight,
  Download,
  ShoppingBag
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, UserProfile, StoreOrder } from '../../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  user: UserProfile;
  discounts: {
    couponCode: string;
    couponDiscount: number;
    xpCoinsUsed: number;
    xpDiscount: number;
  };
  onOrderComplete: (order: StoreOrder) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  user,
  discounts,
  onOrderComplete,
}) => {
  const [step, setStep] = useState<'address' | 'payment' | 'success'>('address');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: user.name || 'Rahul Sharma',
    phone: '9876543210',
    collegeOrHostel: user.college || 'IIT Madras Campus',
    roomOrStreet: 'Block B, Kaveri Hostel, Room 204',
    city: 'Chennai',
    state: 'Tamil Nadu',
    pincode: '600036',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('student@oksbi');
  const [confirmedOrder, setConfirmedOrder] = useState<StoreOrder | null>(null);

  if (!isOpen) return null;

  // Calculation
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );
  const freeDeliveryThreshold = 999;
  const shipping = subtotal >= freeDeliveryThreshold || subtotal === 0 ? 0 : 99;
  const totalDiscount = discounts.couponDiscount + discounts.xpDiscount;
  const finalTotal = Math.max(0, subtotal - totalDiscount + shipping);

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePlaceOrder = () => {
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);

      const newOrder: StoreOrder = {
        id: `LX-SS-${Math.floor(100000 + Math.random() * 900000)}`,
        date: new Date().toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        }),
        items: [...items],
        subtotal,
        discount: totalDiscount,
        shipping,
        total: finalTotal,
        status: 'Confirmed',
        shippingAddress: { ...formData },
        paymentMethod,
        trackingNumber: `EXP-IN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      };

      setConfirmedOrder(newOrder);
      setStep('success');
      onOrderComplete(newOrder);

      // Trigger Confetti!
      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#4F46E5', '#2563EB', '#10B981', '#F59E0B'],
        });
      } catch (err) {
        console.error('Confetti error:', err);
      }
    }, 1200);
  };

  return (
    <div
      id="checkout-modal-backdrop"
      className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 md:p-6"
    >
      <div
        id="checkout-modal"
        className="relative w-full max-w-2xl rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                SkillSphere Campus Checkout
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Official Lumixora Student Store Partner
              </p>
            </div>
          </div>
          {step !== 'success' && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Step Indicator */}
        {step !== 'success' && (
          <div className="px-6 py-3 bg-slate-50 dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800 flex items-center justify-center gap-6 text-xs font-semibold">
            <div
              className={`flex items-center gap-1.5 ${
                step === 'address'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] border-current">
                1
              </span>
              <span>Hostel & Delivery</span>
            </div>
            <span className="text-slate-300 dark:text-slate-700">→</span>
            <div
              className={`flex items-center gap-1.5 ${
                step === 'payment'
                  ? 'text-indigo-600 dark:text-indigo-400 font-bold'
                  : 'text-slate-400'
              }`}
            >
              <span className="w-5 h-5 rounded-full border flex items-center justify-center text-[10px] border-current">
                2
              </span>
              <span>Secure Payment</span>
            </div>
          </div>
        )}

        {/* Content Body */}
        <div className="p-6">
          {/* STEP 1: ADDRESS */}
          {step === 'address' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white mb-2">
                <MapPin className="w-4 h-4 text-indigo-600" />
                <span>Student Delivery Address (Campus / Hostel / Home)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) =>
                      setFormData({ ...formData, fullName: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Phone Number (for OTP & Courier) *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  College / University / Campus Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.collegeOrHostel}
                  onChange={(e) =>
                    setFormData({ ...formData, collegeOrHostel: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>

              <div>
                <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                  Hostel Block & Room No. / Flat & Street *
                </label>
                <input
                  type="text"
                  required
                  value={formData.roomOrStreet}
                  onChange={(e) =>
                    setFormData({ ...formData, roomOrStreet: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) =>
                      setFormData({ ...formData, city: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.state}
                    onChange={(e) =>
                      setFormData({ ...formData, state: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block mb-1">
                    Pincode *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) =>
                      setFormData({ ...formData, pincode: e.target.value })
                    }
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs text-slate-900 dark:text-white focus:outline-indigo-500"
                  />
                </div>
              </div>

              {/* Order Summary Mini Box */}
              <div className="mt-4 p-3 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-600 dark:text-slate-400">
                  {items.length} items • Final Payable:
                </span>
                <span className="text-sm font-extrabold text-indigo-600 dark:text-indigo-400">
                  ₹{finalTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Continue to Payment</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          {/* STEP 2: PAYMENT */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Select Payment Method
                </span>
                <button
                  onClick={() => setStep('address')}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                >
                  Edit Address
                </button>
              </div>

              {/* Payment Option Selector */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/50 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <QrCode className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Instant UPI / QR
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    GPay, PhonePe, Paytm (Fastest)
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'card'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/50 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Card / Debit
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Visa, MasterCard, RuPay
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('netbanking')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'netbanking'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/50 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Building2 className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      NetBanking
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    SBI, HDFC, ICICI, Axis & more
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/50 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-950'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <Truck className="w-4 h-4 text-indigo-600" />
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      Cash on Delivery
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                    Pay at Campus Hostel Desk
                  </p>
                </button>
              </div>

              {/* UPI ID Mock Field */}
              {paymentMethod === 'upi' && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
                  <label className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 block">
                    Enter Virtual Payment Address (VPA / UPI ID)
                  </label>
                  <input
                    type="text"
                    value={upiId}
                    onChange={(e) => setUpiId(e.target.value)}
                    placeholder="e.g. mobile@upi or username@okhdfcbank"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-mono"
                  />
                  <span className="text-[10px] text-slate-400 block">
                    A collect request will be sent to your UPI app for ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              )}

              {/* Final Breakdown */}
              <div className="p-4 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/40 space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Subtotal ({items.length} items)</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                {discounts.couponDiscount > 0 && (
                  <div className="flex justify-between text-emerald-600 dark:text-emerald-400">
                    <span>Coupon ({discounts.couponCode})</span>
                    <span>-₹{discounts.couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                {discounts.xpDiscount > 0 && (
                  <div className="flex justify-between text-indigo-600 dark:text-indigo-400">
                    <span>XP Coin Discount</span>
                    <span>-₹{discounts.xpDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600 dark:text-slate-400">
                  <span>Delivery</span>
                  <span>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
                </div>
                <div className="pt-2 border-t border-indigo-200/60 dark:border-indigo-900/60 flex justify-between text-sm font-extrabold text-slate-900 dark:text-white">
                  <span>Total Payable</span>
                  <span className="text-base text-indigo-600 dark:text-indigo-400">
                    ₹{finalTotal.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Pay Now Button */}
              <button
                onClick={handlePlaceOrder}
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-indigo-600 via-blue-600 to-emerald-500 hover:opacity-95 shadow-md shadow-indigo-500/20 active:scale-98 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span>Processing Campus Payment...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹{finalTotal.toLocaleString('en-IN')} & Confirm Order</span>
                  </>
                )}
              </button>
            </div>
          )}

          {/* STEP 3: SUCCESS */}
          {step === 'success' && confirmedOrder && (
            <div className="text-center py-4 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 dark:text-white">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Thank you, {formData.fullName}. Your order is being prepped for campus dispatch.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-left space-y-2.5 text-xs">
                <div className="flex justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-2">
                  <span className="text-slate-500">Order ID:</span>
                  <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                    {confirmedOrder.id}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-2">
                  <span className="text-slate-500">Tracking Code:</span>
                  <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {confirmedOrder.trackingNumber}
                  </span>
                </div>
                <div className="flex justify-between border-b border-slate-200/80 dark:border-slate-800/80 pb-2">
                  <span className="text-slate-500">Estimated Delivery:</span>
                  <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                    2-4 Business Days (Express)
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-slate-500">Destination:</span>
                  <span className="font-semibold text-slate-900 dark:text-white text-right max-w-xs truncate">
                    {formData.roomOrStreet}, {formData.collegeOrHostel}
                  </span>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  onClick={() => {
                    alert(`Invoice downloaded for Order ${confirmedOrder.id}`);
                  }}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Invoice</span>
                </button>
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 flex items-center justify-center gap-1.5"
                >
                  <span>Continue Shopping</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
