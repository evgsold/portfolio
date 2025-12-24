import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface InternalLinksProps {
  locale: string;
  currentPage: string;
}

export default async function InternalLinks({ locale, currentPage }: InternalLinksProps) {
  const t = await getTranslations('common');
  
  const links = [
    { href: `/${locale}`, label: t('home'), key: 'home' },
    { href: `/${locale}/about`, label: t('about'), key: 'about' },
    { href: `/${locale}/portfolio`, label: t('portfolio'), key: 'portfolio' },
    { href: `/${locale}/contact`, label: t('contact'), key: 'contact' },
  ];

  const relatedLinks = links.filter(link => link.key !== currentPage);

  return (
    <section className="mt-12 p-6 bg-gray-50 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">{t('related_pages')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {relatedLinks.map(link => (
          <Link
            key={link.key}
            href={link.href}
            className="block p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow border border-gray-200 hover:border-blue-300"
          >
            <h3 className="font-medium text-gray-900 hover:text-blue-600 transition-colors">
              {link.label}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {t(`${link.key}_description`)}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
