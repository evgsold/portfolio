import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import HeroClient from './components/Hero'; // Убедитесь, что путь правильный

interface HeroProps {
  locale: string;
}

export async function generateMetadata({ params }: { params: Promise<{locale: string}> }): Promise<Metadata> {
  const {locale} = await params;
  const t = await getTranslations('home');
  const baseUrl = 'https://portfolio-pied-pi-a0rx8b1qju.vercel.app';
  
  return {
    title: t('headline'),
    description: t('intro'),
    openGraph: {
      title: t('headline'),
      description: t('intro'),
      locale: locale,
      url: `${baseUrl}/${locale}`,
      images: [
        {
          url: `${baseUrl}/me.jpg`,
          width: 1200,
          height: 630,
          alt: t('headline'),
        },
      ],
    },
    twitter: {
      title: t('headline'),
      description: t('intro'),
      card: 'summary_large_image',
      images: [`${baseUrl}/me.jpg`],
    },
  };
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