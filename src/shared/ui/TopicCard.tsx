import React from "react";
import { cn } from "../lib/utils";
import { Category } from "../../entities/category";
import * as Icons from "@phosphor-icons/react";
import { useTranslation } from "react-i18next";

interface TopicCardProps {
  category: Category;
  onClick?: () => void;
  className?: string;
}

export const TopicCard: React.FC<TopicCardProps> = ({
  category,
  onClick,
  className,
}) => {
  const { t } = useTranslation();
  const isLocked = category.level === "locked";

  // Mappings from semantic names to phosphor icons
  const iconMap: Record<string, Icons.Icon> = {
    plus: Icons.PlusIcon,
    minus: Icons.MinusIcon,
    multiply: Icons.XIcon,
    divide: Icons.DivideIcon,
    fractions: Icons.ChartPieSliceIcon,
    geometry: Icons.CompassToolIcon,
    story: Icons.BookOpenTextIcon,
  };

  const IconComponent =
    iconMap[category.icon as keyof typeof iconMap] || Icons.CircleIcon;

  return (
    <button
      onClick={!isLocked ? onClick : undefined}
      disabled={isLocked}
      className={cn(
        "border-2 border-ink rounded-[47px] p-5 sm:p-6 min-h-[152px] flex flex-col justify-between items-start gap-4 text-left",
        category.cardBgClass,
        category.colorClass,
        category.id === "word-problems" && "col-span-2",
        !isLocked && "hover:-translate-y-0.5 active:scale-95 cursor-pointer",
        isLocked && "cursor-not-allowed opacity-85",
        className
      )}
    >
      <div className="w-full flex items-center justify-between gap-2">
        <div
          className={cn(
            "w-12 h-12 rounded-full border-2 border-ink flex items-center justify-center shrink-0",
            isLocked ? "bg-peach-paper text-ink" : "bg-[#ffffff] text-[#000000]"
          )}
        >
          {isLocked ? (
            <Icons.LockKeyIcon className="w-6 h-6" weight="bold" />
          ) : (
            <IconComponent className="w-6 h-6" weight="bold" />
          )}
        </div>

        {isLocked ? (
          <span className="bg-peach-paper text-ink border-2 border-ink px-2.5 py-1 rounded-[10px] font-body text-xs font-extrabold uppercase tracking-wide">
            {t("topic.locked")}
          </span>
        ) : (
          <span className="bg-[#ffffff] text-[#000000] border-2 border-ink px-2.5 py-1 rounded-[10px] font-body text-xs font-extrabold uppercase tracking-wide tabular-nums">
            {t("topic.level", { level: category.level })}
          </span>
        )}
      </div>

      <div className="w-full pl-1">
        <h3
          className={cn(
            "font-headline text-xl sm:text-[25px] leading-[1.15] tracking-normal truncate",
            isLocked ? "text-ink" : "text-[#000000]"
          )}
        >
          {t(`categories.${category.id}`)}
        </h3>
        {category.id === "word-problems" && (
          <p className="font-body font-bold text-xs sm:text-sm text-[#000000]/80 mt-1">
            {t("topic.wordProblemsSubtitle")}
          </p>
        )}
      </div>
    </button>
  );
};
