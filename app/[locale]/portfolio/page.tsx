import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import PortfolioClient from '../components/Portfolio';
import Breadcrumbs from '../components/Breadcrumbs';
import PortfolioStructuredData from '../components/PortfolioStructuredData';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations('portfolio');
  const baseUrl = 'https://portfolio-pied-pi-a0rx8b1qju.vercel.app';
  
  return {
    title: t('title'),
    description: t('intro'),
    keywords: ['portfolio', 'projects', 'web development', 'React', 'Next.js', 'TypeScript', 'Евгений Солдатенко'],
    openGraph: {
      title: t('title'),
      description: t('intro'),
      url: `${baseUrl}/${locale}/portfolio`,
      locale: locale,
      type: 'website',
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
      description: t('intro'),
      card: 'summary_large_image',
      images: [`${baseUrl}/me.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/portfolio`,
      languages: {
        'en': `${baseUrl}/en/portfolio`,
        'ru': `${baseUrl}/ru/portfolio`,
      },
    },
  };
}

export default async function PortfolioPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('portfolio');

  return (
    <>
      <PortfolioStructuredData 
        locale={locale} 
        title={t('title')}
        intro={t('intro')}
      />
      {/* <Breadcrumbs 
        locale={locale} 
        items={[{ name: t('title'), href: `/${locale}/portfolio` }]}
      /> */}
      <PortfolioClient title={t('title')} intro={t('intro')} />
    </>
  );
}