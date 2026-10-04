import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../i18n'

export function Footer() {
  const { t } = useLanguage()

  const navLinks = [
    { label: t.nav.home, to: '/' },
    { label: t.nav.about, to: '/haqida' },
    { label: t.nav.education, to: '/oqituvchilar' },
    { label: t.nav.news, to: '/darslar-jadvali' },
  ]

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div className="footer-branding">
          <div className="brand-stack-footer">
            <div className="brand-mark-footer">23</div>
            <div>
              <strong>{t.brand.name}</strong>
              <small>{t.brand.tagline}</small>
            </div>
          </div>
          <p>{t.meta.description}</p>
        </div>

        <div className="footer-col">
          <b>{t.footer.siteCol}</b>
          {navLinks.map((link) => (
            <Link key={link.to} to={link.to}>{link.label}</Link>
          ))}
        </div>

        <div className="footer-col">
          <b>{t.footer.contactCol}</b>
          <span><Phone size={14} /> {t.contact.phone}</span>
          <span><Mail size={14} /> {t.contact.email}</span>
          <span><MapPin size={14} /> {t.contact.address}</span>
        </div>

        <div className="footer-col">
          <b>{t.footer.contactCol}</b>
          <div className="social-row">
            <a href="https://instagram.com" aria-label="Instagram"><Instagram size={16} /></a>
            <a href="https://facebook.com" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="https://youtube.com" aria-label="YouTube"><Youtube size={16} /></a>
          </div>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>{t.footer.copyright}</span>
      </div>
    </footer>
  )
}
