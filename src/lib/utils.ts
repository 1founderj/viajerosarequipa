import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import i18n from "@/i18n";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, options?: Intl.NumberFormatOptions): string {
  const lang = (i18n.resolvedLanguage || i18n.language || "es").split("-")[0] || "es";
  const localeMap: Record<string, string> = {
    es: "es-PE",
    en: "en-US",
    fr: "fr-FR",
  };
  return new Intl.NumberFormat(localeMap[lang] || lang, options).format(value);
}

export function formatDate(value: string): string {
  const lang = (i18n.resolvedLanguage || i18n.language || "es").split("-")[0] || "es";
  const localeMap: Record<string, string> = {
    es: "es-PE",
    en: "en-US",
    fr: "fr-FR",
  };
  const date = new Date(`${value}T00:00:00`);
  return new Intl.DateTimeFormat(localeMap[lang] || lang, { dateStyle: "long" }).format(date);
}
