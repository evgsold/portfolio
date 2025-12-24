import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import AboutClient from '../components/About';
import Breadcrumbs from '../components/Breadcrumbs';
import AboutStructuredData from '../components/AboutStructuredData';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations('about');
  const baseUrl = 'https://portfolio-pied-pi-a0rx8b1qju.vercel.app';
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: ['about', 'portfolio', 'developer', 'experience', 'skills', 'Евгений Солдатенко'],
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `${baseUrl}/${locale}/about`,
      locale: locale,
      images: [
        {
          url: `${baseUrl}/me.jpg`,
          width: 1200,
          height: 630,
          alt: t('title'),
        },
      ],
    },
    twitter: {
      title: t('title'),
      description: t('description'),
      card: 'summary_large_image',
      images: [`${baseUrl}/me.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/about`,
      languages: {
        'en': `${baseUrl}/en/about`,
        'ru': `${baseUrl}/ru/about`,
      },
    },
  };
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('about');

  // Загружаем все необходимые строки
  const aboutData = {
    title: t('title'),
    description: t('description'),
    journey_title: t('journey_title'),
    experience_label: t('experience_label'),
    projects_label: t('projects_label'),
    toolbox_title: t('toolbox_title'),
  };

  return (
    <>
      <AboutStructuredData 
        locale={locale} 
        title={aboutData.title}
        description={aboutData.description}
      />
      {/* <Breadcrumbs 
        locale={locale} 
        items={[{ name: t('title'), href: `/${locale}/about` }]}
      /> */}
      <AboutClient {...aboutData} />
    </>
  );
}