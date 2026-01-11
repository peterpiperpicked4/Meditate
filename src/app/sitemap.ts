import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://zeroto.deep' // Replace with actual domain

  const routes = [
    '',
    '/start',
    '/path',
    '/practice',
    '/techniques',
    '/techniques/breath-focus',
    '/techniques/loving-kindness',
    '/troubleshooting',
    '/advanced',
    '/science',
    '/resources',
    '/journey',
    '/about',
    '/disclaimer',
  ]

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly' as const,
    priority: route === '' ? 1 : route === '/start' ? 0.9 : 0.8,
  }))
}
