import Link from 'next/link'
import { sanityFetch } from '@/lib/sanityFetch'
import './Header.css'

interface SiteSettings {
  title: string
  subtitle: string
  email: string
  phone: string
  logo: {
    asset: {
      url: string
    }
  }
}

async function getSiteSettings() {
  const query = `*[_type == "siteSettings"][0]{
    title,
    subtitle,
    email,
    phone,
    logo {
      asset->{
        url
      }
    }
  }`
  return await sanityFetch<SiteSettings>({ query })
}

export default async function Header() {
  const settings = await getSiteSettings()

  return (
    <header className="w-full">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white py-2">
        <div className="container mx-auto px-4 flex justify-between items-center text-sm">
          <div className="flex items-center space-x-4">
            <a href={`mailto:${settings.email}`} className="hover:text-green-400 transition-colors">
              <span className="mr-2">✉</span>{settings.email}
            </a>
            <a href={`tel:${settings.phone}`} className="hover:text-green-400 transition-colors">
              <span className="mr-2">📞</span>{settings.phone}
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="hover:text-green-400 transition-colors">Facebook</a>
            <a href="#" className="hover:text-green-400 transition-colors">Twitter</a>
            <a href="#" className="hover:text-green-400 transition-colors">Instagram</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="celtic-gradient text-white py-6 header-shadow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center mb-6">
            <div className="logo-container mb-4">
              <img
                src={settings.logo.asset.url}
                alt="Boston Celtic Supporters Club Logo"
                className="w-24 h-24 object-contain"
              />
            </div>
            <h1 className="text-4xl font-bold text-center mb-2">{settings.title}</h1>
            <p className="text-lg text-gray-200">{settings.subtitle}</p>
          </div>

          {/* Navigation */}
          <nav className="flex justify-center space-x-8">
            <Link href="/" className="nav-link text-lg font-semibold hover:text-green-300 transition-colors">
              Home
            </Link>
            <Link href="/matches" className="nav-link text-lg font-semibold hover:text-green-300 transition-colors">
              Matches
            </Link>
            <Link href="/venue" className="nav-link text-lg font-semibold hover:text-green-300 transition-colors">
              Venue
            </Link>
            <Link href="/shop" className="nav-link text-lg font-semibold hover:text-green-300 transition-colors">
              Shop
            </Link>
          </nav>
        </div>
      </div>

      {/* Celtic Pattern Border */}
      <div className="h-2 bg-[url('/celtic-pattern.png')] bg-repeat-x"></div>
    </header>
  )
} 