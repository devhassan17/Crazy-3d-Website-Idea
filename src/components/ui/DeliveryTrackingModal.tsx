import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, MapPin, Package } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { OdooOrder } from '../../types';

export const DeliveryTrackingModal: React.FC = () => {
  const { closeModal, recentOrders, trackOrder } = useStore();
  const [searchInput, setSearchInput] = useState('C34300');
  const [activeOrder, setActiveOrder] = useState<OdooOrder | null>(recentOrders[1]);
  const [searched, setSearched] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput) return;
    const found = trackOrder(searchInput);
    setActiveOrder(found);
    setSearched(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-moyee-charcoal border-2 border-moyee-pink rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-white">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-800 hover:bg-moyee-pink text-gray-300 hover:text-white transition-all shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 border-b border-gray-700/80 pb-4 mb-5">
          <div className="w-12 h-12 rounded-full bg-moyee-pink text-white flex items-center justify-center font-bold text-xl shadow-lg border border-moyee-yellow">
            🚚
          </div>
          <div>
            <h3 className="font-oswald text-2xl font-bold uppercase tracking-wider text-white">
              DELIVERY & ORDER DISPATCH
            </h3>
            <p className="text-xs font-condensed text-gray-300">
              Live Courier Tracking • Odoo 18 Dispatch Status
            </p>
          </div>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2 mb-6">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Enter Odoo Order Ref (e.g. C34300 or C34289)"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-moyee-dark border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs font-condensed text-white placeholder-gray-500 uppercase focus:outline-none focus:border-moyee-pink"
            />
          </div>
          <button
            type="submit"
            className="bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald text-xs font-bold uppercase px-5 rounded-xl border border-moyee-yellow transition-all"
          >
            Track
          </button>
        </form>

        {activeOrder ? (
          <div className="bg-moyee-dark/90 border border-moyee-yellow/40 p-5 rounded-2xl space-y-4">
            <div className="flex justify-between items-start border-b border-gray-700 pb-3">
              <div>
                <span className="font-oswald text-xs font-bold text-moyee-yellow uppercase">
                  ORDER REF: #{activeOrder.orderRef}
                </span>
                <div className="text-sm font-oswald font-bold text-white mt-0.5">
                  Courier: {activeOrder.carrier}
                </div>
                <div className="text-[11px] text-gray-400 font-condensed">
                  Tracking Code: <span className="font-mono text-white">{activeOrder.trackingNumber}</span>
                </div>
              </div>
              <span className="bg-moyee-yellow text-moyee-charcoal font-oswald text-xs font-bold uppercase px-3 py-1 rounded-full shadow">
                {activeOrder.status}
              </span>
            </div>

            {/* Visual Tracking Progress Milestones */}
            <div className="grid grid-cols-4 gap-2 pt-2 text-center text-[10px] font-condensed">
              <div className="flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mb-1">
                  ✓
                </span>
                <span className="text-white font-bold">Roasting at Origin</span>
                <span className="text-gray-400 text-[9px]">{activeOrder.originFacility}</span>
              </div>
              <div className="flex flex-col items-center">
                <span className="w-6 h-6 rounded-full bg-green-500 text-white flex items-center justify-center font-bold mb-1">
                  ✓
                </span>
                <span className="text-white font-bold">Nitro Sealed</span>
                <span className="text-gray-400 text-[9px]">Oxygen-Free Pack</span>
              </div>
              <div className="flex flex-col items-center">
                <span className={`w-6 h-6 rounded-full ${activeOrder.status === 'Delivered' ? 'bg-green-500' : 'bg-moyee-pink animate-pulse'} text-white flex items-center justify-center font-bold mb-1`}>
                  {activeOrder.status === 'Delivered' ? '✓' : '🚚'}
                </span>
                <span className="text-white font-bold">In Transit</span>
                <span className="text-gray-400 text-[9px]">Amsterdam Hub</span>
              </div>
              <div className="flex flex-col items-center">
                <span className={`w-6 h-6 rounded-full ${activeOrder.status === 'Delivered' ? 'bg-green-500 text-white' : 'bg-gray-700 text-gray-400'} flex items-center justify-center font-bold mb-1`}>
                  {activeOrder.status === 'Delivered' ? '✓' : '4'}
                </span>
                <span className={activeOrder.status === 'Delivered' ? 'text-white font-bold' : 'text-gray-500'}>
                  Delivered
                </span>
                <span className="text-gray-400 text-[9px]">Doorstep</span>
              </div>
            </div>

            {/* Items inside order */}
            <div className="border-t border-gray-700 pt-3">
              <span className="font-oswald text-[11px] text-gray-400 uppercase font-bold block mb-1">
                Items in Shipment:
              </span>
              {activeOrder.items.map((it, idx) => (
                <div key={idx} className="flex justify-between text-xs font-condensed text-gray-300">
                  <span>{it.qty}x {it.name}</span>
                  <span className="font-oswald text-white font-bold">€{(it.qty * it.price).toFixed(2)}</span>
                </div>
              ))}
            </div>
          </div>
        ) : searched ? (
          <div className="text-center py-6 text-gray-400 font-condensed">
            No active order found with that reference. Try <strong className="text-white">C34300</strong> or <strong className="text-white">C34289</strong>.
          </div>
        ) : null}
      </div>
    </div>
  );
};
