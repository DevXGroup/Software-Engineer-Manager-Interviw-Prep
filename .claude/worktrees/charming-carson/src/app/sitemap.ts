import { MetadataRoute } from 'next'

const BASE_URL = 'https://softwareprep.devxgroup.io'

export default function sitemap(): MetadataRoute.Sitemap {
  const companies = ['amazon', 'meta', 'apple', 'netflix', 'google', 'microsoft']

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${BASE_URL}/behavioral`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/system-design`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/coding`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/coding/challenges`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/coding/sdm-guide`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/technical-leadership`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/team-management`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/ai-interview`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/roadmap`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
  ]

  const companyRoutes: MetadataRoute.Sitemap = companies.map((company) => ({
    url: `${BASE_URL}/companies/${company}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  return [...staticRoutes, ...companyRoutes]
}
