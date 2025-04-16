import Link from 'next/link'
import Image from 'next/image'
import { sanityFetch } from '@/lib/sanity'
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
    <header className="w-full celtic-gradient text-white py-8 header-shadow">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex flex-col items-start">
          <Image
            src={settings.logo.asset.url}
            alt="Boston Celtic Supporters Club Logo"
            width={220}
            height={80}
            className="object-contain mb-2"
            priority
          />
          <h1 className="text-5xl font-bold font-heading drop-shadow-lg mb-1">
            {settings.title}
          </h1>
          <span className="text-lg opacity-80 whitespace-nowrap mb-4">Est. 1996</span>
        </div>
        <nav className="flex justify-center space-x-8 mt-2 w-full">
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
    </header>
  )
} 