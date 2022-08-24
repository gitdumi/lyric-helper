import { COLORS } from '../lib/Theme';

export const MAX_CHARS = 80;
export const RESPONSIVE_WIDTH = '700px';
export const ANIMATION_TIMEOUT = 500;

export const SECTION_TEMPLATES = [
  {
    name: 'Verse',
    color: COLORS.GREEN
  },
  {
    name: 'Verse',
    color: COLORS.GREEN
  },
  {
    name: 'Verse',
    color: COLORS.GREEN
  },
  {
    name: 'Chorus',
    color: COLORS.PURPLE
  },
  {
    name: 'Chorus',
    color: COLORS.PURPLE
  },
  {
    name: 'Bridge',
    color: COLORS.BLUE
  }
];

export function getRandomSection() {
  return SECTION_TEMPLATES[Math.floor(Math.random() * SECTION_TEMPLATES.length)];
}
