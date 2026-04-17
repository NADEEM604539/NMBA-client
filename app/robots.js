export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: ['/', '/about','/products/'],
      disallow: ['/api/', '/sign-in', '/sign-up', '/checkout', '/cart', '/orders/', '/chat'],
    },
    sitemap: 'https://www.afias.pk/sitemap.xml',
  }
}
