"use client";

import heroBg from "@/assets/images/herobg.png";
import heroiamge from "@/assets/images/heroiamge.png";
import { Container } from "@/components/ui-library/container";
import Image from "next/image";
import { useTranslations } from "@/lib/ClientI18nProvider";

const Banner = () => {
  const t = useTranslations();

  return (
    <div
      className="bg-cover bg-center min-h-[652px] pt-10 lg:pb-0 pb-10"
      style={{ backgroundImage: `url(${heroBg.src})` }}
    >
      <Container>
        <div className="flex lg:flex-row flex-col items-center gap-[60px]">
          <div className="flex-1">
            <h1 className="lg:text-[50px] md:text-[40px] sm:text-[30px] text-[26px] font-bold text-black ">
              {t("banner.title.part1", "Smart Automated")}{" "}
              <span className="text-primary">
                {t("banner.title.highlight")}
              </span>{" "}
              {t("banner.title.part2")}
            </h1>
            <p className="mt-[30px] mb-12 text-text-primary">
              {t("banner.subtitle")}
            </p>
            <button
              className="bg-primary  text-white px-[26px] py-4 rounded-xl text-sm font-medium hover:bg-primary-hover transition-colors duration-200 cursor-pointer"
              onClick={() => {
                alert(t("banner.cta.alert", "Redirecting to app store..."));
              }}
            >
              {t("banner.cta")}
            </button>
          </div>
          <div className="flex-1">
            <Image
              src={heroiamge}
              alt="Hero Image"
              className="w-full h-auto shadow-xl"
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Banner;
