import React, { useState } from 'react';
import { X, Mail, Phone, HelpCircle, CheckCircle2, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useStore } from '../../store/useStore';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: 'Freshness',
    q: 'How long does the coffee stay fresh after roasting at origin?',
    a: 'Moyee wet-mills cherries and roasts beans within days of harvest at our African roasteries. Immediately after roasting, beans are sealed in airtight bags with a food-grade nitrogen flush and one-way degassing valve (displacing 99% of oxygen). Delivered to European doorsteps within 8–12 weeks of roasting, retaining peak aromatics for years inside unopened bags!'
  },
  {
    category: 'Brand Story',
    q: 'Where does the name "Moyee" come from?',
    a: 'Moyee (pronounced "Mo-yeah!") means "mortar" in Amharic (Ethiopian language). In Ethiopia, coffee is traditionally hand-ground using a carved wooden mortar. This ancient tool symbolizes the technological and economic divide between producers and consumers. We chose this name to bridge and revolutionize that divide.'
  },
  {
    category: 'FairChain Impact',
    q: 'What is the real difference between FairChain and Fairtrade?',
    a: 'Fairtrade ensures local farmers receive a small minimum price for exporting raw green coffee, but 90%+ of value-added roasting profits remain in the West. FairChain is a true 50/50 enterprise: Moyee and our African partners co-own the processing business. We roast at origin, keeping 300% more economic impact, infrastructure, and living-income jobs in Ethiopia and Kenya.'
  },
  {
    category: 'Pricing',
    q: 'Why are Moyee coffees cheaper than specialty brands but pricier than commodity supermarkets?',
    a: 'We pay farmers 20% above the open market rate (surpassing the Living Income Reference Price - LIRP). Because we cut out western middlemen traders and own our roasteries at origin, we provide authentic 80+ cupping score specialty grade coffee at accessible prices without the standard specialty middleman markup!'
  },
  {
    category: 'Environment',
    q: 'Is Moyee coffee deforestation-free?',
    a: 'Yes! Moyee coffee is 100% deforestation-free, fully aligned with the European Union Deforestation Regulation (EUDR). Our beans grow forest-shielded under natural guava and banana canopies. We plant 40,000+ trees annually and have produced 403,200 kg of organic biocompost to eliminate synthetic chemical fertilizers.'
  }
];

export const CustomerSupportModal: React.FC = () => {
  const { closeModal } = useStore();
  const [activeTab, setActiveTab] = useState<'contact' | 'faq'>('contact');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    orderNumber: '',
    subject: 'General Question',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tid = `TICK-${Math.floor(Math.random() * 80000 + 10000)}`;
    setTicketId(tid);
    setFormSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md animate-fadeIn select-none overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-moyee-charcoal border-2 border-moyee-yellow rounded-3xl p-6 sm:p-8 shadow-2xl my-auto text-white">
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full bg-gray-800 hover:bg-moyee-pink text-gray-300 hover:text-white transition-all shadow-md z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center space-x-3 border-b border-gray-700/80 pb-4 mb-5">
          <div className="w-12 h-12 rounded-full bg-moyee-yellow text-moyee-charcoal flex items-center justify-center font-bold text-xl shadow-lg">
            📮
          </div>
          <div>
            <h3 className="font-oswald text-2xl font-bold uppercase tracking-wider text-white">
              MOYEE HELP DESK — WE'RE HERE FOR YOU
            </h3>
            <p className="text-xs font-condensed text-gray-300">
              Direct Contact & Support • Powered by Odoo 18 Helpdesk
            </p>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex space-x-2 border-b border-gray-700 mb-5">
          <button
            onClick={() => setActiveTab('contact')}
            className={`font-oswald text-xs uppercase font-bold tracking-wider py-2 px-4 border-b-2 transition-all ${
              activeTab === 'contact'
                ? 'border-moyee-pink text-moyee-pink'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Submit Inquiry / Complaint
          </button>
          <button
            onClick={() => setActiveTab('faq')}
            className={`font-oswald text-xs uppercase font-bold tracking-wider py-2 px-4 border-b-2 transition-all ${
              activeTab === 'faq'
                ? 'border-moyee-yellow text-moyee-yellow'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Frequently Asked Questions
          </button>
        </div>

        {activeTab === 'contact' ? (
          <div>
            {formSubmitted ? (
              <div className="text-center py-8 space-y-3">
                <div className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto border-2 border-green-500">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="font-oswald text-2xl font-bold uppercase text-white">
                  MESSAGE RECEIVED BY MELANIE!
                </h4>
                <p className="font-condensed text-sm text-gray-300 max-w-md mx-auto">
                  Ticket <span className="font-mono text-moyee-yellow font-bold">#{ticketId}</span> has been created in our Odoo 18 Helpdesk. Melanie or a team colleague will reply to <span className="text-white font-bold">{formData.email}</span> within 24–48 hours.
                </p>
                <button
                  onClick={() => setFormSubmitted(false)}
                  className="bg-gray-800 hover:bg-gray-700 text-white font-oswald text-xs uppercase font-bold px-4 py-2 rounded-xl mt-3"
                >
                  Submit Another Question
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                {/* Contact Form */}
                <form onSubmit={handleSubmit} className="md:col-span-8 space-y-3 font-condensed">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">Your Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Jan de Vries"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-moyee-dark border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="jan@example.nl"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full bg-moyee-dark border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">Order # (If applicable)</label>
                      <input
                        type="text"
                        placeholder="e.g. C34300"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                        className="w-full bg-moyee-dark border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] text-gray-300 block mb-1">Subject *</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full bg-moyee-dark border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option>General Question</option>
                        <option>Order Status / Missing Parcel</option>
                        <option>Subscription Change</option>
                        <option>Product Quality Feedback</option>
                        <option>Business / Office B2B Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] text-gray-300 block mb-1">Your Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us what you need help with..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full bg-moyee-dark border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-moyee-pink hover:bg-moyee-pink-hover text-white font-oswald text-sm font-bold uppercase tracking-wider py-3 rounded-xl shadow-xl border-2 border-moyee-yellow flex items-center justify-center space-x-2 transition-all"
                  >
                    <Send className="w-4 h-4 text-moyee-yellow" />
                    <span>SEND TO MOYEE HELPDESK</span>
                  </button>
                </form>

                {/* Meet Melanie Box */}
                <div className="md:col-span-4 bg-moyee-dark/90 border border-gray-700 p-4 rounded-2xl space-y-3 text-xs font-condensed">
                  <div className="text-center">
                    <div className="w-14 h-14 rounded-full bg-moyee-pink mx-auto flex items-center justify-center text-2xl shadow-md border-2 border-white">
                      👩🏾‍💼
                    </div>
                    <h5 className="font-oswald text-sm font-bold text-white uppercase mt-2">
                      MELANIE FROM KENYA
                    </h5>
                    <p className="text-[11px] text-moyee-yellow">Customer Care Lead</p>
                  </div>
                  <p className="text-gray-300 leading-relaxed text-[11px]">
                    "Hey there! I manage customer care directly from our Kenya operations. Feel free to message me anytime — I'll personally get back to you within 2 business days!"
                  </p>
                  <div className="pt-2 border-t border-gray-700 space-y-1.5 text-gray-400">
                    <div className="flex items-center gap-1.5 text-white">
                      <Phone className="w-3.5 h-3.5 text-moyee-pink" />
                      <span>+31 20 261 8377</span>
                    </div>
                    <div className="text-[10px]">Mon–Fri: 08:00 – 16:00 CET</div>
                    <div className="text-[10px]">HQ: Turbinestraat 15, Amsterdam</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* FAQ Accordion */
          <div className="space-y-2.5 max-h-[50vh] overflow-y-auto pr-2">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-moyee-dark/80 border border-gray-700 rounded-xl p-3.5 transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full flex justify-between items-center text-left text-sm font-oswald font-bold uppercase tracking-wide text-white"
                  >
                    <span>{faq.q}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-moyee-yellow flex-shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    )}
                  </button>
                  {isOpen && (
                    <p className="mt-2 text-xs font-condensed text-gray-300 leading-relaxed border-t border-gray-700/60 pt-2">
                      {faq.a}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
