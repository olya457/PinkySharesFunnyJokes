import { DockItem } from '../components/FloatDock';

export type GateRoute = 'glowGate' | 'trailShow' | 'mainDeck';

export type DockRoute =
  | 'quipHarbor'
  | 'taleLantern'
  | 'punchPatch'
  | 'factGlow'
  | 'nameFountain'
  | 'surpriseBean'
  | 'keptPocket';

export const dockItems: DockItem[] = [
  { key: 'quipHarbor', emoji: '💬', label: 'Jokes' },
  { key: 'taleLantern', emoji: '📖', label: 'Stories' },
  { key: 'punchPatch', emoji: '🧩', label: 'Finish the joke' },
  { key: 'factGlow', emoji: '💡', label: 'Fun facts' },
  { key: 'nameFountain', emoji: '🪄', label: 'Nickname Generator' },
  { key: 'surpriseBean', emoji: '🙂', label: 'Random Joke' },
  { key: 'keptPocket', emoji: '♥', label: 'Saved' },
];
