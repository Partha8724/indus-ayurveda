import { motion } from 'motion/react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="bg-luxury-black border-t border-white/10 pt-20 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-1 md:col-span-2 lg:col-span-1"
          >
            <div className="mb-6"><Logo size="lg" /></div>
            <p className="text-gray-400 font-light text-sm mb-6 max-w-sm border-l border-luxury-gold pl-4">
              Where scientific precision meets uncompromising holistic wellness.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Apothecary</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Daily Supplements</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Advanced Skincare</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Detox & Cleanses</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Bundle Kits</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Client Services</h4>
            <ul className="space-y-4 text-gray-400 text-sm font-light">
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Contact a Specialist</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Track your Order</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Returns & Guarantees</a></li>
              <li><a href="#" className="hover:text-luxury-gold transition-colors">Subscription Portal</a></li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-white uppercase tracking-widest text-xs font-bold mb-6">Exclusive Newsletter</h4>
            <p className="text-gray-400 text-sm font-light mb-4">
              Subscribe to receive updates on private sales and exceptional creations.
            </p>
            <form className="flex border-b border-gray-600 pb-2">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-transparent border-none outline-none text-white text-sm w-full placeholder:text-gray-600 font-light"
              />
              <button type="submit" className="text-luxury-gold uppercase text-xs font-bold hover:text-white transition-colors">
                Join
              </button>
            </form>
          </motion.div>

        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center border-t border-white/10 pt-8 mt-8"
        >
          <p className="text-gray-500 text-xs text-center md:text-left uppercase tracking-wider">
            &copy; {new Date().getFullYear()} Indus Ayurveda Private Limited. All Rights Reserved.
          </p>
          <div className="flex justify-center md:justify-end gap-6 text-gray-500 text-xs uppercase tracking-wider">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Accessibility</a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
