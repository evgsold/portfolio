'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import InteractiveBackground from '../components/InteractiveBackground';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

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

// --- УЛУЧШЕННЫЙ КОМПОНЕНТ ProjectSection С МОБИЛЬНОЙ АДАПТАЦИЕЙ ---
function ProjectSection({ project, isEven, index }: { project: Project, isEven: boolean, index: number }) {
  const t = useTranslations('portfolio');
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
      className={`relative overflow-hidden
                 md:py-40 ${isEven ? 'md:portfolio-section' : 'md:portfolio-section-alt'}
                 py-16`}
    >
      {/* --- ИЗМЕНЕНИЕ: Адаптируем размер и позицию номера для мобильных --- */}
      <motion.div
        style={{ y: yNumber }}
        className="absolute top-4 md:top-10 left-1/2 -translate-x-1/2
                   text-[10rem] md:text-[20rem]  // <-- Адаптивный размер шрифта
                   font-black text-[rgb(var(--primary))]
                   opacity-[0.03] dark:opacity-[0.05]
                   pointer-events-none select-none z-0"
      >
        0{index + 1}
      </motion.div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          style={{ opacity }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-24 items-center"
        >
          <motion.div
            style={{ y: yImage }}
            className={`lg:order-${isEven ? '2' : '1'}`}
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="project-image-wrapper group relative !rounded-none"
            >
              <div className="absolute -inset-2 border-2 border-[rgb(var(--primary))] opacity-0 group-hover:opacity-30 transition-all duration-500 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 hidden md:block" />
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="block overflow-hidden border border-[rgb(var(--border-color))]">
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

          <div className={`lg:order-${isEven ? '1' : '2'}`}>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true, amount: 0.3 }}
              className="space-y-4 md:space-y-6"
            >
              <div className="inline-block">
                <span className="text-[rgb(var(--primary))] font-mono text-xs md:text-sm tracking-widest mb-2 block">
                  {t('projectLabel')} _0{index + 1}
                </span>
                <h3 className="text-3xl md:text-5xl font-black project-title mb-4 tracking-tighter">
                  {project.title}
                </h3>
                <div className="w-20 h-1 md:h-2 primary-accent-bg"></div>
              </div>
              <p className="text-base md:text-xl description-text leading-relaxed font-light">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tech-tag !rounded-none border border-[rgb(var(--primary))] bg-transparent hover:bg-[rgb(var(--primary))] hover:text-white transition-colors duration-300">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row gap-4 pt-6">
                <motion.a
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.demoUrl}
                  className="button button-primary text-center !py-3 md:!py-4 !rounded-none"
                >
                  {t('liveDemoButton')}
                </motion.a>
                <motion.a
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  href={project.githubUrl}
                  className="button button-secondary text-center !py-3 md:!py-4 !rounded-none"
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

// Основной компонент страницы
export default function PortfolioClient({ title, intro }: PortfolioClientProps) {
  const t = useTranslations('portfolio');

  const projects = [
    {
      id: 1,
      title: t('project1_title'),
      description: t('project1_desc'),
      technologies: ['Next.js', 'TypeScript', 'Firebase Auth', 'Firestore', 'Tailwind CSS'],
      image: '/projects/charming.png',
      demoUrl: 'https://charming.by',
      githubUrl: 'https://github.com/evgsold/beauty'
    },
    {
      id: 2,
      title: t('project2_title'),
      description: t('project2_desc'),
      technologies: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Framer Motion'],
      image: '/projects/3dfabriq.png',
      demoUrl: 'https://3dfabriq.store',
      githubUrl: 'https://github.com/evgsold/luxe'
    },
    {
      id: 3,
      title: t('project3_title'),
      description: t('project3_desc'),
      technologies: ['Next.js', 'TypeScript', 'Firebase Hosting', 'GSAP', 'Framer Motion'],
      image: '/projects/danik-portfolio.png',
      demoUrl: 'https://fluffy-goggles-three.vercel.app/',
      githubUrl: 'https://github.com/evgsold/fluffy-goggles'
    },
    {
      id: 4,
      title: t('project4_title'),
      description: t('project4_desc'),
      technologies: ['Next.js', 'TypeScript', 'Firebase', 'Tailwind CSS'],
      image: '/projects/nasty-portfolio.png',
      demoUrl: 'https://nasty-portfolio.vercel.app/',
      githubUrl: 'https://github.com/evgsold/Nasty-portfolio'
    }
  ];

  return (
    <div id="portfolio" className="relative">
      <InteractiveBackground />

      <div className="relative py-24 md:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-8xl font-black main-heading mb-6 tracking-tighter italic">
              {title}
            </h2>
            <div className="w-32 h-2 primary-accent-bg mx-auto mb-10"></div>
            <p className="text-lg md:text-2xl description-text portfolio-intro-text font-light max-w-3xl mx-auto">
              {intro}
            </p>
          </motion.div>
        </div>
      </div>

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

      <div className="relative py-20 text-center z-10">
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="inline-block"
        >
          <Link href="/contact" className="text-2xl font-bold text-[rgb(var(--primary))] hover:opacity-70 transition-opacity">
            {t('cta')} →
          </Link>
        </motion.div>
      </div>
    </div>
  );
}