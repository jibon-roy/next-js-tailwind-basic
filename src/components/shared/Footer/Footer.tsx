import React from "react";
import { useTranslations } from "@/lib/ClientI18nProvider";

const Footer = () => {
  const t = useTranslations();
  return <div>{t("footer.text", "Footer")}</div>;
};

export default Footer;
