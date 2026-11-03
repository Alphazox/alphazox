// Real photographs from Unsplash (Unsplash License: free for commercial use), self-hosted in
// public/images/photos. Each name has a 1920×1080 background and an 800×500 "-sm" card version.

const DIR = '/images/photos';

export const photo = (name: string) => `${DIR}/${name}.jpg`;
export const photoSm = (name: string) => `${DIR}/${name}-sm.jpg`;

const PAGE_PHOTOS: Record<string, string> = {
  '/': 'home',
  '/agentic-ai': 'agentic',
  '/platform': 'platform',
  '/solutions': 'solutions',
  '/industries': 'industries',
  '/about': 'about',
  '/careers': 'careers',
  '/contact': 'contact',
};

// Detail pages (/industries/:slug, /solutions/:slug, /platform/:slug) use a photo named after the slug.
export const photoForPath = (pathname: string) => {
  if (PAGE_PHOTOS[pathname]) return PAGE_PHOTOS[pathname];
  const [, section, slug] = pathname.split('/');
  if (slug && ['industries', 'solutions', 'platform'].includes(section)) return slug;
  return PAGE_PHOTOS[`/${section}`] ?? 'home';
};
