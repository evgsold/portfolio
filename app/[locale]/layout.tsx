import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from './contexts/ThemeContext';
import Navigation  from './components/Navigation';
import Footer from './components/Footer';
import StructuredData from './components/StructuredData';
import "../globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>;
}) {
  const {locale} = await params;
  const messages = await getMessages({locale});

  return (
    <html lang={locale}>
      <head>
        <StructuredData locale={locale} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider messages={messages}>
            <div className="min-h-screen flex flex-col">
              <header>
                <Navigation locale={locale} />
              </header>
              <main className="flex-grow">
                {children}
              </main>
              <footer>
                <Footer locale={locale}/>
              </footer>
            </div>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
