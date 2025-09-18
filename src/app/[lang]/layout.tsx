import './globals.css';
import { AppConfig } from "@/config/app-config";
import { NextIntlClientProvider } from "next-intl";
import { QueryProvider } from '@/components/QueryProvider';

export async function generateStaticParams() {
  return AppConfig.locales.map((lang: string) => ({ lang }));
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return (
    <html lang={lang}>
      <body>
        <QueryProvider>
          <NextIntlClientProvider
            locale={lang}
            messages={(await import(`../../shared/locale/${lang}.json`)).default}
          >
            {children}
          </NextIntlClientProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
