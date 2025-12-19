'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

export default function Navigation({ locale }: { locale: string }) {
  const t = useTranslations('navigation');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'auto';
  }, [isMenuOpen]);

  const switchLanguage = (newLocale: string) => {
    const newPath = pathname.replace(`/${locale}`, `/${newLocale}`);
    router.push(newPath);
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    const currentPath = pathname.endsWith('/') ? pathname.slice(0, -1) : pathname;
    const targetPath = `/${locale}${path}`;
    return currentPath === targetPath;
  };

  const navLinks = [
    { name: t('home'), path: '' },
    { name: t('about'), path: '/about' },
    { name: t('portfolio'), path: '/portfolio' },
    { name: t('contact'), path: '/contact' },
  ];

  // --- ИСПРАВЛЕНИЕ: Убираем 'transition' из вариантов, оставляем только оркестровку ---
  const menuVariants = {
    closed: {
      x: '100%',
    },
    open: {
      x: 0,
      // Оркестровка дочерних элементов остается здесь, это правильно
      transition: {
        staggerChildren: 0.07,
        delayChildren: 0.2,
      }
    }
  };

  const linkVariants = {
    closed: { x: 50, opacity: 0 },
    open: { x: 0, opacity: 1 }
  };

  return (
    <>
      <nav 
        className={`glass-navbar fixed top-0 left-0 right-0 z-[100] ${
          isScrolled ? 'scrolled' : ''
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link href={`/${locale}`} className="relative group flex items-center justify-center w-12 h-12 border-2 border-[rgb(var(--primary))] font-black text-xl">
                <span className="relative z-10">SE</span>
                <div className="absolute inset-0 bg-[rgb(var(--primary))] translate-x-1 translate-y-1 -z-10 group-hover:translate-x-0 group-hover:translate-y-0 transition-transform" />
              </Link>
            </motion.div>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  href={`/${locale}${link.path}`}
                  className={`relative px-4 py-2 text-sm font-bold uppercase tracking-widest transition-colors ${
                    isActive(link.path) ? 'text-[rgb(var(--primary))]' : 'hover:text-[rgb(var(--primary))]'
                  }`}
                >
                  {link.name}
                  {isActive(link.path) && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[rgb(var(--primary))]"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
              
              <div className="h-6 w-px bg-[rgb(var(--border-color))] mx-4" />

              <div className="flex items-center gap-2">
                <div className="flex border border-[rgb(var(--border-color))] p-1">
                  {['en', 'ru'].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => switchLanguage(lang)}
                      className={`px-2 py-1 text-[10px] font-bold transition-colors ${
                        locale === lang ? 'bg-[rgb(var(--primary))] text-white' : 'hover:bg-[rgb(var(--primary-rgb),0.1)]'
                      }`}
                    >
                      {lang.toUpperCase()}
                    </button>
                  ))}
                </div>

                <button 
                  onClick={toggleTheme}
                  className="p-2 border border-[rgb(var(--border-color))] hover:bg-[rgb(var(--primary-rgb),0.1)] transition-colors"
                >
                  {theme === 'light' ? (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" /></svg>
                  ) : (
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" /></svg>
                  )}
                </button>
              </div>
            </div>

            <div className="md:hidden flex items-center">
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="relative w-10 h-10 flex flex-col items-center justify-center gap-1.5 z-[110]"
              >
                <motion.span 
                  animate={isMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 primary-accent-bg block will-change-transform" 
                />
                <motion.span 
                  animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 primary-accent-bg block will-change-opacity" 
                />
                <motion.span 
                  animate={isMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 primary-accent-bg block will-change-transform" 
                />
              </button>
            </div>
          </div>
        </div>

        <motion.div 
          className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(var(--primary))] origin-left will-change-transform"
          style={{ scaleX }}
        />
      </nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            // --- ИСПРАВЛЕНИЕ: Добавляем 'transition' как отдельный пропс сюда ---
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[105] bg-[rgb(var(--card-bg))] flex flex-col will-change-transform"
            onClick={() => setIsMenuOpen(false)}
          >
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
                 style={{ backgroundImage: 'linear-gradient(rgb(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--primary)) 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
            />

            <div className="relative flex-1 flex flex-col justify-center px-8">
              <div className="space-y-8">
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    variants={linkVariants}
                  >
                    <Link 
                      href={`/${locale}${link.path}`}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-5xl font-black uppercase tracking-tighter block ${
                        isActive(link.path) ? 'text-[rgb(var(--primary))]' : 'text-foreground'
                      }`}
                    >
                      {link.name}
                      {isActive(link.path) && <span className="text-[rgb(var(--primary))]">.</span>}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-20 pt-10 border-t border-[rgb(var(--border-color))] flex justify-between items-end">
                <div className="space-y-4">
                  <p className="text-xs font-bold uppercase tracking-widest text-[rgb(var(--muted-fg))]">{t('language')}</p>
                  <div className="flex gap-4">
                    {['en', 'ru'].map((lang) => (
                      <button 
                        key={lang}
                        onClick={() => switchLanguage(lang)}
                        className={`text-2xl font-black ${locale === lang ? 'text-[rgb(var(--primary))]' : 'opacity-30'}`}
                      >
                        {lang.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={toggleTheme}
                  className="w-16 h-16 border-2 border-[rgb(var(--border-color))] flex items-center justify-center"
                >
                  {theme === 'light' ? 'DARK' : 'LIGHT'}
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}