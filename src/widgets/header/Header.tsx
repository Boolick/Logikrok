import React from "react";
import { Sparkle, Star } from "@phosphor-icons/react";
import { gameSessionService } from "../../shared/api/gameSessionService";
import { ThemeToggle } from "../../shared/ui/ThemeToggle";
import { LanguageToggle } from "../../shared/ui/LanguageToggle";
import { useTranslation } from "react-i18next";

export const Header: React.FC = () => {
  const progress = gameSessionService.getProgress();
  const { t } = useTranslation();

  return (
    <header className="w-full top-0 sticky z-40 bg-peach-paper pt-4 pb-2 px-4 sm:px-6">
      <div className="flex items-center justify-between gap-2 w-full max-w-2xl mx-auto">
        {/* Brand Pill: Logikrok (White pill with 2px black outline) */}
        <div className="bg-snow border-2 border-ink rounded-[47px] px-4 py-2 min-h-[44px] flex items-center gap-2 shrink-0">
          <Sparkle
            className="text-ember-orange w-5 h-5 shrink-0"
            weight="fill"
          />
          <span className="font-headline text-sm sm:text-base tracking-normal text-ink whitespace-nowrap">
            {t("header.title")}
          </span>
        </div>

        {/* Right Controls: Yellow XP Pill + Language & Theme Toggles */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="bg-sunbeam-yellow border-2 border-ink px-3.5 py-2 min-h-[44px] rounded-[47px] flex items-center gap-1.5 text-[#000000]">
            <Star className="w-4 h-4 text-[#000000] shrink-0" weight="fill" />
            <span className="font-body font-extrabold text-xs sm:text-sm tabular-nums whitespace-nowrap">
              {progress.xp.toLocaleString()} {t("header.xp")}
            </span>
          </div>
          <LanguageToggle />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

