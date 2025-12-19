import { getRequestConfig, type RequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ requestLocale }): Promise<RequestConfig> => {
  const locale = (await requestLocale) || 'en';
  
  return {
    locale,
    messages: (await import(`./messages/${locale}.json`)).default as Record<string, string>
  };
});