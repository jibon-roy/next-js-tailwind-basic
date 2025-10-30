"use client";
"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
} from "react";

type Messages = Record<string, string>;

type I18nContextValue = {
  locale: string;
  t: (key: string, fallback?: string) => string;
  messages: Messages;
  changeLocale: (locale: string) => Promise<void>;
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

export default function ClientI18nProvider({
  children,
  locale: initialLocale,
  messages: initialMessages,
}: Readonly<{
  children: React.ReactNode;
  locale: string;
  messages: Messages;
}>) {
  const [locale, setLocale] = useState<string>(
    // prefer stored choice, otherwise server-detected initialLocale
    (typeof window !== "undefined" && localStorage.getItem("locale")) ||
      initialLocale
  );

  const [messages, setMessages] = useState<Messages>(initialMessages || {});

  // helper to load messages for a locale
  const loadMessages = useCallback(async (loc: string) => {
    try {
      const mod = await import(`@/locales/${loc}/common.json`);
      // some bundlers place default under default
      const msgs: Messages = (mod && (mod.default || mod)) || {};
      setMessages(msgs);
    } catch (e) {
      console.error("Failed to load locale messages for", loc, e);
    }
  }, []);

  const changeLocale = useCallback(
    async (newLocale: string) => {
      if (newLocale === locale) return;
      await loadMessages(newLocale);
      setLocale(newLocale);
      try {
        localStorage.setItem("locale", newLocale);
      } catch (e) {
        // ignore
      }
    },
    [locale, loadMessages]
  );

  // If initialLocales differs from stored locale, ensure messages are loaded
  React.useEffect(() => {
    const stored =
      typeof window !== "undefined" ? localStorage.getItem("locale") : null;
    const desired = stored || initialLocale;
    if (desired && desired !== locale) {
      // load desired locale
      loadMessages(desired).then(() => setLocale(desired));
    }
  }, [initialLocale, locale, loadMessages]);

  const t = useCallback(
    (key: string, fallback = "") => {
      const v = messages[key];
      return typeof v === "string" ? v : fallback || key;
    },
    [messages]
  );

  const value = useMemo<I18nContextValue>(
    () => ({ locale, t, messages, changeLocale }),
    [locale, t, messages, changeLocale]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useTranslations() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useTranslations must be used within ClientI18nProvider");
  }
  return ctx.t;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within ClientI18nProvider");
  }
  return ctx;
}
