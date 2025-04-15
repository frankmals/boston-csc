import { sanityFetch } from '@/lib/sanity'
import { siteSettingsQuery } from '@/lib/queries'

interface SiteSettings {
  title: string
  subtitle?: string
  logoUrl?: string
}

async function getSiteSettings() {
  return sanityFetch<SiteSettings>({ query: siteSettingsQuery })
}

export async function Header() {
  const settings = await getSiteSettings()

  if (!settings) return null

  console.log('Site Settings:', JSON.stringify(settings, null, 2))

  return (
    <header className="bg-[#006B25] text-white py-4">
      <div className="container mx-auto px-4 flex items-center">
        {settings.logoUrl && (
          <div className="w-20 h-20 mr-4">
            <img
              src={settings.logoUrl}
              alt="Celtic Logo"
              className="w-full h-full object-contain"
            />
          </div>
        )}
        <h1 className="text-3xl font-bold">
          {settings.title || "BOSTON'S #1 CELTIC SUPPORTER CLUB"}
        </h1>
      </div>
    </header>
  )
} 