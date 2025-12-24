import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

interface BreadcrumbItem {
  name: string;
  href: string;
}

interface BreadcrumbsProps {
  locale: string;
  items: BreadcrumbItem[];
}

export default async function Breadcrumbs({ locale, items }: BreadcrumbsProps) {
  const t = await getTranslations('common');
  
  return (
    <nav aria-label={t('breadcrumbs')} className="mb-6">
      <ol className="flex items-center space-x-2 text-sm text-gray-600">
        <li>
          <Link 
            href={`/${locale}`}
            className="hover:text-blue-600 transition-colors"
          >
            {t('home')}
          </Link>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center space-x-2">
            <span className="text-gray-400">/</span>
            {index === items.length - 1 ? (
              <span className="text-gray-900 font-medium">{item.name}</span>
            ) : (
              <Link 
                href={item.href}
                className="hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
