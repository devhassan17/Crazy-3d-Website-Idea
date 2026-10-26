import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, Sparkles } from 'lucide-react';
import { useStore } from '../../store/useStore';

export const CartDrawer: React.FC = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    closeModal,
    openModal,
    getCartTotals,
    discountCode,
    discountPercentage,
    applyDiscountCode
  } = useStore();

  const [couponInput, setCouponInput] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ success: boolean; text: string } | null>(
    null
  );

  const totals = getCartTotals();

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput) return;
    const res = applyDiscountCode(couponInput);
    setCouponMessage({ success: res.success, text: res.message });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm animate-fadeIn select-none">
      <div className="w-full max-w-md bg-moyee-charcoal h-full flex flex-col justify-between shadow-2xl border-l-2 border-moyee-pink/60 animate-slideLeft text-white p-5 sm:p-6 overflow-y-auto">
        {/* Header */}
        <div>
          <div className="flex items-center justify-between border-b border-gray-700/80 pb-4">
            <div className="flex items-center space-x-2">
              <span className="font-oswald text-xl font-bold uppercase tracking-wider text-white">
                SHOPPING BASKET
              </span>
              <span className="bg-moyee-pink text-white font-oswald text-xs font-bold px-2 py-0.5 rounded-full">
                {totals.itemCount} items
              </span>
            </div>
            <button
              onClick={closeModal}
              className="p-1.5 rounded-full bg-gray-800 hover:bg-moyee-pink text-gray-300 hover:text-white transition-all"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="divide-y divide-gray-800 my-4 max-h-[44vh] overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <div className="text-center py-12">
                <span className="text-4xl block mb-2">☕</span>
                <p className="font-oswald text-base text-gray-300 uppercase">
                  Your basket is empty
                </p>
                <p className="font-condensed text-xs text-gray-500 mt-1">
                  Walk to any shelf and inspect a roast to add it!
                </p>
              </div>
            ) : (
              cartItems.map((item) => (
                <div key={item.cartItemId} className="py-3.5 flex items-center gap-3">
                  {/* Color Thumbnail swatch */}
                  <div
                    className="w-12 h-14 rounded-lg flex items-center justify-center font-oswald font-black text-xs text-white shadow"
                    style={{ backgroundColor: item.product.colorHex }}
                  >
                    ☕
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-oswald text-sm font-bold uppercase truncate text-white">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-gray-400 font-condensed">
                      {item.selectedWeight} {item.selectedGrind ? `• ${item.selectedGrind}` : ''}
                    </div>
                    {item.isSubscription && (
                      <span className="inline-block bg-moyee-yellow text-moyee-charcoal text-[9px] font-oswald font-bold px-1.5 py-0.2 rounded mt-0.5">
                        SUB: {item.subscriptionFrequency}
                      </span>
                    )}
                    <div className="font-oswald text-xs font-bold text-moyee-yellow mt-1">
                      €{item.unitPrice.toFixed(2)} each
                    </div>
                  </div>

                  {/* Quantity Stepper */}
                  <div className="flex items-center space-x-1.5 bg-moyee-dark border border-gray-700 rounded-lg p-1">
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                      className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-oswald text-xs font-bold text-white w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                      className="p-1 hover:bg-gray-700 rounded text-gray-300 hover:text-white"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Delete */}
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="p-1.5 text-gray-400 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Footer / Summary */}
        <div className="border-t border-gray-700/80 pt-4 space-y-3">
          {/* Coupon Code Input */}
          <form onSubmit={handleApplyCoupon} className="flex gap-2">
            <div className="relative flex-1">
              <Tag className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Discount Code (e.g. DRINKCOFFEE)"
                value={couponInput}
                onChange={(e) => setCouponInput(e.target.value)}
                className="w-full bg-moyee-dark border border-gray-700 rounded-xl pl-9 pr-3 py-2 text-xs font-condensed text-white placeholder-gray-500 focus:outline-none focus:border-moyee-pink uppercase"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-800 hover:bg-moyee-pink text-white font-oswald text-xs font-bold px-3 rounded-xl border border-gray-600 transition-all"
            >
              Apply
            </button>
          </form>

          {couponMessage && (
            <p
              className={`text-[11px] font-condensed ${
                couponMessage.success ? 'text-green-400' : 'text-red-400'
              }`}
            >
              {couponMessage.text}
            </p>
          )}

          {/* Pricing Breakdown */}
          <div className="space-y-1.5 text-xs font-condensed text-gray-300">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-bold text-white">€{totals.subtotal.toFixed(2)}</span>
            </div>
            {discountPercentage > 0 && (
              <div className="flex justify-between text-green-400 font-bold">
                <span>Discount ({discountCode}):</span>
                <span>-€{totals.discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Shipping (NL & EU):</span>
              <span className="text-white">
                {totals.shipping === 0 ? (
                  <span className="text-moyee-yellow font-bold uppercase">FREE</span>
                ) : (
                  `€${totals.shipping.toFixed(2)}`
                )}
              </span>
            </div>
            <div className="flex justify-between text-gray-400 text-[11px]">
              <span>Estimated VAT (9% Food/Coffee):</span>
              <span>€{totals.tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-oswald text-lg font-bold text-white pt-2 border-t border-gray-700">
              <span>TOTAL ORDER:</span>
              <span className="text-moyee-yellow">€{totals.total.toFixed(2)}</span>
            </div>
          </div>

          {/* Proceed to Payment Action Button */}
          <button
            onClick={() => openModal('checkout')}
            disabled={cartItems.length === 0}
            className="w-full bg-moyee-pink hover:bg-moyee-pink-hover disabled:bg-gray-700 disabled:text-gray-500 text-white font-oswald text-base font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-2xl border-2 border-moyee-yellow flex items-center justify-center space-x-2 transition-all transform active:scale-95"
          >
            <span>PROCEED TO PAYMENT</span>
            <ArrowRight className="w-5 h-5 text-moyee-yellow" />
          </button>

          <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-condensed text-center">
            <ShieldCheck className="w-3.5 h-3.5 text-green-400" />
            <span>Secure 256-bit Encrypted Odoo 18 eCommerce Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};
