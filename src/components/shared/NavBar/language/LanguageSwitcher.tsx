"use client";

import React, { useState, useRef, useEffect } from "react";
import { useI18n } from "@/lib/ClientI18nProvider";

const languages = [
  { code: "en", label: "English" },
  { code: "fr", label: "Français" },
];

export default function LanguageSwitcher() {
  const { locale, changeLocale } = useI18n();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (!ref.current) return;
      if (e.target && !(ref.current as any).contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("click", onDoc);
    return () => document.removeEventListener("click", onDoc);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen((v) => !v)}
        className="px-3 py-2 rounded-md border text-sm bg-white"
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {locale?.toUpperCase()}
      </button>
      {open && (
        <ul className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-50">
          {languages.map((l) => (
            <li key={l.code}>
              <button
                onClick={async () => {
                  await changeLocale(l.code);
                  setOpen(false);
                }}
                className={`w-full text-left px-3 py-2 hover:bg-gray-100 ${
                  l.code === locale ? "font-semibold" : ""
                }`}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
