'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import InteractiveBackground from '../components/InteractiveBackground';

interface AboutClientProps {
  title: string;
  description: string;
  journey_title: string;
  experience_label: string;
  projects_label: string;
  toolbox_title: string;
}

export default function AboutClient({ 
  title, description, journey_title, 
  experience_label, projects_label, toolbox_title 
}: AboutClientProps) {
  
  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
    'Python', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Git'
  ];

  const toolboxContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.07,
      },
    },
  };

  const skillCardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section 
      id="about" 
      className="relative py-32 overflow-hidden"
    >
      <InteractiveBackground />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }} // Можно немного ускорить
          viewport={{ once: true, amount: 0.5 }}
          // --- ОПТИМИЗАЦИЯ: Добавляем will-change ---
          className="text-center mb-20 will-change-transform"
        >
          <h2 className="text-5xl md:text-6xl font-black main-heading mb-6 tracking-tighter">
            {title}
          </h2>
          <motion.div 
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="h-1.5 primary-accent-bg mx-auto max-w-[120px]"
          />
        </motion.div>

        {/* Изображение и Описание */}
        <div className="grid grid-cols-1 md:grid-cols-1 gap-16 items-center">
          <div className="relative mx-auto">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 0.3, scale: 1, rotate: 0 }}
              // --- ОПТИМИЗАЦИЯ: Улучшаем пружинную анимацию ---
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              viewport={{ once: true, amount: 0.5 }}
              // --- ОПТИМИЗАЦИЯ: Добавляем will-change ---
              className="absolute -inset-4 border-2 border-[rgb(var(--primary))] z-0 !rounded-none will-change-transform"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, amount: 0.5 }}
              // --- ОПТИМИЗАЦИЯ: Добавляем will-change ---
              className="about-image-container !m-0 relative z-10 !rounded-none will-change-transform"
            >
              <Image
                src="/me.jpg" 
                alt="Portrait"
                width={400}
                height={400}
                className="grayscale hover:grayscale-0 transition-all duration-700"
              />
            </motion.div>
          </div>
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            viewport={{ once: true, amount: 0.8 }} // Текст должен быть почти полностью видим для анимации
            className="text-center"
          >
            <p className="text-xl md:text-2xl description-text leading-relaxed font-light italic">
              "{description}"
            </p>
          </motion.div>
        </div>

        {/* Статистика */}
        <div className="mt-24 pt-16 border-t border-[rgb(var(--border-color))]">
          <h3 className="section-subheading mb-12">{journey_title}</h3>
          <div className="grid grid-cols-2 gap-8 max-w-2xl mx-auto">
            <motion.div 
              whileHover={{ y: -5 }}
              // --- ОПТИМИЗАЦИЯ: Добавляем will-change для плавной анимации при наведении ---
              className="text-center p-8 bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-color))] !rounded-none will-change-transform"
            >
              <div className="stats-number">3+</div>
              <div className="stats-label uppercase tracking-widest text-xs mt-2">{experience_label}</div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-8 bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-color))] !rounded-none will-change-transform"
            >
              <div className="stats-number">20+</div>
              <div className="stats-label uppercase tracking-widest text-xs mt-2">{projects_label}</div>
            </motion.div>
          </div>
        </div>

        {/* Инструментарий */}
        <div className="mt-24">
          <h3 className="section-subheading mb-12">{toolbox_title}</h3>
          
          <motion.div 
            className="flex flex-wrap gap-4 justify-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            variants={toolboxContainerVariants}
          >
            {skills.map((skill) => (
              <motion.div 
                key={skill}
                variants={skillCardVariants}
                // --- ОПТИМИЗАЦИЯ: Улучшаем пружинную анимацию ---
                transition={{ type: 'spring', stiffness: 100, damping: 15 }}
                whileHover={{ 
                  backgroundColor: "rgb(var(--primary))", 
                  color: "#fff",
                  y: -5
                }}
                // --- ОПТИМИЗАЦИЯ: Добавляем will-change ---
                className="skill-card cursor-default !rounded-none will-change-transform"
              >
                {skill}
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}