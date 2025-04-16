import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanityFetch'
import './Header.css'

interface SiteSettings {
  title: string
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
    <header className="w-full celtic-gradient text-white py-8 header-shadow flex items-center justify-center">
      <div className="flex items-center w-full max-w-5xl mx-auto px-4">
        <div className="flex-shrink-0 mr-8">
          <Image
            src={settings.logo.asset.url}
            alt="Boston Celtic Supporters Club Logo"
            width={220}
            height={80}
            className="object-contain"
            priority
          />
        </div>
        <div className="flex flex-col flex-1 items-center">
          <h1 className="text-5xl font-bold font-heading drop-shadow-lg mb-2 text-center">
            {settings.title}
          </h1>
          <div className="flex flex-row items-center justify-center space-x-8 w-full mt-2">
            <span className="text-lg opacity-80 whitespace-nowrap">Est. 1996</span>
            <nav className="flex space-x-8 justify-center w-full">
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
      </div>
    </header>
  )
} 