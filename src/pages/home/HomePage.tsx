import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header } from '../../widgets/header';
import { BottomNav } from '../../widgets/bottom-nav';
import { type NavTab } from '../../widgets/bottom-nav/BottomNav';
import { HeroCard } from '../../shared/ui/HeroCard';
import { TopicCard } from '../../shared/ui/TopicCard';
import { DailyGoalCard } from '../../shared/ui/DailyGoalCard';
import { MathDoodles } from '../../shared/ui/doodles';
import { CATEGORIES, Category } from '../../entities/category';
import { AWARD_DEFINITIONS } from '../../entities/progress';
import { gameSessionService } from '../../shared/api/gameSessionService';
import {
  Medal,
  Lightning,
  Star,
  Trophy,
  Fire,
  Target,
  CompassTool,
  Shuffle,
  Check,
  Play,
} from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { cn } from '../../shared/lib/utils';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<NavTab>('learn');
  const [progress, setProgress] = useState(() => gameSessionService.getProgress());

  const handleStart = (categoryId: string) => {
    navigate(`/game/${categoryId}`);
  };

  const handleSelectGrade = (grade: number) => {
    const updated = gameSessionService.setSelectedGrade(grade);
    setProgress({ ...updated });
  };

  const categoriesWithLiveLevels: Category[] = CATEGORIES.map((cat) => ({
    ...cat,
    level:
      cat.level === 'locked'
        ? 'locked'
        : Math.max(progress.categoryLevels?.[cat.id] ?? 1, progress.selectedGrade),
  }));

  const unlockedCategories = categoriesWithLiveLevels.filter(
    (c) => c.level !== 'locked'
  );

  const awardIconMap = {
    star: Star,
    lightning: Lightning,
    target: Target,
    fire: Fire,
    compass: CompassTool,
    trophy: Trophy,
  };

  return (
    <div className="relative bg-peach-paper text-ink min-h-screen pb-32">
      <MathDoodles />
      <Header />

      <main className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 pt-4">
        {/* ── LEARN TAB ── */}
        {activeTab === 'learn' && (
          <>
            <HeroCard onStart={() => handleStart('addition')} />

            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 mb-10">
              {categoriesWithLiveLevels.map((category) => (
                <TopicCard
                  key={category.id}
                  category={category}
                  onClick={() => handleStart(category.id)}
                />
              ))}
            </div>

            <DailyGoalCard solved={progress.dailySolved} />
          </>
        )}

        {/* ── PRACTICE TAB (Super Mix + Topic Accuracy) ── */}
        {activeTab === 'practice' && (
          <section className="py-2">
            {/* Super Mix Hero Card */}
            <div className="bg-powder-blue text-[#000000] border-2 border-ink rounded-[47px] p-6 sm:p-7 mb-7 flex flex-col items-center text-center">
              <div className="w-14 h-14 rounded-full bg-[#ffffff] border-2 border-ink flex items-center justify-center mb-3">
                <Shuffle className="w-7 h-7 text-[#000000]" weight="bold" />
              </div>
              <h2 className="font-headline text-[32px] sm:text-[38px] leading-tight mb-2">
                {t('tabs.superMixTitle')}
              </h2>
              <p className="font-body font-bold text-sm sm:text-base max-w-md mb-5 opacity-90">
                {t('tabs.superMixDesc')}
              </p>
              <button
                type="button"
                onClick={() => handleStart('mixed')}
                className="bg-[#ffffff] text-[#000000] border-2 border-ink min-h-[54px] px-8 py-3 rounded-[47px] font-body font-extrabold text-lg hover:bg-sunbeam-yellow active:scale-95 flex items-center gap-2.5 cursor-pointer"
              >
                <span>{t('tabs.startSuperMix')}</span>
                <Play className="w-5 h-5" weight="fill" />
              </button>
            </div>

            <h3 className="font-headline text-2xl text-ink mb-4 px-2">
              {t('tabs.practiceByTopic')}
            </h3>

            <div className="grid grid-cols-2 gap-3.5 sm:gap-4 mb-8">
              {unlockedCategories.map((category) => (
                <TopicCard
                  key={category.id}
                  category={category}
                  onClick={() => handleStart(category.id)}
                />
              ))}
            </div>
          </section>
        )}

        {/* ── AWARDS TAB (6 Live Storybook Badges) ── */}
        {activeTab === 'awards' && (
          <section className="py-2">
            <div className="text-center mb-6">
              <h2 className="font-headline text-[34px] text-ink leading-tight mb-1">
                {t('tabs.awardsTitle')}
              </h2>
              <p className="font-body font-bold text-sm text-ink/80">
                {t('tabs.awardsSubtitle', {
                  unlocked: progress.unlockedAwards.length,
                  total: AWARD_DEFINITIONS.length,
                })}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              {AWARD_DEFINITIONS.map((award) => {
                const Icon = awardIconMap[award.icon];
                const current = award.getCurrent(progress);
                const isUnlocked =
                  progress.unlockedAwards.includes(award.id) || current >= award.target;
                const pct = Math.min(100, Math.round((current / award.target) * 100));

                return (
                  <div
                    key={award.id}
                    className={cn(
                      "border-2 border-ink rounded-[40px] p-5 flex flex-col justify-between gap-4",
                      isUnlocked
                        ? `${award.cardBgClass} text-[#000000]`
                        : "bg-snow text-ink"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={cn(
                          "w-12 h-12 rounded-full border-2 border-ink flex items-center justify-center shrink-0",
                          isUnlocked
                            ? "bg-[#ffffff] text-[#000000]"
                            : "bg-peach-paper text-ink"
                        )}
                      >
                        <Icon className="w-6 h-6" weight="fill" />
                      </div>

                      {isUnlocked ? (
                        <span className="bg-[#ffffff] text-[#000000] border-2 border-ink px-2.5 py-1 rounded-[10px] font-body font-extrabold text-xs uppercase flex items-center gap-1">
                          <Check className="w-3.5 h-3.5" weight="bold" />
                          <span>{t('tabs.awardUnlocked')}</span>
                        </span>
                      ) : (
                        <span className="bg-peach-paper text-ink border-2 border-ink px-2.5 py-1 rounded-[10px] font-body font-extrabold text-xs tabular-nums">
                          {current} / {award.target}
                        </span>
                      )}
                    </div>

                    <div>
                      <h3 className="font-headline text-xl leading-snug mb-1">
                        {t(`awards.${award.id}.title`)}
                      </h3>
                      <p
                        className={cn(
                          "font-body font-bold text-xs sm:text-sm leading-snug mb-3",
                          isUnlocked ? "text-[#000000]/85" : "text-ink/80"
                        )}
                      >
                        {t(`awards.${award.id}.desc`)}
                      </p>

                      {/* Progress Bar */}
                      <div className="w-full h-3.5 bg-[#ffffff] border-2 border-ink rounded-[47px] overflow-hidden p-0.5">
                        <div
                          className="h-full bg-ink rounded-[47px] transition-all duration-300"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <DailyGoalCard solved={progress.dailySolved} />
          </section>
        )}

        {/* ── PROFILE TAB (Grade 1–5 Selector, Streak, Topic Mastery) ── */}
        {activeTab === 'profile' && (
          <section className="py-2 flex flex-col gap-6">
            {/* Explorer Summary Card */}
            <div className="bg-snow border-2 border-ink rounded-[47px] p-6 sm:p-7 text-center">
              <div className="w-18 h-18 mx-auto mb-3 rounded-full bg-ember-orange border-2 border-ink flex items-center justify-center text-[#000000]">
                <Medal className="w-9 h-9" weight="fill" />
              </div>
              <h2 className="font-headline text-[32px] text-ink leading-tight mb-5">
                {t('tabs.profileTitle')}
              </h2>

              {/* Grade 1-5 Selector */}
              <div className="bg-peach-paper border-2 border-ink rounded-[32px] p-4 mb-6">
                <div className="font-body font-extrabold text-xs uppercase tracking-wider text-ink mb-3">
                  {t('tabs.gradeSelectorTitle')}
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[1, 2, 3, 4, 5].map((grade) => {
                    const isSelected = progress.selectedGrade === grade;
                    return (
                      <button
                        key={grade}
                        type="button"
                        onClick={() => handleSelectGrade(grade)}
                        className={cn(
                          "min-h-[48px] rounded-[47px] border-2 border-ink font-headline text-lg flex flex-col items-center justify-center cursor-pointer active:scale-95",
                          isSelected
                            ? "bg-ember-orange text-[#000000]"
                            : "bg-snow text-ink hover:bg-sunbeam-yellow hover:text-[#000000]"
                        )}
                      >
                        <span>{grade}</span>
                        <span className="font-body font-extrabold text-[10px] uppercase leading-none">
                          {t('tabs.gradeShort')}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 4 Key Metrics Grid */}
              <div className="grid grid-cols-2 gap-3.5">
                <div className="bg-sunbeam-yellow text-[#000000] border-2 border-ink rounded-[32px] p-4">
                  <div className="font-headline text-2xl sm:text-3xl tabular-nums">
                    {progress.xp.toLocaleString()}
                  </div>
                  <div className="font-body font-extrabold text-xs uppercase mt-1">
                    {t('tabs.totalXp')}
                  </div>
                </div>

                <div className="bg-ember-orange text-[#000000] border-2 border-ink rounded-[32px] p-4">
                  <div className="font-headline text-2xl sm:text-3xl tabular-nums flex items-center justify-center gap-1">
                    <Fire className="w-6 h-6" weight="fill" />
                    <span>{progress.streakDays}</span>
                  </div>
                  <div className="font-body font-extrabold text-xs uppercase mt-1">
                    {t('tabs.streakDays')}
                  </div>
                </div>

                <div className="bg-mint-wash text-[#000000] border-2 border-ink rounded-[32px] p-4">
                  <div className="font-headline text-2xl sm:text-3xl tabular-nums">
                    {progress.totalSolved}
                  </div>
                  <div className="font-body font-extrabold text-xs uppercase mt-1">
                    {t('tabs.totalSolved')}
                  </div>
                </div>

                <div className="bg-lilac-tint text-[#000000] border-2 border-ink rounded-[32px] p-4">
                  <div className="font-headline text-2xl sm:text-3xl tabular-nums">
                    {progress.perfectRounds}
                  </div>
                  <div className="font-body font-extrabold text-xs uppercase mt-1">
                    {t('tabs.perfectRounds')}
                  </div>
                </div>
              </div>
            </div>

            {/* Topic Mastery Breakdown */}
            <div className="bg-snow border-2 border-ink rounded-[47px] p-6">
              <h3 className="font-headline text-2xl text-ink mb-4 text-center">
                {t('tabs.topicStatsTitle')}
              </h3>
              <div className="flex flex-col gap-3">
                {categoriesWithLiveLevels.map((cat) => {
                  const stat = progress.categoryStats?.[cat.id] ?? {
                    solved: 0,
                    correct: 0,
                  };
                  const accuracy =
                    stat.solved > 0
                      ? Math.round((stat.correct / stat.solved) * 100)
                      : 0;

                  return (
                    <div
                      key={cat.id}
                      className="bg-peach-paper border-2 border-ink rounded-[24px] px-4 py-3 flex items-center justify-between gap-3"
                    >
                      <div className="min-w-0">
                        <div className="font-headline text-base sm:text-lg text-ink truncate">
                          {t(`categories.${cat.id}`)}
                        </div>
                        <div className="font-body font-bold text-xs text-ink/75">
                          {t('topic.level', { level: cat.level })} ·{' '}
                          {t('tabs.solvedCount', { count: stat.correct })}
                        </div>
                      </div>

                      <div className="bg-snow border-2 border-ink px-3 py-1 rounded-[10px] font-headline text-sm text-ink tabular-nums shrink-0">
                        {stat.solved > 0 ? `${accuracy}%` : '—'}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>

      <BottomNav activeTab={activeTab} onChangeTab={setActiveTab} />
    </div>
  );
};
