// Real photographs from Unsplash (Unsplash License: free for commercial use), self-hosted in
// public/images/photos. Each name has a 1920×1080 background, an 800×500 "-sm" card version and,
// for page backgrounds, a 900×1600 "-m" portrait version for phones.

const DIR = '/images/photos';
// Bump when photos are replaced under the same name, so browsers fetch the new file instead of a cached one.
const V = '?v=8';

export const photo = (name: string) => `${DIR}/${name}.jpg${V}`;
export const photoSm = (name: string) => `${DIR}/${name}-sm.jpg${V}`;
// 900×1600 portrait crop used as the background on phones.
export const photoMobile = (name: string) => `${DIR}/${name}-m.jpg${V}`;

// Detail pages listed here show a different photo inside the page ("<slug>-in-sm.jpg") so it doesn't
// repeat the page background. Other detail pages fall back to their background photo.
const INLINE_PHOTOS = new Set(['cloud-devops']);
export const photoInline = (slug: string) => (INLINE_PHOTOS.has(slug) ? photoSm(`${slug}-in`) : photoSm(slug));

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
