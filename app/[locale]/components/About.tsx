'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import InteractiveBackground from '../components/InteractiveBackground'; // <-- 1. ИМПОРТИРУЕМ КОМПОНЕНТ

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
  
  // 2. УДАЛЯЕМ ВСЕ ХУКИ (useRef, useScroll, useTransform, useSpring, useEffect)
  // Они больше не нужны, так как InteractiveBackground управляет этим глобально.

  const skills = [
    'JavaScript', 'TypeScript', 'React', 'Next.js', 'Node.js', 
    'Python', 'Tailwind CSS', 'PostgreSQL', 'MongoDB', 'Git'
  ];

  return (
    <section 
      id="about" 
      className="relative py-32 overflow-hidden"
    >
      {/* --- ИНТЕРАКТИВНЫЙ ФОН --- */}
      <InteractiveBackground />

      {/* 3. УДАЛЯЕМ СТАРЫЕ ФОНОВЫЕ ЭЛЕМЕНТЫ (сетка, пятно, линия, карточка с кодом) */}

      {/* --- КОНТЕНТ (добавляем z-10, чтобы он был над фоном) --- */}
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
        
        {/* Заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          className="text-center mb-20"
        >
          <h2 className="text-5xl md:text-6xl font-black main-heading mb-6 tracking-tighter">
            {title}
          </h2>
          <motion.div 
            initial={{ width: "0%" }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="h-1.5 primary-accent-bg mx-auto max-w-[120px]"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-1 gap-16 items-center">
          
          {/* Изображение с "бруталистской" подложкой */}
          <div className="relative mx-auto">
            {/* 4. АДАПТИРУЕМ АНИМАЦИЮ РАМКИ */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -10 }}
              whileInView={{ opacity: 0.3, scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 100 }}
              viewport={{ once: true }}
              className="absolute -inset-4 border-2 border-[rgb(var(--primary))] z-0 !rounded-none"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="about-image-container !m-0 relative z-10 !rounded-none"
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

          {/* Описание */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            viewport={{ once: true }}
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
              className="text-center p-8 bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-color))] !rounded-none"
            >
              <div className="stats-number">3+</div>
              <div className="stats-label uppercase tracking-widest text-xs mt-2">{experience_label}</div>
            </motion.div>
            <motion.div 
              whileHover={{ y: -5 }}
              className="text-center p-8 bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-color))] !rounded-none"
            >
              <div className="stats-number">20+</div>
              <div className="stats-label uppercase tracking-widest text-xs mt-2">{projects_label}</div>
            </motion.div>
          </div>
        </div>

        {/* Инструментарий */}
        <div className="mt-24">
          <h3 className="section-subheading mb-12">{toolbox_title}</h3>
          <div className="flex flex-wrap gap-4 justify-center">
            {skills.map((skill, idx) => (
              <motion.span 
                key={skill}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ 
                  backgroundColor: "rgb(var(--primary))", 
                  color: "#fff",
                  scale: 1.05
                }}
                className="skill-card cursor-default !rounded-none"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}