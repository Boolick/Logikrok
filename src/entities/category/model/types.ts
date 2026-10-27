export interface Category {
  id: string;
  title: string;
  icon: string;
  level: number | 'locked';
  /** Crayon fill class for the entire TopicCard in Storybook style */
  cardBgClass: string;
  colorClass: string;
  iconBgClass: string;
  levelBgClass?: string;
  levelTextClass?: string;
}
