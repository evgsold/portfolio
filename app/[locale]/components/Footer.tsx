'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useRef } from 'react';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const tNav = useTranslations('navigation');
  const tHome = useTranslations('home');
  const tContact = useTranslations('contact');
  const footerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end 0.9"] // Слегка изменим offset для более раннего начала анимации
  });

  // Используем spring для более плавной анимации появления
  const y = useTransform(scrollYProgress, [0, 1], [100, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const currentYear = new Date().getFullYear();

  return (
    <footer ref={footerRef} className="site-footer relative overflow-hidden border-t border-[rgb(var(--border-color))]">
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(rgb(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--primary)) 1px, transparent 1px)', backgroundSize: '30px 30px' }} 
      />
      
      {/* --- ОПТИМИЗАЦИЯ: Добавляем will-change для аппаратного ускорения --- */}
      <motion.div 
        style={{ y, opacity }} 
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 z-10 will-change-transform will-change-opacity"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          <div className="md:col-span-2 space-y-6">
            <div className="inline-flex items-center gap-3 px-3 py-1 border border-[rgb(var(--primary))] text-[rgb(var(--primary))] font-mono text-xs uppercase tracking-widest">
              System Online / {currentYear}
            </div>
            <h3 className="text-3xl font-black footer-heading tracking-tighter uppercase italic">
              Portfolio<span className="text-[rgb(var(--primary))]">.</span>
            </h3>
            <p className="footer-text max-w-sm leading-relaxed font-light">
              {tHome('philosophy')}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[rgb(var(--primary))] mb-6">
              {tNav('menu')}
            </h4>
            <ul className="space-y-4">
              {['home', 'about', 'portfolio', 'contact'].map((item) => (
                <li key={item}>
                  {/* --- ОПТИМИЗАЦИЯ: Используем motion.a для плавного hover-эффекта --- */}
                  <motion.a 
                    href={`/${locale}/${item === 'home' ? '' : item}`} 
                    whileHover={{ x: 5 }} // Сдвиг вправо при наведении
                    transition={{ type: 'spring', stiffness: 300 }}
                    className="footer-link text-lg font-medium inline-block"
                  >
                    {tNav(item)}
                  </motion.a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-[rgb(var(--primary))] mb-6">
              {tNav('contact')}
            </h4>
            <ul className="space-y-6 footer-text">
              <li className="group cursor-pointer">
                <div className="text-[10px] uppercase tracking-widest opacity-50 mb-1">Email</div>
                <a href="mailto:evgsoldatenko@gmail.com" className="text-lg font-bold group-hover:text-[rgb(var(--primary))] transition-colors">evgsoldatenko@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-[rgb(var(--border-color))] flex flex-col md:flex-row justify-between items-center gap-4">
          {/* --- ОПТИМИЗАЦИЯ: Оборачиваем кнопку в motion для hover-эффекта --- */}
          <motion.button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} 
            whileHover={{ scale: 1.05, color: 'rgb(var(--primary))' }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 400, damping: 15 }}
            className="text-xs font-bold uppercase tracking-widest"
          >
            {tNav('backToTop')} ↑
          </motion.button>
        </div>
      </motion.div>
    </footer>
  );
}