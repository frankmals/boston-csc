import Link from 'next/link'
import Image from 'next/image'
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
    <header className="w-full celtic-gradient text-white py-12 header-shadow flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center w-full max-w-3xl mx-auto">
        <div className="mb-6">
          <Image
            src={settings.logo.asset.url}
            alt="Boston Celtic Supporters Club Logo"
            width={400}
            height={120}
            className="object-contain mx-auto"
            priority
          />
        </div>
        <h1 className="text-5xl font-bold text-center mb-2 font-heading drop-shadow-lg">
          {settings.title}
        </h1>
        <p className="text-2xl text-center mb-2 font-light">
          {settings.subtitle}
        </p>
        <p className="text-lg text-center mb-8 opacity-80">Est. 1996</p>
      </div>
      <nav className="flex justify-center space-x-10 mt-4">
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
    </header>
  )
} 