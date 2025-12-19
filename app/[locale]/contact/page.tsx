import { getTranslations } from 'next-intl/server';
import ContactClient from '../components/Contact';

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

  return <ContactClient {...contactData} />;
}