import { config, fields, collection, singleton } from '@keystatic/core';

// IMPORTANT: Replace with your GitHub repo owner/name and branch.
const REPO = 'OWNER/REPO';
const BRANCH = 'main';

/** Keystatic configuration
 * Storage: GitHub (commits Markdown/JSON to your repo)
 * Auth: GitHub OAuth via env vars in Vercel
 */
export default config({
  storage: {
    kind: 'github',
    repo: REPO,
    branch: BRANCH,
    auth: {
      kind: 'github',
      clientId: import.meta.env.PUBLIC_GITHUB_CLIENT_ID,
      clientSecret: import.meta.env.GITHUB_CLIENT_SECRET,
    }
  },
  singletons: {
    siteSettings: singleton({
      label: 'Site Settings',
      schema: {
        headingFont: fields.select({
          label: 'Heading Font',
          options: [
            { label: 'System', value: 'system' },
            { label: 'Inter', value: 'inter' },
            { label: 'Rubik', value: 'rubik' },
            { label: 'Merriweather', value: 'merriweather' }
          ],
          defaultValue: 'system'
        }),
        bodyFont: fields.select({
          label: 'Body Font',
          options: [
            { label: 'System', value: 'system' },
            { label: 'Inter', value: 'inter' },
            { label: 'Rubik', value: 'rubik' },
            { label: 'Merriweather', value: 'merriweather' }
          ],
          defaultValue: 'system'
        })
      },
      path: 'src/content/siteSettings'
    })
  },
  collections: {
    posts: collection({
      label: 'Posts',
      path: 'src/content/posts/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({ label: 'Title' }),
        slug: fields.slug({ name: 'title' }),
        description: fields.text({ label: 'Description' }),
        date: fields.datetime({ label: 'Date' }),
        body: fields.markdoc({ label: 'Body' }),
        images: fields.array(fields.url({ label: 'Image URL' }), {
          label: 'Images',
          itemLabel: props => props.value || 'Image'
        })
      }
    }),
    products: collection({
      label: 'Products',
      path: 'src/content/products/*',
      format: { contentField: 'body' },
      schema: {
        title: fields.text({ label: 'Title' }),
        slug: fields.slug({ name: 'title' }),
        description: fields.text({ label: 'Description' }),
        brand: fields.text({ label: 'Brand', validation: { isRequired: false } }),
        ean: fields.text({ label: 'EAN', validation: { isRequired: false } }),
        price: fields.number({ label: 'Price', validation: { isRequired: false } }),
        affiliate_url: fields.url({ label: 'Affiliate URL', validation: { isRequired: false } }),
        images: fields.array(fields.url({ label: 'Image URL' }), {
          label: 'Images',
          itemLabel: props => props.value || 'Image'
        }),
        body: fields.markdoc({ label: 'Body' })
      }
    })
  }
});
