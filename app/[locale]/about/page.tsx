import { getTranslations } from 'next-intl/server';
import AboutClient from '../components/About';

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

  return <AboutClient {...aboutData} />;
}