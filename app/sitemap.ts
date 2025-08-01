import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'http://byu.christianfurr.dev/'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date('2025-07-31'),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date('2025-07-31'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date('2025-07-31'),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/admin`,
      lastModified: new Date('2025-07-31'),
      changeFrequency: 'weekly',
      priority: 0.3,
    },
  ]
} 