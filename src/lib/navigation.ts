import { getCollection } from 'astro:content';

export interface NavItem {
  href: string;
  label: string;
}

export async function getMainNavItems(): Promise<NavItem[]> {
  const pages = (await getCollection('pages', ({ data, id }) => !data.draft && id !== 'home' && id !== 'voor-jong-nederland')).sort(
    (a, b) => (a.data.order ?? 999) - (b.data.order ?? 999),
  );

  const navItems = pages
    .filter((entry) => entry.data.navLabel)
    .map((entry) => ({ href: `/${entry.id}/`, label: entry.data.navLabel! }));

  navItems.push({ href: '/nieuws/', label: 'Nieuws' });

  return navItems;
}
