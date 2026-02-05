import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import PortfolioClient from '../components/Portfolio';
import Breadcrumbs from '../components/Breadcrumbs';
import PortfolioStructuredData from '../components/PortfolioStructuredData';

// Corrected generateMetadata function
export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  // 1. Destructure params first
  const { locale } = params; 
  
  // 2. Pass locale explicitly to getTranslations
  const t = await getTranslations({ locale, namespace: 'portfolio' });
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

// Corrected PortfolioPage component
export default async function PortfolioPage({ params }: { params: { locale: string } }) {
  // 1. Destructure params first
  const { locale } = params; 
  
  // 2. Pass locale explicitly to getTranslations
  const t = await getTranslations({ locale, namespace: 'portfolio' });

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