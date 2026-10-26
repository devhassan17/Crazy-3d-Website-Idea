import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, Lock, ExternalLink, CreditCard, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { useStore } from '../../store/useStore';
import { sounds } from '../../utils/audio';

export const CheckoutModal: React.FC = () => {
  const { cartItems, getCartTotals, closeModal, clearCart, checkoutUrl } = useStore();
  const totals = getCartTotals();

  const [paymentMethod, setPaymentMethod] = useState<'ideal' | 'card' | 'apple_pay' | 'odoo_live'>('ideal');
  const [formData, setFormData] = useState({
    firstName: 'Jan',
    lastName: 'de Vries',
    email: 'jan@example.nl',
    street: 'Keizersgracht 124',
    city: 'Amsterdam',
    zip: '1015 CW',
    country: 'Netherlands'
  });
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [orderRefNumber, setOrderRefNumber] = useState('');

  const handlePayOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    sounds.playAddToCart();

    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
      const ref = `C${Math.floor(Math.random() * 90000 + 10000)}`;
      setOrderRefNumber(ref);

      // Trigger celebratory confetti burst!
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E5007D', '#FFD900', '#2E7D32', '#FFFFFF']
      });

      clearCart();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-moyee-charcoal border-2 border-moyee-yellow rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-white overflow-hidden">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-800 hover:bg-moyee-pink text-gray-300 hover:text-white transition-all shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          /* ======================================================== */
          /* ORDER CONFIRMATION / SUCCESS SCREEN                      */
          /* ======================================================== */
          <div className="text-center py-8 space-y-4 animate-fadeIn">
            <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border-2 border-green-500 shadow-2xl animate-bounce">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <h3 className="font-oswald text-3xl font-bold uppercase text-white">
              BEDANKT VOOR JE BESTELLING!
            </h3>
            <div className="bg-moyee-dark/80 border border-moyee-pink/40 p-4 rounded-2xl max-w-md mx-auto">
              <p className="font-oswald text-sm text-moyee-yellow uppercase">
                ODOO 18 ORDER CONFIRMED • REF: #{orderRefNumber}
              </p>
              <p className="font-condensed text-xs text-gray-300 mt-1">
                Your order will be dispatched from our regional hub. Confirmation sent to {formData.email}.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
              <button
                onClick={closeModal}
                className="bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald text-sm font-bold uppercase px-6 py-3 rounded-xl transition-all shadow-lg"
              >
                Return to Virtual Store
              </button>
              <a
                href="https://www.moyeecoffee.com/shop"
                target="_blank"
                rel="noreferrer"
                className="bg-gray-800 hover:bg-gray-700 text-white font-oswald text-sm font-bold uppercase px-6 py-3 rounded-xl border border-gray-600 transition-all flex items-center justify-center gap-2"
              >
                <span>Visit Classic Store</span>
                <ExternalLink className="w-4 h-4 text-moyee-yellow" />
              </a>
            </div>
          </div>
        ) : (
          /* ======================================================== */
          /* ACTIVE CHECKOUT & PAYMENT FORM                           */
          /* ======================================================== */
          <div>
            <div className="flex items-center space-x-2.5 border-b border-gray-700 pb-3 mb-6">
              <span className="p-2 rounded-full bg-moyee-yellow text-moyee-charcoal">
                <CreditCard className="w-5 h-5" />
              </span>
              <div>
                <h3 className="font-oswald text-2xl font-bold uppercase tracking-wider text-white">
                  CHECKOUT & PAYMENT
                </h3>
                <p className="text-xs font-condensed text-gray-400">
                  Odoo 18 Seamless Gateway • Secure SSL Transaction
                </p>
              </div>
            </div>

            <form onSubmit={handlePayOrder} className="grid grid-cols-1 md:grid-cols-12 gap-6">
              {/* Shipping Address Form */}
              <div className="md:col-span-7 space-y-3 font-condensed">
                <h4 className="font-oswald text-sm uppercase font-bold text-moyee-yellow">
                  1. Shipping Information
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="First Name"
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    className="bg-moyee-dark border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    className="bg-moyee-dark border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-moyee-dark border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                />
                <input
                  type="text"
                  required
                  placeholder="Street Address & House Number"
                  value={formData.street}
                  onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                  className="w-full bg-moyee-dark border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    required
                    placeholder="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="bg-moyee-dark border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Postal Code (e.g. 1015 CW)"
                    value={formData.zip}
                    onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                    className="bg-moyee-dark border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>

                {/* Payment Method Selector */}
                <h4 className="font-oswald text-sm uppercase font-bold text-moyee-yellow pt-3">
                  2. Payment Method
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('ideal')}
                    className={`p-2.5 rounded-xl border text-xs font-condensed text-left flex items-center justify-between ${
                      paymentMethod === 'ideal'
                        ? 'border-moyee-pink bg-moyee-pink/20 font-bold text-white'
                        : 'border-gray-700 bg-moyee-dark text-gray-300'
                    }`}
                  >
                    <span>iDEAL (Netherlands)</span>
                    <span className="text-[10px] bg-gray-800 px-1 rounded">iDEAL</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-2.5 rounded-xl border text-xs font-condensed text-left flex items-center justify-between ${
                      paymentMethod === 'card'
                        ? 'border-moyee-pink bg-moyee-pink/20 font-bold text-white'
                        : 'border-gray-700 bg-moyee-dark text-gray-300'
                    }`}
                  >
                    <span>Credit Card / Visa</span>
                    <span className="text-[10px] bg-gray-800 px-1 rounded">💳</span>
                  </button>
                </div>

                {/* Direct Odoo Live Checkout Option */}
                <div className="pt-2">
                  <a
                    href={checkoutUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-1.5 p-2 rounded-xl bg-gray-800 hover:bg-gray-700 border border-gray-600 text-[11px] font-condensed text-gray-300 hover:text-white transition-all"
                  >
                    <span>Or Launch Existing Secure moyeecoffee.com Odoo Cart</span>
                    <ExternalLink className="w-3.5 h-3.5 text-moyee-yellow" />
                  </a>
                </div>
              </div>

              {/* Order Summary Column */}
              <div className="md:col-span-5 bg-moyee-dark/80 border border-gray-700/80 p-5 rounded-2xl flex flex-col justify-between space-y-4">
                <div>
                  <h4 className="font-oswald text-sm uppercase font-bold text-white border-b border-gray-700 pb-2">
                    Order Summary ({totals.itemCount} items)
                  </h4>
                  <div className="divide-y divide-gray-800 my-2 max-h-40 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.cartItemId} className="py-2 text-xs flex justify-between font-condensed">
                        <div>
                          <div className="text-white font-bold truncate w-36">{item.product.name}</div>
                          <div className="text-[10px] text-gray-400">
                            {item.quantity}x {item.selectedWeight}
                          </div>
                        </div>
                        <div className="text-moyee-yellow font-oswald font-bold">
                          €{item.subtotal.toFixed(2)}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-1.5 pt-2 border-t border-gray-700 text-xs font-condensed text-gray-300">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>€{totals.subtotal.toFixed(2)}</span>
                    </div>
                    {totals.discountAmount > 0 && (
                      <div className="flex justify-between text-green-400 font-bold">
                        <span>Discount:</span>
                        <span>-€{totals.discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span>Shipping:</span>
                      <span>{totals.shipping === 0 ? 'FREE' : `€${totals.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-white font-oswald text-base font-bold pt-2 border-t border-gray-700">
                      <span>TOTAL PAYABLE:</span>
                      <span className="text-moyee-yellow">€{totals.total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald text-base font-bold uppercase tracking-wider py-3.5 rounded-xl shadow-2xl border-2 border-moyee-yellow flex items-center justify-center space-x-2 transition-all transform active:scale-95"
                >
                  {isProcessing ? (
                    <span>PROCESSING ORDER...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4 text-moyee-yellow" />
                      <span>PAY €{totals.total.toFixed(2)} & PLACE ORDER</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
