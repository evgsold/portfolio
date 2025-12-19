'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import Portal from './Portal';

// Определяем возможные состояния разрешения для строгой типизации
type PermissionStatus = 'prompt' | 'granted' | 'denied';

// --- Основной компонент фона ---
export default function InteractiveBackground() {
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  
  // --- ИЗМЕНЕНИЕ: Используем более детальный стейт для разрешений ---
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>('prompt');
  const [requiresPermission, setRequiresPermission] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const checkDeviceAndPermissions = () => {
      const touch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0);
      setIsTouchDevice(touch);
      setIsSmallScreen(window.innerWidth < 768);

      const isIOS = typeof (DeviceOrientationEvent as any).requestPermission === 'function';
      
      if (touch && isIOS) {
        setRequiresPermission(true);
        // --- ИЗМЕНЕНИЕ: Проверяем localStorage при загрузке ---
        const storedPermission = localStorage.getItem('deviceOrientationPermission');
        if (storedPermission === 'granted') {
          setPermissionStatus('granted');
        }
      } else {
        // Для Android и десктопов разрешение не требуется, считаем его "предоставленным"
        setPermissionStatus('granted');
      }
    };

    checkDeviceAndPermissions();
    const handleResize = () => setIsSmallScreen(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const { scrollYProgress } = useScroll();
  const springConfig = { stiffness: 100, damping: 30, mass: 1 };
  
  const mouseX = useSpring(0, springConfig);
  const mouseY = useSpring(0, springConfig);
  const tiltX = useSpring(0, springConfig);
  const tiltY = useSpring(0, springConfig);

  const requestOrientationPermission = async () => {
    if (!requiresPermission) return;
    
    try {
      const permissionState = await (DeviceOrientationEvent as any).requestPermission();
      if (permissionState === 'granted') {
        setPermissionStatus('granted');
        // --- ИЗМЕНЕНИЕ: Сохраняем выбор пользователя ---
        localStorage.setItem('deviceOrientationPermission', 'granted');
      } else {
        setPermissionStatus('denied');
      }
    } catch (error) {
      console.error("Error requesting device orientation permission:", error);
      setPermissionStatus('denied');
    }
  };

  useEffect(() => {
    // Активируем гироскоп, только если разрешение было получено
    if (isTouchDevice && permissionStatus === 'granted') {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        const gamma = event.gamma || 0; // Left-to-right tilt
        const beta = event.beta || 0;  // Front-to-back tilt
        tiltX.set(Math.max(-20, Math.min(20, gamma)) * 5);
        tiltY.set(Math.max(-20, Math.min(20, beta)) * 5);
      };
      window.addEventListener('deviceorientation', handleOrientation);
      return () => window.removeEventListener('deviceorientation', handleOrientation);
    } 
    // Логика для мыши остается без изменений
    else if (!isTouchDevice) {
      const handleMouseMove = (e: MouseEvent) => {
        mouseX.set(e.clientX - window.innerWidth / 2);
        mouseY.set(e.clientY - window.innerHeight / 2);
      };
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  }, [isTouchDevice, permissionStatus, mouseX, mouseY, tiltX, tiltY]);

  const motionSourceX = isTouchDevice ? tiltX : mouseX;
  const motionSourceY = isTouchDevice ? tiltY : mouseY;

  const ySlow = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const yFast = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const shapeX = useTransform(motionSourceX, v => v * -0.1);
  const blur1X = useTransform(motionSourceX, v => v * 0.2);
  const blur2X = useTransform(motionSourceX, v => v * -0.15);
  
  const blur1Y = useTransform([motionSourceY, ySlow], (latest) => {
    const [y, slowY] = latest as [number, number];
    return y * 0.2 + slowY;
  });
  const blur2Y = useTransform([motionSourceY, ySlow], (latest) => {
    const [y, slowY] = latest as [number, number];
    return y * -0.15 + slowY;
  });

  const starCount = isSmallScreen ? 75 : 200;
  const stars = useMemo(() => {
    if (typeof window === 'undefined') return [];
    return Array.from({ length: starCount }).map(() => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * (isSmallScreen ? 1.2 : 1.5) + 0.5,
      depth: Math.random() * 0.6 + 0.2,
    }));
  }, [starCount, isSmallScreen]);

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
      if (!ctx) return;
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

  return (
    <>
      <Portal>
        {/* --- ИЗМЕНЕНИЕ: Условие показа кнопки теперь зависит от permissionStatus --- */}
        {requiresPermission && permissionStatus === 'prompt' && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ delay: 1 }}
            onClick={requestOrientationPermission}
            className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[9999] px-4 py-2 
                       bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-color))] 
                       text-xs font-bold uppercase tracking-widest text-[rgb(var(--foreground))] 
                       !rounded-none shadow-2xl"
          >
            Enable Motion
          </motion.button>
        )}
      </Portal>

      <div className="fixed inset-0 z-[-1] pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" 
             style={{ backgroundImage: 'linear-gradient(rgb(var(--primary)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--primary)) 1px, transparent 1px)', backgroundSize: '60px 60px' }} 
        />

        <canvas ref={canvasRef} className="absolute inset-0" />

        {!isSmallScreen && (
          <motion.div
            style={{ y: yFast, x: shapeX, rotate }}
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
        )}

        <motion.div 
          style={{ x: blur1X, y: blur1Y }}
          className="fixed top-1/4 left-1/4 w-96 h-96 bg-[rgb(var(--primary-rgb),0.05)] blur-[120px] !rounded-full will-change-transform"
        />
        <motion.div 
          style={{ x: blur2X, y: blur2Y }}
          className="fixed bottom-1/4 right-1/4 w-80 h-80 bg-[rgb(var(--primary-accent-rgb),0.05)] blur-[100px] !rounded-full will-change-transform"
        />
      </div>
    </>
  );
}