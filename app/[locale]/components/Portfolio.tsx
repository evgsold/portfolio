'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import InteractiveBackground from '../components/InteractiveBackground';
import { useTranslations } from 'next-intl'; // <-- Импортируем useTranslations

// Интерфейсы (без изменений)
interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  image: string;
  demoUrl: string;
  githubUrl: string;
}

interface PortfolioClientProps {
  title: string;
  intro: string;
}

// --- Локализуем компонент ProjectSection ---
function ProjectSection({ project, isEven, index }: { project: Project, isEven: boolean, index: number }) {
  const t = useTranslations('portfolio'); // <-- Получаем переводы
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const yNumber = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yImage = useTransform(scrollYProgress, [0, 1], [20, -20]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section 
      ref={sectionRef}
      className={`relative py-24 md:py-40 overflow-hidden ${isEven ? 'portfolio-section' : 'portfolio-section-alt'}`}
    >
      <motion.div 
        style={{ y: yNumber }}
        className="absolute top-10 left-1/2 -translate-x-1/2 text-[20rem] font-black text-[rgb(var(--primary))] opacity-[0.03] dark:opacity-[0.05] pointer-events-none select-none z-0"
      >
        0{index + 1}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          style={{ opacity }}
          className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center"
        >
          <motion.div 
            style={{ y: yImage }}
            className={`${isEven ? 'lg:order-2' : ''}`}
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="project-image-wrapper group relative !rounded-none"
            >
              <div className="absolute -inset-2 border-2 border-[rgb(var(--primary))] opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10 group-hover:translate-x-4 group-hover:translate-y-4" />
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={1280}
                  height={800}
                  className="project-image grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
              </a>
            </motion.div>
          </motion.div>

          <div className={`${isEven ? 'lg:order-1' : ''}`}>
            <motion.div 
              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="inline-block">
                <span className="text-[rgb(var(--primary))] font-mono text-sm tracking-widest mb-2 block">
                  {t('projectLabel')} _0{index + 1}
                </span>
                <h3 className="text-4xl md:text-5xl font-black project-title mb-4 tracking-tighter">
                  {project.title}
                </h3>
                <div className="w-20 h-2 primary-accent-bg"></div>
              </div>
              <p className="text-lg md:text-xl description-text leading-relaxed font-light">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag !rounded-none border border-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-white transition-colors duration-300">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4 pt-8">
                <motion.a 
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.demoUrl} 
                  className="button button-primary text-center !py-4 !rounded-none"
                >
                  {t('liveDemoButton')}
                </motion.a>
                <motion.a 
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.githubUrl} 
                  className="button button-secondary text-center !py-4 !rounded-none"
                >
                  {t('sourceCodeButton')}
                </motion.a>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// --- Локализуем основной компонент страницы ---
export default function PortfolioClient({ title, intro }: PortfolioClientProps) {
  const t = useTranslations('portfolio'); // <-- Получаем переводы

  // Данные проектов (описания и заголовки лучше получать с бэкенда или из CMS, но для примера оставим здесь)
  const projects = [
    { id: 1, title: 'E-Commerce Platform', description: 'A full-featured online shopping platform with payment integration and real-time inventory tracking.', technologies: ['React', 'Node.js', 'Stripe'], image: '/path-to-your-image-1.jpg', demoUrl: '#', githubUrl: '#' },
    { id: 2, title: 'Task Management App', description: 'Collaborative task management tool with real-time updates, team workspaces, and detailed analytics.', technologies: ['Next.js', 'TypeScript', 'Socket.io'], image: '/path-to-your-image-2.jpg', demoUrl: '#', githubUrl: '#' },
    { id: 3, title: 'Weather Dashboard', description: 'Beautiful weather application with interactive maps, historical data, and 7-day forecasts.', technologies: ['React', 'API', 'Chart.js'], image: '/path-to-your-image-3.jpg', demoUrl: '#', githubUrl: '#' },
  ];

  return (
    <div id="portfolio" className="relative">
      <InteractiveBackground />

      {/* Вступительная секция */}
      <div className="relative py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-6xl md:text-8xl font-black main-heading mb-6 tracking-tighter italic">
              {title}
            </h2>
            <div className="w-32 h-2 primary-accent-bg mx-auto mb-10"></div>
            <p className="text-xl md:text-2xl description-text portfolio-intro-text font-light max-w-3xl mx-auto">
              {intro}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Список проектов */}
      <div className="relative">
        {projects.map((project, index) => (
          <ProjectSection 
            key={project.id} 
            project={project} 
            index={index}
            isEven={index % 2 !== 0} 
          />
        ))}
      </div>

      {/* Декоративный футер секции */}
      <div className="relative py-20 text-center border-t border-[rgb(var(--border-color))] z-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block"
        >
          <a href="#contact" className="text-2xl font-bold text-[rgb(var(--primary))] hover:opacity-70 transition-opacity">
            {t('cta')} →
          </a>
        </motion.div>
      </div>
    </div>
  );
}