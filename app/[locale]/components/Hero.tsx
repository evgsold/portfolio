'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import InteractiveBackground from '../components/InteractiveBackground';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

interface HeroClientProps {
  locale: string;
  headline: string;
  intro: string;
  philosophy: string;
  skill1_title: string;
  skill1_desc: string;
  skill2_title: string;
  skill2_desc: string;
  skill3_title: string;
  skill3_desc: string;
}

export default function HeroClient({ 
  locale, headline, intro, philosophy, 
  skill1_title, skill1_desc, 
  skill2_title, skill2_desc, 
  skill3_title, skill3_desc 
}: HeroClientProps) {
  // --- Инициализация переводов для каждой секции ---
  const tHome = useTranslations('home');
  const tAbout = useTranslations('about');
  const tPortfolio = useTranslations('portfolio');
  const tContact = useTranslations('contact');
  
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"]
  });

  const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth - 0.5) * 40);
      mouseY.set((e.clientY / window.innerHeight - 0.5) * 40);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Данные для тизеров (технологии остаются без перевода)
  const featuredProjects = [
    { id: 1, title: 'E-Commerce', tech: 'Next.js / Stripe' },
    { id: 2, title: 'Analytics App', tech: 'React / D3.js' },
  ];

  const skills = ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Tailwind'];

  return (
    <div ref={targetRef} className="relative">
      <InteractiveBackground />

      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex flex-col justify-center overflow-hidden py-20 z-10">
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black hero-heading mb-8 tracking-tighter italic"
          >
            {headline}
          </motion.h1>
          <p className="text-xl md:text-2xl hero-subheading mb-12 font-light max-w-3xl mx-auto leading-relaxed">
            {intro}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href={`/${locale}/portfolio`} className="button button-primary min-w-[200px] !rounded-none">
              {tPortfolio('title')}
            </Link>
            <Link href={`/${locale}/about`} className="button button-secondary min-w-[200px] !rounded-none">
              {tAbout('title')}
            </Link>
          </div>
        </div>
      </section>

      {/* --- BRIEF ABOUT (TOOLBOX) --- */}
      <section className="relative py-24 overflow-hidden z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter">
                {tAbout('title')}
              </h2>
              <p className="description-text text-lg mb-8 leading-relaxed">
                {philosophy}
              </p>
              <div className="flex gap-8">
                <div>
                  <div className="stats-number text-4xl font-black">3+</div>
                  <div className="stats-label text-xs uppercase tracking-widest">{tAbout('experience_label')}</div>
                </div>
                <div>
                  <div className="stats-number text-4xl font-black">20+</div>
                  <div className="stats-label text-xs uppercase tracking-widest">{tAbout('projects_label')}</div>
                </div>
              </div>
            </motion.div>

            <div className="flex flex-wrap gap-3 justify-center md:justify-end">
              {skills.map((skill) => (
                <motion.span 
                  key={skill}
                  whileHover={{ y: -5, backgroundColor: 'rgb(var(--primary))', color: '#fff' }}
                  className="skill-card !rounded-none border border-[rgb(var(--border-color))] px-6 py-3 font-bold uppercase tracking-widest text-sm"
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURED PORTFOLIO --- */}
      <section className="relative py-24 bg-[rgb(var(--card-bg))] border-y border-[rgb(var(--border-color))] z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter">{tPortfolio('title')}</h2>
            <Link href={`/${locale}/portfolio`} className="text-[rgb(var(--primary))] font-bold hover:underline uppercase tracking-widest text-sm">
              {/* Локализация для "All Projects →" */}
              Все проекты →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <motion.div 
                key={project.id}
                whileHover={{ y: -10 }}
                className="project-image-wrapper group relative !rounded-none border border-[rgb(var(--border-color))]"
              >
                <div className="aspect-video overflow-hidden bg-[rgb(var(--border-color))]" />
                <div className="p-6 bg-[rgb(var(--card-bg))]">
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-xs text-[rgb(var(--primary))] font-mono uppercase tracking-widest">{project.tech}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- QUICK CONTACT --- */}
      <section className="relative py-32 text-center overflow-hidden z-10">
        <motion.div 
          style={{ y: useTransform(scrollYProgress, [0.8, 1], [0, -100]) }}
          className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32 bg-gradient-to-b from-[rgb(var(--primary))] to-transparent"
        />
        
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter italic">
            {tContact('title')}
          </h2>
          <p className="text-lg description-text mb-12">
            {tContact('intro')}
          </p>
          <Link href={`/${locale}/contact`} className="button button-primary !py-6 !px-12 text-xl !rounded-none uppercase tracking-[0.2em] font-black">
            {tContact('send_button')}
          </Link>
        </div>
      </section>
    </div>
  );
}