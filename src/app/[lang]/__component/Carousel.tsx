"use client";

import LanguageSwitcher from "@/components/custom/LanguageSwitcher";
import { useTranslations } from "next-intl";

function Carousel() {
  const t = useTranslations('home');

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello world!</h1>
      <h2>{t('title')}</h2>
      <h2>{t('description')}</h2>
      <LanguageSwitcher />
    </div>
  );
}

export default Carousel;
