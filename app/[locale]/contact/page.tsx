import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import ContactClient from '../components/Contact';
import Breadcrumbs from '../components/Breadcrumbs';
import ContactStructuredData from '../components/ContactStructuredData';

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations('contact');
  const baseUrl = 'https://portfolio-pied-pi-a0rx8b1qju.vercel.app';
  
  return {
    title: t('title'),
    description: t('intro'),
    keywords: ['contact', 'portfolio', 'developer', 'email', 'collaboration', 'Евгений Солдатенко'],
    openGraph: {
      title: t('title'),
      description: t('intro'),
      url: `${baseUrl}/${locale}/contact`,
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
      description: t('intro'),
      card: 'summary_large_image',
      images: [`${baseUrl}/me.jpg`],
    },
    alternates: {
      canonical: `${baseUrl}/${locale}/contact`,
      languages: {
        'en': `${baseUrl}/en/contact`,
        'ru': `${baseUrl}/ru/contact`,
      },
    },
  };
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  const t = await getTranslations('contact');

  const contactData = {
    title: t('title'),
    intro: t('intro'),
    name_label: t('name_label'),
    email_label: t('email_label'),
    message_label: t('message_label'),
    send_button: t('send_button'),
    sending_button: t('sending_button'),
    success_title: t('success_title'),
    success_text: t('success_text'),
    direct_contact_title: t('direct_contact_title'),
    social_title: t('social_title'),
    email: t('email'),
    phone: t('phone'),
    location: t('location'),
    location_value: t('location_value'),
  };

  return (
    <>
      <ContactStructuredData 
        locale={locale} 
        email={contactData.email}
        phone={contactData.phone}
      />
      {/* <Breadcrumbs 
        locale={locale} 
        items={[{ name: t('title'), href: `/${locale}/contact` }]}
      /> */}
      <ContactClient {...contactData} />
    </>
  );
}