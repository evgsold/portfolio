'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

// --- Вспомогательные компоненты (без изменений) ---
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
  const [permissionGranted, setPermissionGranted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const checkDevice = () => setIsMobile(window.innerWidth < 768);
    checkDevice();
    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  const { scrollYProgress } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  const tiltX = useSpring(0, springConfig);
  const tiltY = useSpring(0, springConfig);

  // --- НОВИНКА: Функция для запроса разрешений на iOS ---
  const requestOrientationPermission = async () => {
    // Проверяем, существует ли функция (только на iOS 13+)
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      try {
        const permissionState = await (DeviceOrientationEvent as any).requestPermission();
        if (permissionState === 'granted') {
          setPermissionGranted(true);
        }
      } catch (error) {
        console.error("Error requesting device orientation permission:", error);
      }
    } else {
      // Для Android и старых iOS, где разрешение не требуется
      setPermissionGranted(true);
    }
  };

  useEffect(() => {
    if (!isMobile) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    } 
    // --- ИЗМЕНЕНИЕ: Добавляем обработчик только ПОСЛЕ получения разрешения ---
    else if (isMobile && permissionGranted) {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        const gamma = event.gamma || 0;
        const beta = event.beta || 0;
        tiltX.set(Math.max(-20, Math.min(20, gamma)) * 5);
        tiltY.set(Math.max(-20, Math.min(20, beta)) * 5);
      };
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    }
  }, [isMobile, permissionGranted, mouseX, mouseY, tiltX, tiltY]);

  const motionSourceX = isMobile ? tiltX : mouseX;
  const motionSourceY = isMobile ? tiltY : mouseY;

  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const starCount = isMobile ? 75 : 200;
  const stars = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: starCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * (isMobile ? 1.2 : 1.5) + 0.5,
      depth: Math.random() * 0.6 + 0.2,
    }));
  }, [starCount, isMobile]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(); 
    };

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = `rgb(${getComputedStyle(document.documentElement).getPropertyValue('--primary')})`;
      stars.forEach(star => {
        const offsetX = motionSourceX.get() * star.depth;
        const offsetY = motionSourceY.get() * star.depth;
        let x = (star.x + offsetX) % canvas.width;
        let y = (star.y + offsetY) % canvas.height;
        if (x < 0) x += canvas.width;
        if (y < 0) y += canvas.height;
        ctx.beginPath();
        ctx.arc(x, y, star.size, 0, 2 * Math.PI);
        ctx.fill();
      });
    };

    const unsubscribeX = motionSourceX.on("change", render);
    const unsubscribeY = motionSourceY.on("change", render);

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    return () => {
      unsubscribeX();
      unsubscribeY();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [stars, motionSourceX, motionSourceY]);

  const cursorX = useSpring(-100, { stiffness: 300, damping: 30 });
  const cursorY = useSpring(-100, { stiffness: 300, damping: 30 });
  useEffect(() => {
    if (!isMobile) {
      const moveCursor = (e: MouseEvent) => {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      };
      window.addEventListener('mousemove', moveCursor);
      return () => window.removeEventListener('mousemove', moveCursor);
    }
  }, [isMobile, cursorX, cursorY]);

  return (
    <div className="fixed inset-0 z-[-1] pointer-events-none">
      {/* --- НОВИНКА: Кнопка для запроса разрешений на мобильных --- */}
      {isMobile && !permissionGranted && (
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          onClick={requestOrientationPermission}
          // Стилизуем кнопку, чтобы она была заметной, но не навязчивой
          className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 
                     bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-color))] 
                     text-xs font-bold uppercase tracking-widest text-[rgb(var(--foreground))] 
                     pointer-events-auto !rounded-none"
        >
          Enable Motion
        </motion.button>
      )}

      <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
           style={{ backgroundImage: 'linear-gradient(rgb(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--primary)) 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
      />

      <canvas ref={canvasRef} className="absolute inset-0" />

      <motion.div 
        style={{ x: useTransform(motionSourceX, v => v * 0.2), y: useTransform(motionSourceY, v => v * 0.2 + ySlow.get()) }}
        className="fixed top-1/4 left-1/4 w-96 h-96 bg-[rgb(var(--primary-rgb),0.05)] blur-[120px] !rounded-full will-change-transform"
      />
      <motion.div 
        style={{ x: useTransform(motionSourceX, v => v * -0.15), y: useTransform(motionSourceY, v => v * -0.15 + ySlow.get()) }}
        className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-[rgb(var(--primary-accent-rgb),0.05)] blur-[100px] !rounded-full will-change-transform"
      />
      <motion.div
        style={{ y: yFast, x: useTransform(motionSourceX, v => v * -0.1), rotate }}
        className="fixed top-[15%] right-[8%] opacity-20 hidden lg:block will-change-transform"
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