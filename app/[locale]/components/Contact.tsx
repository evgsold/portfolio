'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InteractiveBackground from '../components/InteractiveBackground';

interface ContactClientProps {
  title: string;
  intro: string;
  name_label: string;
  email_label: string;
  message_label: string;
  send_button: string;
  sending_button: string;
  success_title: string;
  success_text: string;
  direct_contact_title: string;
  social_title: string;
  email: string;
  phone: string;
  location: string;
  location_value: string;
}

export default function ContactClient({
  title, intro, name_label, email_label, message_label, send_button, sending_button,
  success_title, success_text, direct_contact_title, social_title, email, phone, location, location_value
}: ContactClientProps) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  };

  const socialLinks = [
    { name: 'Github', url: 'https://github.com/evgsold' },
    { name: 'LinkedIn', url: 'https://linkedin.com/in/евгений-солдатенко-365301334' },
    { name: 'Instagram', url: 'https://www.instagram.com/evg_sold/' },
    { name: 'Telegram', url: 'https://t.me/evg_sold' }
  ];

  return (
    <section 
      id="contact" 
      className="relative overflow-hidden min-h-screen flex flex-col justify-center py-20 md:py-0"
    >
      <InteractiveBackground />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 z-10 w-full">
        
        {/* Заголовок */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl md:text-7xl font-black main-heading mb-6 tracking-tighter italic">
            {title}
          </h2>
          <div className="w-24 h-2 primary-accent-bg mx-auto mb-8"></div>
          <p className="text-lg md:text-xl description-text max-w-2xl mx-auto font-light">
            {intro}
          </p>
        </motion.div>

        {/* Форма и Успех */}
        <div className="relative mb-16 md:mb-24">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                className="success-message !rounded-none border-2 border-[rgb(var(--primary))] p-8 md:p-12 text-center bg-[rgb(var(--card-bg))]"
              >
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="w-16 h-16 bg-[rgb(var(--primary))] mx-auto mb-6 flex items-center justify-center text-white text-3xl !rounded-none"
                >
                  ✓
                </motion.div>
                <h3 className="text-xl md:text-2xl font-bold success-message-title mb-4">{success_title}</h3>
                <p className="success-message-text text-base md:text-lg">{success_text}</p>
              </motion.div>
            ) : (
              <motion.div
                key="form"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                className="bg-[rgb(var(--card-bg))] border border-[rgb(var(--border-color))] p-6 md:p-12 shadow-2xl relative !rounded-none"
              >
                <div className="absolute -top-1 -left-1 w-8 h-8 border-t-4 border-l-4 border-[rgb(var(--primary))]" />
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="form-label uppercase tracking-widest text-xs font-bold">{name_label}</label>
                      <input 
                        type="text" id="name" name="name" value={formData.name} onChange={handleChange} required 
                        className="form-input !rounded-none focus:border-[rgb(var(--primary))] transition-colors" 
                        placeholder={name_label} 
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="form-label uppercase tracking-widest text-xs font-bold">{email_label}</label>
                      <input 
                        type="email" id="email" name="email" value={formData.email} onChange={handleChange} required 
                        className="form-input !rounded-none focus:border-[rgb(var(--primary))] transition-colors" 
                        placeholder="email@example.com" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="form-label uppercase tracking-widest text-xs font-bold">{message_label}</label>
                    <textarea 
                      id="message" name="message" value={formData.message} onChange={handleChange} required rows={5} 
                      className="form-input !rounded-none resize-none focus:border-[rgb(var(--primary))] transition-colors" 
                      placeholder={message_label}
                    />
                  </div>
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit" 
                    disabled={isSubmitting} 
                    className="button button-primary w-full !rounded-none !py-4 md:!py-5 text-base md:text-lg uppercase tracking-widest font-black disabled:opacity-50"
                  >
                    {isSubmitting ? sending_button : send_button}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Прямые контакты */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 border-t border-[rgb(var(--border-color))] pt-12 md:pt-16">
          {[
            { label: email, value: 'evgsoldatenko@gmail.com', href: 'mailto:evgsoldatenko@gmail.com' },
            { label: phone, value: '+372 (29) 112 77 43', href: 'tel:+375291127743' },
            { label: location, value: location_value, href: null }
          ].map((item, idx) => (
            <motion.div 
              key={idx}
              whileHover={{ y: -5 }}
              className="text-center"
            >
              <div className="text-[rgb(var(--primary))] font-mono text-xs mb-2 uppercase tracking-tighter">[{item.label}]</div>
              {item.href ? (
                <a href={item.href} className="text-lg md:text-xl font-bold hover:text-[rgb(var(--primary))] transition-colors">{item.value}</a>
              ) : (
                <p className="text-lg md:text-xl font-bold">{item.value}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* --- ОБНОВЛЕННЫЙ БЛОК СОЦИАЛЬНЫХ СЕТЕЙ --- */}
        <div className="mt-16 md:mt-24 mb-16 md:mb-24 text-center">
          <h3 className="section-subheading !mb-8">{social_title}</h3>
          
          {/* 
            flex-wrap: разрешает перенос элементов на новую строку
            gap-x-6: горизонтальный отступ между элементами
            gap-y-4: вертикальный отступ, который появится при переносе
          */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-4">
            {socialLinks.map((social) => (
              <motion.a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, color: 'rgb(var(--primary))' }} // Убрали y: -10, чтобы скачок был менее резким
                className="text-sm uppercase tracking-[0.2em] font-bold border-b-2 border-transparent hover:border-[rgb(var(--primary))] pb-1 transition-all"
              >
                {social.name}
              </motion.a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}