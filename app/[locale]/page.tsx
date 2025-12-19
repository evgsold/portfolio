import { getTranslations } from 'next-intl/server';
import HeroClient from './components/Hero'; // Убедитесь, что путь правильный

interface HeroProps {
  locale: string;
}

export default async function Hero({ locale }: HeroProps) {
  // Указываем, что переводы берем из секции 'home'
  const t = await getTranslations('home');

  // Загружаем все необходимые строки для повествования
  const heroData = {
    locale: locale,
    headline: t('headline'),
    intro: t('intro'),
    philosophy: t('philosophy'),
    skill1_title: t('skill1_title'),
    skill1_desc: t('skill1_desc'),
    skill2_title: t('skill2_title'),
    skill2_desc: t('skill2_desc'),
    skill3_title: t('skill3_title'),
    skill3_desc: t('skill3_desc'),
  };

  // Рендерим клиентский компонент, передавая все данные
  return <HeroClient {...heroData} />;
}