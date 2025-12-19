import { getTranslations } from 'next-intl/server';
import PortfolioClient from '../components/Portfolio';

export default async function PortfolioPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('portfolio');

  return <PortfolioClient title={t('title')} intro={t('intro')} />;
}