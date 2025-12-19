'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// --- Вспомогательный компонент для "глитч"-символов (без изменений) ---
const GlitchChar = ({ char, top, left, right, bottom, duration, delay }: any) => (
  <motion.span
    animate={{ opacity: [0, 1, 1, 0, 0, 1, 0] }}
    transition={{ duration, repeat: Infinity, delay, ease: 'linear' }}
    className="fixed font-mono text-lg text-[rgb(var(--primary))] opacity-0 pointer-events-none"
    style={{ top, left, right, bottom }}
  >
    {char}
  </motion.span>
);

// --- Основной компонент фона ---
export default function InteractiveBackground() {
  const [isMobile, setIsMobile] = useState(false);

  // Определяем, мобильное ли устройство, при загрузке и изменении размера окна
  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const { scrollYProgress } = useScroll();

  // --- ОБЩИЕ ПЕРЕМЕННЫЕ ДЛЯ АНИМАЦИИ ---
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  
  // Для десктопа: отслеживание мыши
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);

  // Для мобильных: отслеживание наклона устройства
  const tiltX = useSpring(0, springConfig);
  const tiltY = useSpring(0, springConfig);

  useEffect(() => {
    // Если это десктоп, используем мышь
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    } 
    // Если это мобильное устройство, используем гироскоп
    else {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        const gamma = event.gamma || 0; // Наклон влево-вправо (-90 до 90)
        const beta = event.beta || 0;   // Наклон вперед-назад (-180 до 180)
        
        // Ограничиваем значения для плавного эффекта и умножаем для большей амплитуды
        tiltX.set(Math.max(-20, Math.min(20, gamma)) * 5);
        tiltY.set(Math.max(-20, Math.min(20, beta)) * 5);
      };
      
      // ВАЖНО: На iOS для доступа к гироскопу требуется разрешение пользователя,
      // которое запрашивается при первом взаимодействии. 
      // Этот код будет работать "из коробки" на большинстве Android.
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [isMobile, mouseX, mouseY, tiltX, tiltY]);

  // Выбираем источник движения в зависимости от типа устройства
  const motionSourceX = isMobile ? tiltX : mouseX;
  const motionSourceY = isMobile ? tiltY : mouseY;

  // Трансформации на основе скролла (работают везде)
  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Оптимизация количества звезд для мобильных
  const starCount = isMobile ? 50 : 150;
  const stars = useMemo(() => {
    return Array.from({ length: starCount }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * (isMobile ? 1.2 : 1.5) + 0.5,
      depth: Math.random() * 0.5 + 0.1,
    }));
  }, [starCount, isMobile]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      {/* --- СТАТИЧНЫЙ ФОН (работает везде) --- */}
      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(rgb(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--primary)) 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      {/* --- "Звездное поле" (адаптивное) --- */}
      <div className="absolute inset-0">
        {stars.map(star => (
          <motion.div
            key={star.id}
            className="absolute bg-[rgb(var(--primary))] !rounded-full"
            style={{
              width: star.size,
              height: star.size,
              top: `${star.y}%`,
              left: `${star.x}%`,
              x: useTransform(motionSourceX, v => v * star.depth),
              y: useTransform(motionSourceY, v => v * star.depth),
            }}
          />
        ))}
      </div>

      {/* --- ЭЛЕМЕНТЫ ТОЛЬКО ДЛЯ ДЕСКТОПА --- */}
      {/* {!isMobile && (
        <>
          <motion.div 
            style={{ 
              x: useTransform(useSpring(motionSourceX, { stiffness: 300, damping: 30 }), v => v + window.innerWidth / 2 - 16), 
              y: useTransform(useSpring(motionSourceY, { stiffness: 300, damping: 30 }), v => v + window.innerHeight / 2 - 16) 
            }}
            className="fixed top-0 left-0 w-8 h-8 border-2 border-[rgb(var(--primary))] z-[999] !rounded-none"
          />
          <svg className="absolute inset-0 w-full h-full opacity-20">
            <motion.line
              x1="0" y1="0"
              x2={useTransform(motionSourceX, v => v + window.innerWidth / 2)} 
              y2={useTransform(motionSourceY, v => v + window.innerHeight / 2)}
              stroke="rgb(var(--primary))"
              strokeWidth="1"
            />
          </svg>
        </>
      )} */}

      {/* --- "Глитч"-символы (работают везде, т.к. легковесные) --- */}
      {/* <div className="hidden lg:block">
        <GlitchChar char="0xFA" top="5%" left="5%" duration={5} delay={0.5} />
        <GlitchChar char="//_" bottom="10%" left="2%" duration={7} delay={1.2} />
        <GlitchChar char="[SYS]" top="8%" right="4%" duration={6} delay={0.8} />
        <GlitchChar char="C:/ >" bottom="8%" right="3%" duration={4} delay={0.2} />
      </div> */}

      {/* --- ПЛАВАЮЩИЕ ЭЛЕМЕНТЫ (адаптивные) --- */}
      <motion.div 
        style={{ x: useTransform(motionSourceX, v => v * 0.2), y: useTransform(motionSourceY, v => v * 0.2 + ySlow.get()) }}
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-[rgb(var(--primary-rgb),0.05)] blur-[120px] !rounded-full"
      />
      <motion.div 
        style={{ x: useTransform(motionSourceX, v => v * -0.15), y: useTransform(motionSourceY, v => v * -0.15 + ySlow.get()) }}
        className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-[rgb(var(--primary-accent-rgb),0.05)] blur-[100px] !rounded-full"
      />
      <motion.div
        style={{ y: yFast, x: useTransform(motionSourceX, v => v * -0.1), rotate }}
        className="fixed top-[15%] right-[8%] opacity-20 hidden lg:block"
      >
        <div className="relative w-56 h-56">
          <div className="absolute w-full h-full border-2 border-[rgb(var(--primary))] !rounded-none" />
          <motion.div 
            animate={{ rotate: -45 }}
            className="absolute top-4 left-4 w-24 h-24 border border-[rgb(var(--primary))] !rounded-none" 
          />
          <div className="absolute bottom-0 right-0 w-px h-24 bg-[rgb(var(--primary))]" />
          <div className="absolute top-0 left-0 w-24 h-px bg-[rgb(var(--primary))]" />
        </div>
      </motion.div>
    </div>
  );
}