// Mega-menu content for the navbar, keyed by the top-level nav path.
import { INDUSTRIES, INITIATIVES } from './content';
import { PLATFORM_CAPABILITIES, PLATFORM_TECH } from './platform';

export interface MegaLink { label: string; to: string; icon?: string; desc?: string; }
export interface MegaColumn { title: string; links: MegaLink[]; grid?: boolean; more?: MegaLink; }
// A card without `to` opens the demo modal.
export interface MegaCard { icon: string; label: string; to?: string; }
export interface MegaMenu { columns: MegaColumn[]; cards: MegaCard[]; }

export const MEGA_MENUS: Record<string, MegaMenu> = {
  '/platform': {
    columns: [
      {
        title: 'Capabilities',
        links: [
          { label: 'AI agents & orchestration', to: '/agentic-ai' },
          ...PLATFORM_CAPABILITIES.map(d => ({ label: d.name, to: `/platform/${d.slug}` })),
        ],
        more: { label: 'Platform overview', to: '/platform' },
      },
      {
        title: 'Technologies',
        links: PLATFORM_TECH.map(d => ({ label: d.name, to: `/platform/${d.slug}` })),
        more: { label: 'Full technology stack', to: '/platform#tech' },
      },
    ],
    cards: [
      { icon: '🧱', label: 'See how the layers fit', to: '/platform#architecture' },
      { icon: '💬', label: 'Talk to an architect' },
    ],
  },
  '/solutions': {
    columns: [
      {
        title: 'By business goal',
        links: INITIATIVES.map(i => ({ label: i.title, to: i.to })),
        more: { label: 'All solutions', to: '/solutions' },
      },
      {
        title: 'By app type',
        links: [
          { label: 'External apps', to: '/solutions#external' },
          { label: 'Core systems', to: '/solutions#core' },
          { label: 'Internal apps', to: '/solutions#internal' },
          { label: 'Example AI agents', to: '/agentic-ai#agents' },
        ],
      },
    ],
    cards: [
      { icon: '🧩', label: 'Discover what we build', to: '/solutions' },
      { icon: '💬', label: 'Talk to an expert' },
    ],
  },
  '/industries': {
    columns: [
      {
        title: 'Industries we serve',
        grid: true,
        links: INDUSTRIES.map(i => ({ label: i.name, to: `/industries/${i.slug}`, icon: i.icon, desc: i.desc })),
        more: { label: 'All industries', to: '/industries' },
      },
    ],
    cards: [
      { icon: '📋', label: 'Compliance-ready delivery', to: '/platform/security-governance' },
      { icon: '💬', label: 'Talk to an industry expert' },
    ],
  },
};
