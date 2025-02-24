import { Translations } from "@/api/models/Translations";

export function getTranslation(
  translations?: Translations | null,
  language?: string,
): string {
  if (!translations) {
    return "";
  }
  if (Object.keys(translations.languages).length == 0) {
    console.error("Empty translation", translations);
    return "";
  }
  const languages = (translations.languages as Record<string, string>) ?? {};

  if (language && language in languages) {
    return languages[language];
  }
  if (translations._default) {
    return languages[translations._default];
  }

  return Object.values(languages)[0];
}

export function shuffle(list: any[]) {
  for (let i = list.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [list[i], list[j]] = [list[j], list[i]];
  }
}