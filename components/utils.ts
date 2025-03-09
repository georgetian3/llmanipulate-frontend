import { Translations } from "@/api";

export async function wait(duration: number) {
  await new Promise(r => setTimeout(r, duration))
}

export function getTranslation(
  translations?: Translations | string | null,
  language?: string,
): string {
  if (!translations) {
    return "";
  }
  if (typeof translations === "string") {
    return translations
  }
  if (Object.keys(translations.languages).length == 0) {
    console.error("Empty translation", translations);
    return "";
  }
  const languages = (translations.languages as Record<string, string>) ?? {};

  if (language && language in languages) {
    return languages[language];
  }
  if (translations.default) {
    return languages[translations.default];
  }

  return Object.values(languages)[0];
}